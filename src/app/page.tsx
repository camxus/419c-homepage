"use client";
import React, { useState } from "react";
import Dialog from "../components/Dialog";
import Link from "next/link";

function Home() {
  const [open, setOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [tag, setTag] = useState("");
  return (
    <div>
      <div className="flex flex-col items-center h-screen w-full">
        <img
          className="fixed w-screen h-screen object-cover -z-10"
          src="/gif/BG.gif"
          alt=""
        />
        <div className="flex-1 flex flex-col w-full items-center justify-center gap-5">
          {/* <button
          className="rounded-full bg-black text-white border border-black border-solid py-2 px-4 mx-5 hover:bg-white hover:text-black transition duration-300"
          onClick={() => {
            setOpen(true);
            setTag("Nordbahnhof");
          }}
        >
          RSVP Secret Location, Vienna
        </button> */}
          {/* <button
          className="rounded-full bg-black text-white border border-black border-solid py-2 px-4 mx-5 hover:bg-white hover:text-black transition duration-300"
          onClick={() => {
            setOpen(true);
            setTag("Kiff & Marais");
          }}
        >
          RSVP Kiff & Marais, 17 rue des Gravilliers 75003, Paris
        </button> */}
          {/* <button
            className="rounded-full bg-black text-white border border-black border-solid py-2 px-4 mx-5 hover:bg-white hover:text-black transition duration-300"
            onClick={() => {
              setOpen(true);
              setTag("Hoxton Vienna");
            }}
          >
            The Hoxton Vienna, 15th June
          </button> */}
          <Link href={"/screen"}>
            <button className="rounded-full bg-black text-white border border-black border-solid py-2 px-4 mx-5 hover:bg-white hover:text-black transition duration-300">
              Stay curious.
            </button>
          </Link>
        </div>
      </div>
      <dialog open={open}>
        <Dialog {...{ setOpen, tag }} />
      </dialog>
    </div>
  );
}

export default Home;
