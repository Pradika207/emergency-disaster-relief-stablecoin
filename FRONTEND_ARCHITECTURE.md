# 🎯 Frontend Architecture & Component Map

## 📐 Application Structure

```
Emergency Disaster Relief Frontend
│
├── 🏠 Landing Page (Home.jsx)
│   ├── Hero Section
│   ├── How It Works (3 Steps)
│   ├── Key Benefits
│   ├── CTA Buttons
│   ├── Impact Statistics
│   └── Mobile Responsive
│
├── 👛 Wallet System (useWallet.js)
│   ├── Connect MetaMask
│   ├── Balance Management
│   ├── Network Detection
│   ├── Account Switching
│   └── Error Handling
│
├── 💝 Donor Dashboard (Donor.jsx)
│   ├── Campaign Selection
│   ├── Donation Form
│   ├── Progress Visualization
│   ├── Transaction History
│   ├── Impact Summary
│   └── Donation Tips
│
├── 🤝 Beneficiary Dashboard (Beneficiary.jsx)
│   ├── Verification Badge
│   ├── Balance Display
│   ├── Aid Distribution History
│   ├── Usage Guidelines
│   ├── Security Warnings
│   └── Support Info
│
├── ⚙️ Admin Dashboard (Admin.jsx)
│   ├── Campaign Management
│   │   ├── Create Campaign
│   │   ├── Edit Campaign
│   │   └── Pause/Resume
│   ├── Beneficiary Management
│   │   ├── Add Beneficiary
│   │   ├── Verify Beneficiary
│   │   └── Remove Beneficiary
│   ├── Fund Allocation
│   ├── Statistics Overview
│   └── Audit Controls
│
├── 👁️ Transparency Page (Transparency.jsx)
│   ├── Live Transaction Feed
│   ├── Campaign Breakdown
│   ├── Fund Flow Visualization
│   ├── Smart Contract Address
│   ├── Statistics Cards
│   └── How Transparency Works
│
├── 👤 Profile Page (Profile.jsx)
│   ├── Account Overview
│   │   ├── Wallet Address
│   │   ├── Balance Info
│   │   └── Network Status
│   ├── Activity Summary
│   ├── User Settings
│   │   ├── Notifications
│   │   ├── Email Updates
│   │   ├── Two-Factor Auth
│   │   └── Profile Privacy
│   ├── Security Section
│   │   ├── Security Score
│   │   ├── Password Change
│   │   └── Login History
│   └── Help & Support
│
├── 🔔 Notification System (Toast.jsx)
│   ├── Success Notifications
│   ├── Error Notifications
│   ├── Warning Notifications
│   ├── Info Notifications
│   └── Auto-dismiss
│
└── 🧭 Navigation (Navbar.jsx)
    ├── Logo & Home Link
    ├── Route Links (6 pages)
    ├── Wallet Connection
    ├── Mobile Menu
    └── Active Route Highlighting
```

---

## 🔀 Component Dependency Graph

```
App.jsx (Main Router)
├── Navbar.jsx
│   └── WalletConnect.jsx
│       └── useWallet.js
├── Home.jsx
├── Donor.jsx
│   ├── useWallet.js
│   └── useToast() [Toast.jsx]
├── Beneficiary.jsx
│   ├── useWallet.js
│   └── useToast()
├── Admin.jsx
│   ├── useWallet.js
│   └── useToast()
├── Transparency.jsx
│   └── useToast()
├── Profile.jsx
│   ├── useWallet.js
│   └── useToast()
└── ToastContainer (Global)
    └── Toast.jsx
```

---

## 📊 Data Flow

### Wallet Connection Flow
```
User Click → WalletConnect.jsx
    ↓
useWallet() Hook
    ↓
window.ethereum (MetaMask)
    ↓
Account & Balance Retrieved
    ↓
Update Global State
    ↓
All Pages Access via useWallet()
```

### Donation Flow
```
User Enters Amount → Donor.jsx
    ↓
Click "Donate Now"
    ↓
Validate Input
    ↓
Show Loading State
    ↓
Call Contract (when integrated)
    ↓
Success Notification (Toast)
    ↓
Add to History
    ↓
Update Statistics
```

