from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

class VulnerabilityScanner:
    def __init__(self, target_url):
        self.target_url = target_url
        self.vulnerabilities = []

    def scan_xss(self):
        payload = "<script>alert('Stored XSS')</script>"
        try:
            response = requests.post(self.target_url, data={"comment": payload}, timeout=5)
            if payload in response.text:
                self.vulnerabilities.append("Stored XSS vulnerability found")
        except:
            pass
        try:
            response = requests.get(self.target_url + "?message=" + payload, timeout=5)
            if payload in response.text:
                self.vulnerabilities.append("Reflected XSS vulnerability found")
        except:
            pass

    def scan_sql_injection(self):
        payload = "' OR '1'='1"
        try:
            response = requests.get(self.target_url + "?id=" + payload, timeout=5)
            if "error" in response.text.lower():
                self.vulnerabilities.append("SQL Injection vulnerability found (GET)")
        except:
            pass
        try:
            response = requests.post(self.target_url, data={"id": payload}, timeout=5)
            if "error" in response.text.lower():
                self.vulnerabilities.append("SQL Injection vulnerability found (POST)")
        except:
            pass

    def scan_directory_traversal(self):
        payload = "../../../../etc/passwd"
        try:
            response = requests.get(self.target_url + "/" + payload, timeout=5)
            if "root:x" in response.text:
                self.vulnerabilities.append("Directory Traversal vulnerability found")
        except:
            pass

    def scan_command_injection(self):
        payload = "127.0.0.1; ls"
        try:
            response = requests.get(self.target_url + "?ip=" + payload, timeout=5)
            if "index.html" in response.text:
                self.vulnerabilities.append("Command Injection vulnerability found")
        except:
            pass

    def scan_server_misconfiguration(self):
        try:
            response = requests.get(self.target_url + "/admin", timeout=5)
            if response.status_code == 200:
                self.vulnerabilities.append("Server Misconfiguration vulnerability found")
        except:
            pass

    def scan_all(self):
        self.scan_xss()
        self.scan_sql_injection()
        self.scan_directory_traversal()
        self.scan_command_injection()
        self.scan_server_misconfiguration()
        return self.vulnerabilities

# Vercel serverless function handler
def handler(req):
    if req.method == 'POST':
        data = req.get_json()
        target_url = data.get('url', '')
        if not target_url:
            return jsonify({'error': 'No URL provided'}), 400
        
        scanner = VulnerabilityScanner(target_url)
        vulnerabilities = scanner.scan_all()
        return jsonify({'vulnerabilities': vulnerabilities}), 200
    
    return jsonify({'error': 'Method not allowed'}), 405

# Vercel expects this to be the entry point
app.route('/api/scan', methods=['POST'])(handler)

if __name__ == '__main__':
    app.run()