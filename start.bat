@echo off
echo Starting BetterIMDS Backend (with Debugger on port 5005) and Frontend...

start "BetterIMDS Backend" cmd /k "cd /d backend && mvnw.cmd spring-boot:run -Dspring-boot.run.jvmArguments=\"-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:5005\""
start "BetterIMDS Frontend" cmd /k "cd /d frontend && npm run dev"