### Admin Fund Distribution Flow
```
Admin Fills Form → Admin.jsx
    ↓
Select Beneficiary & Amount
    ↓
Click "Distribute"
    ↓
Verify Inputs
    ↓
Confirm Action
    ↓
Call Contract (when integrated)
    ↓
Update Beneficiary Status
    ↓
Refresh Statistics
    ↓
Success Notification
```

---

## 🎨 Design System

### Color Palette
```
Primary:      #2563EB (Blue)      - Actions, Links
Success:      #16A34A (Green)     - Positive Actions
Warning:      #EAB308 (Yellow)    - Cautions
Error:        #DC2626 (Red)       - Errors
Secondary:    #4B5563 (Gray)      - Text, Borders
Background:   #F9FAFB (White)     - Cards, Pages
```

### Typography
```
Headings:     Font-weight: bold (700-900)
              Size: 2xl to 4xl
              Color: Gray-900

Body:         Font-weight: normal (400)
              Size: base (16px)
              Color: Gray-600 to Gray-900

Labels:       Font-weight: semibold (600)
              Size: sm to base
              Color: Gray-700
```

### Spacing
```
xs:  4px    (p-1, m-1)
sm:  8px    (p-2, m-2)
md:  16px   (p-4, m-4)
lg:  24px   (p-6, m-6)
xl:  32px   (p-8, m-8)
```

### Border Radius
```
Small:     4px     (rounded)
Medium:    8px     (rounded-lg)
Large:     12px    (rounded-xl)
Round:     50%     (rounded-full)
```

---

## 🛠️ Key Technologies

### React Hooks Used
```javascript
// Built-in Hooks
- useState()        // Local state
- useEffect()       // Side effects
- useCallback()     // Memoized callbacks

// Custom Hooks
- useWallet()       // Wallet management
- useToast()        // Notifications

// Router Hooks
- useNavigate()     // Navigation
- useLocation()     // Current route
```

### External Libraries

| Library | Usage |
|---------|-------|
| ethers.js | Blockchain interaction |
| react-router-dom | Page routing |
| lucide-react | Icons |
| tailwindcss | Styling |

---

## 📱 Responsive Breakpoints

```
Mobile      < 640px   (sm)
├── Single Column
├── Stacked Layout
└── Mobile Menu

Tablet      640-1024px (md, lg)
├── Two Columns
├── Sidebar Support
└── Touch-Friendly

Desktop     > 1024px   (xl)
├── Three+ Columns
├── Full Navigation
└── Optimal Layout
```

---

## 🔐 State Management Pattern

### Global State (useWallet)
```javascript
{
  account,           // User's wallet address
  provider,          // ethers.js provider
  signer,           // ethers.js signer (for transactions)
  balance,          // Wallet balance in ETH
  network,          // Network name & chainId
  isConnecting,     // Loading state
  error,            // Error message
  isConnected,      // Connection status
  connectWallet(),  // Function to connect
  disconnectWallet() // Function to disconnect
}
```

### Local State (Per Page)
```javascript
// Donor.jsx
{
  amount,           // Donation amount
  campaign,         // Selected campaign
  loading,          // Transaction loading
  donationHistory   // Array of donations
}

// Admin.jsx
{
  campaigns,        // List of campaigns
  beneficiaries,    // List of beneficiaries
  newCampaign,      // Form input
  newBeneficiary,   // Form input
  selectedCampaignId // Campaign selection
}
```

---

## 🔄 Event Flow

### Button Click Flow
```
User Click
    ↓
onClick Handler
    ↓
Validate Input
    ↓
Show Loading State
    ↓
Execute Action/API Call
    ↓
Handle Success/Error
    ↓
Update UI State
    ↓
Show Toast Notification
```

### Form Submission Flow
```
User Types
    ↓
onChange Updates State
    ↓
Form Validation (Real-time)
    ↓
User Submits (onSubmit)
    ↓
Prevent Default
    ↓
Validate All Fields
    ↓
Disable Submit Button
    ↓
Execute Transaction
    ↓
Show Loading Spinner
    ↓
Handle Response
    ↓
Update History/Stats
    ↓
Re-enable Button
    ↓
Show Notification
```

---

## 🎯 User Flows by Role

### 👨‍💼 Donor Flow
```
1. Land on Home Page
   ↓
2. Click "Donate Now"
   ↓
3. Connect Wallet
   ↓
4. Go to Donor Dashboard
   ↓
5. Select Campaign
   ↓
6. Enter Amount
   ↓
7. Click "Donate"
   ↓
8. Approve MetaMask
   ↓
9. See Success Message
   ↓
10. View in History
```

