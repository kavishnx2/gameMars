import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";

const Stars = (prop: any) => {

    function randomPointsInSphere(count: number, radius: number) {
        const points = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            let u = Math.random();
            let v = Math.random();
            let theta = 2 * Math.PI * u;
            let phi = Math.acos(2 * v - 1);
            let r = Math.cbrt(Math.random()) * radius; // Cube root for uniform distribution
            let sinPhi = Math.sin(phi);
            let x = r * sinPhi * Math.cos(theta);
            let y = r * sinPhi * Math.sin(theta);
            let z = r * Math.cos(phi);
            points[i * 3] = x;
            points[i * 3 + 1] = y;
            points[i * 3 + 2] = z;
        }
        return points;
    }

        const ref = useRef<THREE.Points>();
        const [sphere] = useState(() => randomPointsInSphere(5000, 1.2));
        
    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 10;
            ref.current.rotation.y -= delta / 15;
        }
    });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled {...prop}>
        <PointMaterial
          transparent
          color='#f272c8'
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const StarsCanvas = () => {
  return (
    <div className='w-full h-auto absolute inset-0 z-[-1]' style={{ backgroundColor: 'black'}}>
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>

        <Preload all />
      </Canvas>
    </div>
  );
};

export default StarsCanvas;
