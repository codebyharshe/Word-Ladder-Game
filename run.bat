@echo off
echo 🚀 Starting Word Ladder Game...

REM === Start Flask Backend ===
start cmd /k "cd backend && call venv\Scripts\activate && python app.py"

REM === Start React Frontend ===
start cmd /k "cd frontend && npm start"

echo ✅ Both backend and frontend are launching in separate windows...
pause
