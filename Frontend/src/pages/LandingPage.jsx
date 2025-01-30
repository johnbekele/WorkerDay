"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { LampContainer } from "../Components/ui/lamp"; //
import LoginForm from "../Components/LoginForm";
import { Button } from "../Components/ui/moving-border";

export function LandingPage() {
  const [currentSection, setCurrentSection] = useState("");

  function changeSection(Section) {
    setCurrentSection(Section);
  }

  function handlOverlay(e) {
    if (e.target === e.currentTarget) {
      setCurrentSection("");
    }
  }

  return (
    <div>
      <div className="lamp-container">
        <LampContainer>
          <motion.h1
            initial={{ opacity: 0.5, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.8,
              ease: "easeInOut",
            }}
            className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-3xl font-medium tracking-tight text-transparent md:text-7xl"
          >
            WorkerDay
            <br /> Effective Collaboration For Effective Service <br />
            <Button onClick={() => changeSection("login")}>Login</Button>
          </motion.h1>
        </LampContainer>
      </div>

      {currentSection == "login" && (
        <div
          className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center mt-20 w-full h-full"
          onClick={handlOverlay}
        >
          <LoginForm />
        </div>
      )}
    </div>
  );
}