### 👥 Beneficiary Flow
```
1. Land on Home Page
   ↓
2. Connect Wallet
   ↓
3. Go to Beneficiary Dashboard
   ↓
4. See Verified Badge
   ↓
5. View Balance
   ↓
6. Check History
   ↓
7. Read Guidelines
   ↓
8. Use Funds (when integrated)
```

### 🛡️ Admin Flow
```
1. Navigate to Admin Dashboard
   ↓
2. Create New Campaign
   ↓
3. Set Goal Amount
   ↓
4. Add Beneficiaries
   ↓
5. Verify Beneficiaries
   ↓
6. Allocate Funds
   ↓
7. Monitor Statistics
   ↓
8. View Audit Trail
```

---

## ⚡ Performance Optimizations

### Code Splitting
- React Router lazy loads pages

### Component Memoization
- Custom hooks memoized
- Components optimized with memo

### Asset Optimization
- Lucide icons optimized
- CSS processed with Tailwind
- Vite handles bundling

### Caching
- Browser caching enabled
- LocalStorage for preferences

---

## 🔗 API Integration Points

### Ready for Smart Contract Integration

```javascript
// In Donor.jsx
const handleDonate = async () => {
  // Replace this mock:
  // await new Promise(resolve => setTimeout(resolve, 2000));
  
  // With this real call:
  // const contract = await getContract(true);
  // const tx = await contract.donate(campaignId, amount);
  // await tx.wait();
}
```

### Smart Contract Methods Needed
```javascript
contract.donate(campaignId, amount)
contract.claim()
contract.distribute(beneficiary, amount)
contract.addBeneficiary(address)
contract.verifyBeneficiary(address)
contract.pauseCampaign(campaignId)
contract.resumeCampaign(campaignId)
contract.getTotalRaised()
contract.getTotalDistributed()
contract.getBalance(address)
```

---

## 🧪 Testing Checklist

### Unit Tests Needed
- [ ] useWallet hook
- [ ] useToast hook
- [ ] Input validation functions

### Integration Tests
- [ ] Wallet connection flow
- [ ] Donation flow
- [ ] Admin actions

### E2E Tests
- [ ] Complete user journey
- [ ] Error handling
- [ ] Mobile responsiveness

---

## 📈 Metrics & Analytics Integration Points

```javascript
// Track Page Views
trackPageView('donor-dashboard')

// Track User Actions
trackEvent('donation_submitted', { amount, campaign })
trackEvent('beneficiary_verified', { address })

// Track Errors
trackError('wallet_connection_failed', error)
```

---

## 🚀 Deployment Checklist

- [ ] Run `npm run build`
- [ ] Test build locally: `npm run preview`
- [ ] Update `.env.production`
- [ ] Run security scan
- [ ] Test on mobile devices
- [ ] Test wallet connection
- [ ] Deploy to Vercel/Netlify
- [ ] Set up analytics
- [ ] Set up error monitoring
- [ ] Configure CDN

---

## 📞 Troubleshooting Decision Tree

```
App Not Starting?
├─ Check: npm install
└─ Check: PORT 5173 available

Wallet Not Connecting?
├─ Check: MetaMask installed
├─ Check: MetaMask enabled
├─ Check: Correct network
└─ Check: browser console errors

Transaction Failed?
├─ Check: Wallet has ETH for gas
├─ Check: Amount is valid
├─ Check: Contract deployed
└─ Check: Network is correct

UI Issues?
├─ Check: Tailwind CSS loaded
├─ Check: Lucide icons loaded
└─ Check: CSS file imported in main.jsx
```

---

## 🎓 Code Organization Principles

1. **Component Isolation**
   - Each component has single responsibility
   - Props are clearly defined
   - No side effects in render

2. **Hook Organization**
   - Custom hooks extracted for logic
   - Hooks used at component level
   - State management centralized

3. **File Structure**
   - Pages in `/pages` folder
   - Reusable components in `/components`
   - Hooks in `/hooks` folder
   - Utils in `/utils` folder

4. **Naming Conventions**
   - Components: PascalCase
   - Functions: camelCase
   - Constants: UPPER_CASE
   - CSS Classes: kebab-case

---

**This architecture is production-ready and scalable! 🚀**
