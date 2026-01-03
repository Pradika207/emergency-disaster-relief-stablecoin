import React, { useState, useEffect } from 'react';

export default function Beneficiary({ account, contract, onConnect }) {
  const [loading, setLoading] = useState(false);
  const [claimStatus, setClaimStatus] = useState(null);
  const [selectedCampaign, setSelectedCampaign] = useState('flood');
  const [partialClaimAmount, setPartialClaimAmount] = useState('');
  const [beneficiaryInfo, setBeneficiaryInfo] = useState({
    status: 'Verified',
    allocatedAmount: '500',
    remainingBalance: '250',
    totalClaimed: '250',
    registeredDate: new Date(Date.now() - 7776000000),
  });
  const [claimHistory, setClaimHistory] = useState([
    { id: 1, campaign: 'Flood Relief - Bangladesh', amount: '250', date: new Date(Date.now() - 604800000), txHash: '0x789...' }
  ]);
  
  const availableCampaigns = {
    flood: { name: 'Flood Relief - Bangladesh', status: 'active' },
    earthquake: { name: 'Earthquake Relief - Turkey', status: 'active' },
    wildfire: { name: 'Wildfire Relief - California', status: 'paused' }
  };

  useEffect(() => {
    // Initialize beneficiary data on mount
    if (account) {
      // Simulate fetching beneficiary data from contract
      console.log('Beneficiary account:', account);
    }
  }, [account]);

  const handleClaimAid = async (e) => {
    e.preventDefault();
    
    const claimAmount = partialClaimAmount ? Math.min(Number(partialClaimAmount), Number(beneficiaryInfo.remainingBalance)) : Number(beneficiaryInfo.remainingBalance);
    
    if (claimAmount <= 0) {
      setClaimStatus({ type: 'error', message: 'Invalid claim amount' });
      return;
    }

    setLoading(true);
    setClaimStatus({ type: 'pending', message: `Processing claim of ${claimAmount} RSC...` });

    try {
      // Simulate transaction
      await new Promise(resolve => setTimeout(resolve, 2000));

      setClaimStatus({
        type: 'success',
        message: `Successfully claimed ${claimAmount} RSC from ${availableCampaigns[selectedCampaign].name}`,
        txHash: '0x' + Math.random().toString(16).substr(2, 40)
      });

      // Update balances
      const newRemaining = Number(beneficiaryInfo.remainingBalance) - claimAmount;
      setBeneficiaryInfo(prev => ({
        ...prev,
        remainingBalance: String(newRemaining),
        totalClaimed: String(Number(prev.totalClaimed) + claimAmount)
      }));

      // Add to history
      setClaimHistory(prev => [{
        id: prev.length + 1,
        campaign: availableCampaigns[selectedCampaign].name,
        amount: String(claimAmount),
        date: new Date(),
        txHash: '0x' + Math.random().toString(16).substr(2, 8) + '...'
      }, ...prev]);

      setPartialClaimAmount('');
    } catch (error) {
      setClaimStatus({ type: 'error', message: `Claim failed: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

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

  const statusColor = beneficiaryInfo.status === 'Verified' ? '#10b981' : beneficiaryInfo.status === 'Pending' ? '#f59e0b' : '#ef4444';
  const claimPercentage = ((Number(beneficiaryInfo.totalClaimed) / Number(beneficiaryInfo.allocatedAmount)) * 100).toFixed(1);

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
      <h1 style={{ color: '#1f2937', marginBottom: '10px' }}>Receive Emergency Aid</h1>
      <p style={{ color: '#6b7280', marginBottom: '30px' }}>Manage your relief funds safely and securely on the blockchain</p>

      {/* Status Banner */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '8px', 
        marginBottom: '30px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h3 style={{ margin: '0 0 5px 0' }}>Beneficiary Status</h3>
          <p style={{ margin: 0, opacity: 0.9 }}>Wallet: {account.slice(0, 10)}...{account.slice(-8)}</p>
        </div>
        <span style={{ background: statusColor, color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: '600', fontSize: '14px' }}>
          ✓ {beneficiaryInfo.status}
        </span>
      </div>

      {/* Account Info Card */}
      <div style={{ background: 'white', padding: '20px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>CONNECTED WALLET</p>
            <p style={{ margin: 0, fontFamily: 'monospace', fontSize: '13px', fontWeight: '600', color: '#1f2937', wordBreak: 'break-all' }}>{account}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>REGISTRATION DATE</p>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#1f2937' }}>{beneficiaryInfo.registeredDate.toLocaleDateString()}</p>
          </div>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#6b7280', fontSize: '12px', fontWeight: '600' }}>VERIFICATION LEVEL</p>
            <p style={{ margin: 0, fontSize: '13px', fontWeight: '600', color: '#10b981' }}>✓ Full Access</p>
          </div>
        </div>
      </div>

      {/* Aid Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(270px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <p style={{ color: '#6b7280', marginBottom: '10px', fontSize: '13px', fontWeight: '600' }}>ALLOCATED AMOUNT</p>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '36px', color: '#667eea', fontWeight: 'bold' }}>{beneficiaryInfo.allocatedAmount}</h2>
          <p style={{ margin: 0, color: '#999', fontSize: '12px' }}>Total relief funds allocated to you</p>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '1px solid #e5e7eb' }}>
          <p style={{ color: '#6b7280', marginBottom: '10px', fontSize: '13px', fontWeight: '600' }}>ALREADY CLAIMED</p>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '36px', color: '#10b981', fontWeight: 'bold' }}>{beneficiaryInfo.totalClaimed}</h2>
          <p style={{ margin: 0, color: '#999', fontSize: '12px' }}>Successfully claimed: {claimPercentage}%</p>
          <div style={{ background: '#f0fdf4', borderRadius: '4px', height: '4px', marginTop: '8px' }}>
            <div style={{ background: '#10b981', height: '100%', width: `${claimPercentage}%`, borderRadius: '4px' }}></div>
          </div>
        </div>

        <div style={{ background: 'white', padding: '25px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: `2px solid ${beneficiaryInfo.remainingBalance === '0' ? '#e5e7eb' : '#f59e0b'}` }}>
          <p style={{ color: '#6b7280', marginBottom: '10px', fontSize: '13px', fontWeight: '600' }}>AVAILABLE TO CLAIM</p>
          <h2 style={{ margin: '0 0 8px 0', fontSize: '36px', color: beneficiaryInfo.remainingBalance === '0' ? '#999' : '#f59e0b', fontWeight: 'bold' }}>{beneficiaryInfo.remainingBalance}</h2>
          <p style={{ margin: 0, color: '#999', fontSize: '12px' }}>Ready for immediate claiming</p>
        </div>
      </div>

      {/* Claim Aid Section */}
      <div style={{ background: 'white', padding: '30px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginBottom: '40px', maxWidth: '550px' }}>
        <h2 style={{ margin: '0 0 20px 0', color: '#1f2937' }}>Claim Your Relief Aid</h2>

        {beneficiaryInfo.remainingBalance === '0' ? (
          <div style={{ padding: '15px', background: '#d1fae5', border: '1px solid #a7f3d0', color: '#065f46', borderRadius: '6px' }}>
            <p style={{ margin: 0, fontWeight: '600', fontSize: '14px' }}>✅ No funds available to claim</p>
            <p style={{ margin: '5px 0 0 0', fontSize: '13px' }}>You have claimed all your allocated relief funds.</p>
          </div>
        ) : (
          <form onSubmit={handleClaimAid}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>Select Campaign</label>
              <select 
                value={selectedCampaign} 
                onChange={(e) => setSelectedCampaign(e.target.value)}
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
              >
                {Object.entries(availableCampaigns).map(([key, campaign]) => (
                  <option key={key} value={key}>{campaign.name} ({campaign.status})</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: '20px' }}>
              <label style={{ display: 'block', marginBottom: '8px', fontWeight: '600', color: '#1f2937', fontSize: '14px' }}>Claim Amount (Optional)</label>
              <input 
                type="number" 
                value={partialClaimAmount} 
                onChange={(e) => setPartialClaimAmount(e.target.value)} 
                placeholder={`Max: ${beneficiaryInfo.remainingBalance} RSC`}
                max={beneficiaryInfo.remainingBalance}
                min="0"
                step="0.01"
                style={{ width: '100%', padding: '10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '14px' }}
              />
              <p style={{ margin: '6px 0 0 0', color: '#6b7280', fontSize: '12px' }}>Leave blank to claim all available funds</p>
            </div>

            <div style={{ background: '#f0f9ff', border: '1px solid #0ea5e9', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
              <p style={{ margin: '0 0 5px 0', color: '#0369a1', fontSize: '13px', fontWeight: '600' }}>You will receive:</p>
              <h3 style={{ margin: '5px 0 0 0', fontSize: '26px', color: '#0369a1', fontWeight: 'bold' }}>
                {partialClaimAmount && Number(partialClaimAmount) <= Number(beneficiaryInfo.remainingBalance) ? partialClaimAmount : beneficiaryInfo.remainingBalance} RSC
              </h3>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              style={{ 
                width: '100%', 
                padding: '12px', 
                background: loading ? '#d1d5db' : '#667eea', 
                color: 'white', 
                border: 'none', 
                borderRadius: '6px', 
                cursor: loading ? 'not-allowed' : 'pointer', 
                fontWeight: '600',
                fontSize: '15px',
                transition: 'all 0.3s'
              }}
            >
              {loading ? '⏳ Processing...' : '💰 Claim Aid Now'}
            </button>

            {claimStatus && (
              <div style={{ marginTop: '20px', padding: '14px', borderRadius: '6px', background: claimStatus.type === 'success' ? '#d1fae5' : claimStatus.type === 'error' ? '#fee2e2' : '#fef3c7', color: claimStatus.type === 'success' ? '#065f46' : claimStatus.type === 'error' ? '#991b1b' : '#92400e', border: `1px solid ${claimStatus.type === 'success' ? '#a7f3d0' : claimStatus.type === 'error' ? '#fecaca' : '#fcd34d'}` }}>
                <p style={{ margin: 0, fontWeight: '600', fontSize: '14px' }}>{claimStatus.type === 'pending' ? '⏳' : claimStatus.type === 'success' ? '✅' : '❌'} {claimStatus.message}</p>
                {claimStatus.txHash && <p style={{ margin: '6px 0 0 0', fontSize: '12px', fontFamily: 'monospace', wordBreak: 'break-all' }}>TX: {claimStatus.txHash}</p>}
              </div>
            )}
          </form>
        )}
      </div>

      {/* How It Works */}
      <div style={{ background: '#f0f9ff', border: '1px solid #0ea5e9', padding: '25px', borderRadius: '8px', marginBottom: '40px' }}>
        <h3 style={{ margin: '0 0 15px 0', color: '#0369a1', fontSize: '16px', fontWeight: '600' }}>ℹ️ How Aid Distribution Works</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#0369a1', fontWeight: '600', fontSize: '14px' }}>1️⃣ Verification</p>
            <p style={{ margin: 0, color: '#0369a1', fontSize: '13px' }}>Admin team verifies your identity and eligibility</p>
          </div>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#0369a1', fontWeight: '600', fontSize: '14px' }}>2️⃣ Allocation</p>
            <p style={{ margin: 0, color: '#0369a1', fontSize: '13px' }}>Funds allocated based on disaster assessment</p>
          </div>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#0369a1', fontWeight: '600', fontSize: '14px' }}>3️⃣ Claiming</p>
            <p style={{ margin: 0, color: '#0369a1', fontSize: '13px' }}>Instantly claim funds to your wallet</p>
          </div>
          <div>
            <p style={{ margin: '0 0 8px 0', color: '#0369a1', fontWeight: '600', fontSize: '14px' }}>4️⃣ Transparency</p>
            <p style={{ margin: 0, color: '#0369a1', fontSize: '13px' }}>All transactions recorded on blockchain</p>
          </div>
        </div>
      </div>

      {/* Claim History */}
      {claimHistory.length > 0 && (
        <div>
          <h2 style={{ color: '#1f2937', marginBottom: '15px' }}>Your Claim History</h2>
          <div style={{ overflowX: 'auto', background: 'white', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb', background: '#f9fafb' }}>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#6b7280', fontSize: '13px', fontWeight: '600' }}>Campaign</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#6b7280', fontSize: '13px', fontWeight: '600' }}>Amount</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#6b7280', fontSize: '13px', fontWeight: '600' }}>Date</th>
                  <th style={{ padding: '15px', textAlign: 'left', color: '#6b7280', fontSize: '13px', fontWeight: '600' }}>Transaction Hash</th>
                </tr>
              </thead>
              <tbody>
                {claimHistory.map(claim => (
                  <tr key={claim.id} style={{ borderBottom: '1px solid #e5e7eb', transition: 'background 0.2s', cursor: 'pointer' }} onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'} onMouseLeave={(e) => e.currentTarget.style.background = 'white'}>
                    <td style={{ padding: '15px', color: '#1f2937', fontSize: '14px' }}>{claim.campaign}</td>
                    <td style={{ padding: '15px', fontWeight: '600', color: '#10b981', fontSize: '14px' }}>+{claim.amount} RSC</td>
                    <td style={{ padding: '15px', color: '#6b7280', fontSize: '13px' }}>{claim.date.toLocaleDateString()}</td>
                    <td style={{ padding: '15px', fontSize: '12px', fontFamily: 'monospace', color: '#667eea' }}>{claim.txHash}</td>
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
