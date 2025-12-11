'use client';

import { motion, useInView } from 'framer-motion';
import { Shield, Award, Users, Zap } from 'lucide-react';
import { useRef } from 'react';
import Image from 'next/image';

const features = [
  {
    icon: Shield,
    title: 'Veteran Owned',
    description: 'Built on integrity, reliability, and accountability'
  },
  {
    icon: Award,
    title: 'Locally Owned',
    description: 'Phoenix based, Valley wide since 2022'
  },
  {
    icon: Users,
    title: 'Real People',
    description: 'Actual Arizonans who pick up and handle it'
  },
  {
    icon: Zap,
    title: 'Valley Wide',
    description: 'Same great service everywhere we go'
  }
];

export default function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref} className="py-24 bg-patriot-navy relative overflow-hidden">
      {/* Background pattern - removed for sharp rendering */}

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
              {/* Logo */}
              <motion.div
                className="relative w-[400px] h-[400px] bg-gradient-to-br from-patriot-darkNavy/50 to-patriot-blue/30 rounded-3xl p-8 backdrop-blur-sm border border-patriot-blue/30 shadow-xl shadow-black/20"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/logo.png"
                    alt="Patriot Disposal Phoenix - Rising Above"
                    fill
                    sizes="400px"
                    className="object-contain drop-shadow-lg rounded-2xl"
                  />
                </div>
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

            <p className="text-lg text-desert-sand mb-4 leading-relaxed">
              At Patriot Disposal Phoenix, we believe in serving our community with honor, integrity, and dedication. Like the phoenix rising from the ashes, we turn waste disposal challenges into smooth, dependable solutions you do not have to think twice about. As a locally owned and operated company, we understand the unique needs of the Phoenix metro area, and we use that knowledge to deliver service you can rely on every time.
            </p>

            <p className="text-lg text-desert-sand mb-4 leading-relaxed">
              Patriot Disposal was established in 2022 with a simple mission: bring real, reliable waste and recycling services back to Phoenix and the entire Valley without the corporate nonsense. We are a locally owned and veteran owned company built by people who actually live here and take pride in serving the neighborhoods and surrounding communities all across the Valley.
            </p>

            <p className="text-lg text-desert-sand mb-4 leading-relaxed">
              Phoenix is our home base, but we proudly serve residential, commercial, and construction customers everywhere in the Valley from the heart of the city to the outer growing areas. No matter where you are, you get the same consistency, the same dependability, and the same real human customer service.
            </p>

            <p className="text-lg text-desert-sand mb-4 leading-relaxed">
              And that is one of our biggest strengths. You talk to real local people. Not phone trees. Not outsourced call centers. Not endless hold music. Just actual Arizonans who pick up, understand your area, and handle your request right away.
            </p>

            <p className="text-lg text-desert-sand mb-4 leading-relaxed">
              Our veteran roots drive everything we do: integrity, reliability, accountability, and respect. We show up when we say we will. We keep our pricing fair and transparent. And we treat every customer like a neighbor, because to us, you are one.
            </p>

            <p className="text-lg text-desert-sand mb-4 leading-relaxed">
              Patriot Disposal is proud to be Phoenix based, Valley wide, and built on service you can trust.
            </p>

            <p className="text-lg text-desert-sand mb-8 leading-relaxed font-bold">
              Patriot Disposal. Locally owned. Veteran proud. Valley strong.
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
                    className="flex items-start gap-3 bg-patriot-darkNavy border border-patriot-blue hover:border-phoenix-coral transition-all duration-300 rounded-lg p-4"
                  >
                    <div className="w-10 h-10 bg-patriot-blue border border-desert-tan rounded-lg flex items-center justify-center flex-shrink-0">
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
