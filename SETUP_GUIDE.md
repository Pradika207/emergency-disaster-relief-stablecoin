# Emergency Disaster Relief Stablecoin - Setup & Usage Guide

## 🚀 Quick Start (5 Steps)

### Step 1️⃣: Start Hardhat Local Node

```bash
cd contracts
npx hardhat node
```

**Keep this terminal open!** You'll see output like:
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/

Accounts
========
Account #0: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266 (10000 ETH)
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5ef...
```

---

### Step 2️⃣: Deploy Contract (New Terminal)

```bash
cd contracts
npx hardhat compile
npx hardhat run scripts/deploy.js --network localhost
```

**Expected output:**
```
Deploying with account: 0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266
✅ ReliefStablecoin deployed to: 0x5FbDB2315678afccb333f8a9c5662a9dc91dcd69
✅ Address saved to frontend/src/blockchain/contractAddress.json
```

The contract address is automatically saved to:
- `frontend/src/blockchain/contractAddress.json`

---

### Step 3️⃣: Start Frontend (New Terminal)

```bash
cd frontend
npm run dev
```

**Expected output:**
```
  VITE v7.3.0  ready in 1159 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://192.168.29.121:5173/
```

✅ Frontend is now running on **http://localhost:5173**

---

### Step 4️⃣: Configure MetaMask

Open MetaMask and add a custom network:

| Field | Value |
|-------|-------|
| **Network Name** | Hardhat Local |
| **RPC URL** | http://127.0.0.1:8545 |
| **Chain ID** | 31337 |
| **Currency Symbol** | ETH |

**Then import Account #0 using the private key from the Hardhat terminal:**
```
Private Key: 0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5ef...
```

---

### Step 5️⃣: Open the dApp

1. Open **http://localhost:5173** in your browser
2. Click **"Connect Wallet"**
3. Approve MetaMask connection
4. Start interacting with ReliefStablecoin! 🎉

---

## ✅ How to Verify It's Working

### **Read Test** (No transaction needed)
```
Call: balanceOf(account)
Expected: Returns balance instantly
MetaMask: No popup
```

### **Write Test** (Requires transaction)
```
Call: mint(address, amount)
or
transfer(recipient, amount)

Expected: 
- MetaMask popup appears
- Transaction sent
- Hardhat terminal logs:
  eth_sendTransaction
  Contract call: ReliefStablecoin.mint / transfer
```

---

## 🔧 File Structure

```
emergency-disaster-relief-stablecoin/
├── contracts/                    # Smart contracts
│   ├── contracts/
│   │   ├── ReliefStablecoin.sol  # Main token contract
│   │   ├── Whitelist.sol
│   │   └── SpendingControl.sol
│   ├── scripts/
│   │   ├── deploy.js             # Deployment script
│   │   └── verify-relief.js
│   ├── test/
│   │   └── basic.test.ts
│   ├── hardhat.config.ts         # Hardhat configuration
│   └── package.json
│
├── frontend/                     # React dApp
│   ├── src/
│   │   ├── blockchain/
│   │   │   ├── contract.js       # ethers.js integration
│   │   │   ├── ReliefStablecoinABI.json
│   │   │   └── contractAddress.json
│   │   ├── pages/
│   │   ├── components/
│   │   └── App.jsx
│   ├── vite.config.js
│   └── package.json
│
└── docs/                         # Documentation
```

---

## 🐛 Troubleshooting

### **"Cannot connect to localhost:8545"**
- Make sure `npx hardhat node` is still running (Step 1)
- Check that the RPC URL in MetaMask is exactly `http://127.0.0.1:8545`

### **"Contract not deployed" or "0x000..."**
- Run the deploy script again:
  ```bash
  cd contracts
  npx hardhat run scripts/deploy.js --network localhost
  ```

### **MetaMask shows "Unknown Network"**
- Add the custom network (Step 4) with Chain ID **31337**
- Make sure Hardhat node is running

### **No Hardhat logs when clicking buttons**
- Check that MetaMask is connected to "Hardhat Local" network
- Confirm the contract address in `frontend/src/blockchain/contractAddress.json`

---

## 📚 Smart Contract Functions

### **ReliefStablecoin.sol**

| Function | Type | Description |
|----------|------|-------------|
| `mint(address, uint256)` | Write | Mint tokens (owner only) |
| `transfer(address, uint256)` | Write | Transfer tokens |
| `balanceOf(address)` | Read | Get balance |
| `totalSupply()` | Read | Get total supply |
| `approve(address, uint256)` | Write | Approve spending |
| `transferFrom(address, address, uint256)` | Write | Transfer on behalf |

---

## 🎯 Next Steps

1. ✅ Run all 5 steps above
2. ✅ Connect MetaMask
3. ✅ Test read function (balanceOf)
4. ✅ Test write function (mint or transfer)
5. 📝 Check Hardhat terminal for transaction logs

**Once this works, your Emergency Disaster Relief Stablecoin is ready for:**
- Donor platform integration
- Beneficiary management
- Admin controls
- Transparency dashboard

---

## 📖 Resources

- **Hardhat Docs**: https://hardhat.org/getting-started
- **ethers.js Docs**: https://docs.ethers.org/
- **Solidity Docs**: https://docs.soliditylang.org/

---

**Built with ❤️ for Disaster Relief**
