import { MeshReflectorMaterial } from "@react-three/drei";
import {
  CuboidCollider,
  RapierRigidBody,
  RigidBody,
} from "@react-three/rapier";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

function Playground() {
  const platform2Ref = useRef<RapierRigidBody>(null); // Reference for platform 2
  const platform3Ref = useRef<RapierRigidBody>(null); // Reference for platform 3

  // Animate platform 2 (side-to-side) using linear velocity
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const velocity = Math.sin(time) * 2; // Horizontal velocity

    if (platform2Ref.current) {
      platform2Ref.current.setLinvel({ x: velocity, y: 0, z: 0 }, true);
    }
  });

  // Animate platform 3 (up-and-down) using linear velocity
  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    const velocity = Math.sin(time) * 1.5; // Vertical velocity

    if (platform3Ref.current) {
      platform3Ref.current.setLinvel({ x: 0, y: velocity, z: 0 }, true);
    }
  });

  return (
    <>
      {/* ground */}
      <RigidBody type="fixed" name="ground">
        <mesh
          scale={[40, 70, 1]}
          rotation-x={-Math.PI * 0.5}
          position-y={-0.001}
          receiveShadow
        >
          <planeGeometry />
          <MeshReflectorMaterial
            color={[0.015, 0.015, 0.015]}
            roughness={0.7}
            blur={[1000, 200]}
            mixBlur={30}
            mixStrength={80}
            mixContrast={1}
            resolution={512}
            mirror={0}
            depthScale={0.01}
            minDepthThreshold={0.9}
            maxDepthThreshold={1}
            depthToBlurRatioBias={0.25}
            reflectorOffset={-0.1}
          />
        </mesh>
      </RigidBody>

      {/* wall - right */}
      <RigidBody type="fixed" name="platform" friction={0} colliders={false}>
        <group position={[0, 0.5, 34.8]}>
          <mesh receiveShadow castShadow scale={[40, 1, 0.5]}>
            <boxGeometry />
            <meshStandardMaterial color={0x867b6d} />
          </mesh>
          <CuboidCollider args={[20, 2, 0.3]} position={[0, 1.5, 0]} />
        </group>
      </RigidBody>

      {/* wall - left */}
      <RigidBody type="fixed" name="platform" friction={0} colliders={false}>
        <group position={[0, 0.5, -34.8]}>
          <mesh receiveShadow castShadow scale={[40, 1, 0.5]}>
            <boxGeometry />
            <meshStandardMaterial color={0x867b6d} />
          </mesh>
          <CuboidCollider args={[20, 2, 0.3]} position={[0, 1.5, 0]} />
        </group>
      </RigidBody>

      {/* wall - back */}
      <RigidBody type="fixed" name="platform" friction={0} colliders={false}>
        <group position={[19.8, 0.5, 0]}>
          <mesh receiveShadow castShadow scale={[0.5, 1, 70]}>
            <boxGeometry />
            <meshStandardMaterial color={0x867b6d} />
          </mesh>
          <CuboidCollider args={[0, 2, 35]} position={[0, 1.5, 0]} />
        </group>
      </RigidBody>

      {/* wall - front */}
      <RigidBody type="fixed" name="platform" friction={0} colliders={false}>
        <group position={[-19.8, 0.5, 0]}>
          <mesh receiveShadow castShadow scale={[0.5, 1, 70]}>
            <boxGeometry />
            <meshStandardMaterial color={0x867b6d} />
          </mesh>
          <CuboidCollider args={[0, 2, 35]} position={[0, 1.5, 0]} />
        </group>
      </RigidBody>

      {/* platform 1 */}
      <RigidBody type="fixed" name="static_platform" friction={0}>
        <mesh position={[0, 0.5, 0]} receiveShadow castShadow scale={[4, 1, 1]}>
          <boxGeometry />
          <meshStandardMaterial color="lightgrey" />
        </mesh>
      </RigidBody>

      {/* platform 2 */}
      <RigidBody type="fixed" name="static_platform" friction={0}>
        <mesh position={[0, 1, 4]} receiveShadow castShadow scale={[4, 2, 2]}>
          <boxGeometry />
          <meshStandardMaterial color="lightgrey" />
        </mesh>
      </RigidBody>

      {/* platform 3 */}
      <RigidBody type="fixed" name="static_platform" friction={0}>
        <mesh position={[0, 1.5, 8]} receiveShadow castShadow scale={[4, 3, 2]}>
          <boxGeometry />
          <meshStandardMaterial color="lightgrey" />
        </mesh>
      </RigidBody>

      {/* cylinder platform 1 */}
      <RigidBody
        type="fixed"
        name="static_platform"
        friction={0}
        colliders="hull"
      >
        <mesh
          position={[-10, 0.5, -8]}
          receiveShadow
          castShadow
          scale={[2, 1, 2]}
        >
          <cylinderGeometry />
          <meshStandardMaterial color={0xe3d6ab} />
        </mesh>
      </RigidBody>

      {/* cylinder platform 2 moving side-to-side */}
      <RigidBody
        ref={platform2Ref}
        type="kinematicVelocity"
        name="dynamic_platform"
        friction={0}
        colliders="hull"
        lockRotations
      >
        <mesh
          position={[-10, 1.5, -14]}
          receiveShadow
          castShadow
          scale={[2, 1, 2]}
        >
          <cylinderGeometry />
          <meshStandardMaterial color={0xa9916b} />
        </mesh>
      </RigidBody>

      {/* cylinder platform 3 moving up-and-down */}
      <RigidBody
        ref={platform3Ref}
        type="kinematicVelocity"
        name="dynamic_platform"
        friction={0}
        colliders="hull"
        lockRotations
      >
        <mesh
          position={[-10, 3, -20]}
          receiveShadow
          castShadow
          scale={[2, 1, 2]}
        >
          <cylinderGeometry />
          <meshStandardMaterial color={0xa9916b} />
        </mesh>
      </RigidBody>

      <RigidBody
        type="fixed"
        name="static_platform"
        friction={0}
        colliders="hull"
      >
        <mesh position={[-10, 0.62, 8]} receiveShadow castShadow>
          <coneGeometry args={[3, 1.2, 64]} />
          <meshStandardMaterial color={0x778979} />
        </mesh>
      </RigidBody>
    </>
  );
}

export default Playground;
