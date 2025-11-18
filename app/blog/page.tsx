'use client';

import { motion } from 'framer-motion';
import { Calendar, ArrowRight, Clock, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const blogPosts = [
  {
    id: 1,
    title: 'How to Choose the Right Dumpster Size for Your Project',
    excerpt: 'Selecting the correct dumpster size can save you time and money. Learn about our 10, 20, 30, and 40-yard options and which is best for your needs.',
    date: '2024-11-15',
    readTime: '5 min read',
    category: 'Tips & Guides',
    slug: 'choose-right-dumpster-size'
  },
  {
    id: 2,
    title: 'Construction Waste Management Best Practices',
    excerpt: 'Keep your job site clean and compliant with these essential waste management tips for construction projects in the Phoenix area.',
    date: '2024-11-10',
    readTime: '4 min read',
    category: 'Construction',
    slug: 'construction-waste-management'
  },
  {
    id: 3,
    title: 'The Benefits of Proper Recycling for Arizona Businesses',
    excerpt: 'Discover how implementing a recycling program can reduce costs, improve sustainability, and enhance your company\'s reputation.',
    date: '2024-11-05',
    readTime: '6 min read',
    category: 'Recycling',
    slug: 'recycling-benefits-arizona'
  },
  {
    id: 4,
    title: 'Spring Cleaning: Decluttering Tips for Phoenix Homeowners',
    excerpt: 'Make your spring cleaning easier with these organization and disposal tips tailored for Arizona residents.',
    date: '2024-10-28',
    readTime: '5 min read',
    category: 'Residential',
    slug: 'spring-cleaning-tips'
  },
  {
    id: 5,
    title: 'Understanding Phoenix Waste Disposal Regulations',
    excerpt: 'Stay compliant with local regulations. Here\'s what you need to know about waste disposal rules in the Phoenix metro area.',
    date: '2024-10-20',
    readTime: '7 min read',
    category: 'Regulations',
    slug: 'phoenix-disposal-regulations'
  },
  {
    id: 6,
    title: 'Eco-Friendly Disposal: What Can and Cannot Be Recycled',
    excerpt: 'Not everything goes in the recycling bin. Learn what materials are recyclable and how to properly dispose of different waste types.',
    date: '2024-10-15',
    readTime: '4 min read',
    category: 'Recycling',
    slug: 'eco-friendly-disposal-guide'
  }
];

export default function BlogPage() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  return (
    <main className="min-h-screen bg-patriot-darkNavy">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-desert-sand hover:text-phoenix-coral transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-6xl font-bold text-desert-tan mb-4">
              Our <span className="bg-phoenix-gradient bg-clip-text text-transparent">Blog</span>
            </h1>
            <p className="text-xl text-desert-sand max-w-2xl">
              Stay informed with the latest tips, industry insights, and company updates from Patriot Disposal Phoenix.
            </p>
          </motion.div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group"
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="bg-patriot-navy border-2 border-patriot-blue hover:border-phoenix-coral transition-all duration-300 rounded-xl overflow-hidden h-full flex flex-col">
                    {/* Image placeholder */}
                    <div className="relative h-48 bg-patriot-blue overflow-hidden">
                      <div className="absolute inset-0 bg-phoenix-gradient opacity-20 group-hover:opacity-30 transition-opacity" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-6xl opacity-30">📰</span>
                      </div>
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-phoenix-coral text-white text-xs font-bold rounded-full">
                          {post.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-4 text-sm text-desert-sand mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(post.date)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>

                      <h2 className="text-xl font-bold text-desert-tan mb-3 group-hover:text-phoenix-coral transition-colors line-clamp-2">
                        {post.title}
                      </h2>

                      <p className="text-desert-sand mb-4 line-clamp-3 flex-1">
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
        </div>
      </div>

      <Footer />
    </main>
  );
}
