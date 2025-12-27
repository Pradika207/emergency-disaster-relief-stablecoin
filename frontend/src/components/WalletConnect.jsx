import React from 'react';
import { useWallet } from '../hooks/useWallet';
import { LogOut, AlertCircle, Wallet, CheckCircle, Network, ExternalLink, AlertTriangle } from 'lucide-react';

export default function WalletConnect() {
  const { 
    account, 
    shortenAddress, 
    balance, 
    network, 
    isConnecting, 
    error, 
    connectWallet, 
    disconnectWallet, 
    isConnected, 
    isMetaMaskInstalled,
    switchToHardhat,
    isSwitchingNetwork,
    isNetworkCorrect
  } = useWallet();

  return (
    <div className="flex flex-col gap-2">
      {/* Error Message - Only show when relevant */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded px-3 py-2 flex gap-2 items-start text-sm text-red-700">
          <AlertCircle size={16} className="mt-0.5 flex-shrink-0" />
          <div className="flex-1">
            <p className="text-xs">{error}</p>
            {error.includes('not installed') && (
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-blue-600 hover:text-blue-700 hover:underline mt-1 block"
              >
                Install MetaMask →
              </a>
            )}
          </div>
        </div>
      )}
      
      {/* Not Connected State */}
      {!isConnected ? (
        <div className="flex flex-col gap-2">
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-4 py-2.5 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 whitespace-nowrap text-sm"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                Connecting...
              </>
            ) : (
              <>
                <Wallet size={16} />
                Connect Wallet
              </>
            )}
          </button>
        </div>
      ) : (
        /* Connected State - Professional Status Badge */
        <div className="flex items-center gap-2">
          {/* Status Badge */}
          <div className="bg-green-50 border border-green-200 rounded-lg px-3 py-2 flex items-center gap-2 min-w-max">
            <CheckCircle size={16} className="text-green-600" />
            <span className="text-xs font-semibold text-green-900">
              {shortenAddress(account)}
            </span>
          </div>

          {/* Network Indicator */}
          {!isNetworkCorrect && (
            <button
              onClick={switchToHardhat}
              disabled={isSwitchingNetwork}
              className="bg-orange-50 border border-orange-200 rounded-lg px-3 py-2 flex items-center gap-1 hover:bg-orange-100 transition text-xs font-semibold text-orange-700 disabled:opacity-50"
              title="Click to switch network"
            >
              {isSwitchingNetwork ? (
                <>
                  <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-orange-600"></div>
                </>
              ) : (
                <>
                  <AlertTriangle size={14} />
                  Switch Network
                </>
              )}
            </button>
          )}

          {/* Disconnect Button */}
          <button
            onClick={disconnectWallet}
            className="bg-red-50 hover:bg-red-100 border border-red-200 rounded-lg p-2 transition text-red-600"
            title="Disconnect wallet"
          >
            <LogOut size={16} />
          </button>
        </div>
      )}

      {/* Detailed Info Modal - Only show when connected */}
      {isConnected && (
        <div className="text-xs bg-gray-50 border border-gray-200 rounded-lg p-2 space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-gray-600">Balance:</span>
            <span className="font-semibold text-gray-900">{parseFloat(balance).toFixed(4)} ETH</span>
          </div>
          {network && (
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Network:</span>
              <span className={`font-semibold ${isNetworkCorrect ? 'text-green-700' : 'text-orange-700'}`}>
                {network.name} (Chain {network.chainId})
              </span>
            </div>
          )}
        </div>
      )}

      {/* Actions */}
      <div className="pt-1 flex gap-1">
      </div>
    </div>
  );
}

