"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Dialog from "../components/Dialog";
import { useMouseAnimation } from "@/context/Mouse";

function Home() {
  const [open, setOpen] = useState(false);
  const [tag] = useState("");
  const [transitioning, setTransitioning] = useState(false);
  const [hovered, setHovered] = useState(false);

  useMouseAnimation("white");

  const handleClick = () => {
    setTransitioning(true);
    setTimeout(() => {
      window.location.href = "/screen";
    }, 1400);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        className="fixed w-screen h-screen object-cover -z-10"
        src="/gif/BG.gif"
        alt=""
      />

      <div className="flex-1 flex flex-col w-full items-center justify-center gap-5 h-screen">
        <motion.button
          className="rounded-full bg-black text-white border border-black border-solid py-2 px-4 mx-5 relative overflow-hidden"
          onClick={handleClick}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          animate={{
            width: hovered ? "auto" : "10px",
            height: hovered ? "auto" : "10px",
            opacity: hovered ? 1 : 0.2,
          }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          Stay curious.
        </motion.button>
      </div>
      <dialog open={open}>
        <Dialog {...{ setOpen, tag }} />
      </dialog>
      <AnimatePresence>
        {transitioning && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen bg-black z-50"
            initial={{ scaleY: 0, scaleX: 0, borderRadius: "500px" }}
            animate={{ scaleY: 1, scaleX: 1, borderRadius: "0" }}
            exit={{ scaleY: 0, scaleX: 0, borderRadius: "500px" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        )}
        {transitioning && (
          <motion.div
            className="fixed top-0 left-0 w-screen h-screen bg-white z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 0.1 }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default Home;
