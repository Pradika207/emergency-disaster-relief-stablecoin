import React from 'react';

export default function Home({ account, onConnect }) {
  return (
    <div style={{ minHeight: '100vh', background: '#f9fafb' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          padding: '80px 30px',
          borderRadius: '14px',
          textAlign: 'center',
          color: 'white',
          marginBottom: '60px',
        }}>
          <h1 style={{ fontSize: '44px', marginBottom: '16px' }}>Emergency Disaster Relief Stablecoin</h1>
          <p style={{ fontSize: '18px', marginBottom: '30px' }}>Transparent, fast, and secure aid delivery to disaster-affected communities</p>
          <button
            onClick={onConnect}
            style={{
              padding: '12px 32px',
              background: 'white',
              color: '#667eea',
              border: 'none',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
            }}
          >
            {account ? `Connected: ${account.slice(0, 6)}...` : 'Connect Wallet'}
          </button>
        </div>

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '2rem', fontWeight: '600', marginBottom: '40px' }}>How It Works</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '20px',
          }}>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>💰 Donate</h3>
              <p>Send ReliefCoin stablecoins to active disaster relief campaigns</p>
            </div>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>🤝 Receive Aid</h3>
              <p>Verify identity and receive direct aid allocation from approved campaigns</p>
            </div>
            <div style={{
              background: 'white',
              padding: '30px',
              borderRadius: '8px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            }}>
              <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>📊 Transparency</h3>
              <p>Track every transaction and campaign progress in real-time on the blockchain</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
