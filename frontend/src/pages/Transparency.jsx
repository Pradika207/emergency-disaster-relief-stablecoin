import React from 'react';

export default function Transparency({ account, contract }) {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Transparency & Analytics</h1>

      <div style={{ marginBottom: '60px' }}>
        <h2>Campaign Statistics</h2>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
        }}>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <p style={{ color: '#666', marginBottom: '10px' }}>Total Donations</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>$120,100</h3>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <p style={{ color: '#666', marginBottom: '10px' }}>Active Campaigns</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>2</h3>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <p style={{ color: '#666', marginBottom: '10px' }}>Transactions</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>1,247</h3>
          </div>
          <div style={{
            background: 'white',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          }}>
            <p style={{ color: '#666', marginBottom: '10px' }}>Beneficiaries</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold' }}>3,700</h3>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '60px' }}>
        <h2>Campaign Progress</h2>
        <div style={{
          background: 'white',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}>
          <div style={{ marginBottom: '20px' }}>
            <h3>Flood Relief - Bangladesh</h3>
            <p>Goal: $50,000 | Raised: $32,450</p>
            <div style={{
              background: '#eee',
              borderRadius: '4px',
              height: '15px',
              marginTop: '10px',
            }}>
              <div style={{
                background: '#667eea',
                height: '100%',
                width: '65%',
                borderRadius: '4px',
              }}></div>
            </div>
          </div>

          <div>
            <h3>Earthquake Relief - Turkey</h3>
            <p>Goal: $100,000 | Raised: $87,650</p>
            <div style={{
              background: '#eee',
              borderRadius: '4px',
              height: '15px',
              marginTop: '10px',
            }}>
              <div style={{
                background: '#667eea',
                height: '100%',
                width: '87.65%',
                borderRadius: '4px',
              }}></div>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h2>Recent Transactions</h2>
        <div style={{
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
          overflowX: 'auto',
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>From</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Amount</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Campaign</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px' }}>0x1234...5678</td>
                <td style={{ padding: '15px' }}>1000</td>
                <td style={{ padding: '15px' }}>Flood Relief</td>
                <td style={{ padding: '15px' }}>2024-12-20</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #eee' }}>
                <td style={{ padding: '15px' }}>0x9abc...def0</td>
                <td style={{ padding: '15px' }}>500</td>
                <td style={{ padding: '15px' }}>Earthquake Relief</td>
                <td style={{ padding: '15px' }}>2024-12-19</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
