'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Sample blog data - in production this would come from a CMS or database
const blogPosts: Record<string, any> = {
  'choose-right-dumpster-size': {
    title: 'How to Choose the Right Dumpster Size for Your Project',
    date: '2024-11-15',
    readTime: '5 min read',
    category: 'Tips & Guides',
    content: `
      <p>Choosing the right dumpster size is crucial for any project, whether you're renovating your home, cleaning out a garage, or managing construction debris. At Patriot Disposal Phoenix, we offer a range of sizes to fit every need.</p>

      <h2>Understanding Dumpster Sizes</h2>

      <h3>10-Yard Dumpster</h3>
      <p>Perfect for small projects like:</p>
      <ul>
        <li>Garage cleanouts</li>
        <li>Small bathroom or kitchen remodels</li>
        <li>Deck removal (up to 300 sq ft)</li>
        <li>Small landscaping projects</li>
      </ul>
      <p>Holds approximately 3 pickup truck loads of debris.</p>

      <h3>20-Yard Dumpster</h3>
      <p>Ideal for medium-sized projects:</p>
      <ul>
        <li>Roof replacements (up to 3,000 sq ft)</li>
        <li>Flooring removal for large houses</li>
        <li>Garage or basement cleanouts</li>
        <li>Medium construction projects</li>
      </ul>
      <p>Holds approximately 6 pickup truck loads of debris.</p>

      <h3>30-Yard Dumpster</h3>
      <p>Great for larger projects:</p>
      <ul>
        <li>Major home additions</li>
        <li>New construction</li>
        <li>Large home cleanouts</li>
        <li>Commercial renovations</li>
      </ul>
      <p>Holds approximately 9 pickup truck loads of debris.</p>

      <h3>40-Yard Dumpster</h3>
      <p>Our largest option for major projects:</p>
      <ul>
        <li>Large commercial construction</li>
        <li>Major demolition projects</li>
        <li>Industrial cleanouts</li>
        <li>Large-scale renovations</li>
      </ul>
      <p>Holds approximately 12 pickup truck loads of debris.</p>

      <h2>Tips for Choosing the Right Size</h2>

      <ol>
        <li><strong>Estimate your debris volume:</strong> Consider the scope of your project and the amount of waste you'll generate.</li>
        <li><strong>Consider the debris type:</strong> Heavy materials like concrete may require a smaller dumpster due to weight limits.</li>
        <li><strong>Think about space:</strong> Make sure you have adequate space for the dumpster size you need.</li>
        <li><strong>When in doubt, size up:</strong> It's better to have a little extra room than to need a second dumpster.</li>
      </ol>

      <h2>Need Help Deciding?</h2>
      <p>Our team at Patriot Disposal Phoenix is here to help you choose the perfect dumpster size for your project. Call us at 480-851-2000 and we'll guide you through the selection process based on your specific needs.</p>
    `
  },
  'construction-waste-management': {
    title: 'Construction Waste Management Best Practices',
    date: '2024-11-10',
    readTime: '4 min read',
    category: 'Construction',
    content: `
      <p>Effective construction waste management is essential for keeping your job site safe, efficient, and compliant with local regulations. Here are the best practices every Phoenix contractor should follow.</p>

      <h2>Plan Ahead</h2>
      <p>Before starting any project, develop a waste management plan that includes:</p>
      <ul>
        <li>Estimated waste volumes by material type</li>
        <li>Disposal methods for different materials</li>
        <li>Recycling opportunities</li>
        <li>Dumpster placement and pickup schedules</li>
      </ul>

      <h2>Separate Your Waste</h2>
      <p>Segregating waste materials can reduce disposal costs and increase recycling rates:</p>
      <ul>
        <li><strong>Concrete and masonry:</strong> Can often be recycled into aggregate</li>
        <li><strong>Wood:</strong> Clean wood can be recycled or repurposed</li>
        <li><strong>Metal:</strong> Highly recyclable and valuable</li>
        <li><strong>Drywall:</strong> Can be recycled in many areas</li>
      </ul>

      <h2>Keep Your Site Clean</h2>
      <p>A clean job site is a safe job site. Regular waste removal:</p>
      <ul>
        <li>Reduces trip hazards</li>
        <li>Improves worker productivity</li>
        <li>Prevents pest infestations</li>
        <li>Makes a better impression on clients</li>
      </ul>

      <h2>Partner with a Reliable Disposal Company</h2>
      <p>Patriot Disposal Phoenix offers flexible scheduling, competitive pricing, and reliable service for construction projects of all sizes. We understand the unique demands of construction waste and work around your schedule to keep your project on track.</p>

      <p>Contact us today at 480-851-2000 to discuss your construction waste management needs.</p>
    `
  },
  'recycling-benefits-arizona': {
    title: 'The Benefits of Proper Recycling for Arizona Businesses',
    date: '2024-11-05',
    readTime: '6 min read',
    category: 'Recycling',
    content: `
      <p>Implementing a comprehensive recycling program isn't just good for the environment—it's good for your business. Here's why Arizona businesses should prioritize recycling.</p>

      <h2>Cost Savings</h2>
      <p>Recycling can significantly reduce your waste disposal costs:</p>
      <ul>
        <li>Lower hauling fees with reduced waste volume</li>
        <li>Potential revenue from recyclable materials</li>
        <li>Reduced need for new materials</li>
        <li>Tax incentives for sustainable practices</li>
      </ul>

      <h2>Environmental Impact</h2>
      <p>Your recycling efforts make a real difference:</p>
      <ul>
        <li>Conserves natural resources</li>
        <li>Reduces greenhouse gas emissions</li>
        <li>Decreases landfill usage</li>
        <li>Protects Arizona's beautiful landscapes</li>
      </ul>

      <h2>Enhanced Reputation</h2>
      <p>Customers and partners increasingly value sustainability:</p>
      <ul>
        <li>Attract environmentally conscious customers</li>
        <li>Meet corporate sustainability requirements</li>
        <li>Improve employee morale and recruitment</li>
        <li>Stand out from competitors</li>
      </ul>

      <h2>Getting Started</h2>
      <p>Patriot Disposal Phoenix can help you implement an effective recycling program tailored to your business. We offer:</p>
      <ul>
        <li>Waste audits to identify recycling opportunities</li>
        <li>Customized collection schedules</li>
        <li>Employee training resources</li>
        <li>Regular reporting on your recycling impact</li>
      </ul>

      <p>Ready to start recycling? Call us at 480-851-2000 to learn more about our commercial recycling services.</p>
    `
  }
};

