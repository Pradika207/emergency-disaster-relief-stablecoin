// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

/*
 * ReliefStablecoin (RSC)
 * Admin (NGO/Govt) mints tokens
 * Used for emergency & disaster relief
 */
contract ReliefStablecoin is ERC20, Ownable {

    constructor() ERC20("Relief Stablecoin", "RSC") {}

    // Only admin can mint relief funds
    function mint(address to, uint256 amount) external onlyOwner {
        _mint(to, amount);
    }
}
