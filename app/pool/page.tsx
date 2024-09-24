'use client'
import '@solana/wallet-adapter-react-ui/styles.css';

import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import PoolGeneration from './component/PoolGeneration';
const Pool= ()=>{
    return(

        <ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/bN7nlZQIEly-Vv752sdL8zXX4-9Ygd-W'}>
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <PoolGeneration/>
            
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>

    )
}

export default Pool