import { useState, useEffect } from 'react';
import { getContract } from '../utils/contract';
import { useWallet } from '../hooks/useWallet';

export default function TransactionList() {
  const { account } = useWallet();
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    if (account) {
      const fetchTransactions = async () => {
        const contract = await getContract(false);
        // If your contract exposes a getTransactions(address) use it here
        if (contract.getTransactions) {
          const txs = await contract.getTransactions(account);
          setTransactions(txs || []);
        }
      };
      fetchTransactions();
    }
  }, [account]);

  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h3 className="text-lg font-bold">Transaction History</h3>
      <ul>
        {transactions.length === 0 && <li>No transactions</li>}
        {transactions.map((tx, index) => (
          <li key={index}>{String(tx)}</li>
        ))}
      </ul>
    </div>
  );
}
