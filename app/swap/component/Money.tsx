'use client'
import { Canvas } from '@react-three/fiber'
import { OrbitControls,Environment} from '@react-three/drei'
import Model from './Model'
import { Suspense } from 'react'

const Money = () => {
  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-900 via-gray-800 to-black   scale-100">
      <Canvas camera={{ position: [0, 0, 6], fov: 90 }} gl={{ antialias: true }}>
       
        <OrbitControls />
        
        <directionalLight  position={[0, 0, 6]}  intensity={3} />
        <Suspense>
          <Model/>
        </Suspense>
        
      </Canvas>
    </div>
  )
}

export default Money
