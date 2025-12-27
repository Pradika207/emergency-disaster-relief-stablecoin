import '@nomicfoundation/hardhat-ethers';
import '@nomicfoundation/hardhat-viem';
import '@nomicfoundation/hardhat-ignition';
import hre from 'hardhat';

console.log('hre.ethers:', typeof hre.ethers);
console.log('hre.viem:', typeof hre.viem);
console.log(Object.keys(hre).slice(0, 20));