import { useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from '../utils/contract';
import { useWallet } from '../hooks/useWallet';

export default function TransferForm() {
  const { account } = useWallet();
  const [to, setTo] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleTransfer = async () => {
    if (!account) {
      setMessage('Please connect your wallet.');
      return;
    }
    try {
      const contract = await getContract(true);
      const tx = await contract.transfer(to, ethers.parseEther(amount));
      await tx.wait();
      setMessage('Transfer successful!');
    } catch (error) {
      setMessage('Error: ' + (error.message || error));
    }
  };

  return (
    <div className="bg-blue-100 p-4 rounded shadow">
      <h3 className="text-lg font-bold">Spend Tokens</h3>
      <input
        type="text"
        value={to}
        onChange={(e) => setTo(e.target.value)}
        placeholder="Merchant Address"
        className="border p-2 w-full mb-2"
      />
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleTransfer}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Spend
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
