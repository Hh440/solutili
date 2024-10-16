'use client'
import '@solana/wallet-adapter-react-ui/styles.css';

import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import Swaping from './component/Swaping';
const Pool= ()=>{
    return(

        <ConnectionProvider endpoint={'https://solana-mainnet.g.alchemy.com/v2/bN7nlZQIEly-Vv752sdL8zXX4-9Ygd-W'}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <Swaping/>
            
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

    )
}

export default Pool