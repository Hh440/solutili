'use client'

import { ConnectionProvider,  WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets';

import '@solana/wallet-adapter-react-ui/styles.css';

import dynamic from 'next/dynamic';

const WalletBalance = dynamic(() => import('./component/WalletBalance'), { ssr: false });


const Wallet = ()=>{
    const wallets = [new PhantomWalletAdapter()];
    return (
        <ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/bN7nlZQIEly-Vv752sdL8zXX4-9Ygd-W'}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletModalProvider>
            <WalletBalance/>
            
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
        
    )
}

export default Wallet