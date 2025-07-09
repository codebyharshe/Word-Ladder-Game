@echo off
echo 🚀 Setting up Word Ladder Project...

REM === Backend Setup ===
echo 📦 Setting up Python virtual environment for backend...
cd backend

if not exist venv (
    python -m venv venv
)

call venv\Scripts\activate

echo 📄 Installing backend requirements...
pip install --upgrade pip
pip install -r requirements.txt

call venv\Scripts\deactivate.bat
cd ..

@REM REM === Frontend Setup ===
@REM echo 🌐 Installing frontend dependencies...
@REM cd frontend

@REM if not exist node_modules (
@REM     npm install
@REM ) else (
@REM     echo 📦 Frontend dependencies already installed.
@REM )

@REM cd ..
@REM echo ✅ Setup complete! You can now run run.bat to start the project.
@REM pause
