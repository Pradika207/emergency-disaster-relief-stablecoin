import fs from "fs";
import path from "path";
import { ethers } from "ethers";

async function main() {
    const provider = new ethers.JsonRpcProvider("http://127.0.0.1:8545");
    // Hardhat local node account 0 private key
    const pk = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
    const wallet = new ethers.Wallet(pk, provider);

    const artifactPath = path.resolve("artifacts/contracts/ReliefStablecoin.sol/ReliefStablecoin.json");
    const artifact = JSON.parse(fs.readFileSync(artifactPath, "utf8"));

    const factory = new ethers.ContractFactory(artifact.abi, artifact.bytecode, wallet);
    const contract = await factory.deploy();
    await contract.waitForDeployment();

    await contract.mint(wallet.address, 100);

    const supply = await contract.totalSupply();
    console.log("totalSupply=", supply.toString());
}

main().catch((e) => {
    console.error(e);
    process.exit(1);
});