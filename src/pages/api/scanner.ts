// pages/api/scanner.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import fetch, { RequestInit, Response } from 'node-fetch'; // Import node-fetch types explicitly

type ScanResponse = {
  vulnerabilities?: string[];
  error?: string;
};

async function scanVulnerabilities(targetUrl: string): Promise<string[]> {
  const vulnerabilities: string[] = [];

  // Validate URL
  try {
    new URL(targetUrl);
  } catch {
    throw new Error('Invalid URL provided');
  }

  // Helper function to perform HTTP requests with timeout
  const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 5000): Promise<Response> => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal } as RequestInit);
      clearTimeout(id);
      return response as Response;
    } catch (error) {
      console.error(`Fetch error for ${url}:`, (error as Error).message);
      throw error;
    }
  };

  try {
    // Scan for XSS (Reflected)
    const xssPayload = "<script>alert('Reflected XSS')</script>";
    const xssUrl = `${targetUrl}?test=${encodeURIComponent(xssPayload)}`;
    let response = await fetchWithTimeout(xssUrl, { method: 'GET' });
    if (response && (await response.text()).includes(xssPayload)) {
      vulnerabilities.push('Reflected XSS vulnerability found');
    }

    // Scan for SQL Injection (GET)
    const sqlPayload = "' OR '1'='1";
    const sqlUrl = `${targetUrl}?id=${encodeURIComponent(sqlPayload)}`;
    response = await fetchWithTimeout(sqlUrl, { method: 'GET' });
    const sqlText = response ? await response.text() : '';
    if (response && (sqlText.toLowerCase().includes('sql') || sqlText.toLowerCase().includes('error'))) {
      vulnerabilities.push('SQL Injection vulnerability found (GET)');
    }

    // Scan for Directory Traversal
    const dirPayload = '../../../../../../etc/passwd';
    const dirUrl = `${targetUrl}/${dirPayload}`;
    response = await fetchWithTimeout(dirUrl, { method: 'GET' });
    if (response && (await response.text()).includes('root:x')) {
      vulnerabilities.push('Directory Traversal vulnerability found');
    }

    // Scan for Command Injection
    const cmdPayload = '127.0.0.1; ls';
    const cmdUrl = `${targetUrl}?cmd=${encodeURIComponent(cmdPayload)}`;
    response = await fetchWithTimeout(cmdUrl, { method: 'GET' });
    if (response && (await response.text()).includes('dir')) {
      vulnerabilities.push('Command Injection vulnerability found');
    }

    // Scan for Server Misconfiguration (e.g., exposed admin page)
    const adminUrl = `${targetUrl}/admin`;
    response = await fetchWithTimeout(adminUrl, { method: 'GET' });
    if (response && response.status === 200 && !(await response.text()).includes('login')) {
      vulnerabilities.push('Server Misconfiguration vulnerability found (exposed admin page)');
    }
  } catch (error) {
    console.error('Scan error:', (error as Error).message);
    throw new Error(`Failed to scan URL: ${(error as Error).message}`);
  }

  return vulnerabilities;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<ScanResponse>) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*'); // Adjust for production
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