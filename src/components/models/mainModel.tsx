import { useFBX } from "@react-three/drei";
import { Canvas } from "@react-three/fiber"

function MainModel() {
    const model = useFBX("Universidad.fbx");
    
    return (
        <Canvas>
            <ambientLight intensity={1} />
            <primitive object={model} />
        </Canvas>
    )
}

export default MainModel