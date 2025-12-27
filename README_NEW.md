# 🚀 Emergency Disaster Relief Stablecoin (ReliefCoin) dApp

A complete decentralized application for managing disaster relief funds using a custom ERC20-like stablecoin on Ethereum. Built with React, Hardhat, Solidity, and MetaMask integration.

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Usage Guide](#usage-guide)
- [Technical Stack](#technical-stack)
- [Smart Contracts](#smart-contracts)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

**ReliefCoin** is a charitable fundraising platform that:
- Issues a custom stablecoin for disaster relief
- Enables donors to contribute funds securely
- Allows beneficiaries to request and receive aid
- Provides administrators with oversight and controls
- Offers transparency with on-chain verification

### Vision
Create a trustless, transparent, and efficient way to distribute disaster relief funds using blockchain technology.

---

## ✨ Features

### 🔗 Smart Contracts
- **ReliefStablecoin.sol** - Custom token with mint/burn capabilities
- **Whitelist.sol** - Manage approved addresses for distributions
- **SpendingControl.sol** - Enforce spending limits per beneficiary

### 💰 Donor Features
- Connect MetaMask wallet
- View account balance and network status
- Donate to relief fund
- Track donation history
- Send test transactions on local network

### 🆘 Beneficiary Features
- Request aid with description
- Track request status
- View received distributions
- Access personal profile

### 👨‍💼 Admin Features
- Manage beneficiary whitelist
- Monitor spending limits
- Approve/deny aid requests
- View analytics dashboard

### 📊 Transparency Features
- View all transactions
- Check fund distribution
- Audit trail of all activities
- Real-time statistics

### 🔐 Security
- MetaMask wallet integration
- Private key never exposed
- Gas optimization
- Contract-enforced limits

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** v22+ ([Download](https://nodejs.org/))
- **MetaMask** browser extension ([Install](https://metamask.io/download/))
- **Git** (optional, for cloning)

### Windows Quick Start
```bash
# Double-click to run
start.bat
```

### macOS/Linux Quick Start
```bash
# Make script executable
chmod +x start.sh

# Run script
./start.sh
```

### Manual Start (All Platforms)

**Terminal 1 - Start Hardhat Node:**
```bash
cd contracts
npx hardhat node
```
This starts your local blockchain at `http://127.0.0.1:8545`

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm install  # First time only
npm run dev
```
Frontend runs at `http://localhost:5173`

### Connect to dApp
1. Open http://localhost:5173
2. Click "Wallet" in the navbar
3. Click "Connect Wallet"
4. Approve MetaMask connection
5. MetaMask auto-adds Hardhat network

---

## 📂 Project Structure

```
emergency-disaster-relief-stablecoin/
├── contracts/                      # Smart contracts & tests
│   ├── contracts/
│   │   ├── ReliefStablecoin.sol   # Main token contract
│   │   ├── Whitelist.sol          # Whitelist management
│   │   └── SpendingControl.sol    # Spending controls
│   ├── scripts/
│   │   └── deploy.js              # Deployment script
│   ├── test/
│   │   └── basic.test.ts          # Contract tests
│   ├── hardhat.config.ts          # Hardhat config
│   └── package.json
│
├── frontend/                       # React frontend
│   ├── src/
│   │   ├── hooks/
│   │   │   └── useWallet.js       # Wallet management hook
│   │   ├── components/
│   │   │   ├── Navbar.jsx         # Navigation bar
│   │   │   ├── WalletConnect.jsx  # Wallet connector
│   │   │   └── ...
│   │   ├── pages/
│   │   │   ├── Home.jsx
│   │   │   ├── Donor.jsx
│   │   │   ├── Beneficiary.jsx
│   │   │   ├── Admin.jsx
│   │   │   ├── Transparency.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── WalletStatus.jsx   # Wallet dashboard
│   │   ├── blockchain/
│   │   │   ├── contractAddress.json
│   │   │   └── ReliefStablecoinABI.json
│   │   ├── App.jsx
│   │   └── App.css
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── docs/                          # Documentation
├── README.md                       # This file
├── SETUP_COMPLETE.md              # Setup guide
├── METAMASK_FEATURES.md           # Feature documentation
├── SETUP_GUIDE.md                 # Original setup guide
├── start.bat                       # Windows quick start
└── start.sh                        # macOS/Linux quick start
```

---

## 💻 Usage Guide

### 1. Wallet Connection

**To Connect Your Wallet:**
1. Click "Connect Wallet" button on Wallet Status page
2. MetaMask will ask for permission
3. Select account and click "Connect"
4. Hardhat network auto-adds to MetaMask

**To Disconnect:**
- Click the logout icon next to your address

### 2. Sending Test Transactions

**On Wallet Status Page:**
1. Fill in "Recipient Address" (0x...)
2. Enter "Amount" in ETH (0.001-1.0)
3. Click "Send Transaction"
4. Approve in MetaMask popup
5. See transaction hash on confirmation

### 3. Viewing Account Info

**Account Details shown:**
- Full wallet address (copyable)
- Real-time ETH balance
- Current network (Hardhat Local)
- Chain ID (31337)

### 4. Using Donor Page

1. Connect your MetaMask wallet
2. Enter donation amount
3. Click "Donate"
4. Approve transaction in MetaMask
5. Transaction confirmed on blockchain

### 5. Using Beneficiary Page

1. Fill in request details
2. Specify amount needed
3. Add description
4. Submit request
5. Wait for admin approval

### 6. Admin Dashboard

1. View pending requests
2. Manage whitelist
3. Set spending limits
4. Approve/deny requests
5. Monitor fund distribution

### 7. Transparency Page

1. View all transactions
2. Check fund distribution history
3. See beneficiary statistics
4. Download audit reports

---

## 🛠️ Technical Stack

### Backend
| Component | Version | Purpose |
|-----------|---------|---------|
| Hardhat | 3.1.0 | Ethereum dev environment |
| Solidity | 0.8.20 | Smart contracts |
| ethers.js | 6.16.0 | Web3 library |
| Node.js | 22+ | Runtime |

### Frontend
| Component | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.0 | UI framework |
| Vite | 7.3.0 | Build tool |
| React Router | 7.11.0 | Routing |
| Tailwind CSS | 4.1.18 | Styling |
| Lucide Icons | Latest | UI icons |
| ethers.js | 6.16.0 | Web3 integration |

### Development Tools
- **Testing**: Node.js native `test` module
- **Linting**: ESLint (optional)
- **Package Manager**: npm
- **Version Control**: Git

---

## 🤖 Smart Contracts

### ReliefStablecoin.sol

Main token contract implementing:
```solidity
// Token functions
mint(to, amount)              // Create new tokens
burn(amount)                  // Destroy tokens
transfer(to, amount)          // Send tokens
transferFrom(from, to, amount) // Approved transfers
approve(spender, amount)      // Approve spending

// View functions
balanceOf(account)            // Get account balance
totalSupply()                 // Get total tokens
allowance(owner, spender)     // Get approval amount
```

### Whitelist.sol

Manages approved addresses:
```solidity
addToWhitelist(address)       // Add approved address
removeFromWhitelist(address)  // Remove approved address
isWhitelisted(address)        // Check if approved
```

### SpendingControl.sol

Enforces spending limits:
```solidity
setLimit(account, amount)     // Set spending limit
getLimit(account)             // Get account limit
checkSpending(account, amount) // Verify limit not exceeded
```

---

## 🧪 Testing

### Run Contract Tests
```bash
cd contracts
npx hardhat test
```

### Run with Node Test Runner
```bash
cd contracts
node --test test/basic.test.ts
```

### Manual Testing
1. Connect wallet to dApp
2. Send test transactions
3. Check Hardhat node logs
4. Verify balance updates

---

## 🔐 Test Accounts

Pre-funded test accounts on Hardhat Local:

| Account | Address | Private Key |
|---------|---------|-------------|
| 1 | `0xf39fd...92266` | `0xac097...f2ff80` |
| 2 | `0x70997...e11A7` | `0x59c69...690d` |
| 3 | `0x3C44C...B5F` | `0x5de41...e7d` |

**To import into MetaMask:**
1. Click MetaMask icon
2. Account → Import Account
3. Paste Private Key
4. Click "Import"

---

## 🚨 Troubleshooting

### Frontend Won't Load
```
Problem: http://localhost:5173 shows error
Solution:
  1. Check Vite is running: npm run dev in frontend folder
  2. Check port 5173 is free: lsof -i :5173 (Mac/Linux)
  3. Try different port: npm run dev -- --port 5174
```

### Can't Connect Wallet
```
Problem: MetaMask connection fails
Solution:
  1. Check MetaMask is unlocked
  2. Check correct account selected
  3. Refresh browser page
  4. Clear MetaMask cache: Settings → Advanced → Clear data
```

### MetaMask Shows "Wrong Network"
```
Problem: "Please switch to Hardhat Local"
Solution:
  1. Click orange "Switch to Hardhat Local" button
  2. MetaMask will add and switch automatically
  3. If manual: Settings → Networks → Add Network → Configure manually
     - Chain ID: 31337
     - RPC: http://127.0.0.1:8545
```

### Transaction Fails
```
Problem: Gas estimation error or insufficient balance
Solution:
  1. Check recipient address is valid (0x...)
  2. Check balance is sufficient (shown on Wallet page)
  3. Check Hardhat node is running on port 8545
  4. Try smaller amount (0.001 ETH)
```

### Hardhat Node Won't Start
```
Problem: Port 8545 already in use
Solution:
  1. Kill process: npx kill-port 8545
  2. Or use different port: npx hardhat node --port 8546
  3. Update frontend config if using different port
```

### Get Detailed Help
- Check [SETUP_COMPLETE.md](SETUP_COMPLETE.md) for full setup guide
- Check [METAMASK_FEATURES.md](METAMASK_FEATURES.md) for feature details
- Read console logs: Press F12 to open Developer Tools

---

## 📚 Additional Resources

### Documentation
- [Hardhat Documentation](https://hardhat.org/docs)
- [ethers.js Documentation](https://docs.ethers.org/)
- [MetaMask Developer Docs](https://docs.metamask.io/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [React Documentation](https://react.dev/)

### Tutorials
- [Hardhat Getting Started](https://hardhat.org/hardhat-runner/docs/getting-started)
- [ethers.js Guides](https://docs.ethers.org/v6/getting-started/)
- [Building dApps with React](https://docs.metamask.io/guide/create-dapp.html)

### Tools
- [Etherscan](https://etherscan.io/) - Blockchain explorer
- [Remix IDE](https://remix.ethereum.org/) - Online Solidity IDE
- [Hardhat Dashboard](https://hardhat.org/hardhat-vscode) - VS Code extension

---

## 📄 License

This project is provided as-is for educational and demonstration purposes.

---

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

## 🎯 Roadmap

### Current Version ✅
- Smart contract development
- Frontend with React
- MetaMask integration
- Local Hardhat network

### Future Plans
- [ ] Sepolia testnet deployment
- [ ] Mainnet deployment
- [ ] Enhanced UI/UX
- [ ] Mobile app
- [ ] Advanced analytics
- [ ] Multi-chain support
- [ ] DAO governance

---

## 📞 Support

**Need help?**
1. Check the documentation files in this directory
2. Review the troubleshooting section above
3. Check browser console (F12) for error messages
4. Verify all services are running correctly

**Still stuck?**
- Check if Hardhat node is running: `curl http://127.0.0.1:8545`
- Check if frontend is running: http://localhost:5173
- Review error messages in terminal/console

---

## ⚠️ Important Notes

- **Test Network Only**: These are test accounts with no real value
- **Private Keys**: Never share private keys. These keys are for testing only.
- **Security**: This is a demonstration. For production, implement full security audits.
- **Testing**: Always test thoroughly before deploying to mainnet.

---

## 🎉 Getting Started

**Ready to build?**

```bash
# 1. Start the blockchain
cd contracts && npx hardhat node

# 2. In another terminal, start the frontend
cd frontend && npm run dev

# 3. Open in browser
# Navigate to http://localhost:5173
# Click "Wallet" to connect MetaMask

# 4. Start building!
# Modify contracts, deploy, and interact with your dApp
```

Happy building! 🚀

---

**Last Updated**: 2024
**Status**: Development
**Version**: 1.0.0
