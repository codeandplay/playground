"use client";

import React, { useEffect, useRef } from "react";

const Cursor = ({
  isHover,
  elementWidth,
}: {
  isHover: Boolean;
  elementWidth: Number;
}) => {
  const cursorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      e.preventDefault();

      if (cursorRef.current) {
        cursorRef.current.style.left = e.clientX + "px";
        cursorRef.current.style.top = e.clientY + "px";
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <div
      className="fixed border-2 rounded-full translate-x-[-50%] border-black translate-y-[-50%] pointer-events-none left-[-100px] top-[50%] mix-blend-difference transition-all ease-out z-[100000] duration-300 bg-orange-800"
      style={{
        width: isHover ? `${elementWidth}px` : "30px",
        height: isHover ? `${elementWidth}px` : "30px",
      }}
      ref={cursorRef}
    ></div>
  );
};

export default Cursor;
