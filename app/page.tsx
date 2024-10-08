"use client";

import { Suspense, useEffect, useState } from "react";
import Cursor from "../components/Cursor";
import { Canvas } from "@react-three/fiber";
import GameExperience from "@/components/GameExperience";
import { Stats } from "@react-three/drei";
import { Leva } from "leva";
import { KeyboardControls, SoftShadows } from "@react-three/drei";
import { useProgress } from "@react-three/drei";
import { ClimbingBoxLoader } from "react-spinners";
import { useAppContext } from "@/context";

const Home = () => {
  const { isDebugEnabled, setIsDebugEnabled } = useAppContext();
  const [isHover, setIsHover] = useState<boolean>(false);
  const [elementWidth, setElementWidth] = useState<Number>(0);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { progress } = useProgress();

  const mouseOver = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.currentTarget;
    const { offsetWidth } = target;
    setElementWidth(offsetWidth + 20);
    setIsHover(true);
  };

  const mouseOut = () => {
    setElementWidth(0);
    setIsHover(false);
  };

  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "left", keys: ["ArrowLeft", "KeyA"] },
    { name: "right", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
  ];

  useEffect(() => {
    if (progress === 100) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [progress]);

  return (
    <>
      <Cursor isHover={isHover} elementWidth={elementWidth} />
      <Leva hidden={!isDebugEnabled} />
      <Suspense fallback={null}>
        <KeyboardControls map={keyboardMap}>
          <Canvas shadows>
            {isDebugEnabled && <Stats />}
            <SoftShadows size={15} />
            <GameExperience />
          </Canvas>
        </KeyboardControls>
      </Suspense>

      {isLoading ? (
        <div className="w-full h-full flex flex-col justify-center items-center -mt-10">
          <ClimbingBoxLoader
            size={10}
            aria-label="Loading Spinner"
            data-testid="loader"
            color={"#ff0000"}
          />
          <p>Loading Playground...</p>
        </div>
      ) : (
        <button
          className="absolute right-2 top-2 p-2 text-base font-bold bg-white rounded-md transition-all transform hover:bg-black hover:text-white"
          onMouseOver={mouseOver}
          onMouseOut={mouseOut}
          onClick={() => setIsDebugEnabled(!isDebugEnabled)}
        >
          {!isDebugEnabled ? "Enable Debug" : "Disable Debug"}
        </button>
      )}
    </>
  );
};

export default Home;
