'use client'
import { Environment, MeshReflectorMaterial, useAnimations, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from 'three';

const Model = () => {
    const group = useRef<THREE.Group>(null);

    
    const { nodes, animations, scene } = useGLTF('/media/wealth.glb');
    const { actions } = useAnimations(animations, scene);

    

    useEffect(() => {
        
        if (nodes.Ground) {
          nodes.Ground.visible = false;
        }

        
        const goldMaterial = new THREE.MeshStandardMaterial({
            color: '#F7E7CE', 
            metalness: 1,
            roughness: 0.4,
        });

        
        scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
              const mesh = child as THREE.Mesh;
              mesh.material = goldMaterial;
          }
      });
       
        if (actions) {
          Object.values(actions).forEach((action) => {
              if (action) action.play(); 
          });
      }
    }, [nodes, scene, actions]);

    
   
    return (
        <group ref={group} position={[-1,-4,0]} scale={[4, 4, 4]}>
            <primitive object={scene} />
            <mesh position-y={-0.00} rotation-x={-Math.PI/2}>
                <planeGeometry args={[100,100]}/>
                <MeshReflectorMaterial
                blur={[100, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={10}
                roughness={1}
                depthScale={1}
                opacity={0.5}
                transparent
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#333"
                metalness={0.5}
                mirror={1}
                
                />
                <Environment preset="park"/>
            </mesh>
        </group>
    );
};

export default Model;
