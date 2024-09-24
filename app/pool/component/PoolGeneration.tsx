

'use client'
import { useEffect, useRef, useState } from 'react';
import Money from './Money';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import {TokenSwap} from '@solana/spl-token-swap'
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';


const PoolGeneration = () => {
    const [isFormVisible, setIsFormVisible] = useState(true);
    const formRef = useRef<HTMLDivElement>(null);

    const wallet = useWallet()
    const connection = useConnection()

    const [amount1, setAmount1] = useState('')
    const [amount2, setAmount2] = useState('')
    const [token1, setToken1] = useState('')
    const [token2, setToken2] = useState('')
  
    const handleAddLiquidity = async(e: React.FormEvent) => {
      e.preventDefault()
      console.log(amount1,amount2)


        
     // createInitSwapInstruction
      
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (formRef.current && !formRef.current.contains(event.target as Node)) {
                setIsFormVisible(false);
            }
        };

        const handleFormClick = (event: MouseEvent) => {
            event.stopPropagation(); // Prevent click from propagating to the background
        };

        document.addEventListener('mousedown', handleClickOutside);
        if (formRef.current) {
            formRef.current.addEventListener('click', handleFormClick);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            if (formRef.current) {
                formRef.current.removeEventListener('click', handleFormClick);
            }
        };
    }, []);

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if (!isFormVisible) {
            timer = setTimeout(() => {
                setIsFormVisible(true);
            }, 1000); 
        }

        return () => {
            if (timer) {
                clearTimeout(timer);
            }
        };
    }, [isFormVisible]);

    return (
        <div className='relative w-full h-screen overflow-hidden'>
            {/* Money model in the background */}
            <div className='absolute inset-0 w-full h-full z-0'>
                <Money /> {/* Adjust scale as needed */}
            </div>
    
            {/* Dark overlay on top of the Money model */}
            <div className='absolute inset-0 bg-black opacity-40 z-10'></div>
    
            {/* Container for the form */}
            {isFormVisible && (
                <div className="absolute z-30 w-full h-full flex items-center justify-center">
                    <div className="w-full max-w-md">
                        <h1 className="text-4xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-cyan-600">
                            Solana Liquidity Pool
                        </h1>
    
                        <Card className="bg-[rgba(255, 255, 255, 0.05)] backdrop-blur-lg border border-gray-600 shadow-lg">
                            <CardHeader>
                                <CardTitle className="text-2xl text-gray-100">Add Liquidity</CardTitle>
                                <CardDescription className="text-gray-300">Provide liquidity to earn fees</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleAddLiquidity}>
                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="amount1" className="text-gray-300">First Token Amount</Label>
                                            <div className="space-y-2">
                                                <Input 
                                                    id="amount1" 
                                                    placeholder="Enter amount" 
                                                    value={amount1}
                                                    onChange={(e) => setAmount1(e.target.value)}
                                                    className="bg-[rgba(255, 255, 255, 0.1)] border-gray-500 text-black placeholder-gray-400 backdrop-blur-lg"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="token1" className="text-gray-300">First Token Symbol</Label>
                                            <Input 
                                                id="token1" 
                                                placeholder="Enter token symbol (e.g. SOL)" 
                                                value={token1}
                                                onChange={(e) => setToken1(e.target.value)}
                                                className="bg-[rgba(255, 255, 255, 0.1)] border-gray-500 text-black placeholder-gray-400 backdrop-blur-lg"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="amount2" className="text-gray-300">Second Token Amount</Label>
                                            <div className="space-y-2">
                                                <Input 
                                                    id="amount2" 
                                                    placeholder="Enter amount" 
                                                    value={amount2}
                                                    onChange={(e) => setAmount2(e.target.value)}
                                                    className="bg-[rgba(255, 255, 255, 0.1)] border-gray-500 text-black placeholder-gray-400 backdrop-blur-lg"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="token2" className="text-gray-300">Second Token Symbol</Label>
                                            <Input 
                                                id="token2" 
                                                placeholder="Enter token symbol (e.g. USDC)" 
                                                value={token2}
                                                onChange={(e) => setToken2(e.target.value)}
                                                className="bg-[rgba(255, 255, 255, 0.1)] border-gray-500 text-black placeholder-gray-400 backdrop-blur-lg"
                                            />
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
    
                        <Alert className="mt-6 bg-blue-900 border-blue-800 text-blue-100">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Information</AlertTitle>
                            <AlertDescription className="text-blue-200">
                                Adding liquidity requires a Solana wallet transaction. Ensure you have sufficient SOL for fees.
                            </AlertDescription>
                        </Alert>
                    </div>
                </div>
            )}
        </div>
        );

    
    
};

export default PoolGeneration;
