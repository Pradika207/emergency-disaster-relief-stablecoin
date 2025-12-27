import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Hardhat network configuration
const HARDHAT_NETWORK = {
    chainId: '0x7a69', // 31337 in hex
    chainIdDecimal: 31337,
    name: 'Hardhat Local',
    rpcUrl: 'http://127.0.0.1:8545',
    nativeCurrency: {
        name: 'ETH',
        symbol: 'ETH',
        decimals: 18,
    },
};

// Helper to safely access ethereum
const getEthereum = () => {
    if (typeof window !== 'undefined' && window.ethereum) {
        return window.ethereum;
    }
    return null;
};

export function useWallet() {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [balance, setBalance] = useState('0');
    const [network, setNetwork] = useState(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState(null);
    const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
    const [isSwitchingNetwork, setIsSwitchingNetwork] = useState(false);
    const [isNetworkCorrect, setIsNetworkCorrect] = useState(false);

    // Initialize provider on mount - only setup listeners, don't show errors yet
    useEffect(() => {
        const ethereum = getEthereum();

        // Check if MetaMask is installed but DON'T show error on load
        if (ethereum && ethereum.isMetaMask) {
            setIsMetaMaskInstalled(true);
            const ethProvider = new ethers.BrowserProvider(ethereum);
            setProvider(ethProvider);

            const handleAccountsChanged = (accounts) => {
                if (accounts.length > 0) {
                    setAccount(accounts[0]);
                    setError(null);
                    fetchBalance(accounts[0], ethProvider);
                } else {
                    setAccount(null);
                    setSigner(null);
                    setBalance('0');
                }
            };

            const handleChainChanged = (chainId) => {
                // Check if we're on Hardhat
                const isHardhat = chainId === HARDHAT_NETWORK.chainId;
                setIsNetworkCorrect(isHardhat);
                if (!isHardhat && account) {
                    // Only show error if account is connected
                    setError('Please switch to Hardhat Local network');
                }
            };

            ethereum.on('accountsChanged', handleAccountsChanged);
            ethereum.on('chainChanged', handleChainChanged);

            // Check initial state
            ethereum.request({ method: 'eth_accounts' }).then(handleAccountsChanged).catch(err => {
                console.error('Error checking accounts:', err);
            });

            // Check current network
            ethereum.request({ method: 'eth_chainId' }).then(handleChainChanged).catch(err => {
                console.error('Error checking chain:', err);
            });

            return () => {
                try {
                    ethereum.removeListener('accountsChanged', handleAccountsChanged);
                    ethereum.removeListener('chainChanged', handleChainChanged);
                } catch (e) {}
            };
        } else {
            // MetaMask not installed - but don't show error on page load
            setIsMetaMaskInstalled(false);
        }
    }, [account]);

    const fetchBalance = async(address, ethProvider) => {
        try {
            if (ethProvider && address) {
                const timeoutPromise = new Promise((_, reject) =>
                    setTimeout(() => reject(new Error('Balance request timeout')), 3000)
                );

                const balancePromise = ethProvider.getBalance(address);
                const balance = await Promise.race([balancePromise, timeoutPromise]);
                setBalance(ethers.formatEther(balance));
            }
        } catch (err) {
            console.error('Error fetching balance:', err);
            setBalance('0');
        }
    };

    const fetchNetworkInfo = async(ethProvider) => {
        try {
            const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Network request timeout')), 3000)
            );

            const networkPromise = ethProvider.getNetwork();
            const networkInfo = await Promise.race([networkPromise, timeoutPromise]);
            setNetwork({
                name: networkInfo.name,
                chainId: networkInfo.chainId,
            });

            // Check if on Hardhat
            setIsNetworkCorrect(networkInfo.chainId === HARDHAT_NETWORK.chainIdDecimal);
        } catch (err) {
            console.error('Error fetching network:', err);
            setNetwork(null);
        }
    };

    const switchToHardhat = async() => {
        const ethereum = getEthereum();
        if (!ethereum) {
            setError('MetaMask not available');
            return;
        }

        setIsSwitchingNetwork(true);
        setError(null);
        try {
            // Try to switch to existing network first
            try {
                await ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: HARDHAT_NETWORK.chainId }],
                });
            } catch (switchError) {
                // Network not found, add it
                if (switchError.code === 4902) {
                    await ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [{
                            chainId: HARDHAT_NETWORK.chainId,
                            chainName: HARDHAT_NETWORK.name,
                            rpcUrls: [HARDHAT_NETWORK.rpcUrl],
                            nativeCurrency: HARDHAT_NETWORK.nativeCurrency,
                        }, ],
                    });
                } else {
                    throw switchError;
                }
            }
            setIsNetworkCorrect(true);
            setError(null);
        } catch (err) {
            setError(`Failed to switch network: ${err.message}`);
            console.error('Network switch error:', err);
        } finally {
            setIsSwitchingNetwork(false);
        }
    };

    const connectWallet = async() => {
        setIsConnecting(true);
        setError(null);
        try {
            const ethereum = getEthereum();

            if (!ethereum) {
                setError('MetaMask is not installed. Please install it from https://metamask.io');
                setIsMetaMaskInstalled(false);
                setIsConnecting(false);
                return;
            }

            if (!ethereum.isMetaMask) {
                setError('Please use MetaMask wallet');
                setIsMetaMaskInstalled(false);
                setIsConnecting(false);
                return;
            }

            setIsMetaMaskInstalled(true);

            // Request accounts
            const accounts = await ethereum.request({
                method: 'eth_requestAccounts'
            });

            if (accounts && accounts.length > 0) {
                const ethProvider = new ethers.BrowserProvider(ethereum);
                setProvider(ethProvider);

                const userSigner = await ethProvider.getSigner();
                setSigner(userSigner);

                setAccount(accounts[0]);
                fetchBalance(accounts[0], ethProvider);
                fetchNetworkInfo(ethProvider);

                // Check network - warn but don't block
                const chainId = await ethereum.request({ method: 'eth_chainId' });
                if (chainId !== HARDHAT_NETWORK.chainId) {
                    const currentChainId = parseInt(chainId, 16);
                    setError(`Wrong network detected (Chain ${currentChainId}). Switch to Hardhat Local (31337)?`);
                    setIsNetworkCorrect(false);
                } else {
                    setIsNetworkCorrect(true);
                    setError(null);
                }
            }
        } catch (err) {
            // Handle user rejecting connection
            if (err.code === 4001) {
                setError('Connection cancelled by user');
            } else {
                const errorMessage = err.message || 'Failed to connect wallet';
                setError(errorMessage);
            }
            console.error('Connection error:', err);
        } finally {
            setIsConnecting(false);
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        setSigner(null);
        setBalance('0');
        setNetwork(null);
        setError(null);
    };

    const shortenAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    // Send a test transaction
    const sendTestTransaction = async(toAddress, amountEth) => {
        if (!signer) {
            setError('Wallet not connected');
            return null;
        }

        setIsConnecting(true);
        try {
            const tx = await signer.sendTransaction({
                to: toAddress,
                value: ethers.parseEther(amountEth),
            });

            console.log('Transaction sent:', tx.hash);

            // Wait for confirmation
            const receipt = await tx.wait();
            console.log('Transaction confirmed:', receipt);

            // Update balance
            if (account && provider) {
                fetchBalance(account, provider);
            }

            return receipt;
        } catch (err) {
            setError(`Transaction failed: ${err.message}`);
            console.error('Transaction error:', err);
            return null;
        } finally {
            setIsConnecting(false);
        }
    };

    return {
        account,
        provider,
        signer,
        balance,
        network,
        isConnecting,
        error,
        connectWallet,
        disconnectWallet,
        shortenAddress,
        isConnected: !!account,
        isMetaMaskInstalled,
        switchToHardhat,
        isSwitchingNetwork,
        isNetworkCorrect,
        sendTestTransaction,
    };
}