import { BrowserProvider, Contract } from "ethers";
import ABI from "./ReliefStablecoinABI.json";
import addressJSON from "./contractAddress.json";

export const CONTRACT_ADDRESS = addressJSON ? .address || "PASTE_CONTRACT_ADDRESS_HERE";

export async function getContract() {
    if (!window.ethereum) throw new Error("MetaMask not installed");
    const provider = new BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    return new Contract(CONTRACT_ADDRESS, ABI, signer);
}

export async function getProvider() {
    if (!window.ethereum) throw new Error("MetaMask not installed");
    return new BrowserProvider(window.ethereum);
}