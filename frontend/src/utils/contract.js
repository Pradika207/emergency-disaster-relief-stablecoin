import { ethers } from 'ethers';
import abi from '../abi/ReliefStablecoin.json';

// Replace with your deployed contract address
export const CONTRACT_ADDRESS = 'PASTE_DEPLOYED_CONTRACT_ADDRESS';

export async function getContract(withSigner = true) {
    if (!window.ethereum) throw new Error('No ethereum provider');
    const provider = new ethers.BrowserProvider(window.ethereum);
    if (withSigner) {
        const signer = await provider.getSigner();
        return new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
    }
    return new ethers.Contract(CONTRACT_ADDRESS, abi, provider);
}