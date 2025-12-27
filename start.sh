#!/bin/bash
# Quick Start Script for Emergency Disaster Relief Stablecoin dApp
# Run this script to start both backend and frontend

echo "🚀 Starting Emergency Disaster Relief Stablecoin dApp"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js v22 or higher."
    exit 1
fi

echo -e "${BLUE}✓ Node.js installed: $(node -v)${NC}"
echo ""

# Terminal 1 - Start Hardhat Node
echo -e "${YELLOW}Step 1: Starting Hardhat Node (Backend)${NC}"
echo "Command: cd contracts && npx hardhat node"
echo ""
echo "Please run this in a new terminal:"
echo -e "${GREEN}cd contracts && npx hardhat node${NC}"
echo ""
echo "This will:"
echo "  - Start local blockchain on http://127.0.0.1:8545"
echo "  - Create 20 test accounts with 10,000 ETH each"
echo "  - Display account addresses and private keys"
echo ""
read -p "Press Enter after starting Hardhat node in another terminal... "

# Terminal 2 - Start Frontend
echo ""
echo -e "${YELLOW}Step 2: Starting Frontend Application${NC}"
echo "Command: cd frontend && npm run dev"
echo ""
echo "Running in this terminal:"
cd frontend
npm install --silent
npm run dev

echo ""
echo -e "${GREEN}✓ Frontend started on http://localhost:5173${NC}"
echo ""
echo "Next steps:"
echo "  1. Open http://localhost:5173 in your browser"
echo "  2. Click 'Wallet' in the navbar"
echo "  3. Click 'Connect Wallet' button"
echo "  4. Approve MetaMask connection"
echo "  5. MetaMask will auto-add Hardhat network"
echo "  6. Send test transactions!"
echo ""
