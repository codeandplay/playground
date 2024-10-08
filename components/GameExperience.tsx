import React, { useRef } from "react";
import {
  ContactShadows,
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Sky,
} from "@react-three/drei";
import { DirectionalLight } from "three";
import { Physics } from "@react-three/rapier";
import { useControls } from "leva";
import Playground from "./Playground";
import { useAppContext } from "@/context";

const GameExperience = () => {
  const { isDebugEnabled } = useAppContext();
  const directionalLighRef = useRef<DirectionalLight>(null);

  const { enableShadows, opacity, blur, far, scale, resolution, color } =
    useControls("Contact Shadows", {
      enableShadows: {
        value: false,
        label: "Enable Shadows",
      },
      opacity: {
        value: 0.5,
        min: 0,
        max: 1,
        step: 0.1,
      },
      blur: {
        value: 0.1,
        min: 0,
        max: 1,
        step: 0.1,
      },
      far: {
        value: 10,
        min: 1,
        max: 20,
        step: 1,
      },
      scale: {
        value: 200,
        min: 50,
        max: 400,
        step: 10,
      },
      resolution: {
        value: 2048,
        options: [512, 1024, 2048, 4096],
      },
      color: {
        value: "#000000",
      },
    });

  const { enableOrbitControl } = useControls("Orbit Control", {
    enableOrbitControl: {
      value: true,
      label: "Enable Orbit Control",
    },
  });

  return (
    <>
      <PerspectiveCamera makeDefault position={[-5, 4, 1]} fov={50} />

      <Sky />

      {/* lights */}
      <hemisphereLight intensity={1} />
      <Environment preset="city" />
      <directionalLight
        ref={directionalLighRef}
        intensity={1}
        position={[25, 15, 10]}
        castShadow
        shadow-mapSize-width={4096}
        shadow-mapSize-height={4096}
        shadow-camera-far={60}
        shadow-camera-near={0.1}
        shadow-camera-left={-40}
        shadow-camera-right={40}
        shadow-camera-top={40}
        shadow-camera-bottom={-40}
        shadow-bias={-0.0001}
      />

      {/* contact shadow with Leva controls */}
      {enableShadows && (
        <ContactShadows
          position={[0, 0, 0]}
          far={far}
          scale={scale}
          resolution={resolution}
          opacity={opacity}
          blur={blur}
          color={color}
        />
      )}

      {enableOrbitControl && <OrbitControls />}

      {/* environement and character */}
      <Physics debug={isDebugEnabled}>
        <Playground />
      </Physics>
    </>
  );
};

export default GameExperience;
