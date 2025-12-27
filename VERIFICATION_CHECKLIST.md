# ✅ Verification Checklist - Emergency Disaster Relief Stablecoin

Use this checklist to verify that everything is installed and working correctly.

## 🔧 Prerequisites Check

### System Requirements
- [ ] Node.js v22+ installed
  - Verify: `node -v` (should show v22.x.x or higher)
- [ ] npm installed
  - Verify: `npm -v` (should show 10.x.x or higher)
- [ ] MetaMask browser extension installed
  - Verify: MetaMask icon visible in browser toolbar
- [ ] Git installed (optional but recommended)
  - Verify: `git -v` (optional)

### Browser Compatibility
- [ ] Using Chrome, Edge, Firefox, or Brave
- [ ] MetaMask extension enabled
- [ ] Cookies enabled in browser

---

## 📦 Installation Check

### Clone/Download Project
- [ ] Project folder exists: `emergency-disaster-relief-stablecoin`
- [ ] Folder structure matches documentation
- [ ] Can navigate to project folder in terminal

### Contract Dependencies
```bash
cd contracts
npm list
```
- [ ] Hardhat installed: `npm list hardhat`
- [ ] ethers.js installed: `npm list ethers`
- [ ] No missing dependencies (red text in npm list)

### Frontend Dependencies
```bash
cd frontend
npm list
```
- [ ] React installed: `npm list react`
- [ ] Vite installed: `npm list vite`
- [ ] Tailwind CSS installed: `npm list tailwindcss`
- [ ] ethers.js installed: `npm list ethers`
- [ ] No missing dependencies (red text in npm list)

---

## 🚀 Service Startup Check

### Start Hardhat Node
```bash
cd contracts
npx hardhat node
```
- [ ] No errors in output
- [ ] Server running message: "Started HTTP and WebSocket JSON-RPC server"
- [ ] Accounts listed (20 test accounts)
- [ ] Sample output:
  ```
  Started HTTP and WebSocket JSON-RPC server at http://127.0.0.1:8545/
  ```

### Check Hardhat Connectivity
In another terminal:
```bash
curl http://127.0.0.1:8545 -X POST \
  -H "Content-Type: application/json" \
  -d '{"jsonrpc":"2.0","method":"eth_chainId","params":[],"id":1}'
```
- [ ] Returns response with chainId "0x7a69" (31337 in decimal)
- [ ] No connection refused error

### Start Frontend
```bash
cd frontend
npm run dev
```
- [ ] No errors in output
- [ ] Says "Local: http://localhost:5173"
- [ ] Page loads without errors
- [ ] React logo visible (or custom branding)

### Check Frontend Accessibility
- [ ] Can open http://localhost:5173 in browser
- [ ] Page loads completely (no blank screen)
- [ ] Navigation bar visible
- [ ] "Wallet" button visible in navbar

---

## 🔐 MetaMask Setup Check

### MetaMask Installation
- [ ] MetaMask extension installed in browser
- [ ] Extension icon visible in toolbar
- [ ] Can click extension to open MetaMask

### MetaMask Configuration
- [ ] MetaMask is unlocked (password entered if needed)
- [ ] At least one account available
- [ ] Account shows some ETH balance (or can import test account)

### Test Account Setup
- [ ] Can see test accounts in Hardhat node console
- [ ] Can copy a private key from Hardhat output
- [ ] Can import private key into MetaMask:
  1. MetaMask → Account icon → Import Account
  2. Paste private key
  3. Click "Import"
  4. New account appears in MetaMask

---

## 🌐 Network Configuration Check

### Hardhat Network Setup
- [ ] MetaMask shows "Hardhat Local" in network dropdown
  - If not: Need to add manually (see below)
  - Network Name: `Hardhat Local`
  - Chain ID: `31337`
  - RPC URL: `http://127.0.0.1:8545`

### Manual Network Addition (if needed)
1. [ ] MetaMask → Settings → Networks
2. [ ] Click "Add a network"
3. [ ] Enter:
   - Network Name: `Hardhat Local`
   - RPC URL: `http://127.0.0.1:8545`
   - Chain ID: `31337`
   - Currency Symbol: `ETH`
4. [ ] Click "Save"
5. [ ] Hardhat Local now appears in network list

---

## 💳 Wallet Connection Check

### Connect Wallet in dApp
1. [ ] Open http://localhost:5173/wallet-status
2. [ ] Click "Connect Wallet" button
3. [ ] MetaMask popup appears
4. [ ] Can select account to connect
5. [ ] Click "Next" and "Connect"

### Verify Connection Success
After connecting:
- [ ] Page shows "Wallet Connected" (green box)
- [ ] Your address displayed (starting with 0x)
- [ ] ETH balance shown (should be > 0)
- [ ] Network shows "Hardhat Local"
- [ ] Chain ID shows "31337"

### Verify Network is Correct
- [ ] Green checkmark next to "Correct" for network
- [ ] No orange "Switch to Hardhat Local" button
  - If button visible: Click it to auto-switch networks

---

## 💸 Transaction Test Check

