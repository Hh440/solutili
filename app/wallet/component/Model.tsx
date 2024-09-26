import { Canvas } from "@react-three/fiber"
import { Physics, useSphere, usePlane } from "@react-three/cannon"
import { Mesh } from "three"
import { MeshReflectorMaterial, useTexture ,Texture, Environment} from "@react-three/drei"
interface SphereProps {
    position: [number, number, number];     
  }
  
  const Sphere = ({ position }: SphereProps) => {
    
    const [sphereRef] = useSphere<Mesh>(() => ({
      mass: 1,
      position, 
      rotation: [0.4, 0.2, 0.5],
    }));

    const TextureLoader = useTexture('/media/dollars.jpeg')
  
    return (
        <>
      <mesh ref={sphereRef} castShadow receiveShadow>
        <sphereGeometry args={[1, 32, 32]} /> 
        <meshPhysicalMaterial
        color="white"
        transmission={1}  
        opacity={0.5}     
        roughness={2}     
        metalness={0.1}   
        reflectivity={0.5}  
        clearcoat={1}     
        clearcoatRoughness={0} 
        thickness={0.5}  
        ior={1.5}      
        map={TextureLoader}   
      />
      </mesh>
     
      </>
    );
  };

const Plane = (props:any) => {
  
  const [ref] = usePlane<Mesh>(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }))

  return (
    <>
    <mesh ref={ref}>
      <planeGeometry args={[1000, 1000]} />
      <MeshReflectorMaterial
            blur={[1000, 1000]}
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
    </mesh>
    <Environment preset="sunset"/>
   
    </>
  )
}


export { Plane, Sphere }