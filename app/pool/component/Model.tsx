'use client'
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Group } from "next/dist/shared/lib/router/utils/route-regex";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';
const Model = ()=>{
    useGLTF('/media/wealth.glb')

    const group =useRef<THREE.Group>(null)


    const{nodes,animations,scene} = useGLTF('/media/wealth.glb')
    const action = useAnimations(animations,scene)


    const [time,setTime]= useState(0)

    const [isFlipping,setIsFlipping]= useState(false)

    useEffect(() => {
        if (nodes.Ground) {
          nodes.Ground.visible = false;  // Hide the ground
        }
      }, [nodes]);

      useFrame((state,delta)=>{
        nodes.Coin_05.rotation.x+=delta
      })


      useFrame((state,delta)=>{
        setTime(prevTime=>prevTime+delta)

        //Boouncing Effect

        // Ensure group.current is defined before accessing
    if (group.current && nodes.Coin_05) {
        // Bouncing effect

        const bounceAmplitude = 2;
        const bounceFrequency = 2;
        const bounceHeight = Math.sin(time * bounceFrequency) * bounceAmplitude;
  
        nodes.Coin_05.position.z += bounceHeight;
        nodes.Coin_03.position.z+=bounceHeight

        // Flipping effect
      const flipFrequency = 2;
      const flipRotation = Math.PI; // 180 degrees for flipping
      if (Math.abs(bounceHeight) > bounceAmplitude * 0.9) { // Near the top
        setIsFlipping(true);
      } else {
        setIsFlipping(false);
      }
      nodes.Coin_05.rotation.x = isFlipping ? Math.sin(time * flipFrequency) * flipRotation : 0;
    }
    
        
      })
    return(
        <group>
            <primitive ref={group} object={scene}/>
        
        </group>
    )
}

export default Model