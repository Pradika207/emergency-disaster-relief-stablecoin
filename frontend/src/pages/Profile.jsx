import React from 'react';

export default function Profile({ account, balance }) {
  if (!account) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        <h2>Connect your wallet to view profile</h2>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Profile</h1>
      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <h2>Account Information</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginTop: '20px' }}>
          <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <p style={{ color: '#666', marginBottom: '5px', fontSize: '12px' }}>Wallet Address</p>
            <p style={{ fontWeight: 'bold', wordBreak: 'break-all' }}>{account}</p>
          </div>
          <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '4px', border: '1px solid #e5e7eb' }}>
            <p style={{ color: '#666', marginBottom: '5px', fontSize: '12px' }}>Balance</p>
            <p style={{ fontWeight: 'bold', fontSize: '18px', color: '#667eea' }}>{parseFloat(balance || 0).toFixed(2)} ReliefCoins</p>
          </div>
        </div>
      </div>
    </div>
  );
}
