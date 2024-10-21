import { useFBX, OrbitControls } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useNavigate } from "@tanstack/react-router";
import { useState, useRef } from "react";
import * as THREE from "three";

function RotatingModel({ model }: { model: THREE.Object3D }) {
  const modelRef = useRef<THREE.Object3D>(null);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.001;
    }
  });

  return <primitive ref={modelRef} object={model} scale={0.025} position={[-200, -25, -150]} />;
}

function MainModel() {
  const model = useFBX("./Universidad.fbx");
  const router = useNavigate();
  const [moving, setMoving] = useState(false);

  const handleMouseDown = () => {
    setMoving(false);
  };

  const handleMouseMove = () => {
    setMoving(true);
  };

  const handleMouseUp = () => {
    if (!moving) {
      router({ to: "/proyectos/$proyectoId", params: { proyectoId: "1" } });
    }
  };

  return (
    <Canvas
      camera={{ far: 10000, position: [0, 0, 300] }}
      style={{ height: "30vh" }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
      <ambientLight intensity={1} />
      <RotatingModel model={model} />
      <OrbitControls />
    </Canvas>
  );
}

export default MainModel;
