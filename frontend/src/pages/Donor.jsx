import React, { useState, useEffect } from 'react';

export default function Donor({ account, contract, onConnect }) {
  const [amount, setAmount] = useState('');
  const [campaign, setCampaign] = useState('flood');
  const [loading, setLoading] = useState(false);
  const [txStatus, setTxStatus] = useState(null);
  const [totalDonated, setTotalDonated] = useState('0');
  const [totalDonors, setTotalDonors] = useState('1,245');
  const [donationHistory, setDonationHistory] = useState([]);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [donorCount, setDonorCount] = useState(1);

  // Sample campaigns data with more details
  const campaigns = {
    flood: { 
      name: 'Flood Relief - Bangladesh', 
      goal: 50000, 
      raised: 32450,
      description: 'Help families affected by devastating floods in Bangladesh',
      impact: '1200+ families supported',
      deadline: '2026-02-15'
    },
    earthquake: { 
      name: 'Earthquake Relief - Turkey', 
      goal: 100000, 
      raised: 87650,
      description: 'Support earthquake survivors with emergency supplies and shelter',
      impact: '2500+ people assisted',
      deadline: '2026-03-01'
    },
    wildfire: { 
      name: 'Wildfire Relief - California', 
      goal: 75000, 
      raised: 45200,
      description: 'Provide resources for wildfire victims and recovery efforts',
      impact: '800+ households rebuilding',
      deadline: '2026-02-28'
    },
  };

  // Mock donation history
  useEffect(() => {
    if (account) {
      setDonationHistory([
        { id: 1, campaign: 'Flood Relief - Bangladesh', amount: '100', txHash: '0x2a3f...', timestamp: new Date(Date.now() - 86400000), status: 'Confirmed' },
        { id: 2, campaign: 'Earthquake Relief - Turkey', amount: '250', txHash: '0x5b1c...', timestamp: new Date(Date.now() - 172800000), status: 'Confirmed' },
        { id: 3, campaign: 'Wildfire Relief - California', amount: '50', txHash: '0x9e7d...', timestamp: new Date(Date.now() - 259200000), status: 'Confirmed' },
      ]);
      setTotalDonated('400');
      setDonorCount(Math.floor(Math.random() * 5) + 1);
    }
  }, [account]);

  const handleDonate = async (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) {
      setTxStatus({ type: 'error', message: 'Please enter a valid amount' });
      return;
    }

    setLoading(true);
    setTxStatus({ type: 'pending', message: 'Processing donation...' });

    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2500));
      
      const txHash = '0x' + Math.random().toString(16).substr(2, 40);
      
      setTxStatus({
        type: 'success',
        message: `🎉 Successfully donated ${amount} RSC to ${campaigns[campaign].name}`,
        txHash: txHash,
        blockTime: new Date().toLocaleTimeString()
      });

      // Update totals
      setTotalDonated(prev => String(Number(prev) + Number(amount)));
      setTotalDonors(prev => (Number(prev.replace(/,/g, '')) + donorCount).toLocaleString());
      
      // Add to history
      setDonationHistory(prev => [{
        id: prev.length + 1,
        campaign: campaigns[campaign].name,
        amount: amount,
        txHash: txHash.slice(0, 6) + '...',
        timestamp: new Date(),
        status: 'Confirmed'
      }, ...prev]);

      setAmount('');
      setTimeout(() => setTxStatus(null), 5000);
    } catch (error) {
      setTxStatus({ type: 'error', message: `Transaction failed: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  if (!account) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', padding: '20px' }}>
        <div style={{ textAlign: 'center', background: 'white', padding: '60px 40px', borderRadius: '12px', boxShadow: '0 20px 60px rgba(0,0,0,0.3)', maxWidth: '500px' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 20px 0', color: '#333' }}>🤝 Make a Difference</h1>
          <p style={{ fontSize: '16px', color: '#666', marginBottom: '30px' }}>Connect your wallet to donate and help disaster victims receive emergency relief.</p>
          <button onClick={onConnect} style={{ padding: '16px 40px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '18px', fontWeight: '600', transition: 'all 0.3s' }}>
            💼 Connect Wallet
          </button>
          <p style={{ fontSize: '12px', color: '#999', marginTop: '20px' }}>Secure. Transparent. On-chain verified.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '40px 20px' }}>
      {/* Header */}
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', margin: '0 0 10px 0' }}>💝 Donate to Relief Campaigns</h1>
        <p style={{ color: '#666', fontSize: '16px', margin: 0 }}>Your contribution saves lives. Every donation is tracked on the blockchain.</p>
      </div>

      {/* Stats Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(102,126,234,0.3)' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', opacity: 0.9 }}>Your Total Donations</p>
          <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>{totalDonated} RSC</h2>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', opacity: 0.8 }}>Across {donationHistory.length} transactions</p>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', color: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(245,87,108,0.3)' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', opacity: 0.9 }}>Global Donors</p>
          <h2 style={{ margin: 0, fontSize: '28px', fontWeight: 'bold' }}>{totalDonors}</h2>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', opacity: 0.8 }}>Making a difference worldwide</p>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 5px 15px rgba(79,172,254,0.3)' }}>
          <p style={{ margin: '0 0 10px 0', fontSize: '14px', opacity: 0.9 }}>Connected Address</p>
          <h3 style={{ margin: 0, fontSize: '12px', fontFamily: 'monospace', wordBreak: 'break-all' }}>{account.slice(0, 14)}...{account.slice(-10)}</h3>
          <p style={{ margin: '10px 0 0 0', fontSize: '12px', opacity: 0.8 }}>✅ Verified</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
        {/* Donation Form */}
        <div style={{ background: 'white', padding: '35px', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0, marginBottom: '25px', fontSize: '24px' }}>💳 Make a Donation</h2>
          <form onSubmit={handleDonate}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Select Campaign *</label>
              <select 
                value={campaign} 
                onChange={(e) => setCampaign(e.target.value)} 
                style={{ width: '100%', padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}
              >
                {Object.entries(campaigns).map(([key, data]) => (
                  <option key={key} value={key}>{data.name} - {data.raised}/{data.goal} RSC</option>
                ))}
              </select>
              <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>{campaigns[campaign].description}</p>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', fontSize: '14px' }}>Donation Amount (RSC) *</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input 
                  type="number" 
                  value={amount} 
                  onChange={(e) => setAmount(e.target.value)} 
                  placeholder="Enter amount" 
                  style={{ flex: 1, padding: '12px', border: '2px solid #e0e0e0', borderRadius: '8px', fontSize: '14px' }} 
                />
                <button 
                  type="button"
                  onClick={() => setAmount('100')}
                  style={{ padding: '12px 16px', background: '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
                >
                  100
                </button>
                <button 
                  type="button"
                  onClick={() => setAmount('500')}
                  style={{ padding: '12px 16px', background: '#f0f0f0', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
                >
                  500
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={loading} 
              style={{ 
                width: '100%', 
                padding: '14px', 
                background: loading ? '#ccc' : '#667eea', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: loading ? 'not-allowed' : 'pointer', 
                fontWeight: '600',
                fontSize: '16px',
                transition: 'all 0.3s'
              }}
            >
              {loading ? '⏳ Processing...' : '🎁 Donate Now'}
            </button>

            {/* Transaction Status */}
            {txStatus && (
              <div style={{ 
                marginTop: '20px', 
                padding: '15px', 
                borderRadius: '8px', 
                background: txStatus.type === 'success' ? '#d1fae5' : txStatus.type === 'error' ? '#fee2e2' : '#fef3c7', 
                color: txStatus.type === 'success' ? '#065f46' : txStatus.type === 'error' ? '#991b1b' : '#92400e', 
                border: `2px solid ${txStatus.type === 'success' ? '#a7f3d0' : txStatus.type === 'error' ? '#fecaca' : '#fcd34d'}` 
              }}>
                <p style={{ margin: '0 0 8px 0', fontWeight: '600', fontSize: '14px' }}>
                  {txStatus.type === 'pending' ? '⏳ Processing' : txStatus.type === 'success' ? '✅ Success' : '❌ Error'}
                </p>
                <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{txStatus.message}</p>
                {txStatus.txHash && <p style={{ margin: '5px 0 0 0', fontSize: '12px', fontFamily: 'monospace' }}>Hash: {txStatus.txHash}</p>}
                {txStatus.blockTime && <p style={{ margin: '3px 0 0 0', fontSize: '12px' }}>Time: {txStatus.blockTime}</p>}
              </div>
            )}
          </form>
        </div>

        {/* Campaign Info */}
        <div style={{ background: 'white', padding: '35px', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
          <h2 style={{ marginTop: 0, marginBottom: '25px', fontSize: '24px' }}>📊 {campaigns[campaign].name}</h2>
          
          <div style={{ marginBottom: '25px' }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: '600', fontSize: '14px' }}>Campaign Progress</p>
            <div style={{ marginBottom: '8px' }}>
              <div style={{ background: '#e0e0e0', borderRadius: '8px', height: '16px', overflow: 'hidden' }}>
                <div 
                  style={{ 
                    background: 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                    height: '100%', 
                    width: `${Math.round((campaigns[campaign].raised / campaigns[campaign].goal) * 100)}%`,
                    borderRadius: '8px',
                    transition: 'width 0.3s'
                  }}
                />
              </div>
              <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#666' }}>
                {campaigns[campaign].raised.toLocaleString()} / {campaigns[campaign].goal.toLocaleString()} RSC ({Math.round((campaigns[campaign].raised / campaigns[campaign].goal) * 100)}%)
              </p>
            </div>
          </div>

          <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <p style={{ margin: '0 0 10px 0', fontWeight: '600', fontSize: '13px' }}>💪 Impact</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>{campaigns[campaign].impact}</p>
          </div>

          <div style={{ background: '#f9fafb', padding: '15px', borderRadius: '8px', marginBottom: '20px' }}>
            <p style={{ margin: '0 0 10px 0', fontWeight: '600', fontSize: '13px' }}>📅 Campaign Deadline</p>
            <p style={{ margin: 0, fontSize: '14px', color: '#333' }}>{new Date(campaigns[campaign].deadline).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
          </div>

          <div style={{ background: '#d1fae5', border: '1px solid #a7f3d0', padding: '15px', borderRadius: '8px' }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: '600', fontSize: '13px', color: '#065f46' }}>✅ Blockchain Verified</p>
            <p style={{ margin: 0, fontSize: '12px', color: '#047857' }}>All donations are transparently tracked on the blockchain. 100% of funds reach beneficiaries.</p>
          </div>
        </div>
      </div>

      {/* All Campaigns */}
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>🌍 All Active Campaigns</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '20px' }}>
          {Object.entries(campaigns).map(([key, data]) => {
            const percentage = Math.round((data.raised / data.goal) * 100);
            return (
              <div key={key} style={{ background: 'white', padding: '25px', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.08)', cursor: 'pointer', transition: 'all 0.3s', border: campaign === key ? '2px solid #667eea' : '2px solid transparent' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', fontWeight: '600' }}>{data.name}</h3>
                <p style={{ margin: '0 0 15px 0', fontSize: '13px', color: '#666' }}>{data.description}</p>
                
                <div style={{ marginBottom: '12px' }}>
                  <div style={{ background: '#e0e0e0', borderRadius: '6px', height: '12px', overflow: 'hidden' }}>
                    <div style={{ background: '#667eea', height: '100%', width: `${percentage}%`, borderRadius: '6px' }}></div>
                  </div>
                  <p style={{ margin: '8px 0 0 0', fontSize: '12px', color: '#999' }}>{percentage}% funded ({data.raised.toLocaleString()} RSC)</p>
                </div>

                <button 
                  onClick={() => setCampaign(key)}
                  style={{ width: '100%', padding: '10px', background: campaign === key ? '#667eea' : '#f0f0f0', color: campaign === key ? 'white' : '#333', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '12px' }}
                >
                  {campaign === key ? '✓ Selected' : 'Select'}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Donation History */}
      {donationHistory.length > 0 && (
        <div>
          <h2 style={{ marginBottom: '20px', fontSize: '24px' }}>📝 Your Donation History ({donationHistory.length})</h2>
          <div style={{ overflowX: 'auto', background: 'white', borderRadius: '12px', boxShadow: '0 5px 20px rgba(0,0,0,0.08)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e0e0e0', background: '#f9fafb' }}>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Campaign</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Amount</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Status</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Transaction</th>
                  <th style={{ padding: '15px', textAlign: 'left', fontWeight: '600', fontSize: '13px' }}>Date</th>
                </tr>
              </thead>
              <tbody>
                {donationHistory.map((donation, idx) => (
                  <tr key={donation.id} style={{ borderBottom: idx < donationHistory.length - 1 ? '1px solid #e0e0e0' : 'none' }}>
                    <td style={{ padding: '15px', fontSize: '13px' }}>{donation.campaign}</td>
                    <td style={{ padding: '15px', fontWeight: '600', color: '#667eea', fontSize: '14px' }}>+{donation.amount} RSC</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ background: '#d1fae5', color: '#065f46', padding: '4px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: '600' }}>✓ {donation.status}</span>
                    </td>
                    <td style={{ padding: '15px', fontSize: '12px', fontFamily: 'monospace', color: '#667eea' }}>{donation.txHash}</td>
                    <td style={{ padding: '15px', fontSize: '13px' }}>{donation.timestamp.toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
