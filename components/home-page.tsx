'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Wallet, Coins, Droplet, Zap, ChevronRight } from 'lucide-react'
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react'
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { PhantomWalletAdapter } from '@solana/wallet-adapter-wallets' // Add wallet adapters here

interface FeatureCardProps {
  title: string
  description: string
  icon: React.ReactNode
}

const WalletMultiButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletMultiButton),
  { ssr: false }
)
const WalletDisconnectButton = dynamic(
  () => import('@solana/wallet-adapter-react-ui').then((mod) => mod.WalletDisconnectButton),
  { ssr: false }
)

export function HomePageComponent() {
  const router = useRouter()

  const handleToken = () => {
    router.push(`/collect`)
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-100">
      <header className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 py-6 px-8 flex justify-between items-center shadow-lg">
        <h1 className="text-3xl font-bold flex items-center space-x-2">
          <Coins className="text-yellow-500 animate-spin-slow" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-gray-400 to-gray-300">
            DeFi Platform
          </span>
        </h1>
        <ConnectionProvider endpoint={'https://solana-devnet.g.alchemy.com/v2/bN7nlZQIEly-Vv752sdL8zXX4-9Ygd-W'}>
          <WalletProvider wallets={[new PhantomWalletAdapter()]} autoConnect>
            <WalletModalProvider>
              <div className="flex items-center space-x-4 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 px-6 py-3 rounded-lg shadow-xl">
                <WalletMultiButton className="wallet-button bg-indigo-600 hover:bg-indigo-700 transition-all duration-300" />
                <WalletDisconnectButton className="wallet-button bg-red-600 hover:bg-red-700 transition-all duration-300" />
              </div>
            </WalletModalProvider>
          </WalletProvider>
        </ConnectionProvider>
      </header>

      <main className="container mx-auto px-6 py-12 flex-grow">
        <section className="mb-12 text-center">
          <h2 className="text-5xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            Welcome to Our DeFi Platform
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Create your own tokens, set up liquidity pools, and airdrop SOL into accounts with ease.
          </p>
        </section>

        <div className="grid md:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="h-10 w-10 text-yellow-500" />}
            title="Create Your Token"
            description="Launch your own custom token with just a few clicks. Set name, symbol, and initial supply."
          />
          <FeatureCard
            icon={<Droplet className="h-10 w-10 text-blue-500" />}
            title="Liquidity Pools"
            description="Set up and manage liquidity pools to enable trading for your token."
          />
          <FeatureCard
            icon={<Wallet className="h-10 w-10 text-green-500" />}
            title="SOL Airdrop"
            description="Easily airdrop SOL to multiple accounts to kickstart your project."
          />
        </div>

        <section className="mt-16 text-center">
          <h3 className="text-3xl font-semibold mb-6 text-gray-100">Ready to Get Started?</h3>
          <Button
            size="lg"
            className="bg-gradient-to-r from-blue-600 to-teal-700 hover:from-blue-700 hover:to-teal-800 transition-all duration-300 px-8 py-4 rounded-full shadow-lg transform hover:scale-105"
            onClick={handleToken}
          >
            Create Token <ChevronRight className="ml-2" />
          </Button>
        </section>
      </main>

      <footer className="bg-gradient-to-r from-gray-800 via-black to-gray-800 py-6 mt-auto">
        <div className="container mx-auto text-center text-gray-400">
          <p>&copy; 2023 DeFi Platform. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="#" className="hover:text-gray-200">Terms</a>
            <a href="#" className="hover:text-gray-200">Privacy</a>
            <a href="#" className="hover:text-gray-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <Card className="bg-gradient-to-r from-gray-800 via-gray-900 to-black border border-gray-700 hover:border-purple-500 transition-colors duration-300 hover:shadow-lg transform hover:scale-105">
      <CardHeader className="text-center">
        <CardTitle className="flex justify-center items-center space-x-3 text-gray-100">
          {icon}
          <span className="text-lg font-semibold">{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-400">{description}</p>
      </CardContent>
    </Card>
  )
}
