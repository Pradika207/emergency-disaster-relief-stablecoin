import fs from 'fs';
import path from 'path';
import { JsonRpcProvider, Wallet, ContractFactory } from 'ethers';

const RPC = 'http://127.0.0.1:8545';
const PRIVATE_KEY = '0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80';

async function main() {
    const artifactPath = path.resolve('./artifacts/contracts/ReliefStablecoin.sol/ReliefStablecoin.json');
    if (!fs.existsSync(artifactPath)) {
        throw new Error('Artifact not found: ' + artifactPath);
    }

    const artifact = JSON.parse(fs.readFileSync(artifactPath, 'utf8'));
    const abi = artifact.abi;
    const bytecode = artifact.bytecode;

    const provider = new JsonRpcProvider(RPC);
    const wallet = new Wallet(PRIVATE_KEY, provider);

    console.log('Using deployer address:', wallet.address);

    const Factory = new ContractFactory(abi, bytecode, wallet);
    const contract = await Factory.deploy();
    await contract.deployed();

    const totalSupply = await contract.totalSupply();
    console.log('Total Supply:', totalSupply.toString());
    console.log('✅ ReliefStablecoin verified successfully (standalone)');
}

main().catch((err) => {
    console.error(err);
    process.exitCode = 1;
});