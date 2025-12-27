const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("ReliefStablecoin", function() {
    it("mint increases totalSupply", async function() {
        const Relief = await ethers.getContractFactory("ReliefStablecoin");
        const relief = await Relief.deploy();
        await relief.waitForDeployment();

        await relief.mint(100);

        const supply = await relief.totalSupply();
        expect(supply.toString()).to.equal("100");
    });
});