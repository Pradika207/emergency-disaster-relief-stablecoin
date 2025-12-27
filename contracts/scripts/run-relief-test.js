const hre = require("hardhat");

async function main() {
    const Relief = await hre.ethers.getContractFactory("ReliefStablecoin");
    const relief = await Relief.deploy();
    await relief.waitForDeployment();

    await relief.mint(100);

    const supply = await relief.totalSupply();
    console.log("totalSupply=", supply.toString());
}

main()
    .then(() => process.exit(0))
    .catch((e) => {
        console.error(e);
        process.exit(1);
    });