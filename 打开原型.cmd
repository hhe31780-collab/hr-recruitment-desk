@echo off
cd /d "%~dp0"
start "" /min node server.mjs
start "" http://localhost:4173
