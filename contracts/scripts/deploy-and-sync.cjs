const hre = require('hardhat');
const fs = require('fs');
const path = require('path');

async function main() {
    await hre.run('compile');
    console.log('Deploying ReliefStablecoin...');

    const Relief = await hre.ethers.getContractFactory('ReliefStablecoin');
    const relief = await Relief.deploy();
    await relief.deployed();

    console.log('Relief deployed to:', relief.address);

    const artifact = await hre.artifacts.readArtifact('ReliefStablecoin');

    const frontendDir = path.join(__dirname, '..', '..', 'frontend', 'src', 'blockchain');
    if (!fs.existsSync(frontendDir)) fs.mkdirSync(frontendDir, { recursive: true });

    fs.writeFileSync(path.join(frontendDir, 'ReliefStablecoinABI.json'), JSON.stringify(artifact.abi, null, 2));
    fs.writeFileSync(path.join(frontendDir, 'contractAddress.json'), JSON.stringify({ address: relief.address }, null, 2));

    console.log('ABI and contractAddress written to frontend/src/blockchain');
}

main().catch((err) => { console.error(err);
    process.exit(1); });