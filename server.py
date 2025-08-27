#!/usr/bin/env python3
"""
Simple HTTP Server for Portfolio Website
Supports video streaming and CORS for local development
"""

import http.server
import socketserver
import os
import mimetypes
from urllib.parse import urlparse, parse_qs
import threading
import webbrowser

class VideoStreamHandler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=os.getcwd(), **kwargs)
    
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_GET(self):
        # Parse the URL
        parsed_path = urlparse(self.path)
        file_path = parsed_path.path.lstrip('/')
        
        # Handle root path
        if not file_path or file_path == '/':
            file_path = 'index.html'
        
        # Check if file exists
        if not os.path.exists(file_path):
            self.send_error(404, "File not found")
            return
        
        # Handle video files with range requests for streaming
        if file_path.endswith(('.mp4', '.webm', '.ogg')):
            self.handle_video_request(file_path)
        else:
            # Handle regular files
            super().do_GET()
    
    def handle_video_request(self, file_path):
        """Handle video requests with range support for streaming"""
        try:
            file_size = os.path.getsize(file_path)
            
            # Check for Range header
            range_header = self.headers.get('Range')
            
            if range_header:
                # Parse range header
                range_match = range_header.replace('bytes=', '').split('-')
                start = int(range_match[0]) if range_match[0] else 0
                end = int(range_match[1]) if range_match[1] else file_size - 1
                
                # Ensure end doesn't exceed file size
                end = min(end, file_size - 1)
                content_length = end - start + 1
                
                # Send partial content response
                self.send_response(206)
                self.send_header('Content-Type', 'video/mp4')
                self.send_header('Content-Length', str(content_length))
                self.send_header('Content-Range', f'bytes {start}-{end}/{file_size}')
                self.send_header('Accept-Ranges', 'bytes')
                self.end_headers()
                
                # Send video chunk
                with open(file_path, 'rb') as video_file:
                    video_file.seek(start)
                    chunk_size = 8192
                    remaining = content_length
                    
                    while remaining > 0:
                        chunk = video_file.read(min(chunk_size, remaining))
                        if not chunk:
                            break
                        self.wfile.write(chunk)
                        remaining -= len(chunk)
            else:
                # Send entire file
                self.send_response(200)
                self.send_header('Content-Type', 'video/mp4')
                self.send_header('Content-Length', str(file_size))
                self.send_header('Accept-Ranges', 'bytes')
                self.end_headers()
                
                with open(file_path, 'rb') as video_file:
                    chunk_size = 8192
                    while True:
                        chunk = video_file.read(chunk_size)
                        if not chunk:
                            break
                        self.wfile.write(chunk)
                        
        except Exception as e:
            print(f"Error serving video: {e}")
            self.send_error(500, "Internal server error")
    
    def log_message(self, format, *args):
        """Custom log message to show cleaner output"""
        print(f"[{self.address_string()}] {format % args}")

def start_server(port=8000):
    """Start the HTTP server"""
    try:
        with socketserver.TCPServer(("", port), VideoStreamHandler) as httpd:
            print(f"🚀 Portfolio server starting on http://localhost:{port}")
            print(f"📁 Serving files from: {os.getcwd()}")
            print("📹 Video streaming enabled")
            print("🌙 Dark mode toggle available")
            print("📱 Mobile responsive design")
            print("\n💡 Features included:")
            print("   • Smooth scroll animations")
            print("   • Project modal with video streaming")
            print("   • Dark/Light theme toggle")
            print("   • Responsive design")
            print("   • Glassmorphism UI effects")
            print("   • Contact form")
            print("\n🛑 Press Ctrl+C to stop the server")
            print("-" * 50)
            
            # Auto-open browser after a short delay
            def open_browser():
                import time
                time.sleep(1)
                webbrowser.open(f'http://localhost:{port}')
            
            browser_thread = threading.Thread(target=open_browser)
            browser_thread.daemon = True
            browser_thread.start()
            
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n\n🛑 Server stopped by user")
    except OSError as e:
        if e.errno == 10048:  # Port already in use
            print(f"❌ Port {port} is already in use. Trying port {port + 1}...")
            start_server(port + 1)
        else:
            print(f"❌ Error starting server: {e}")

if __name__ == "__main__":
    # Change to the script directory
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    start_server()