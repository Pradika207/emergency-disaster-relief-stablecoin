import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

export default async function main(hre) {
    const { ethers, artifacts } = hre;

    console.log("Deploying ReliefStablecoin...");

    const Relief = await hre.ethers.getContractFactory("ReliefStablecoin");
    const relief = await Relief.deploy();
    await relief.waitForDeployment();

    const deployedAddress = await relief.getAddress();
    console.log("ReliefStablecoin deployed to:", deployedAddress);

    const artifact = await artifacts.readArtifact("ReliefStablecoin");

    const frontendDir = path.join(__dirname, "..", "..", "frontend", "src", "blockchain");
    if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });

    fs.writeFileSync(path.join(frontendDir, "ReliefStablecoinABI.json"), JSON.stringify(artifact.abi, null, 2));
    fs.writeFileSync(path.join(frontendDir, "contractAddress.json"), JSON.stringify({ address: deployedAddress }, null, 2));

    console.log("ABI and contractAddress written to frontend/src/blockchain");
}