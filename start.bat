@echo off
REM Quick Start Script for Emergency Disaster Relief Stablecoin dApp - Windows
REM This script shows how to start both backend and frontend

echo.
echo ============================================================
echo 🚀 Emergency Disaster Relief Stablecoin dApp - Windows Setup
echo ============================================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo ❌ Node.js is not installed. Please install Node.js v22 or higher.
    echo Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✓ Node.js installed
node -v
echo.

REM Display instructions
echo ============================================================
echo STEP 1: Start Hardhat Node (Backend) - Required!
echo ============================================================
echo.
echo Open a NEW terminal/PowerShell and run:
echo.
echo   cd contracts
echo   npx hardhat node
echo.
echo This will:
echo   - Start local blockchain on http://127.0.0.1:8545
echo   - Create 20 test accounts with 10,000 ETH each
echo   - Display all account addresses and private keys
echo.
pause

echo.
echo ============================================================
echo STEP 2: Start Frontend Application
echo ============================================================
echo.
echo Installing dependencies (first time only)...
cd frontend
call npm install --silent
if %errorlevel% neq 0 (
    echo ❌ Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo Starting Vite dev server...
call npm run dev

pause
