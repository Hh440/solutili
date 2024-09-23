'use client'
import { useEffect, useRef, useState } from 'react';
import Money from './component/Money';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { SolanaJSONRPCErrorCode } from '@solana/web3.js';
import { SolanaLiquidityPool } from '@/components/solana-liquidity-pool-input';


const Pool = () => {
    const [isFormVisible, setIsFormVisible] = useState(true);
    const formRef = useRef<HTMLDivElement>(null);

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
        <div className="relative w-full h-screen overflow-hidden">
    {/* Money model in the foreground */}
    <div className="absolute inset-0 w-full h-full z-10">
        <Money /> {/* Adjust scale as needed */}
    </div>
    
    {/* Dark overlay on top of the Money model */}
    <div className="absolute inset-0 bg-black opacity-50 z-20"></div>

    {/* Container for the form */}
    {isFormVisible && (
        <SolanaLiquidityPool/>
    )}
</div>

    );
};

export default Pool;
