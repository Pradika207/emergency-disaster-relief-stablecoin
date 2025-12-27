#!/usr/bin/env node

import ("hardhat").then(async(hardhatModule) => {
    const hre = hardhatModule.default;
    const fs = await
    import ("fs");
    const path = await
    import ("path");
    const { fileURLToPath } = await
    import ("url");

    const __filename = fileURLToPath(
        import.meta.url);
    const __dirname = path.dirname(__filename);

    console.log("Deploying ReliefStablecoin...");

    const Relief = await hre.ethers.getContractFactory("ReliefStablecoin");
    const relief = await Relief.deploy();
    await relief.waitForDeployment();

    const deployedAddress = await relief.getAddress();
    console.log("✓ ReliefStablecoin deployed to:", deployedAddress);

    const artifact = await hre.artifacts.readArtifact("ReliefStablecoin");

    const frontendDir = path.dirname(path.join(__dirname, "..", "..", "frontend", "src", "blockchain"));
    if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });

    fs.writeFileSync(path.join(frontendDir, "ReliefStablecoinABI.json"), JSON.stringify(artifact.abi, null, 2));
    fs.writeFileSync(path.join(frontendDir, "contractAddress.json"), JSON.stringify({ address: deployedAddress }, null, 2));

    console.log("✓ ABI and contractAddress written to frontend/src/blockchain");
}).catch((error) => {
    console.error("Deploy failed:", error);
    process.exit(1);
});