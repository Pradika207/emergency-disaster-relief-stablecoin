import { useState, useEffect } from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import { ethers } from "ethers";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Donor from "./pages/Donor";
import Beneficiary from "./pages/Beneficiary";
import Admin from "./pages/Admin";
import Transparency from "./pages/Transparency";
import Profile from "./pages/Profile";
import WalletStatus from "./pages/WalletStatus";

// Contract
import contractAddress from "./blockchain/contractAddress.json";
import abi from "./abi/ReliefStablecoin.json";

export default function App() {
  const [account, setAccount] = useState("");
  const [contract, setContract] = useState(null);
  const [balance, setBalance] = useState("0");
  const [isConnecting, setIsConnecting] = useState(false);
  const location = useLocation();

  // Initialize wallet on mount
  useEffect(() => {
    initWallet();
  }, []);

  const initWallet = async () => {
    if (!window.ethereum) return;
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.listAccounts();
      if (accounts.length > 0) {
        setAccount(accounts[0].address);
        initContract(provider, accounts[0]);
      }
    } catch (err) {
      console.log("Init error:", err);
    }
  };

  const initContract = async (provider, account) => {
    try {
      const signer = await provider.getSigner();
      const reliefContract = new ethers.Contract(
        contractAddress.address,
        abi,
        signer
      );
      setContract(reliefContract);
      
      // Fetch balance
      const bal = await reliefContract.balanceOf(account.address || account);
      setBalance(ethers.formatUnits(bal, 18));
    } catch (err) {
      console.log("Contract init error:", err);
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("MetaMask not installed");
      return;
    }
    try {
      setIsConnecting(true);
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const reliefContract = new ethers.Contract(
          contractAddress.address,
          abi,
          signer
        );
        setContract(reliefContract);
        const bal = await reliefContract.balanceOf(accounts[0]);
        setBalance(ethers.formatUnits(bal, 18));
      }
    } catch (err) {
      console.error("Connect error:", err);
      alert(err.message);
    } finally {
      setIsConnecting(false);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar" style={{ 
        display: "flex", 
        justifyContent: "space-between", 
        alignItems: "center",
        padding: "15px 30px",
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white"
      }}>
        <Link to="/" style={{ fontSize: "24px", fontWeight: "bold", color: "white", textDecoration: "none" }}>
          💰 ReliefCoin
        </Link>

        <div style={{ display: "flex", gap: "30px", alignItems: "center" }}>
          {/* Nav Links */}
          <Link to="/" style={{ color: isActive("/") ? "#fff" : "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: "600" }}>Home</Link>
          <Link to="/donor" style={{ color: isActive("/donor") ? "#fff" : "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: "600" }}>Donor</Link>
          <Link to="/beneficiary" style={{ color: isActive("/beneficiary") ? "#fff" : "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: "600" }}>Beneficiary</Link>
          <Link to="/transparency" style={{ color: isActive("/transparency") ? "#fff" : "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: "600" }}>Transparency</Link>
          <Link to="/admin" style={{ color: isActive("/admin") ? "#fff" : "rgba(255,255,255,0.8)", textDecoration: "none", fontWeight: "600" }}>Admin</Link>

          {/* Connect Button */}
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            style={{
              padding: "10px 20px",
              background: "white",
              color: "#667eea",
              border: "none",
              borderRadius: "6px",
              fontWeight: "bold",
              cursor: isConnecting ? "not-allowed" : "pointer",
              opacity: isConnecting ? 0.6 : 1,
            }}
          >
            {isConnecting ? "Connecting..." : account ? `${account.slice(0, 6)}...` : "Connect"}
          </button>
        </div>
      </nav>

      {/* Routes */}
      <main style={{ minHeight: "calc(100vh - 80px)" }}>
        <Routes>
          <Route path="/" element={<Home account={account} onConnect={connectWallet} />} />
          <Route path="/donor" element={<Donor account={account} contract={contract} onConnect={connectWallet} />} />
          <Route path="/beneficiary" element={<Beneficiary account={account} contract={contract} onConnect={connectWallet} />} />
          <Route path="/admin" element={<Admin account={account} contract={contract} onConnect={connectWallet} />} />
          <Route path="/transparency" element={<Transparency account={account} contract={contract} />} />
          <Route path="/profile" element={<Profile account={account} balance={balance} />} />
          <Route path="/wallet-status" element={<WalletStatus account={account} balance={balance} />} />
        </Routes>
      </main>
    </div>
  );
}

