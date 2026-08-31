@echo off
echo Starting BetterIMDS Backend and Frontend...

start "BetterIMDS Backend" cmd /k "cd /d backend && mvnw.cmd spring-boot:run"
start "BetterIMDS Frontend" cmd /k "cd /d frontend && npm run dev"
