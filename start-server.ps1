# Simple HTTP Server untuk Preview Website
# Jalankan script ini untuk membuka website di browser

$port = 8000
$path = "C:\Users\PC\Documents\e-kampaye"

Write-Host "🚀 Starting local server..." -ForegroundColor Green
Write-Host "📁 Serving files from: $path" -ForegroundColor Cyan
Write-Host "🌐 Opening browser at: http://localhost:$port" -ForegroundColor Yellow
Write-Host ""
Write-Host "Press Ctrl+C to stop the server" -ForegroundColor Red
Write-Host ""

# Start browser
Start-Process "http://localhost:$port"

# Start Python HTTP server
Set-Location $path
python -m http.server $port
