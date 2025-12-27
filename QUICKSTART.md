# ⚡ Quick Start - Get Running in 5 Minutes

## 🚀 TL;DR (Too Long; Didn't Read)

```bash
# Terminal 1: Start blockchain
cd contracts
npx hardhat node

# Terminal 2: Start app (wait for Terminal 1 to print the node started message)
cd frontend
npm run dev

# Then in browser:
# Open http://localhost:5173
# Click "Wallet" 
# Connect MetaMask
# Done! 🎉
```

---

## 📋 Step-by-Step (5 Minutes)

### Step 1: Open Two Terminals (1 min)

**Windows:**
- Press `Win+X`, select "Windows Terminal"
- Click the `+` button to open a second terminal

**Mac/Linux:**
- Open Terminal (Cmd+Space, type "terminal", press Enter)
- Press Cmd+T or Cmd+N for second terminal

### Step 2: Start Hardhat Node (1 min)

**In Terminal 1:**
```bash
cd contracts
npx hardhat node
```

**Wait for this message:**
```
Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
```

✅ **Don't close this terminal!** Keep it running.

### Step 3: Start Frontend (1 min)

**In Terminal 2:**
```bash
cd frontend
npm run dev
```

**Wait for this message:**
```
Local: http://localhost:5173
```

✅ **Don't close this terminal either!**

### Step 4: Open Browser (1 min)

1. Open your favorite browser
2. Go to http://localhost:5173
3. You should see the ReliefCoin app

### Step 5: Connect MetaMask (1 min)

1. Click "Wallet" in the navbar (top right)
2. Click "Connect Wallet" button
3. MetaMask popup appears
4. Select your account
5. Click "Connect"
6. MetaMask will automatically add Hardhat network
7. ✅ **Connected!**

---

## 🎯 What You See

### After Connecting
```
✓ Wallet Connected
Address: 0xf39fd6e51aa...
Balance: 9,999.88 ETH
Network: Hardhat Local (Chain 31337)
```

### Ready to Test?
1. Scroll down to "Send Test Transaction"
2. Enter recipient: `0x70997970C51812e339D9B73b0245ad59e7df11A7`
3. Amount: `0.01`
4. Click "Send Transaction"
5. Approve in MetaMask
6. See transaction hash!

---

## 📱 All Commands in One Place

### Start Services
```bash
# Terminal 1
cd contracts && npx hardhat node

# Terminal 2
cd frontend && npm run dev
```

### Access Points
```
Frontend:       http://localhost:5173
Hardhat Node:   http://127.0.0.1:8545
Wallet Page:    http://localhost:5173/wallet-status
```

### Compile Contracts (optional)
```bash
cd contracts
npx hardhat compile
```

### Run Tests (optional)
```bash
cd contracts
npx hardhat test
```

---

## 🔍 Troubleshooting (2 Minutes)

### "Cannot GET /wallet-status"
- Click "Home" first
- Then click "Wallet" in navbar
- Or go to http://localhost:5173

### "MetaMask is not installed"
- Install MetaMask: https://metamask.io/download/
- Refresh the page
- Try again

### "Can't connect to wallet"
- Make sure Hardhat node is running in Terminal 1
- Check you see the "HTTP and WebSocket JSON-RPC server" message
- Refresh the page
- Unlock MetaMask if locked

### "Wrong network error"
- Click the orange "Switch to Hardhat Local" button
- MetaMask will add and switch automatically

### Port Already in Use
```bash
# Kill the process using port 8545
npx kill-port 8545

# Then restart Hardhat
npx hardhat node
```

---

## ✅ Verification Checklist

- [ ] Terminal 1: Hardhat node running (shows "HTTP and WebSocket JSON-RPC")
- [ ] Terminal 2: Frontend running (shows "Local: http://localhost:5173")
- [ ] Browser: App loads without errors
- [ ] MetaMask: Installed and accessible
- [ ] Connected: "Wallet Connected" shows in green
- [ ] Network: Shows "Hardhat Local (Chain 31337)"
- [ ] Balance: Shows 9,999+ ETH

**All checked? You're ready to go! 🎉**

---

## 📚 Need More Help?

- **Complete guide:** See `README_NEW.md`
- **All docs:** See `DOCS_INDEX.md`
- **Troubleshooting:** See `VERIFICATION_CHECKLIST.md`
- **Features:** See `METAMASK_FEATURES.md`

---

## 🎉 Next: Send Your First Transaction!

1. On Wallet Status page, scroll to "Send Test Transaction"
2. Recipient: Copy one of these addresses:
   - `0x70997970C51812e339D9B73b0245ad59e7df11A7`
   - `0x3C44CdDdB6a900c6671B362d8F45f8Aa9512AB5F`
3. Amount: `0.01`
4. Click "Send Transaction"
5. Approve in MetaMask
6. Copy transaction hash
7. Done! ✅

---

**You're all set! Enjoy building! 🚀**

*For detailed setup, see README_NEW.md*
