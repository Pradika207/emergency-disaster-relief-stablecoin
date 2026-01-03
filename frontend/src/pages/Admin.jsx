import React, { useState, useEffect } from 'react';

export default function Admin({ account, contract, onConnect }) {
  const [campaigns, setCampaigns] = useState([
    { id: 1, name: 'Flood Relief - Bangladesh', status: 'active', goal: '50000', raised: '32450', beneficiaries: 1200 },
    { id: 2, name: 'Earthquake Relief - Turkey', status: 'active', goal: '100000', raised: '87650', beneficiaries: 2500 },
  ]);
  const [newBeneficiary, setNewBeneficiary] = useState('');
  const [beneficiaryAmount, setBeneficiaryAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState(null);
  const [verifiedBeneficiaries, setVerifiedBeneficiaries] = useState([
    { id: 1, address: '0x123...', amount: 500, status: 'Verified', campaign: 'Flood Relief' },
    { id: 2, address: '0x456...', amount: 1000, status: 'Pending', campaign: 'Earthquake Relief' },
  ]);
  const [isAdmin, setIsAdmin] = useState(true);

  useEffect(() => {
    // Check if account is authorized admin (mock check)
    if (account && account.toLowerCase() !== '0x0000000000000000000000000000000000000000') {
      setIsAdmin(true);
    }
  }, [account]);

  const handleVerifyBeneficiary = async (e) => {
    e.preventDefault();
    if (!newBeneficiary || !beneficiaryAmount) {
      setActionStatus({ type: 'error', message: 'Please fill all fields' });
      return;
    }

    setLoading(true);
    setActionStatus({ type: 'pending', message: 'Verifying beneficiary...' });

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      setActionStatus({
        type: 'success',
        message: `Beneficiary ${newBeneficiary.slice(0, 10)}... verified with ${beneficiaryAmount} RSC allocated`
      });

      // Add to verified list
      setVerifiedBeneficiaries(prev => [{
        id: prev.length + 1,
        address: newBeneficiary,
        amount: beneficiaryAmount,
        status: 'Verified',
        campaign: 'New Campaign'
      }, ...prev]);

      setNewBeneficiary('');
      setBeneficiaryAmount('');
    } catch (error) {
      setActionStatus({ type: 'error', message: `Verification failed: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleDistributeFunds = async (campaignId) => {
    setLoading(true);
    setActionStatus({ type: 'pending', message: 'Distributing funds...' });

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      setActionStatus({
        type: 'success',
        message: 'Funds distributed successfully to all verified beneficiaries'
      });
    } catch (error) {
      setActionStatus({ type: 'error', message: `Distribution failed: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCampaign = (campaignId) => {
    setCampaigns(prev => prev.map(c => 
      c.id === campaignId ? { ...c, status: c.status === 'active' ? 'paused' : 'active' } : c
    ));
  };

  if (!account) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        <h2>Admin access requires wallet connection</h2>
        <button onClick={onConnect} style={{ padding: '12px 32px', background: '#667eea', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontSize: '16px' }}>
          Connect Wallet
        </button>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' }}>
        <div style={{ background: '#fee2e2', border: '1px solid #fecaca', color: '#991b1b', padding: '20px', borderRadius: '8px' }}>
          <h2>❌ Unauthorized</h2>
          <p>Your wallet is not authorized as an admin. Contact system administrator.</p>
        </div>
      </div>
    );
  }

  const totalRaised = campaigns.reduce((sum, c) => sum + Number(c.raised), 0);
  const totalBeneficiaries = campaigns.reduce((sum, c) => sum + c.beneficiaries, 0);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1>Admin Dashboard</h1>

      {/* Admin Info */}
      <div style={{ background: '#f0f9ff', border: '1px solid #0ea5e9', padding: '15px', borderRadius: '8px', marginBottom: '30px' }}>
        <p style={{ margin: 0 }}><strong>Admin Wallet:</strong> {account.slice(0, 10)}...{account.slice(-8)}</p>
      </div>

      {/* Quick Stats */}
      <div style={{ marginBottom: '40px' }}>
        <h2>Dashboard Overview</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <p style={{ color: '#666', marginBottom: '10px' }}>Total Raised</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{totalRaised.toLocaleString()} RSC</h3>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <p style={{ color: '#666', marginBottom: '10px' }}>Active Campaigns</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{campaigns.filter(c => c.status === 'active').length}</h3>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <p style={{ color: '#666', marginBottom: '10px' }}>Total Beneficiaries</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{totalBeneficiaries.toLocaleString()}</h3>
          </div>
          <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <p style={{ color: '#666', marginBottom: '10px' }}>Verified Beneficiaries</p>
            <h3 style={{ fontSize: '28px', fontWeight: 'bold', margin: 0 }}>{verifiedBeneficiaries.filter(b => b.status === 'Verified').length}</h3>
          </div>
        </div>
      </div>

      {/* Verify Beneficiary Form */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '40px', maxWidth: '500px' }}>
        <h2>Add & Verify Beneficiary</h2>
        <form onSubmit={handleVerifyBeneficiary}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>Beneficiary Wallet Address</label>
            <input 
              type="text" 
              value={newBeneficiary} 
              onChange={(e) => setNewBeneficiary(e.target.value)} 
              placeholder="0x..." 
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontFamily: 'monospace' }} 
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '10px', fontWeight: '600' }}>Relief Amount (RSC)</label>
            <input 
              type="number" 
              value={beneficiaryAmount} 
              onChange={(e) => setBeneficiaryAmount(e.target.value)} 
              placeholder="500" 
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }} 
            />
          </div>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '12px', background: loading ? '#ccc' : '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: loading ? 'not-allowed' : 'pointer', fontWeight: '600' }}>
            {loading ? 'Processing...' : 'Verify & Allocate'}
          </button>

          {actionStatus && (
            <div style={{ marginTop: '20px', padding: '12px', borderRadius: '4px', background: actionStatus.type === 'success' ? '#d1fae5' : actionStatus.type === 'error' ? '#fee2e2' : '#fef3c7', color: actionStatus.type === 'success' ? '#065f46' : actionStatus.type === 'error' ? '#991b1b' : '#92400e' }}>
              <p style={{ margin: 0 }}>{actionStatus.type === 'pending' ? '⏳' : actionStatus.type === 'success' ? '✅' : '❌'} {actionStatus.message}</p>
            </div>
          )}
        </form>
      </div>

      {/* Campaign Management */}
      <div style={{ marginBottom: '40px' }}>
        <h2>Campaign Management</h2>
        <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd', background: '#f9fafb' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>Name</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Progress</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Beneficiaries</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {campaigns.map(campaign => {
                const percentage = Math.round((Number(campaign.raised) / Number(campaign.goal)) * 100);
                return (
                  <tr key={campaign.id} style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px' }}>{campaign.name}</td>
                    <td style={{ padding: '15px' }}>
                      <span style={{ background: campaign.status === 'active' ? '#10b981' : '#ef4444', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                        {campaign.status}
                      </span>
                    </td>
                    <td style={{ padding: '15px' }}>
                      <div style={{ fontSize: '12px', marginBottom: '5px' }}>{percentage}% ({campaign.raised}/{campaign.goal})</div>
                      <div style={{ background: '#eee', borderRadius: '4px', height: '6px' }}>
                        <div style={{ background: '#667eea', height: '100%', width: `${percentage}%`, borderRadius: '4px' }}></div>
                      </div>
                    </td>
                    <td style={{ padding: '15px' }}>{campaign.beneficiaries.toLocaleString()}</td>
                    <td style={{ padding: '15px' }}>
                      <button 
                        onClick={() => handleToggleCampaign(campaign.id)}
                        style={{ padding: '6px 12px', background: campaign.status === 'active' ? '#ef4444' : '#10b981', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px', marginRight: '5px' }}
                      >
                        {campaign.status === 'active' ? 'Pause' : 'Resume'}
                      </button>
                      <button 
                        onClick={() => handleDistributeFunds(campaign.id)}
                        style={{ padding: '6px 12px', background: '#667eea', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                        disabled={loading}
                      >
                        Distribute
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Verified Beneficiaries List */}
      <div>
        <h2>Verified Beneficiaries</h2>
        <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #ddd', background: '#f9fafb' }}>
                <th style={{ padding: '15px', textAlign: 'left' }}>Wallet</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Allocated</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Status</th>
                <th style={{ padding: '15px', textAlign: 'left' }}>Campaign</th>
              </tr>
            </thead>
            <tbody>
              {verifiedBeneficiaries.map(beneficiary => (
                <tr key={beneficiary.id} style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', fontFamily: 'monospace', fontSize: '12px' }}>{beneficiary.address}</td>
                  <td style={{ padding: '15px', fontWeight: '600', color: '#10b981' }}>{beneficiary.amount} RSC</td>
                  <td style={{ padding: '15px' }}>
                    <span style={{ background: beneficiary.status === 'Verified' ? '#10b981' : '#f59e0b', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>
                      {beneficiary.status}
                    </span>
                  </td>
                  <td style={{ padding: '15px' }}>{beneficiary.campaign}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
