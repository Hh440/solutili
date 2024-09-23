'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export function SolanaLiquidityPool() {
  const [amount1, setAmount1] = useState('')
  const [amount2, setAmount2] = useState('')
  const [token1, setToken1] = useState('SOL')
  const [token2, setToken2] = useState('USDC')

  const handleAddLiquidity = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(`Adding ${amount1} ${token1} and ${amount2} ${token2} to the pool`)
    setAmount1('')
    setAmount2('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600">
          Solana Liquidity Pool
        </h1>
        
        <Card className="bg-gray-800 border-gray-700">
          <CardHeader>
            <CardTitle className="text-2xl text-gray-100">Add Liquidity</CardTitle>
            <CardDescription className="text-gray-400">Provide liquidity to earn fees</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddLiquidity}>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="amount1" className="text-gray-300">First Token Amount</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="amount1" 
                      placeholder="Enter amount" 
                      value={amount1}
                      onChange={(e) => setAmount1(e.target.value)}
                      className="flex-grow bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    />
                    <Select value={token1} onValueChange={setToken1}>
                      <SelectTrigger className="w-[100px] bg-gray-700 border-gray-600 text-gray-100">
                        <SelectValue placeholder="Token" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="SOL">SOL</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="RAY">RAY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount2" className="text-gray-300">Second Token Amount</Label>
                  <div className="flex space-x-2">
                    <Input 
                      id="amount2" 
                      placeholder="Enter amount" 
                      value={amount2}
                      onChange={(e) => setAmount2(e.target.value)}
                      className="flex-grow bg-gray-700 border-gray-600 text-gray-100 placeholder-gray-400"
                    />
                    <Select value={token2} onValueChange={setToken2}>
                      <SelectTrigger className="w-[100px] bg-gray-700 border-gray-600 text-gray-100">
                        <SelectValue placeholder="Token" />
                      </SelectTrigger>
                      <SelectContent className="bg-gray-700 border-gray-600">
                        <SelectItem value="SOL">SOL</SelectItem>
                        <SelectItem value="USDC">USDC</SelectItem>
                        <SelectItem value="RAY">RAY</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-end space-x-2">
            <Button variant="ghost" className="text-gray-400 hover:text-gray-100 hover:bg-gray-700">
              Cancel
            </Button>
            <Button 
              onClick={handleAddLiquidity}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white"
            >
              Add Liquidity
            </Button>
          </CardFooter>
        </Card>

        <Alert  className="mt-6 bg-blue-900 border-blue-800 text-blue-100">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Information</AlertTitle>
          <AlertDescription className="text-blue-200">
            Adding liquidity requires a Solana wallet transaction. Ensure you have sufficient SOL for fees.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  )
}