'use client'
import { useEffect, useRef, useState } from 'react';
import Money from './Money';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowDownUp } from "lucide-react"
import { useWallet } from '@solana/wallet-adapter-react';
import { TokenSwap } from '@solana/spl-token-swap';
import { Connection, Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import axios from 'axios'

const Swaping = () => {
const SOL_MINT = 'So11111111111111111111111111111111111111112'; // SOL Mint Address
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC Mint Address

const [isFormVisible, setIsFormVisible] = useState(true);
const formRef = useRef<HTMLDivElement>(null);

const wallet = useWallet();
const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/bN7nlZQIEly-Vv752sdL8zXX4-9Ygd-W')

const lamports = 100000000;

const [amount1, setAmount1] = useState('');
const [amount2, setAmount2] = useState('');
const [token1, setToken1] = useState('');
const [token2, setToken2] = useState('');
const [token1Mint,setToken1Mint]= useState('')
const [token2Mint,setToken2Mint]= useState('')


useEffect(() => {
if (token1 === 'sol') {
setToken1Mint(SOL_MINT);
} else if (token1 === 'usdc') {
setToken1Mint(USDC_MINT);
}

if (token2 === 'sol') {
setToken2Mint(SOL_MINT);
} else if (token2 === 'usdc') {
setToken2Mint(USDC_MINT);
}
}, [token1, token2]);

// Handle click event
const handleClick = async () => {
try {
const amountInSmallestUnit = (parseFloat(amount1) * 1e9).toString();

console.log(`Requesting swap: ${token1Mint} -> ${token2Mint} for amount: ${amountInSmallestUnit}`);

const response = await axios.get(`https://quote-api.jup.ag/v6/quote?inputMint=${token1Mint}&outputMint=${token2Mint}&amount=${amountInSmallestUnit}&slippageBps=50`);

const quoteResponse = response.data;
 
if (token2 === 'USDC') {
    setAmount2(parseFloat(quoteResponse.outAmount / 1e6).toFixed(6));
  } else if (token2 === 'sol') {
    setAmount2(parseFloat(quoteResponse.outAmount / lamports).toFixed(9));
  }
console.log(quoteResponse.outAmount);


} catch (error) {
console.error('Error fetching quote:',error);
}
};




useEffect(() => {
const handleClickOutside = (event: MouseEvent) => {
if (formRef.current && !formRef.current.contains(event.target as Node)) {
setIsFormVisible(true);
}
};

document.addEventListener('mousedown', handleClickOutside);

return () => {
document.removeEventListener('mousedown', handleClickOutside);
};
}, []);

return (
<div className='relative w-full h-screen overflow-hidden'>
{/* Money model in the background */}
<div className='absolute inset-0 w-full h-full z-0'>
<Money />
</div>

<div className='absolute inset-0 bg-black opacity-40 z-10'></div>

{/* Container for the form */}
{isFormVisible && (
<div ref={formRef} className="absolute inset-0 flex items-center justify-center z-30">
<div className="bg-gray-900 bg-opacity-60 text-gray-100 py-8 px-4 sm:px-6 lg:px-8 w-[500px]">
<div className="max-w-md mx-auto">
<h1 className="text-2xl font-bold text-center mb-8">Solana Token Swap</h1>
<Card className="bg-gray-800 bg-opacity-70 border-gray-700">
<CardHeader>
<CardTitle className="text-xl text-gray-100">Swap Tokens</CardTitle>
<CardDescription className="text-gray-400">Exchange SOL for USDC or vice versa</CardDescription>
</CardHeader>
<CardContent className="space-y-4">
<div className="space-y-2">
<Label htmlFor="from-token" className="text-gray-300">From</Label>
<Select
onValueChange={(value) => {
setToken1(value);
if (token2 === value) setToken2(''); // Reset the second token if it's the same
}}
>
<SelectTrigger id="from-token" className="bg-gray-700 border-gray-600">
<SelectValue placeholder="Select token" />
</SelectTrigger>
<SelectContent className="bg-gray-700 border-gray-600">
<SelectItem value="sol" disabled={token2 === 'sol'}>SOL</SelectItem>
<SelectItem value="usdc" disabled={token2 === 'usdc'}>USDC</SelectItem>
</SelectContent>
</Select>
<Input
id="from-amount"
placeholder="0.00"
className="bg-gray-700 border-gray-600 text-gray-100"
onChange={(e) => setAmount1(e.target.value)}
/>
</div>
<div className="flex justify-center">
<Button variant="outline" size="icon" className="rounded-full bg-gray-700 border-gray-600 hover:bg-gray-600">
<ArrowDownUp className="h-4 w-4" />
</Button>
</div>
<div className="space-y-2">
<Label htmlFor="to-token" className="text-gray-300">To</Label>
<Select
onValueChange={(value) => {
setToken2(value);
if (token1 === value) setToken1(''); // Reset the first token if it's the same
}}
>
<SelectTrigger id="to-token" className="bg-gray-700 border-gray-600">
<SelectValue placeholder="Select token" />
</SelectTrigger>
<SelectContent className="bg-gray-700 border-gray-600">
<SelectItem value="sol" disabled={token1 === 'sol'}>SOL</SelectItem>
<SelectItem value="usdc" disabled={token1 === 'usdc'}>USDC</SelectItem>
</SelectContent>
</Select>
<Input
id="to-amount"
placeholder="0.00"
className="bg-gray-700 border-gray-600 text-gray-100"
value={amount2}
onChange={(e)=>setAmount2(e.target.value)}
/>
</div>
</CardContent>
<CardFooter>
<Button
className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
onClick={handleClick}
>
Swap
</Button>
</CardFooter>
</Card>
<div className="mt-8 space-y-4 text-sm text-gray-400">
<p>Exchange Rate: 1 SOL = 22.54 USDC</p>
<p>Network Fee: 0.000005 SOL</p>
<p>Slippage Tolerance: 0.5%</p>
</div>
</div>
</div>
</div>
)}
</div>
);
};

export default Swaping;