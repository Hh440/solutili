'use client'

import { useConnection, useWallet } from '@solana/wallet-adapter-react'
import { useState } from 'react'

export default function TokenCreationPage() {
  const [isFrozen, setIsFrozen] = useState(false)
  const {connection}= useConnection()
  const [name,setName]= useState('')
  const [symbol,setSymbol]= useState('')
  const [decimals, setDecimals] = useState(0)
  const [supply,setSupply]=useState('')
  const [uri,setUri]= useState('')
  const [description,setDescription]= useState('')
  const [type,setType]= useState('')
  const wallet = useWallet()


  const handleSumbit=()=>{
    console.log(name,symbol,decimals,uri,supply,description,type)
  }
  

  return (
    <div className="container mx-auto p-4 bg-gray-900 text-white min-h-screen">
      <div className="w-full max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Create New Token</h1>
          <p className="text-gray-400">Fill in the details to create your new token.</p>
        </div>
        <form >
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="name" className="text-gray-400">Token Name</label>
              <input id="name" className="p-2 rounded bg-gray-700 text-white" placeholder="Enter token name" onChange={(e)=>setName(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="symbol" className="text-gray-400">Token Symbol</label>
              <input id="symbol" className="p-2 rounded bg-gray-700 text-white" placeholder="Enter token symbol" onChange={(e)=>setSymbol(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="uri" className="text-gray-400">Token URI</label>
              <input id="uri" className="p-2 rounded bg-gray-700 text-white" placeholder="Enter token URI" onChange={(e)=>setUri(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="supply" className="text-gray-400">Initial Supply</label>
              <input id="supply" type="number" className="p-2 rounded bg-gray-700 text-white" placeholder="Enter initial supply" onChange={(e)=>setSupply(e.target.value)}/>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="decimals" className="text-gray-400">Decimals</label>
              <input id="decimals" type="number" className="p-2 rounded bg-gray-700 text-white" placeholder="Enter number of decimals" onChange={(e)=>setDecimals(e.target.value)}/>
            </div>

            {/* Cool Freeze Token Button */}
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => setIsFrozen(!isFrozen)}
                className={`relative px-6 py-3 rounded-lg text-white font-semibold shadow-lg transition-all duration-300
                  ${isFrozen ? 'bg-gradient-to-r from-blue-500 via-blue-300 to-blue-500' : 'bg-gray-600'}
                  hover:from-blue-400 hover:via-blue-200 hover:to-blue-400
                  ${isFrozen ? 'opacity-80' : 'opacity-100'}
                `}
                style={{
                  backdropFilter: 'blur(10px)',
                  border: isFrozen ? '2px solid rgba(255, 255, 255, 0.3)' : '2px solid transparent',
                }}
              >
                <span
                  className={`absolute inset-0 bg-blue-500 rounded-lg opacity-40 blur-lg transition-all duration-500
                    ${isFrozen ? 'animate-pulse' : 'opacity-0'}
                  `}
                ></span>
                {isFrozen ? 'Token Frozen' : 'Freeze Token'}
              </button>
            </div>

            <div className="flex flex-col space-y-1.5">
              <label htmlFor="tokenType" className="text-gray-400">Token Type</label>
              <select id="tokenType" className="p-2 rounded bg-gray-700 text-white"  value={type} onChange={(e)=>setType(e.target.value)}>
                <option value="" disabled>Select token type</option>
                <option value="fungible">Fungible</option>
                <option value="non-fungible">Non-Fungible (NFT)</option>
                <option value="semi-fungible">Semi-Fungible</option>
              </select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <label htmlFor="description" className="text-gray-400">Token Description</label>
              <textarea id="description" className="p-2 rounded bg-gray-700 text-white" placeholder="Enter token description" onChange={(e)=>setDescription(e.target.value)}/>
            </div>
          </div>
        </form>
        <div className="mt-6 flex justify-between">
          <button className="px-4 py-2 bg-gray-600 rounded text-white hover:bg-gray-700">Cancel</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 rounded text-white hover:bg-blue-700" onClick={handleSumbit}>Create Token</button>
        </div>
      </div>
    </div>
  )
}