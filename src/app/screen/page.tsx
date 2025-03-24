"use client";

import React from "react";
import { motion } from "framer-motion";
import act1 from "./act1.json";
import act2 from "./act2.json";
import Link from "next/link";

function Page() {
  return (
    <div className="bg-white">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full bg-white p-8 py-20"
      >
        <div className="text-black">youve been curious. i like that.</div>
        <div
          className="c6 doc-content"
          style={{ paddingLeft: "3vw", paddingRight: "3vw" }}
        >
          <div className="my-4">
            <span>ACT 1:</span>
            {act1.map((scene, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 1 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <Link href={scene.link}>
                  <div
                    className={!scene.released ? "invisible my-20" : "my-20"}
                    dangerouslySetInnerHTML={{ __html: scene.html }}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
          <div className="my-10">
            <span>ACT 2:</span>
            {act2.map((scene, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <div
                  className={!scene.released ? "invisible my-20" : "my-20"}
                  dangerouslySetInnerHTML={{ __html: scene.html }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default Page;
