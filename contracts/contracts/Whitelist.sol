// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Whitelist {
    address public admin;
    mapping(address => bool) public beneficiaries;
    mapping(address => bool) public merchants;

    constructor() {
        admin = msg.sender;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    function addBeneficiary(address user) external onlyAdmin {
        beneficiaries[user] = true;
    }

    function addMerchant(address shop) external onlyAdmin {
        merchants[shop] = true;
    }

    function isBeneficiary(address user) external view returns (bool) {
        return beneficiaries[user];
    }

    function isMerchant(address shop) external view returns (bool) {
        return merchants[shop];
    }
}
