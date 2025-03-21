import type { VercelRequest, VercelResponse } from '@vercel/node';
import sslChecker from 'ssl-checker';

interface ScanResponse {
  vulnerabilities?: string[];
  error?: string;
}

// Helper function to perform HTTP requests with timeout
const fetchWithTimeout = async (url: string, options: RequestInit = {}, timeout = 5000): Promise<Response> => {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  try {
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(id);
    return response;
  } catch (error) {
    console.error(`Fetch error for ${url}:`, (error as Error).message);
    throw error;
  }
};

// Vulnerability scanning function
async function scanVulnerabilities(targetUrl: string): Promise<string[]> {
  const vulnerabilities: string[] = [];

  // Validate URL
  let urlObj: URL;
  try {
    urlObj = new URL(targetUrl);
  } catch {
    throw new Error('Invalid URL provided');
  }

  try {
    // 1. Check for HTTP Security Headers
    const response = await fetchWithTimeout(targetUrl, { method: 'GET' });
    const headers = response.headers;

    if (!headers.get('x-frame-options')) {
      vulnerabilities.push('Missing X-Frame-Options header (vulnerable to clickjacking)');
    }
    if (!headers.get('content-security-policy')) {
      vulnerabilities.push('Missing Content-Security-Policy header (vulnerable to XSS)');
    }
    if (!headers.get('strict-transport-security')) {
      vulnerabilities.push('Missing Strict-Transport-Security header (HSTS not enforced)');
    }

    // 2. Check for exposed sensitive directories
    const sensitivePaths = ['/admin', '/.git', '/config', '/backup', '/wp-admin', '/phpinfo.php'];
    for (const path of sensitivePaths) {
      const sensitiveUrl = `${targetUrl}${path}`;
      try {
        const sensitiveResponse = await fetchWithTimeout(sensitiveUrl, { method: 'GET' });
        if (sensitiveResponse.status === 200) {
          const text = await sensitiveResponse.text();
          if (!text.includes('login') && !text.includes('404')) {
            vulnerabilities.push(`Exposed sensitive directory: ${path}`);
          }
        }
      } catch (error) {
        // Ignore errors for individual paths
      }
    }

    // 3. Check for outdated server software
    const serverHeader = headers.get('server');
    if (serverHeader) {
      if (serverHeader.includes('Apache/2.2') || serverHeader.includes('nginx/1.0')) {
        vulnerabilities.push(`Outdated server software detected: ${serverHeader}`);
      }
    }

    // 4. Check for HTTP methods
    const traceResponse = await fetchWithTimeout(targetUrl, { method: 'TRACE' });
    if (traceResponse.status === 200) {
      vulnerabilities.push('HTTP TRACE method enabled (vulnerable to XST)');
    }

    // 5. Check for SSL/TLS issues using ssl-checker
    if (targetUrl.startsWith('https')) {
      try {
        const sslResult = await sslChecker(urlObj.hostname);
        if (!sslResult.valid) {
          vulnerabilities.push('SSL/TLS certificate is invalid or expired');
        }
        if (sslResult.daysRemaining < 30) {
          vulnerabilities.push(`SSL/TLS certificate expires in ${sslResult.daysRemaining} days`);
        }
      } catch (error) {
        vulnerabilities.push('Unable to verify SSL/TLS certificate (potential misconfiguration)');
      }
    }

    // 6. Check for open ports (basic check using a simple HEAD request to common ports)
    const commonPorts = [21, 22, 23, 3306]; // FTP, SSH, Telnet, MySQL
    for (const port of commonPorts) {
      try {
        const portUrl = `${urlObj.protocol}//${urlObj.hostname}:${port}`;
        const portResponse = await fetchWithTimeout(portUrl, { method: 'HEAD' }, 2000);
        if (portResponse.status === 200) {
          vulnerabilities.push(`Open port detected: ${port} (potential security risk)`);
        }
      } catch (error) {
        // Ignore errors (port likely closed)
      }
    }

    // 7. Check for CORS misconfiguration
    const corsResponse = await fetchWithTimeout(targetUrl, {
      method: 'GET',
      headers: { Origin: 'http://malicious-site.com' },
    });
    if (corsResponse.headers.get('access-control-allow-origin') === '*') {
      vulnerabilities.push('CORS misconfiguration: Access-Control-Allow-Origin set to "*"');
    }

  } catch (error) {
    console.error('Scan error:', (error as Error).message);
    throw new Error(`Failed to scan URL: ${(error as Error).message}`);
  }

  return vulnerabilities.length > 0 ? vulnerabilities : ['No vulnerabilities found'];
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  let url: string;
  try {
    const body = req.body;
    url = body.url;
    if (!url) {
      return res.status(400).json({ error: 'No URL provided' });
    }
  } catch (error) {
    return res.status(400).json({ error: 'Invalid JSON body' });
  }

  try {
    const vulnerabilities = await scanVulnerabilities(url);
    return res.status(200).json({ vulnerabilities });
  } catch (error) {
    return res.status(500).json({ error: (error as Error).message });
  }
}