import React from 'react';

export default function Beneficiary({ account, contract, onConnect }) {
  if (!account) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        <h2>Connect your wallet to receive aid</h2>
        <button
          onClick={onConnect}
          style={{
            padding: '12px 32px',
            background: '#667eea',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
          }}
        >
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Receive Aid</h1>
      
      <div style={{
        background: 'white',
        padding: '30px',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        maxWidth: '500px',
      }}>
        <h2>Your Account</h2>
        <p style={{ marginBottom: '20px' }}>
          <strong>Address:</strong> {account}
        </p>

        <div style={{
          background: '#f0f9ff',
          border: '1px solid #0ea5e9',
          padding: '15px',
          borderRadius: '4px',
          marginTop: '20px',
        }}>
          <p style={{ margin: 0 }}>
            ✅ To receive aid, you must be registered by an admin and allocated funds from an active campaign.
          </p>
        </div>
      </div>

      <div style={{ marginTop: '60px' }}>
        <h2>Available Aid</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <h3>Flood Relief - Bangladesh</h3>
            <p>Status: <span style={{ color: 'green', fontWeight: 'bold' }}>✓ Verified</span></p>
            <p>Allocated: 500 ReliefCoins</p>
            <button style={{
              marginTop: '15px',
              padding: '10px 20px',
              background: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}>
              Claim Aid
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