### Send Test Transaction
1. [ ] Connected wallet on Hardhat Local network
2. [ ] On `/wallet-status` page with transaction form
3. [ ] Fill "Recipient Address": Use another test account
4. [ ] Fill "Amount": 0.01 ETH
5. [ ] Click "Send Transaction"
6. [ ] MetaMask popup appears
7. [ ] Click "Confirm" in MetaMask

### Verify Transaction Success
After sending:
- [ ] No error message displayed
- [ ] Transaction hash shown (0x...)
- [ ] Green "Transaction Sent!" message
- [ ] Recipient's balance increased (in Hardhat node logs)

---

## 🧪 Contract Interaction Check

### Contract Compilation
```bash
cd contracts
npx hardhat compile
```
- [ ] No errors during compilation
- [ ] All 3 contracts compiled:
  - ReliefStablecoin.sol
  - Whitelist.sol
  - SpendingControl.sol
- [ ] Artifacts created in `/artifacts` folder

### Contract Artifacts
- [ ] File exists: `contracts/artifacts/contracts/ReliefStablecoin.sol/ReliefStablecoin.json`
- [ ] File exists: `frontend/src/blockchain/ReliefStablecoinABI.json`
- [ ] File exists: `frontend/src/blockchain/contractAddress.json`

---

## 🎨 Frontend Pages Check

### Navigate to Each Page
- [ ] Home page loads (/)
- [ ] Donor page loads (/donor)
- [ ] Beneficiary page loads (/beneficiary)
- [ ] Admin page loads (/admin)
- [ ] Transparency page loads (/transparency)
- [ ] Profile page loads (/profile)
- [ ] Wallet Status page loads (/wallet-status)

### Each Page Should:
- [ ] Display without errors
- [ ] Show navigation bar
- [ ] Responsive to screen size
- [ ] Load in < 3 seconds

---

## 🔗 Integration Check

### Frontend to Backend Connection
- [ ] Frontend can reach Hardhat node
  - Check: No "network error" in browser console
  - Check: No CORS errors in console

### Browser Console Check (F12)
- [ ] Open Developer Tools (F12)
- [ ] Go to Console tab
- [ ] Should see no RED error messages
- [ ] Some yellow warnings are OK

### Network Requests (F12 Network Tab)
- [ ] Can see requests to http://127.0.0.1:8545
- [ ] Requests show status 200 (success)
- [ ] No 404 or 500 errors

---

## 🎯 All Features Check

### Wallet Features
- [ ] Connect wallet button works
- [ ] Shows account address
- [ ] Shows ETH balance
- [ ] Shows correct network
- [ ] Can switch networks
- [ ] Can disconnect wallet

### Transaction Features
- [ ] Can send test transactions
- [ ] Can specify recipient and amount
- [ ] MetaMask confirms transaction
- [ ] Shows transaction hash
- [ ] No error on valid input

### UI/UX Features
- [ ] Responsive design works
- [ ] All buttons clickable
- [ ] Forms accept input
- [ ] Error messages are clear
- [ ] Loading states show spinners

---

## 📊 Optional: Advanced Checks

### Monitor Hardhat Node
- [ ] Can see transaction logs in Hardhat console
- [ ] Each transaction shows in logs
- [ ] Balance updates reflected

### Monitor Browser Network
- [ ] F12 → Network tab
- [ ] Send transaction
- [ ] Can see JSON-RPC calls
- [ ] Each call gets response

### Check Gas Usage
- [ ] MetaMask shows gas estimate
- [ ] Can approve transaction
- [ ] Gas actually deducted from balance

### Test Account Switching
- [ ] Import multiple test accounts
- [ ] Switch between accounts in MetaMask
- [ ] Each account can send transactions
- [ ] Each account has different balance

---

## ✅ Final Verification

### All Basic Checks Complete?
If YES for all above:
- [x] Your system is correctly set up! ✅

### Troubleshooting if Issues Found

**If Hardhat won't start:**
- Check port 8545 is free: `lsof -i :8545`
- Kill process: `npx kill-port 8545`
- Try different port: `npx hardhat node --port 8546`

**If Frontend won't load:**
- Check Node modules: `rm -rf node_modules && npm install`
- Check Vite: `npm install vite --save-dev`
- Try different port: `npm run dev -- --port 5174`

**If MetaMask won't connect:**
- Refresh browser page
- Unlock MetaMask
- Clear browser cache
- Try incognito mode

**If Wallet page shows error:**
- Check Hardhat node is running
- Check Hardhat on port 8545
- Check browser console for errors
- Check frontend can reach backend

---

## 📞 Need Help?

1. **Check logs**: Look at terminal output for Hardhat and frontend
2. **Check console**: Press F12, go to Console tab
3. **Check network**: F12 → Network tab → look for failed requests
4. **Read docs**: Check SETUP_COMPLETE.md or METAMASK_FEATURES.md
5. **Restart services**: Stop and restart Hardhat and frontend

---

## 🎉 You're All Set!

Once ALL checkmarks are complete:
1. ✅ Your system is properly configured
2. ✅ Hardhat node is running
3. ✅ Frontend is running
4. ✅ MetaMask is connected
5. ✅ Transactions are working
6. ✅ Ready to build and deploy!

**Next steps:**
- Modify smart contracts
- Deploy custom contracts
- Test contract interactions
- Build out features for each user role

Good luck! 🚀
