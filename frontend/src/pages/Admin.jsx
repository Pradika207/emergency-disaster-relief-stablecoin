import React, { useState } from 'react';

export default function Admin({ account, contract, onConnect }) {
  const [campaigns] = useState([
    { id: 1, name: 'Flood Relief - Bangladesh', status: 'active', goal: '50000', raised: '32450', beneficiaries: 1200 },
    { id: 2, name: 'Earthquake Relief - Turkey', status: 'active', goal: '100000', raised: '87650', beneficiaries: 2500 },
  ]);

  if (!account) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        <h2>Admin access requires wallet connection</h2>
        <button onClick={onConnect} style={{ padding: '12px 32px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Connect Wallet
        </button>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Admin Dashboard</h1>

      <div style={{ marginBottom: '60px' }}>
        <h2>Quick Stats</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <p style={{ color: '#666', marginBottom: '10px' }}>Total Raised</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>$120,100</h3>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <p style={{ color: '#666', marginBottom: '10px' }}>Active Campaigns</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>2</h3>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <p style={{ color: '#666', marginBottom: '10px' }}>Total Beneficiaries</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>3,700</h3>
          </div>
        </div>
      </div>

      <div>
        <h2>Campaign Management</h2>
        <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Goal</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Raised</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Beneficiaries</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(campaign => (
                <tr key={campaign.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px' }}>{campaign.name}</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ background: campaign.status === 'active' ? '#10b981' : '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                      {campaign.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>${campaign.goal}</td>
                  <td style={{ padding: '15px' }}>${campaign.raised}</td>
                  <td style={{ padding: '15px' }}>{campaign.beneficiaries}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
