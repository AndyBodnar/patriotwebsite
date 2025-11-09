'use client';

import { motion, useInView } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  });
  const [floatingParticles, setFloatingParticles] = useState<Array<{x: number, y: number, xEnd: number, yEnd: number, duration: number}>>([]);

  useEffect(() => {
    setFloatingParticles(
      [...Array(10)].map(() => ({
        x: Math.random() * 100,
        y: Math.random() * 100,
        xEnd: Math.random() * 100,
        yEnd: Math.random() * 100,
        duration: 20 + Math.random() * 10,
      }))
    );
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic here
    console.log(formData);
  };

  return (
    <section id="quote" ref={ref} className="py-24 bg-gradient-to-b from-patriot-darkNavy to-patriot-navy relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        {floatingParticles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-phoenix-coral/20 rounded-full"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
            }}
            animate={{
              x: [`0%`, `${particle.xEnd - particle.x}%`],
              y: [`0%`, `${particle.yEnd - particle.y}%`],
            }}
            transition={{
              duration: particle.duration,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

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
            Get Your <span className="bg-phoenix-gradient bg-clip-text text-transparent">Free Quote</span>
          </h2>
          <p className="text-xl text-desert-sand max-w-2xl mx-auto">
            Ready to rise above your waste management challenges? Contact us today
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-3xl font-bold text-desert-tan mb-8">Contact Information</h3>

              <div className="space-y-6">
                <motion.a
                  href="tel:480-851-2000"
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 bg-phoenix-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Phone className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-desert-sand text-sm">Call Us</p>
                    <p className="text-2xl font-bold text-desert-tan group-hover:text-phoenix-coral transition-colors">
                      480-851-2000
                    </p>
                  </div>
                </motion.a>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 bg-phoenix-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-desert-sand text-sm">Email Us</p>
                    <p className="text-xl font-bold text-desert-tan group-hover:text-phoenix-coral transition-colors">
                      info@patriotdisposal.com
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 bg-phoenix-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <MapPin className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-desert-sand text-sm">Service Area</p>
                    <p className="text-xl font-bold text-desert-tan group-hover:text-phoenix-coral transition-colors">
                      Phoenix Metro Area
                    </p>
                  </div>
                </motion.div>

                <motion.div
                  whileHover={{ x: 10 }}
                  className="flex items-center gap-4 group"
                >
                  <div className="w-14 h-14 bg-phoenix-gradient rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Clock className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <p className="text-desert-sand text-sm">Business Hours</p>
                    <p className="text-xl font-bold text-desert-tan">Mon-Fri: 6AM - 6PM</p>
                    <p className="text-lg text-desert-sand">Sat: 7AM - 3PM</p>
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 }}
              className="bg-patriot-blue border-2 border-phoenix-coral rounded-xl p-6"
            >
              <h4 className="text-xl font-bold text-desert-tan mb-3">Why Choose Patriot?</h4>
              <ul className="space-y-2 text-desert-sand">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-phoenix-coral rounded-full" />
                  Same-day service available
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-phoenix-coral rounded-full" />
                  Locally owned & operated
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-phoenix-coral rounded-full" />
                  Competitive pricing
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-phoenix-coral rounded-full" />
                  Professional & reliable
                </li>
              </ul>
            </motion.div>
          </motion.div>

          {/* Quote Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="bg-patriot-darkNavy border-2 border-patriot-blue rounded-xl p-8">
              <h3 className="text-2xl font-bold text-desert-tan mb-6">Request a Quote</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-desert-sand mb-2">Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-patriot-navy border-2 border-patriot-blue focus:border-phoenix-coral rounded-lg text-desert-tan outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-desert-sand mb-2">Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-patriot-navy border-2 border-patriot-blue focus:border-phoenix-coral rounded-lg text-desert-tan outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-desert-sand mb-2">Phone *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-patriot-navy border-2 border-patriot-blue focus:border-phoenix-coral rounded-lg text-desert-tan outline-none transition-colors"
                    placeholder="(480) 555-0123"
                  />
                </div>

                <div>
                  <label className="block text-desert-sand mb-2">Service Type *</label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 bg-patriot-navy border-2 border-patriot-blue focus:border-phoenix-coral rounded-lg text-desert-tan outline-none transition-colors"
                  >
                    <option value="">Select a service</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="construction">Construction</option>
                    <option value="recycling">Recycling</option>
                    <option value="rolloff">Roll-Off Dumpster</option>
                    <option value="junk">Junk Removal</option>
                  </select>
                </div>

                <div>
                  <label className="block text-desert-sand mb-2">Message</label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={4}
                    className="w-full px-4 py-3 bg-patriot-navy/50 border-2 border-patriot-blue focus:border-phoenix-coral rounded-lg text-desert-tan outline-none transition-colors resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-4 bg-phoenix-gradient text-white font-bold text-lg rounded-lg flex items-center justify-center gap-2 desert-glow hover:shadow-2xl transition-shadow"
                >
                  <Send className="w-5 h-5" />
                  Send Request
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
