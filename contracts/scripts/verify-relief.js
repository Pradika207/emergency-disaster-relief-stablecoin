import hre from "hardhat";

async function main() {
    const [deployer] = await hre.viem.getWalletClients();

    console.log("Deployer:", deployer.account.address);

    const ReliefStablecoin = await hre.viem.deployContract(
        "ReliefStablecoin", []
    );

    const totalSupply = await ReliefStablecoin.read.totalSupply();

    console.log("Total Supply:", totalSupply.toString());
    console.log("✅ ReliefStablecoin verified successfully");
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});