'use client';
import React from 'react';

import '@solana/wallet-adapter-react-ui/styles.css';

import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import NavBar from '@/app/Components/NavBar';
import { HomePageComponent } from '@/components/home-page';




const Home = () => {
    return (
        <main className="w-full h-screen flex flex-row relative">
            {/* Navigation Bar */}
            <NavBar />
            <section className="flex flex-col  w-full gap-5 ml-20">
                <ConnectionProvider endpoint={'https://solana-mainnet.g.alchemy.com/v2/bN7nlZQIEly-Vv752sdL8zXX4-9Ygd-W'}>
                    <WalletProvider wallets={[]} autoConnect>
                        <WalletModalProvider>
                            <HomePageComponent />
                        </WalletModalProvider>
                    </WalletProvider>
                </ConnectionProvider>
            </section>    
        </main>
    );
};

export default Home;
