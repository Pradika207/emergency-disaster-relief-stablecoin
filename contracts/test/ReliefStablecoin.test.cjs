const { test } = require("node:test");
const assert = require("node:assert/strict");
const hre = require("hardhat");

test("ReliefStablecoin mint increases totalSupply", async() => {
    const Relief = await hre.ethers.getContractFactory("ReliefStablecoin");
    const relief = await Relief.deploy();

    await relief.waitForDeployment();

    await relief.mint(100);

    const supply = await relief.totalSupply();
    assert.equal(supply.toString(), "100");
});