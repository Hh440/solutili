import { Canvas, useThree } from "@react-three/fiber";
import { MeshTransmissionMaterial, OrbitControls, Text3D, Float, Environment, Stars, Sparkles } from "@react-three/drei";
import { Suspense, useRef } from "react";
import Model from './Model';
import * as THREE from 'three'
import { Physics } from "@react-three/cannon";








const Earth = () => {
 

  return (
    <div className="w-full h-full">
      <Canvas gl={{ antialias: true }} camera={{position:[0,0,6],fov:75}}  >
        {/* Light sources for the scene */}
        
        
        <Physics gravity={[0,-9.8,0]}>

        
        {/* Suspense for the Model as well */}
        <Suspense fallback={"Loading Model..."}>
          <Model />
        </Suspense>

      </Physics>

        {/* Environment and Orbit Controls */}
        <Environment preset="city" />
        <OrbitControls dampingFactor={1} />
        <Stars
          radius={300}
          depth={100}
          count={400000}
          factor={4}
          saturation={0}
          fade
          speed={0.2}
        />
        
        
      </Canvas>
    </div>
  );
};

export default Earth;
