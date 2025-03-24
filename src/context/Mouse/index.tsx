"use client";

import { motion, MotionStyle } from "framer-motion";
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

// Create the context
const MouseContext = createContext<null | {
  mousePosition: { x: number; y: number };
  color: string;
  style: null | MotionStyle;
  setColor: Dispatch<SetStateAction<string>>;
  setStyle: Dispatch<SetStateAction<null | MotionStyle>>;
}>(null);

// Provider component
export function MouseProvider({ children }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState(""); // Default color
  const [style, setStyle] = useState<MotionStyle>(null); // Default color

  useEffect(() => {
    const handleMouseMove = (e: { clientX: number; clientY: number }) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.body.style.cursor = "none"; // Hide cursor

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.body.style.cursor = "default"; // Reset cursor
    };
  }, []);

  const value = { mousePosition, color, setColor, style, setStyle };

  return (
    <MouseContext.Provider value={value}>{children}</MouseContext.Provider>
  );
}

// Custom hook to use mouse state in any component
export function useMouseAnimation(input: string) {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error("useMouse must be used within a MouseProvider");
  }
  const { setColor } = context;

  useEffect(() => {
    setColor(input);
  }, [input]);

  return context;
}

export default function Mouse() {
  const context = useContext(MouseContext);
  if (!context) {
    throw new Error("useMouse must be used within a MouseProvider");
  }

  const { mousePosition, color, style } = context;
  return (
    <motion.div
      className="fixed w-4 h-4 rounded-full pointer-events-none duration-300"
      style={{
        transitionProperty: "background",
        background: color,
        left: mousePosition.x,
        top: mousePosition.y,
        transform: "translate(-50%, -50%)",
        ...style,
      }}
    />
  );
}
