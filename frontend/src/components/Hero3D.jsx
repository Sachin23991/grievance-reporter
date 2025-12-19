import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';

const AnimatedSphere = () => {
    const sphereRef = useRef();

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        if (sphereRef.current) {
            sphereRef.current.distort = 0.4 + Math.sin(t) * 0.1;
            sphereRef.current.rotation.x = t * 0.2;
            sphereRef.current.rotation.y = t * 0.3;
        }
    });

    return (
        <Sphere visible args={[1, 100, 200]} scale={2.2} ref={sphereRef}>
            <MeshDistortMaterial
                color="#2e7d32"
                attach="material"
                distort={0.4}
                speed={1.5}
                roughness={0.2}
                metalness={0.1}
            />
        </Sphere>
    );
};

const Hero3D = () => {
    return (
        <div className="h-[400px] w-full mt-10 md:mt-0 md:h-[500px] md:w-1/2 flex items-center justify-center">
            <Canvas>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 10, 5]} intensity={1} />
                <pointLight position={[-10, -10, -5]} intensity={1} color="#c5a059" />
                <AnimatedSphere />
            </Canvas>
        </div>
    );
};

export default Hero3D;