export default function BlogPostPage() {
  const params = useParams();
  const slug = params.slug as string;
  const post = blogPosts[slug];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
  };

  if (!post) {
    return (
      <main className="min-h-screen bg-patriot-darkNavy">
        <Navbar />
        <div className="pt-32 pb-24">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-4xl font-bold text-desert-tan mb-4">Post Not Found</h1>
            <p className="text-desert-sand mb-8">The blog post you're looking for doesn't exist.</p>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 bg-phoenix-gradient text-white font-bold rounded-lg"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-patriot-darkNavy">
      <Navbar />

      <article className="pt-32 pb-24">
        <div className="container mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-desert-sand hover:text-phoenix-coral transition-colors mb-6"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Blog
            </Link>

            <span className="inline-block px-3 py-1 bg-phoenix-coral text-white text-sm font-bold rounded-full mb-4">
              {post.category}
            </span>

            <h1 className="text-4xl md:text-5xl font-bold text-desert-tan mb-6">
              {post.title}
            </h1>

            <div className="flex items-center gap-6 text-desert-sand mb-8 pb-8 border-b border-patriot-blue">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {post.readTime}
              </span>
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-3xl mx-auto prose prose-invert prose-lg"
          >
            <div
              className="text-desert-sand
                [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-desert-tan [&>h2]:mt-8 [&>h2]:mb-4
                [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-desert-tan [&>h3]:mt-6 [&>h3]:mb-3
                [&>p]:mb-4 [&>p]:leading-relaxed
                [&>ul]:mb-4 [&>ul]:ml-6 [&>ul]:list-disc
                [&>ol]:mb-4 [&>ol]:ml-6 [&>ol]:list-decimal
                [&>li]:mb-2
                [&_strong]:text-desert-tan"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </motion.div>

          {/* Share */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-3xl mx-auto mt-12 pt-8 border-t border-patriot-blue"
          >
            <div className="flex items-center justify-between">
              <span className="text-desert-tan font-bold flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share this post
              </span>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 bg-patriot-navy border border-patriot-blue hover:border-phoenix-coral rounded-lg flex items-center justify-center text-desert-sand hover:text-phoenix-coral transition-colors"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-patriot-navy border border-patriot-blue hover:border-phoenix-coral rounded-lg flex items-center justify-center text-desert-sand hover:text-phoenix-coral transition-colors"
                >
                  <Twitter className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 bg-patriot-navy border border-patriot-blue hover:border-phoenix-coral rounded-lg flex items-center justify-center text-desert-sand hover:text-phoenix-coral transition-colors"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="max-w-3xl mx-auto mt-12 bg-patriot-navy border-2 border-phoenix-coral/30 rounded-xl p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-desert-tan mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-desert-sand mb-6">
              Contact Patriot Disposal Phoenix today for reliable waste management services.
            </p>
            <a
              href="tel:480-851-2000"
              className="inline-flex items-center gap-2 px-8 py-3 bg-phoenix-gradient text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Call 480-851-2000
            </a>
          </motion.div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
