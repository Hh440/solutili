'use client'
import {Canvas} from '@react-three/fiber'
import Model from './Model'
import { OrbitControls, PerspectiveCamera } from '@react-three/drei'
const Money = ()=>{

    
    return(
        <Canvas camera={{position:[0,0,3],fov:90}}  gl={{antialias:true}}>
            <OrbitControls />
            
            <Model/>
            
            
            
            
        </Canvas>
    
    )


}

export default Money