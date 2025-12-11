'use client';

import { motion, useInView } from 'framer-motion';
import { Calendar, ArrowRight, Clock } from 'lucide-react';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const blogPosts = [
  {
    id: 1,
    title: 'Holiday Waste Disposal: Keeping Phoenix Clean This Season',
    excerpt: 'The holiday season brings extra waste from packaging, decorations, and gatherings. Here\'s how to manage it responsibly and keep your home clutter-free.',
    date: 'December 8, 2025',
    readTime: '5 min read',
    image: '/blog/holiday-waste-optimized.jpg',
    slug: 'holiday-waste-management-2025'
  },
  {
    id: 2,
    title: 'Post-Thanksgiving Cleanup: Disposing of Large Items Before Christmas',
    excerpt: 'Between Thanksgiving and Christmas is the perfect time to declutter. Learn how to properly dispose of furniture, electronics, and bulky items.',
    date: 'December 2, 2025',
    readTime: '4 min read',
    image: '/blog/post-thanksgiving-cleanup-clean.jpg',
    slug: 'post-thanksgiving-cleanup-tips'
  },
  {
    id: 3,
    title: '2025 Holiday Schedule: Patriot Disposal Service Dates',
    excerpt: 'Plan ahead for the holidays! Check our updated service schedule for Thanksgiving, Christmas, and New Year\'s to ensure uninterrupted collection.',
    date: 'November 25, 2025',
    readTime: '3 min read',
    image: null,
    slug: 'holiday-schedule-2025'
  }
];

export default function Blog() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="blog" ref={ref} className="py-24 bg-patriot-navy relative overflow-hidden">
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
            Latest <span className="bg-phoenix-gradient bg-clip-text text-transparent">News</span>
          </h2>
          <p className="text-xl text-desert-sand max-w-2xl mx-auto">
            Tips, insights, and updates from the Patriot Disposal team
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, transition: { duration: 0.3 } }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`} className="block">
                <div className="bg-patriot-darkNavy border-2 border-patriot-blue hover:border-phoenix-coral transition-all duration-300 rounded-xl overflow-hidden h-full">
                  {/* Image */}
                  <div className="relative h-56 bg-patriot-blue overflow-hidden">
                    {post.image ? (
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <>
                        <div className="absolute inset-0 bg-phoenix-gradient opacity-20 group-hover:opacity-30 transition-opacity" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-6xl opacity-30">📰</span>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-desert-sand mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {post.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-xl font-bold text-desert-tan mb-3 group-hover:text-phoenix-coral transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    <p className="text-desert-sand mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>

                    <span className="inline-flex items-center gap-2 text-phoenix-coral font-medium group-hover:gap-3 transition-all">
                      Read More
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 bg-phoenix-gradient text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
          >
            View All Posts
            <ArrowRight className="w-5 h-5" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
