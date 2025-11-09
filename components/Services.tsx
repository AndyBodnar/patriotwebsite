'use client';

import { motion, useInView } from 'framer-motion';
import { Trash2, Truck, Recycle, Building2, Home, Factory } from 'lucide-react';
import { useRef } from 'react';

const services = [
  {
    icon: Home,
    title: 'Residential',
    description: 'Reliable dumpster rentals for home projects, renovations, and cleanouts',
    features: ['Quick Delivery', 'Flexible Sizing', 'Same-Day Service']
  },
  {
    icon: Building2,
    title: 'Commercial',
    description: 'Comprehensive waste solutions for businesses of all sizes',
    features: ['Regular Pickups', 'Custom Schedules', 'Volume Discounts']
  },
  {
    icon: Factory,
    title: 'Construction',
    description: 'Heavy-duty disposal for construction and demolition projects',
    features: ['Large Capacity', 'Multiple Units', 'Site Management']
  },
  {
    icon: Recycle,
    title: 'Recycling',
    description: 'Eco-friendly recycling services supporting sustainability',
    features: ['Material Sorting', 'Green Solutions', 'Compliance']
  },
  {
    icon: Truck,
    title: 'Roll-Off Dumpsters',
    description: 'Various sizes from 10 to 40 yards for any project scale',
    features: ['10-40 Yard', 'Easy Access', 'Clean Service']
  },
  {
    icon: Trash2,
    title: 'Junk Removal',
    description: 'Full-service junk hauling and property cleanouts',
    features: ['Same Day', 'Load & Haul', 'Estate Cleanout']
  }
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-patriot-blue via-patriot-navy to-patriot-darkNavy relative overflow-hidden">
      {/* Background pattern - removed for sharp rendering */}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-1 w-32 bg-phoenix-gradient mx-auto mb-8"
          />
          <h2 className="text-5xl md:text-6xl font-bold text-desert-tan mb-6">
            Our <span className="bg-phoenix-gradient bg-clip-text text-transparent">Services</span>
          </h2>
          <p className="text-xl text-desert-sand max-w-2xl mx-auto">
            Comprehensive waste management solutions tailored to your needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative"
              >
                <div className="relative bg-patriot-darkNavy border-2 border-patriot-blue hover:border-phoenix-coral transition-all duration-300 rounded-xl p-8 h-full">
                  {/* Icon with glow effect */}
                  <motion.div
                    className="relative mb-6"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="relative w-20 h-20 bg-patriot-blue border-2 border-desert-tan group-hover:border-phoenix-coral rounded-lg flex items-center justify-center transition-all duration-300">
                      <Icon className="w-10 h-10 text-desert-tan group-hover:text-phoenix-coral transition-colors duration-300" strokeWidth={2.5} />
                    </div>
                  </motion.div>

                  <h3 className="text-2xl font-bold text-desert-tan mb-3 group-hover:text-phoenix-coral transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-desert-sand mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <motion.li
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: index * 0.1 + idx * 0.1 }}
                        className="flex items-center gap-2 text-desert-sand"
                      >
                        <div className="w-1.5 h-1.5 bg-phoenix-coral rounded-full" />
                        {feature}
                      </motion.li>
                    ))}
                  </ul>

                  {/* Hover effect removed for sharp rendering */}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
