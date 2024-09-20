"use client"

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'


export default function Component() {
  const [mounted, setMounted] = useState(false)
 

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 0.8,
          delay: 0.5,
          ease: [0, 0.71, 0.2, 1.01]
        }}
        className="p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 260,
            damping: 20
          }}
          className="flex items-center justify-center mb-4"
        >
          <CheckCircle className="w-16 h-16 text-green-500" />
        </motion.div>
        <h1 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-gray-100">
          Token Successfully Created!
        </h1>
        <p className="text-center text-gray-600 dark:text-gray-300">
          Your token has been generated and is ready to use.
        </p>
      </motion.div>
      
    </div>
  )
}