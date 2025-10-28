'use client';

import { motion, useInView } from 'framer-motion';
import { Shield, Award, Users, Zap } from 'lucide-react';
import { useRef } from 'react';
import Image from 'next/image';

const features = [
  {
    icon: Shield,
    title: 'Reliable Service',
    description: 'Dependable pickup schedules you can count on'
  },
  {
    icon: Award,
    title: 'Locally Owned',
    description: 'Phoenix-based and community-focused'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Professional staff dedicated to excellence'
  },
  {
    icon: Zap,
    title: 'Fast Response',
    description: 'Same-day service available'
  }
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 bg-patriot-navy relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(30deg, rgba(255, 140, 105, 0.1) 12%, transparent 12.5%, transparent 87%, rgba(255, 140, 105, 0.1) 87.5%, rgba(255, 140, 105, 0.1)), linear-gradient(150deg, rgba(255, 140, 105, 0.1) 12%, transparent 12.5%, transparent 87%, rgba(255, 140, 105, 0.1) 87.5%, rgba(255, 140, 105, 0.1))`,
          backgroundSize: '80px 140px'
        }} />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Logo Side */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="flex justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={isInView ? { scale: 1, opacity: 1 } : {}}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative"
            >
              {/* Glow effect behind logo */}
              <motion.div
                className="absolute inset-0 blur-3xl bg-phoenix-gradient opacity-30"
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.3, 0.5, 0.3]
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              {/* Logo */}
              <motion.div
                className="relative w-[400px] h-[400px]"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/logo.png"
                  alt="Patriot Disposal Phoenix - Rising Above"
                  fill
                  className="object-contain drop-shadow-2xl"
                />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.div
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="h-1 w-20 bg-phoenix-gradient mb-6"
            />

            <h2 className="text-5xl md:text-6xl font-bold text-desert-tan mb-6">
              Rising Above <span className="bg-phoenix-gradient bg-clip-text text-transparent">The Rest</span>
            </h2>

            <p className="text-xl text-desert-sand mb-6 leading-relaxed">
              At Patriot Disposal Phoenix, we believe in serving our community with honor, integrity, and dedication.
              Like the phoenix rising from the ashes, we transform your waste management challenges into seamless solutions.
            </p>

            <p className="text-lg text-desert-sand mb-8 leading-relaxed">
              As a locally owned and operated company, we understand the unique needs of the Phoenix metro area.
              Our commitment to excellence and customer satisfaction has made us the trusted choice for residential,
              commercial, and construction disposal services.
            </p>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                    className="flex items-start gap-3 bg-patriot-darkNavy/50 backdrop-blur-sm border border-patriot-blue hover:border-phoenix-coral transition-all duration-300 rounded-lg p-4"
                  >
                    <div className="w-10 h-10 bg-patriot-blue/50 border border-desert-tan rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon className="w-5 h-5 text-phoenix-coral" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h3 className="text-desert-tan font-bold mb-1">{feature.title}</h3>
                      <p className="text-desert-sand text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
