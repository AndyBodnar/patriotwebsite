'use client';

import { motion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function Hero() {
  const [particles, setParticles] = useState<Array<{left: number, top: number, duration: number, delay: number}>>([]);

  useEffect(() => {
    setParticles(
      [...Array(20)].map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: 3 + Math.random() * 2,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-b from-patriot-darkNavy via-patriot-navy to-patriot-blue pt-20">
      {/* Animated background particles */}
      <div className="absolute inset-0">
        {particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-phoenix-coral rounded-full"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
            }}
            initial={{
              opacity: 0
            }}
            animate={{
              y: [0, -200],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              delay: particle.delay,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center">
          {/* Phoenix Logo Animation */}
          <motion.div
            initial={{ scale: 0, rotate: -180, opacity: 0 }}
            animate={{ scale: 1, rotate: 0, opacity: 1 }}
            transition={{
              duration: 1.2,
              ease: [0.6, 0.05, 0.01, 0.9],
              type: "spring",
              stiffness: 100
            }}
            className="mb-12 inline-block"
          >
            <div className="relative">
              {/* Phoenix Text */}
              <div className="relative">
                <h1 className="text-8xl md:text-9xl font-bold bg-phoenix-gradient bg-clip-text text-transparent phoenix-glow mb-4">
                  PATRIOT
                </h1>
                <div className="flex items-center justify-center gap-4">
                  <motion.div
                    className="h-1 flex-1 bg-phoenix-gradient"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                  <p className="text-2xl md:text-3xl text-desert-tan tracking-[0.3em]">PHOENIX</p>
                  <motion.div
                    className="h-1 flex-1 bg-phoenix-gradient"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-2xl md:text-4xl text-desert-tan mb-8 font-light"
          >
            Rising Above in <span className="bg-phoenix-gradient bg-clip-text text-transparent font-bold">Waste Management</span>
          </motion.p>

          <motion.p
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
            className="text-lg md:text-xl text-desert-sand mb-12 max-w-2xl mx-auto"
          >
            Premium disposal services delivered with honor, reliability, and unmatched dedication
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.a
              href="tel:480-851-2000"
              className="group relative px-10 py-5 bg-phoenix-gradient text-white text-xl font-bold rounded-lg overflow-hidden desert-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* Removed semi-transparent overlay for sharp rendering */}
              <span className="relative flex items-center gap-3">
                <Phone className="w-6 h-6" />
                480-851-2000
              </span>
            </motion.a>

            <motion.a
              href="#quote"
              className="px-10 py-5 border-2 border-phoenix-coral text-desert-tan text-xl font-bold rounded-lg hover:bg-phoenix-coral hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get a Quote
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
