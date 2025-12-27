import { useState } from 'react';
import { ethers } from 'ethers';
import { getContract } from '../utils/contract';
import { useWallet } from '../hooks/useWallet';

export default function DonateForm() {
  const { account } = useWallet();
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleDonate = async () => {
    if (!account) {
      setMessage('Please connect your wallet.');
      return;
    }
    try {
      const contract = await getContract(true);
      const tx = await contract.donate(ethers.parseEther(amount));
      await tx.wait();
      setMessage('Donation successful!');
    } catch (error) {
      setMessage('Error: ' + (error.message || error));
    }
  };

  return (
    <div className="bg-green-100 p-4 rounded shadow">
      <h3 className="text-lg font-bold">Donate Funds</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Amount in ETH"
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleDonate}
        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
      >
        Donate
      </button>
      {message && <p className="mt-2">{message}</p>}
    </div>
  );
}
