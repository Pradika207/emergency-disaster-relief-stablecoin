import React, { useState } from 'react';

export default function Donor({ account, contract, onConnect }) {
  const [amount, setAmount] = useState('');
  const [campaign, setCampaign] = useState('flood');

  if (!account) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        <h2>Connect your wallet to donate</h2>
        <button onClick={onConnect} style={{ padding: '12px 32px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Donate to Relief Campaigns</h1>
      
      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', maxWidth: '500px', marginBottom: '60px' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>Campaign</label>
          <select value={campaign} onChange={(e) => setCampaign(e.target.value)} style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}>
            <option value="flood">Flood Relief - Bangladesh</option>
            <option value="earthquake">Earthquake Relief - Turkey</option>
            <option value="wildfire">Wildfire Relief - California</option>
          </select>
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>Amount (ReliefCoins)</label>
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} />
        </div>
        <button style={{ width: '100%', padding: '12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: '600' }}>
          Donate Now
        </button>
      </div>

      <div>
        <h2>Active Campaigns</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3>Flood Relief - Bangladesh</h3>
            <p>Goal: 50,000 ReliefCoins</p>
            <p>Raised: 32,450 ReliefCoins</p>
            <div style={{ background: '#eee', borderRadius: '4px', height: '10px', marginTop: '10px' }}>
              <div style={{ background: '#667eea', height: '100%', width: '65%', borderRadius: '4px' }}></div>
            </div>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <h3>Earthquake Relief - Turkey</h3>
            <p>Goal: 100,000 ReliefCoins</p>
            <p>Raised: 87,650 ReliefCoins</p>
            <div style={{ background: '#eee', borderRadius: '4px', height: '10px', marginTop: '10px' }}>
              <div style={{ background: '#667eea', height: '100%', width: '87.65%', borderRadius: '4px' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
