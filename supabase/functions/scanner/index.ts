import { serve } from "https://deno.land/std@0.177.0/http/server.ts";

async function scanVulnerabilities(targetUrl: string): Promise<string[]> {
  const vulnerabilities: string[] = [];

  // Helper function to perform HTTP requests
  const fetchWithTimeout = async (url: string, options: RequestInit, timeout = 5000) => {
    const controller = new AbortController();
    const id = setTimeout(() => controller.abort(), timeout);
    try {
      const response = await fetch(url, { ...options, signal: controller.signal });
      clearTimeout(id);
      return response;
    } catch {
      return null;
    }
  };

  // Scan XSS
  const xssPayload = "<script>alert('Stored XSS')</script>";
  let response = await fetchWithTimeout(targetUrl, {
    method: "POST",
    body: JSON.stringify({ comment: xssPayload }),
    headers: { "Content-Type": "application/json" },
  });
  if (response && (await response.text()).includes(xssPayload)) {
    vulnerabilities.push("Stored XSS vulnerability found");
  }
  response = await fetchWithTimeout(`${targetUrl}?message=${encodeURIComponent(xssPayload)}`, { method: "GET" });
  if (response && (await response.text()).includes(xssPayload)) {
    vulnerabilities.push("Reflected XSS vulnerability found");
  }

  // Scan SQL Injection
  const sqlPayload = "' OR '1'='1";
  response = await fetchWithTimeout(`${targetUrl}?id=${encodeURIComponent(sqlPayload)}`, { method: "GET" });
  if (response && (await response.text()).toLowerCase().includes("error")) {
    vulnerabilities.push("SQL Injection vulnerability found (GET)");
  }
  response = await fetchWithTimeout(targetUrl, {
    method: "POST",
    body: JSON.stringify({ id: sqlPayload }),
    headers: { "Content-Type": "application/json" },
  });
  if (response && (await response.text()).toLowerCase().includes("error")) {
    vulnerabilities.push("SQL Injection vulnerability found (POST)");
  }

  // Scan Directory Traversal
  const dirPayload = "../../../../etc/passwd";
  response = await fetchWithTimeout(`${targetUrl}/${dirPayload}`, { method: "GET" });
  if (response && (await response.text()).includes("root:x")) {
    vulnerabilities.push("Directory Traversal vulnerability found");
  }

  // Scan Command Injection
  const cmdPayload = "127.0.0.1; ls";
  response = await fetchWithTimeout(`${targetUrl}?ip=${encodeURIComponent(cmdPayload)}`, { method: "GET" });
  if (response && (await response.text()).includes("index.html")) {
    vulnerabilities.push("Command Injection vulnerability found");
  }

  // Scan Server Misconfiguration
  response = await fetchWithTimeout(`${targetUrl}/admin`, { method: "GET" });
  if (response && response.status === 200) {
    vulnerabilities.push("Server Misconfiguration vulnerability found");
  }

  return vulnerabilities;
}

serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed" }), {
      status: 405,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { url } = await req.json();
  if (!url) {
    return new Response(JSON.stringify({ error: "No URL provided" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const vulnerabilities = await scanVulnerabilities(url);
  return new Response(JSON.stringify({ vulnerabilities }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
});