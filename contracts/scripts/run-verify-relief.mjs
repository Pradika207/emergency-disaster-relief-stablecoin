import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-viem';
import '@nomicfoundation/hardhat-ignition';

// Import the user-provided verification script after plugins are loaded
import ('./verify-relief.js');