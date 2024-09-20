import { useAnimations, useGLTF, Text } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const Model = () => {
  const group = useRef<THREE.Group>(null);
  const textGroup = useRef<THREE.Group>(null); // Group for all text components
  const { nodes, animations, scene } = useGLTF("/media/earth.glb");
  const { actions } = useAnimations(animations, group);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        if (action) {
          action.play();
        }
      });
    }
  }, [actions]);

  useFrame((state, delta) => {
    setAngle((prevAngle) => prevAngle + delta * 0.5);
    
    const radius = 2;
    const x = radius * Math.sin(angle);
    const z = radius * Math.cos(angle);

    if (textGroup.current) {
      textGroup.current.position.set(x, 0, z);
      textGroup.current.lookAt(0, 0, 0); // Rotate the whole text group to face the center
      textGroup.current.rotation.y += delta * 0.5; // Adjust the rotation speed for all text
    }
  });

  return (
    <group ref={group} scale={[2, 2, 2]} position={[0, 0.5, 0]}>
      <group ref={textGroup}> 
        
        <Text
          font={'/PPNeueMontreal-Bold.otf'}
          position={[0, 0.02, -1]} 
          fontSize={0.5}
          color="black"
          anchorX="center"
          anchorY="middle"
        >
          Unlinked
        </Text>
      
        <Text
          font={'/PPNeueMontreal-Bold.otf'}
          position={[0, 0, -1]} 
          fontSize={0.5}
          color="green" 
          anchorX="center"
          anchorY="middle"
        >
          Unlinked
        </Text>
       
        <Text
          font={'/PPNeueMontreal-Bold.otf'}
          position={[0, -0.02, -1]} 
          fontSize={0.5}
          color="white"
          anchorX="center"
          anchorY="middle"
        >
          Unlinked
        </Text>
      </group>
      <primitive object={scene} dispose={null} />
    </group>
  );
};

export default Model;
