'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-patriot-darkNavy border-t border-phoenix-coral/20 py-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12">
                <Image
                  src="/logo.png"
                  alt="Patriot Disposal Phoenix"
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-2xl font-bold">
                <span className="bg-phoenix-gradient bg-clip-text text-transparent">PATRIOT</span>
              </h3>
            </div>
            <p className="text-desert-sand mb-4">
              Rising above in waste management. Serving the Phoenix metro area with honor and dedication.
            </p>
            <div className="flex gap-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-phoenix-gradient rounded-lg flex items-center justify-center"
              >
                <Facebook className="w-5 h-5 text-white" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-phoenix-gradient rounded-lg flex items-center justify-center"
              >
                <Instagram className="w-5 h-5 text-white" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1, y: -2 }}
                className="w-10 h-10 bg-phoenix-gradient rounded-lg flex items-center justify-center"
              >
                <Linkedin className="w-5 h-5 text-white" />
              </motion.a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-desert-tan font-bold mb-4">Services</h4>
            <ul className="space-y-2 text-desert-sand">
              <li><a href="#" className="hover:text-phoenix-coral transition-colors">Residential</a></li>
              <li><a href="#" className="hover:text-phoenix-coral transition-colors">Commercial</a></li>
              <li><a href="#" className="hover:text-phoenix-coral transition-colors">Construction</a></li>
              <li><a href="#" className="hover:text-phoenix-coral transition-colors">Recycling</a></li>
              <li><a href="#" className="hover:text-phoenix-coral transition-colors">Roll-Off Dumpsters</a></li>
              <li><a href="#" className="hover:text-phoenix-coral transition-colors">Junk Removal</a></li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-desert-tan font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-desert-sand">
              <li><a href="#" className="hover:text-phoenix-coral transition-colors">About Us</a></li>
              <li><a href="#quote" className="hover:text-phoenix-coral transition-colors">Get a Quote</a></li>
              <li><a href="#" className="hover:text-phoenix-coral transition-colors">Service Areas</a></li>
              <li><a href="#" className="hover:text-phoenix-coral transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-phoenix-coral transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-desert-tan font-bold mb-4">Contact</h4>
            <ul className="space-y-3 text-desert-sand">
              <li className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-phoenix-coral flex-shrink-0 mt-0.5" />
                <a href="tel:480-851-2000" className="hover:text-phoenix-coral transition-colors">
                  480-851-2000
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-5 h-5 text-phoenix-coral flex-shrink-0 mt-0.5" />
                <a href="mailto:info@patriotdisposal.com" className="hover:text-phoenix-coral transition-colors">
                  info@patriotdisposal.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-phoenix-coral flex-shrink-0 mt-0.5" />
                <span>Phoenix Metro Area</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-patriot-blue pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-desert-sand text-sm">
              &copy; {new Date().getFullYear()} Patriot Disposal Phoenix. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-desert-sand">
              <a href="#" className="hover:text-phoenix-coral transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-phoenix-coral transition-colors">Terms of Service</a>
            </div>
          </div>
          <div className="text-center mt-6">
            <p className="text-desert-sand/60 text-xs">
              Site designed and maintained by{' '}
              <a
                href="https://azdevops.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-phoenix-coral hover:text-phoenix-orange transition-colors"
              >
                DevCollective
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
