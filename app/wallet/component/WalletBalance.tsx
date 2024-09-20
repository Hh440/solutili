'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { LAMPORTS_PER_SOL, SystemProgram, Transaction, PublicKey } from '@solana/web3.js'
import Connection from '@/app/Components/Connection';

export default function WalletBalance() {
  const [balance, setBalance] = useState<number>(0)
  const { connection } = useConnection()
  const wallet = useWallet()
  const [publickey, setPublicKey] = useState('')
  const [amount, setAmount] = useState('')

  if (!wallet.publicKey) {
    return (
      <Connection/>
    )
  }

  useEffect(() => {
    const getBalance = async () => {
      if (!wallet.publicKey) {
        setBalance(0)
        return
      }

      const balance = await connection.getBalance(wallet.publicKey);
      setBalance(balance / LAMPORTS_PER_SOL);
    };

    getBalance()
  }, [wallet.publicKey, connection])

  const maskPublicKey = (key: string) => {
    return `${key.slice(0, 4)} ${key.slice(4, 8)} ${key.slice(-5, -1)}`
  }

  const handleAirdrop = async () => {
    const airdropAmount = 1
    if (wallet.publicKey) {
      await connection.requestAirdrop(wallet.publicKey, airdropAmount * 1000000000)
    }
    alert("Airdrop Successful")
  }

  const handleTransaction = async () => {
    try {

      if (!wallet.publicKey) {
        alert("Wallet is not connected.");
        return;
      }
  
      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(publickey),
          lamports: Number(amount) * LAMPORTS_PER_SOL
        })
      )

      await wallet.sendTransaction(transaction, connection)
      alert("Sent " + amount + " SOL to " + publickey);
      window.location.reload();

    } catch (error) {
      console.error("Error sending tokens:", error);
      alert("Failed to send SOL. Please check the address and try again.");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-900 p-6">
      <div className="w-full max-w-lg space-y-10">
        <Card className="bg-gradient-to-r from-gray-800 to-gray-900 text-white overflow-hidden rounded-2xl shadow-xl border border-gray-700">
          <CardContent className="p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="space-y-2">
                <h2 className="text-xl font-bold text-gray-300">Solana Balance</h2>
                <p className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-blue-600">
                  {balance.toFixed(2)} SOL
                </p>
              </div>
              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-full p-3 w-14 h-14 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="w-8 h-8 text-white"
                >
                  <path d="M11.584 2.376a.75.75 0 01.832 0l9 6a.75.75 0 11-.832 1.248L12 3.901 3.416 9.624a.75.75 0 01-.832-1.248l9-6z" />
                  <path fillRule="evenodd" d="M20.25 10.332v9.918H21a.75.75 0 010 1.5H3a.75.75 0 010-1.5h.75v-9.918a.75.75 0 01.634-.74A49.109 49.109 0 0112 9c2.59 0 5.134.202 7.616.592a.75.75 0 01.634.74zm-7.5 2.418a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75zm3-.75a.75.75 0 01.75.75v6.75a.75.75 0 01-1.5 0v-6.75a.75.75 0 01.75-.75zM9 12.75a.75.75 0 00-1.5 0v6.75a.75.75 0 001.5 0v-6.75z" clipRule="evenodd" />
                  <path d="M12 7.875a1.125 1.125 0 100-2.25 1.125 1.125 0 000 2.25z" />
                </svg>
              </div>
            </div>
            <div className="mt-4 space-y-2">
              <div className="w-12 h-8 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-md"></div>
              <p className="font-mono text-lg tracking-wider text-gray-300">{maskPublicKey(wallet.publicKey.toString())}</p>
            </div>
            <div className="mt-6 flex justify-between items-end">
              <div>
                <p className="text-xs text-gray-500">Valid thru</p>
                <p className="text-sm font-semibold text-gray-300">NEVER</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-500">Network</p>
                <p className="text-sm font-semibold text-gray-300">SOLANA</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-between gap-4">
          <Button
            className="flex-1 bg-gradient-to-r from-green-400 via-teal-500 to-cyan-600 hover:from-green-500 hover:via-teal-600 hover:to-cyan-700 text-white rounded-lg py-3 transition-transform duration-300 transform hover:scale-105"
            onClick={handleAirdrop}
          >
            Airdrop 1 SOL
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-indigo-500 via-blue-600 to-purple-700 hover:from-indigo-600 hover:via-blue-700 hover:to-purple-800 text-white rounded-lg py-3 transition-transform duration-300 transform hover:scale-105"
            onClick={handleTransaction}
          >
            Send Transaction
          </Button>
        </div>

        <form className="space-y-6 mt-6" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label htmlFor="recipient" className="text-gray-300">Recipient Address</label>
            <input 
              id="recipient" 
              placeholder="Enter recipient's public key" 
              className="w-full bg-gray-800 text-white border-gray-700 rounded-md p-3 mt-1 focus:border-indigo-500 focus:ring-indigo-500" 
              onChange={(e) => setPublicKey(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="amount" className="text-gray-300">Amount (SOL)</label>
            <input 
              id="amount" 
              type="number" 
              placeholder="0.00" 
              className="w-full bg-gray-800 text-white border-gray-700 rounded-md p-3 mt-1 focus:border-indigo-500 focus:ring-indigo-500" 
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
        </form>
      </div>
    </div>
  )
}
