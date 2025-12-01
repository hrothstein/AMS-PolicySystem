#!/usr/bin/env python3
"""
Simple test server for the Agent Broker Web UI
This serves the static files and proxies API requests to the agent broker
"""

import http.server
import socketserver
import urllib.request
import urllib.error
import json
from pathlib import Path

PORT = 8081
AGENT_BROKER_URL = "https://agent-network-ingress-gw-npo8yu.dyx6np.usa-e2.cloudhub.io/credit-card-broker/"

class AgentBrokerHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        # Set the directory to serve static files from
        self.directory = str(Path(__file__).parent / "src" / "main" / "resources" / "web")
        super().__init__(*args, directory=self.directory, **kwargs)
    
    def do_POST(self):
        """Handle POST requests to /api/query"""
        if self.path == '/api/query':
            try:
                # Read the request body
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                
                # Forward to agent broker
                req = urllib.request.Request(
                    AGENT_BROKER_URL,
                    data=post_data,
                    headers={'Content-Type': 'application/json'}
                )
                
                with urllib.request.urlopen(req, timeout=30) as response:
                    response_data = response.read()
                    
                    # Send response
                    self.send_response(200)
                    self.send_header('Content-Type', 'application/json')
                    self.send_header('Access-Control-Allow-Origin', '*')
                    self.end_headers()
                    self.wfile.write(response_data)
                    
            except urllib.error.HTTPError as e:
                self.send_error(e.code, f"Agent Broker Error: {e.reason}")
            except Exception as e:
                self.send_error(500, f"Error: {str(e)}")
        else:
            self.send_error(404, "Not Found")
    
    def do_GET(self):
        """Handle GET requests for static files"""
        if self.path == '/':
            self.path = '/index.html'
        return super().do_GET()
    
    def end_headers(self):
        """Add CORS headers"""
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

if __name__ == "__main__":
    print(f"🚀 Starting Agent Broker Web UI Test Server on port {PORT}...")
    print(f"📡 Proxying API requests to: {AGENT_BROKER_URL}")
    print(f"🌐 Open your browser to: http://localhost:{PORT}")
    print(f"\nPress Ctrl+C to stop the server\n")
    
    with socketserver.TCPServer(("", PORT), AgentBrokerHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n\n👋 Server stopped")





