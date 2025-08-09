#!/usr/bin/env python3
"""
Servidor simples para testar o Flutter Web build
"""
import http.server
import socketserver
import os
import sys

PORT = 8080
DIRECTORY = "build/web"

class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=DIRECTORY, **kwargs)
    
    def end_headers(self):
        # Adicionar headers CORS para desenvolvimento
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()

if __name__ == "__main__":
    if not os.path.exists(DIRECTORY):
        print(f"❌ Diretório {DIRECTORY} não encontrado!")
        print("Execute 'flutter build web' primeiro")
        sys.exit(1)
    
    print(f"🚀 Iniciando servidor Flutter Web")
    print(f"📂 Servindo: {DIRECTORY}")
    print(f"🌐 URL: http://localhost:{PORT}")
    print(f"📱 App mobile funcionando na web!")
    print("")
    print("Pressione Ctrl+C para parar o servidor")
    
    try:
        with socketserver.TCPServer(("", PORT), Handler) as httpd:
            httpd.serve_forever()
    except KeyboardInterrupt:
        print("\n🛑 Servidor parado")