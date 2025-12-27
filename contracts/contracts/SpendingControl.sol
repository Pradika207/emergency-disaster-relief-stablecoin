// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./Whitelist.sol";
import "./ReliefStablecoin.sol";

contract SpendingControl {
    Whitelist public whitelist;
    ReliefStablecoin public token;

    constructor(address whitelistAddr, address tokenAddr) {
        whitelist = Whitelist(whitelistAddr);
        token = ReliefStablecoin(tokenAddr);
    }

    function spend(address merchant, uint256 amount) external {
        require(whitelist.isBeneficiary(msg.sender), "Not beneficiary");
        require(whitelist.isMerchant(merchant), "Not approved merchant");

        token.transfer(merchant, amount);
    }
}
