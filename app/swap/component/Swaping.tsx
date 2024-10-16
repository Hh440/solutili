'use client';
import { useEffect, useRef, useState } from 'react';
import Money from './Money';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowDownUp } from "lucide-react";
import { useWallet } from '@solana/wallet-adapter-react';
import { Connection, VersionedTransaction } from '@solana/web3.js';
import axios from 'axios';
import Locked from '@/app/Components/Connection';

const Swaping = () => {
    const SOL_MINT = 'So11111111111111111111111111111111111111112'; // SOL Mint Address
    const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v'; // USDC Mint Address

    const [isFormVisible, setIsFormVisible] = useState(true);
    const formRef = useRef<HTMLDivElement>(null);
    const wallet = useWallet();
    const connection = new Connection('https://solana-mainnet.g.alchemy.com/v2/bN7nlZQIEly-Vv752sdL8zXX4-9Ygd-W');

    const lamports = 1000000000000;
    const [amount1, setAmount1] = useState('');
    const [amount2, setAmount2] = useState('');
    const [token1, setToken1] = useState('');
    const [token2, setToken2] = useState('');
    const [token1Mint, setToken1Mint] = useState('');
    const [token2Mint, setToken2Mint] = useState('');
    const [isWalletConnected, setIsWalletConnected] = useState(false); // Track wallet connection


    
    useEffect(() => {
        if (wallet.publicKey) {
            setIsWalletConnected(true);
        } else {
            setIsWalletConnected(false);
        }
    }, [wallet.publicKey]);

    useEffect(() => {
        const mintMap:any = {
            sol: SOL_MINT,
            usdc: USDC_MINT,
        };
        setToken1Mint(mintMap[token1] || '');
        setToken2Mint(mintMap[token2] || '');
    }, [token1, token2]);

    const handleClick = async () => {
        try {
            const amountInSmallestUnit = (parseFloat(amount1) * 1e9).toString();
            console.log(`Requesting swap: ${token1Mint} -> ${token2Mint} for amount: ${amountInSmallestUnit}`);

            const response = await axios.get(`https://quote-api.jup.ag/v6/quote?inputMint=${token1Mint}&outputMint=${token2Mint}&amount=${amountInSmallestUnit}&slippageBps=50`);
            const quoteResponse = response.data;

            if (token2 === 'usdc') {
                setAmount2((quoteResponse.outAmount / 1e6).toFixed(6).toString());
            } else if (token2 === 'sol') {
                setAmount2((quoteResponse.outAmount / lamports).toFixed(7).toString());
            }

            

            const swapResponse = await axios.post('https://quote-api.jup.ag/v6/swap', {
                quoteResponse,
                userPublicKey: wallet.publicKey?.toString()
            });

            console.log('Swap response:', swapResponse.data); // Log response from swap API


            const swapTransaction = swapResponse.data.swapTransaction;
            const swapTransactionBuf = Buffer.from(swapTransaction, 'base64');
            const transaction = VersionedTransaction.deserialize(swapTransactionBuf);

            if (wallet.signTransaction) {
                const signedTransaction = await wallet.signTransaction(transaction);

                const latestBlockHash = await connection.getLatestBlockhash();
                const txid = await connection.sendRawTransaction(signedTransaction.serialize(), {
                    skipPreflight: true,
                    maxRetries: 2
                });

                await connection.confirmTransaction({
                    blockhash: latestBlockHash.blockhash,
                    lastValidBlockHeight: latestBlockHash.lastValidBlockHeight,
                    signature: txid
                });
                console.log('Transaction ID:', txid);
            } else {
                console.error("Wallet is not available or signTransaction method is undefined");
            }
        } catch (error) {
            console.error('Error fetching quote:', error);
        }
    };

    if (!isWalletConnected) {
        return <Locked />;
    }

  

    return (
        <div className='relative w-full h-screen overflow-hidden'>
            <div className='absolute inset-0 w-full h-full z-0'>
                <Money />
            </div>
            <div className='absolute inset-0 bg-black opacity-40 z-10'></div>
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
                                                <SelectItem value="sol">SOL</SelectItem>
                                                <SelectItem value="usdc">USDC</SelectItem>
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
                                        <div
                                            id="to-amount"
                                            className="bg-gray-700 border-gray-600 text-gray-100 p-2 rounded-md flex h-10 w-full  border  bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                        >
                                            {amount2 ? amount2 : "0.00"}
                                        </div>
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
