import hre from "hardhat";

export default async function main() {
    const { viem } = hre;

    const [deployer] = await viem.getWalletClients();

    const token = await viem.deployContract("ReliefStablecoin", []);

    // mint via write
    await token.write.mint([deployer.account.address, BigInt(500)], {
        account: deployer.account,
    });

    const supply = await token.read.totalSupply();
    console.log("Total Supply:", supply.toString());

    if (supply !== BigInt(500)) {
        throw new Error("Mint failed");
    }

    console.log("✅ ReliefStablecoin verified successfully");
}

if (
    import.meta.url === `file://${process.argv[1]}`) {
    main().catch((e) => {
        console.error(e);
        process.exit(1);
    });
}