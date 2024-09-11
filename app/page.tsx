'use client';
import React from 'react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';
import Wallet from './collect/page';


const Home = () => {
    

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white">
            <ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/bN7nlZQIEly-Vv752sdL8zXX4-9Ygd-W'}>
                <WalletProvider wallets={[]} autoConnect>
                    <WalletModalProvider>
                        
                        <div className="flex justify-between items-center bg-gray-800 py-4 px-6 shadow-lg">
                            <h1 className="text-3xl font-bold text-blue-400">Solana Wallet App</h1>
                            <div className="flex space-x-4">
                                <WalletMultiButton className="wallet-button" />
                                <WalletDisconnectButton className="wallet-button bg-red-600 hover:bg-red-700" />
                            </div>
                        </div>

                        {/* Main Content */}
                        <div className="container mx-auto mt-12 px-4">
                            <div className="p-8 bg-gray-800 rounded-lg shadow-lg max-w-3xl mx-auto">
                               

                                <Wallet />
                            </div>
                        </div>
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        </div>
    );
};

export default Home;
