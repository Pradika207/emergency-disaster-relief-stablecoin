console.log("run-relief-test.mjs loaded");

export default async function main(hre) {
    const Relief = await hre.ethers.getContractFactory("ReliefStablecoin");
    const relief = await Relief.deploy();
    await relief.waitForDeployment();

    await relief.mint(relief.signer.address, 100);

    const supply = await relief.totalSupply();
    console.log("totalSupply=", supply.toString());
}

console.log("exported default 'main' type:", typeof main);