'use client'
import { useAnimations, useGLTF } from "@react-three/drei";
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
        </group>
    );
};

export default Model;
