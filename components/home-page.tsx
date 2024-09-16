'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Coins, Droplet, Zap, ChevronRight } from 'lucide-react'
import { ConnectionProvider, useWallet, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'

interface FeatureCardProps{
  title: string,
  description: string,
  icon: any,
}

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
);
const WalletDisconnectButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletDisconnectButton),
  { ssr: false }
);

export function HomePageComponent() {
  const [isConnected, setIsConnected] = useState(false)
  const router= useRouter()
  const wallet = useWallet()

  const handleConnect = () => {
    // Implement your wallet connection logic here
    setIsConnected(!isConnected)
  }

  const handleToken =()=>{
    router.push(`/collect`)

  }


  return (
    <div className="h-screen bg-gray-900 text-gray-100">
      <header className="bg-gray-800 py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold flex items-center">
          <Coins className="mr-2 text-yellow-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-500 to-stone-600">
            DeFi Platform
          </span>
        </h1>
        <ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/bN7nlZQIEly-Vv752sdL8zXX4-9Ygd-W'}>
                    <WalletProvider wallets={[]} autoConnect>
                        <WalletModalProvider>
                            <div className="flex justify-between items-center bg-gray-800 py-4 px-6 shadow-lg rounded-lg">
                                <div className="flex space-x-4">
                                    <WalletMultiButton className="wallet-button" />
                                    <WalletDisconnectButton className="wallet-button bg-red-600 hover:bg-red-700" />
                                </div>
                            </div>    
                        </WalletModalProvider>
                    </WalletProvider>
         </ConnectionProvider>
      </header>

      <main className="container mx-auto px-4 py-8">
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to Our DeFi Platform</h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Create your own tokens, set up liquidity pools, and airdrop SOL into accounts with ease.
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="h-8 w-8 text-yellow-500" />}
            title="Create Your Token"
            description="Launch your own custom token with just a few clicks. Set name, symbol, and initial supply."
          />
          <FeatureCard
            icon={<Droplet className="h-8 w-8 text-blue-500" />}
            title="Liquidity Pools"
            description="Set up and manage liquidity pools to enable trading for your token."
          />
          <FeatureCard
            icon={<Wallet className="h-8 w-8 text-green-500" />}
            title="SOL Airdrop"
            description="Easily airdrop SOL to multiple accounts to kickstart your project."
          />
        </div>

        <section className="mt-16 text-center">
          <h3 className="text-2xl font-semibold mb-4">Ready to Get Started?</h3>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-500 to-zinc-600 hover:from-blue-600 hover:to-zinc-700 transition-all duration-300"
            onClick={handleToken}
          >
            Create Token <ChevronRight className="ml-2" />
          </Button>
        </section>
      </main>

      <footer className="bg-gray-800 py-6 px-4 mt-44">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2023 DeFi Platform. All rights reserved.</p>
          <div className="mt-2">
            <a href="#" className="hover:text-gray-100 mx-2">Terms of Service</a>
            <a href="#" className="hover:text-gray-100 mx-2">Privacy Policy</a>
            <a href="#" className="hover:text-gray-100 mx-2">Contact Us</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }:FeatureCardProps) {
  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-purple-500 transition-colors duration-300">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          {icon}
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}