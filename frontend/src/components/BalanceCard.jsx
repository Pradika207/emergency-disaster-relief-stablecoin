import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { getContract } from '../utils/contract';
import { useWallet } from '../hooks/useWallet';

export default function BalanceCard() {
  const { account } = useWallet();
  const [balance, setBalance] = useState('0');

  useEffect(() => {
    if (account) {
      const fetchBalance = async () => {
        const contract = await getContract(false);
        const bal = await contract.balanceOf(account);
        try {
          setBalance(ethers.formatEther(bal));
        } catch (e) {
          setBalance(bal.toString());
        }
      };
      fetchBalance();
    }
  }, [account]);

  return (
    <div className="bg-blue-100 p-4 rounded shadow">
      <h3 className="text-lg font-bold">Your Balance</h3>
      <p>{balance} Tokens</p>
    </div>
  );
}
