import React from 'react';

export default function WalletStatus({ account, balance, provider }) {
  if (!account) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        <h2>Connect your wallet to view status</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Wallet Status</h1>
      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2>Connection Status</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '15px', borderRadius: '4px' }}>
            <p style={{ color: '#166534', marginBottom: '5px' }}>✓ Connected</p>
            <p style={{ fontWeight: 'bold' }}>{account.slice(0, 6)}...{account.slice(-4)}</p>
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '15px', borderRadius: '4px' }}>
            <p style={{ color: '#166534', marginBottom: '5px' }}>✓ Balance</p>
            <p style={{ fontWeight: 'bold', fontSize: '18px' }}>{balance ? parseFloat(balance).toFixed(2) : '0'} ReliefCoins</p>
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #86efac', padding: '15px', borderRadius: '4px' }}>
            <p style={{ color: '#166534', marginBottom: '5px' }}>✓ Network</p>
            <p style={{ fontWeight: 'bold' }}>Hardhat Local</p>
          </div>
        </div>
      </div>
    </div>
  );
}
