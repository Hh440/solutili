import { Canvas } from "@react-three/fiber";
import { Sphere, Plane } from "./Model"; // Ensure Sphere and Plane components are properly defined
import { MutableRefObject, Suspense } from 'react';
import { Environment, OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/cannon";

const getRandomPosition = (min: number, max: number) => {
    return (Math.random() * (max - min) + min).toFixed(2);
};

const generateSpheres = (count: number) => {
    const spheres = [];
    for (let i = 0; i < count; i++) {
        spheres.push([
            parseFloat(getRandomPosition(-5, 5)), 
            parseFloat(getRandomPosition(5, 15)),  
            parseFloat(getRandomPosition(-5, 5)),  
        ]);
    }
    return spheres;
};

const Ball = () => {
    const num = Math.random() * 500;
    const spheres = generateSpheres(num); 

    return (
        <>
            <Canvas shadows dpr={[1, 2]} gl={{ alpha: false ,antialias:true}} camera={{ position: [-1, 5, 30], fov: 45 }}>
                <color attach="background" args={['#2D2D2D']}  />
                <OrbitControls />
                <ambientLight />
                <directionalLight position={[10, 10, 10]} castShadow shadow-mapSize={[2048, 2048]} />
                
                <Suspense>
                    <Physics>
                        <Plane position={[0, -2.5, 0]} />
                        {spheres.map((position, index) => (
                            <Sphere key={index} position={position as [number, number, number]} />
                        ))}
                    </Physics>
                </Suspense>
                
                
            </Canvas>
        </>
    );
};

export default Ball;