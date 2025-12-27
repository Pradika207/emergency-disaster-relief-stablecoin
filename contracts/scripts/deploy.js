import { ethers } from "ethers";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
    // Connect to local Hardhat node
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    const signer = await provider.getSigner(0);

    console.log("Deploying with account:", await signer.getAddress());

    // Read contract artifact
    const artifactPath = path.resolve(__dirname, '../artifacts/contracts/ReliefStablecoin.sol/ReliefStablecoin.json');
    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));

    // Deploy contract
    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, signer);
    const contract = await factory.deploy();
    await contract.waitForDeployment();
    const address = await contract.getAddress();

    console.log("✅ ReliefStablecoin deployed to:", address);

    // Save address to JSON file for frontend
    const addressPath = path.resolve(__dirname, '../..', 'frontend/src/blockchain/contractAddress.json');
    fs.writeFileSync(
        addressPath,
        JSON.stringify({ address }, null, 2)
    );
    console.log("✅ Address saved to frontend/src/blockchain/contractAddress.json");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});