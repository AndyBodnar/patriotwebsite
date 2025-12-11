'use client';

import { useState, useEffect } from 'react';
import { Calendar, ArrowRight, Clock, ArrowLeft, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const author = {
  name: 'Andrew Bodnar',
  linkedin: 'https://www.linkedin.com/in/andy-bodnar-79344a76/'
};

const blogPosts = [
  {
    id: 1,
    title: 'Holiday Waste Disposal: Keeping Phoenix Clean This Season',
    excerpt: 'The holiday season brings extra waste from packaging, decorations, and gatherings. Here\'s how to manage it responsibly and keep your home clutter-free.',
    date: 'December 8, 2025',
    readTime: '5 min read',
    category: 'Holiday Tips',
    slug: 'holiday-waste-management-2025',
    image: '/blog/holiday-waste-optimized.jpg'
  },
  {
    id: 2,
    title: 'Post-Thanksgiving Cleanup: Disposing of Large Items Before Christmas',
    excerpt: 'Between Thanksgiving and Christmas is the perfect time to declutter. Learn how to properly dispose of furniture, electronics, and bulky items before the new year.',
    date: 'December 2, 2025',
    readTime: '4 min read',
    category: 'Residential',
    slug: 'post-thanksgiving-cleanup-tips',
    image: '/blog/post-thanksgiving-cleanup-clean.jpg'
  },
  {
    id: 3,
    title: '2025 Holiday Schedule: Patriot Disposal Service Dates',
    excerpt: 'Plan ahead for the holidays! Check our updated service schedule for Thanksgiving, Christmas, and New Year\'s to ensure uninterrupted waste collection.',
    date: 'November 25, 2025',
    readTime: '3 min read',
    category: 'Company News',
    slug: 'holiday-schedule-2025',
    image: '/blog/holiday-schedule.png'
  },
  {
    id: 4,
    title: 'Recycling Your Christmas Tree in Phoenix: What You Need to Know',
    excerpt: 'Don\'t let your Christmas tree end up in the landfill! Discover eco-friendly disposal options and recycling programs available in the Phoenix metro area.',
    date: 'November 20, 2025',
    readTime: '4 min read',
    category: 'Recycling',
    slug: 'christmas-tree-recycling-phoenix',
    image: null
  },
  {
    id: 5,
    title: 'How to Choose the Right Dumpster Size for Your Project',
    excerpt: 'Selecting the correct dumpster size can save you time and money. Learn about our 10, 20, 30, and 40-yard options and which is best for your needs.',
    date: 'November 15, 2025',
    readTime: '5 min read',
    category: 'Tips & Guides',
    slug: 'choose-right-dumpster-size',
    image: null
  },
  {
    id: 6,
    title: 'Construction Waste Disposal Best Practices',
    excerpt: 'Keep your job site clean and compliant with these essential waste disposal tips for construction projects in the Phoenix area.',
    date: 'November 10, 2025',
    readTime: '4 min read',
    category: 'Construction',
    slug: 'construction-waste-management',
    image: null
  },
  {
    id: 7,
    title: 'The Benefits of Proper Recycling for Arizona Businesses',
    excerpt: 'Discover how implementing a recycling program can reduce costs, improve sustainability, and enhance your company\'s reputation.',
    date: 'November 5, 2025',
    readTime: '6 min read',
    category: 'Recycling',
    slug: 'recycling-benefits-arizona',
    image: null
  },
  {
    id: 8,
    title: 'Fall Yard Cleanup: Disposing of Leaves and Debris in Phoenix',
    excerpt: 'Arizona\'s mild fall is perfect for yard work. Learn the best practices for disposing of yard waste and keeping your property pristine.',
    date: 'October 28, 2025',
    readTime: '5 min read',
    category: 'Residential',
    slug: 'fall-yard-cleanup-phoenix',
    image: null
  },
  {
    id: 9,
    title: 'Understanding Phoenix Waste Disposal Regulations',
    excerpt: 'Stay compliant with local regulations. Here\'s what you need to know about waste disposal rules in the Phoenix metro area.',
    date: 'October 20, 2025',
    readTime: '7 min read',
    category: 'Regulations',
    slug: 'phoenix-disposal-regulations',
    image: null
  },
  {
    id: 10,
    title: 'Eco-Friendly Disposal: What Can and Cannot Be Recycled',
    excerpt: 'Not everything goes in the recycling bin. Learn what materials are recyclable and how to properly dispose of different waste types.',
    date: 'October 15, 2025',
    readTime: '4 min read',
    category: 'Recycling',
    slug: 'eco-friendly-disposal-guide',
    image: null
  }
];

export default function BlogPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="min-h-screen bg-patriot-darkNavy">
      <Navbar />

      <div className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Header */}
          <div className="mb-12">
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
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={post.id}
                className="group"
                style={{
                  opacity: mounted ? 1 : 0,
                  transform: mounted ? 'translateY(0)' : 'translateY(50px)',
                  transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`
                }}
              >
                <Link href={`/blog/${post.slug}`} className="block h-full">
                  <div className="bg-patriot-navy border-2 border-patriot-blue hover:border-phoenix-coral transition-all duration-300 rounded-xl overflow-hidden h-full flex flex-col hover:-translate-y-2">
                    {/* Image */}
                    <div className="relative h-56 bg-patriot-blue overflow-hidden">
                      {post.image ? (
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          priority={index < 2}
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
                          {post.date}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-sm text-desert-sand">By {author.name}</span>
                        <a
                          href={author.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="text-[#0A66C2] hover:text-[#004182] transition-colors"
                        >
                          <Linkedin className="w-4 h-4" />
                        </a>
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
              </article>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
