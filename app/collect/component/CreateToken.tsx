'use client'

import { createInitializeMetadataPointerInstruction, createInitializeInstruction, createInitializeMintInstruction, getAssociatedTokenAddressSync, createMintToInstruction, ExtensionType, createAssociatedTokenAccountInstruction, getMintLen, LENGTH_SIZE, MINT_SIZE, TOKEN_2022_PROGRAM_ID, TYPE_SIZE } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';
import { Keypair, SystemProgram, Transaction } from '@solana/web3.js';
import { useState } from 'react';
import { WalletSendTransactionError } from '@solana/wallet-adapter-base';
import { pack } from '@solana/spl-token-metadata';

import Connection from '@/app/Components/Connection';

export default function TokenCreationPage() {
  const [isFrozen, setIsFrozen] = useState(false);
  const { connection } = useConnection();
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [decimals, setDecimals] = useState('');
  const [supply, setSupply] = useState('');
  const [uri, setUri] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const wallet = useWallet();

  if (!wallet.publicKey) {
    return <Connection/>
  }

  const handleSumbit = async () => {
    try {
      if (!wallet.connected || !wallet.publicKey) {
        return alert("Wallet is not connected");
      }
      console.log(name, symbol, decimals, supply, uri, description);

      const mintkeyPair = Keypair.generate();
      const metaData = {
        mint: mintkeyPair.publicKey,
        name: name,
        symbol: symbol,
        uri: uri,
        additionalMetadata: [],
      };

      const mintLen = getMintLen([ExtensionType.MetadataPointer]);
      const metadataLen = TYPE_SIZE + LENGTH_SIZE + pack(metaData).length;
      const lamports = await connection.getMinimumBalanceForRentExemption(mintLen + metadataLen);

      if (!wallet.publicKey) {
        return alert('wallet is connected');
      }

      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: wallet.publicKey,
          newAccountPubkey: mintkeyPair.publicKey,
          space: mintLen,
          lamports,
          programId: TOKEN_2022_PROGRAM_ID,
        }),
        createInitializeMetadataPointerInstruction(
          mintkeyPair.publicKey,
          wallet.publicKey,
          mintkeyPair.publicKey,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeMintInstruction(
          mintkeyPair.publicKey,
          Number(decimals),
          wallet.publicKey,
          null,
          TOKEN_2022_PROGRAM_ID
        ),
        createInitializeInstruction({
          programId: TOKEN_2022_PROGRAM_ID,
          mint: mintkeyPair.publicKey,
          metadata: mintkeyPair.publicKey,
          name: metaData.name,
          symbol: metaData.symbol,
          uri: metaData.uri,
          mintAuthority: wallet.publicKey,
          updateAuthority: wallet.publicKey,
        })
      );

      transaction.feePayer = wallet.publicKey;
      transaction.recentBlockhash = (await connection.getLatestBlockhash()).blockhash;

      transaction.partialSign(mintkeyPair);

      await wallet.sendTransaction(transaction, connection, { signers: [mintkeyPair] });
      alert('Associating the token');

      const associatedToken = getAssociatedTokenAddressSync(
        mintkeyPair.publicKey,
        wallet.publicKey,
        false,
        TOKEN_2022_PROGRAM_ID
      );

      console.log(associatedToken.toBase58());

      const transaction2 = new Transaction().add(
        createAssociatedTokenAccountInstruction(
          wallet.publicKey,
          associatedToken,
          wallet.publicKey,
          mintkeyPair.publicKey,
          TOKEN_2022_PROGRAM_ID
        )
      );
      await wallet.sendTransaction(transaction2, connection);

      const transaction3 = new Transaction().add(
        createMintToInstruction(
          mintkeyPair.publicKey,
          associatedToken,
          wallet.publicKey,
          Number(supply),
          [],
          TOKEN_2022_PROGRAM_ID
        )
      );

      await wallet.sendTransaction(transaction3, connection);

      alert('Token Minted Successfully');
    } catch (error: any) {
      console.error("Error in handleSubmit:", error);
      console.log(error.message);
      console.log(error.stack);
      alert("An unexpected error occurred. Please check the console for details.");
    }
  }

  return (
    <>
      <div className="relative min-h-screen flex flex-col items-center justify-center text-white">
        {/* Background iframe */}
        <iframe 
          src="https://hh440.github.io/glow/"
          title="3D Background"
          className="absolute inset-0 w-full h-full z-[-1]"
          style={{ border: 'none', zIndex: -1 }}
        />

        <div className="w-full max-w-2xl bg-gray-800 bg-opacity-70 rounded-lg shadow-2xl p-8 relative">
          <h1 className="text-3xl font-bold mb-6 text-center">Create Your Token</h1>
          <form className="space-y-5">
            <div className="flex items-center justify-between space-x-4">
              <label htmlFor="name" className="text-sm text-gray-400 w-1/4">Token Name</label>
              <input
                id="name"
                className="w-3/4 p-3 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter token name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <label htmlFor="symbol" className="text-sm text-gray-400 w-1/4">Token Symbol</label>
              <input
                id="symbol"
                className="w-3/4 p-3 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter token symbol"
                onChange={(e) => setSymbol(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <label htmlFor="uri" className="text-sm text-gray-400 w-1/4">Token URI</label>
              <input
                id="uri"
                className="w-3/4 p-3 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter token URI"
                onChange={(e) => setUri(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <label htmlFor="supply" className="text-sm text-gray-400 w-1/4">Initial Supply</label>
              <input
                id="supply"
                type="number"
                className="w-3/4 p-3 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter initial supply"
                onChange={(e) => setSupply(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <label htmlFor="decimals" className="text-sm text-gray-400 w-1/4">Decimals</label>
              <input
                id="decimals"
                type="number"
                className="w-3/4 p-3 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter number of decimals"
                onChange={(e) => setDecimals(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-between space-x-4">
              <label htmlFor="tokenType" className="text-sm text-gray-400 w-1/4">Token Type</label>
              <select
                id="tokenType"
                className="w-3/4 p-3 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={type}
                onChange={(e) => setType(e.target.value)}
              >
                <option value="" disabled>Select token type</option>
                <option value="fungible">Fungible</option>
                <option value="non-fungible">Non-Fungible (NFT)</option>
                <option value="semi-fungible">Semi-Fungible</option>
              </select>
            </div>

            <div className="flex items-center justify-between space-x-4">
              <label htmlFor="description" className="text-sm text-gray-400 w-1/4">Description</label>
              <textarea
                id="description"
                className="w-3/4 p-3 rounded bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter token description"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="flex items-center justify-center space-x-4 mt-6">
              <button
                type="button"
                onClick={() => setIsFrozen(!isFrozen)}
                className={`px-6 py-3 rounded-lg font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 
                ${isFrozen ? 'bg-blue-500' : 'bg-gray-600'}
              `}
              >
                {isFrozen ? 'Token Frozen' : 'Freeze Token'}
              </button>
            </div>

            <div className="flex justify-end space-x-4 mt-6">
              <button className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all duration-200">Cancel</button>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 transition-all duration-200"
                onClick={handleSumbit}
              >
                Create Token
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
