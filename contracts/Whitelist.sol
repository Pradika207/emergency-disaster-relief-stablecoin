// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/Ownable.sol";

/*
 * Whitelist Contract
 * - Verifies beneficiaries (victims)
 * - Approves merchants (shops)
 */
contract Whitelist is Ownable {

    mapping(address => bool) public beneficiaries;
    mapping(address => bool) public merchants;

    // Add verified disaster victim
    function addBeneficiary(address user) external onlyOwner {
        beneficiaries[user] = true;
    }

    // Remove beneficiary
    function removeBeneficiary(address user) external onlyOwner {
        beneficiaries[user] = false;
    }

    // Approve merchant
    function addMerchant(address merchant) external onlyOwner {
        merchants[merchant] = true;
    }

    // Remove merchant
    function removeMerchant(address merchant) external onlyOwner {
        merchants[merchant] = false;
    }
}
