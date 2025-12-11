'use client';

import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowLeft, Share2, Facebook, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const author = {
  name: 'Andrew Bodnar',
  linkedin: 'https://www.linkedin.com/in/andy-bodnar-79344a76/'
};

// Sample blog data - in production this would come from a CMS or database
const blogPosts: Record<string, any> = {
  'holiday-waste-management-2025': {
    title: 'Holiday Waste Disposal: Keeping Phoenix Clean This Season',
    date: '2025-12-08',
    readTime: '5 min read',
    category: 'Holiday Tips',
    image: '/blog/holiday-waste-optimized.jpg',
    content: `
      <p>The holiday season is a time of joy, family gatherings, and unfortunately, a significant increase in household waste. From gift wrapping to packaging materials, the average American household generates 25% more trash between Thanksgiving and New Year's. Here's how Phoenix residents can manage holiday waste responsibly.</p>

      <h2>The Holiday Waste Challenge</h2>
      <p>During the holiday season, Americans throw away approximately 25 million tons of garbage—about 1 million extra tons per week. This includes:</p>
      <ul>
        <li>Wrapping paper and gift bags</li>
        <li>Cardboard boxes from online shopping</li>
        <li>Food waste from holiday meals</li>
        <li>Broken decorations and old lights</li>
        <li>Packaging materials and Styrofoam</li>
      </ul>

      <h2>Tips for Reducing Holiday Waste</h2>

      <h3>1. Recycle Smart</h3>
      <p>Not all wrapping paper is recyclable. Avoid metallic or glittery paper and opt for recyclable options. Break down cardboard boxes to maximize recycling bin space.</p>

      <h3>2. Reuse Gift Bags and Bows</h3>
      <p>Quality gift bags, ribbons, and bows can be saved and reused for years. Start a collection box for next year's wrapping supplies.</p>

      <h3>3. Plan for Extra Pickup</h3>
      <p>If you're hosting large gatherings or expect significant waste, consider scheduling an extra pickup with Patriot Disposal Phoenix. We're here to help keep your holidays stress-free.</p>

      <h3>4. Donate Instead of Discard</h3>
      <p>Before throwing out old items to make room for new gifts, consider donating gently used items to local Phoenix charities.</p>

      <h2>Electronics and Battery Disposal</h2>
      <p>New electronics mean old ones need proper disposal. Never throw batteries or electronics in regular trash. Phoenix has several e-waste recycling locations, or contact us for guidance on proper disposal.</p>

      <h2>Need Extra Help This Season?</h2>
      <p>Patriot Disposal Phoenix offers flexible scheduling during the holiday season. Whether you need an extra pickup or a dumpster for post-holiday cleanout, call us at 480-851-2000.</p>
    `
  },
  'post-thanksgiving-cleanup-tips': {
    title: 'Post-Thanksgiving Cleanup: Disposing of Large Items Before Christmas',
    date: '2025-12-02',
    readTime: '4 min read',
    category: 'Residential',
    image: '/blog/post-thanksgiving-cleanup.jpg',
    content: `
      <p>The period between Thanksgiving and Christmas is the perfect time to declutter your home. Before new gifts arrive, clear out the old to make room and start the new year fresh.</p>

      <h2>Why Now is the Perfect Time</h2>
      <p>Post-Thanksgiving is ideal for decluttering because:</p>
      <ul>
        <li>You've just seen what you have (and don't use) during holiday prep</li>
        <li>New items will arrive with Christmas gifts</li>
        <li>Donation centers need items before the holidays</li>
        <li>You'll have a cleaner home for holiday guests</li>
      </ul>

      <h2>Large Items That Need Special Disposal</h2>

      <h3>Furniture</h3>
      <p>Old couches, mattresses, and furniture can't go in regular trash. Patriot Disposal offers bulk item pickup—just call to schedule.</p>

      <h3>Electronics</h3>
      <p>TVs, computers, and old gaming systems require e-waste disposal. Many contain hazardous materials that shouldn't go to landfills.</p>

      <h3>Appliances</h3>
      <p>Replacing that old refrigerator or washer? We can help coordinate pickup of large appliances.</p>

      <h2>Renting a Dumpster for Major Cleanouts</h2>
      <p>If you're doing a serious declutter, a dumpster rental might be your best option:</p>
      <ul>
        <li><strong>10-yard:</strong> Perfect for garage cleanouts</li>
        <li><strong>20-yard:</strong> Ideal for whole-house decluttering</li>
        <li><strong>30-yard:</strong> Great if you're clearing out multiple rooms</li>
      </ul>

      <h2>Donation Options in Phoenix</h2>
      <p>Before disposing of items, consider if they could benefit others:</p>
      <ul>
        <li>Goodwill and Salvation Army accept furniture and household items</li>
        <li>Habitat for Humanity ReStore takes building materials and appliances</li>
        <li>Local shelters often need household items</li>
      </ul>

      <h2>Schedule Your Cleanout Today</h2>
      <p>Don't wait until the last minute. Call Patriot Disposal Phoenix at 480-851-2000 to schedule your pre-Christmas cleanout and start the new year clutter-free.</p>
    `
  },
  'holiday-schedule-2025': {
    title: '2025 Holiday Schedule: Patriot Disposal Service Dates',
    date: '2025-11-25',
    readTime: '3 min read',
    category: 'Company News',
    image: '/blog/holiday-schedule.png',
    content: `
      <p>Planning ahead for the holidays? Here's everything you need to know about Patriot Disposal Phoenix's service schedule during the 2025 holiday season.</p>

      <h2>Holiday Closures</h2>
      <p>Our office will be closed on the following days:</p>
      <ul>
        <li><strong>Thanksgiving Day</strong> - Thursday, November 27, 2025</li>
        <li><strong>Day After Thanksgiving</strong> - Friday, November 28, 2025</li>
        <li><strong>Christmas Day</strong> - Thursday, December 25, 2025</li>
        <li><strong>New Year's Day</strong> - Thursday, January 1, 2026</li>
      </ul>

      <h2>Adjusted Pickup Schedule</h2>
      <p>During holiday weeks, pickup schedules may be adjusted:</p>
      <ul>
        <li>If your regular pickup falls on a holiday, service will be delayed by one day</li>
        <li>Friday customers during holiday weeks may be serviced on Saturday</li>
        <li>Please have containers out by 6 AM on your adjusted pickup day</li>
      </ul>

      <h2>Extra Holiday Waste</h2>
      <p>We understand the holidays generate extra waste. Here are your options:</p>
      <ul>
        <li>Extra bags can be placed beside your container (standard fees apply)</li>
        <li>Schedule an additional pickup by calling our office</li>
        <li>Rent a temporary dumpster for large gatherings or cleanouts</li>
      </ul>

      <h2>Christmas Tree Disposal</h2>
      <p>After the holidays, we'll help you dispose of your Christmas tree:</p>
      <ul>
        <li>Remove all decorations, lights, and tinsel</li>
        <li>Place tree at curb on your regular pickup day</li>
        <li>Trees over 6 feet should be cut in half</li>
        <li>Collection runs through January 15, 2026</li>
      </ul>

      <h2>Contact Us</h2>
      <p>Questions about holiday service? Call us at 480-851-2000 or check our website for updates. We wish all our customers a safe and happy holiday season!</p>
    `
  },
  'christmas-tree-recycling-phoenix': {
    title: 'Recycling Your Christmas Tree in Phoenix: What You Need to Know',
    date: '2025-11-20',
    readTime: '4 min read',
    category: 'Recycling',
    content: `
      <p>Every year, millions of Christmas trees end up in landfills. But your tree can have a second life! Here's how Phoenix residents can responsibly dispose of their Christmas trees.</p>

      <h2>Why Recycle Your Tree?</h2>
      <p>Christmas trees are 100% biodegradable and can be recycled into:</p>
      <ul>
        <li>Mulch for parks and gardens</li>
        <li>Compost for soil enrichment</li>
        <li>Erosion barriers</li>
        <li>Wildlife habitats</li>
      </ul>

      <h2>Preparing Your Tree for Recycling</h2>
      <p>Before putting your tree at the curb:</p>
      <ul>
        <li><strong>Remove ALL decorations</strong> - lights, tinsel, ornaments, and garland</li>
        <li><strong>Remove the stand</strong> - metal and plastic can't be processed</li>
        <li><strong>No flocked trees</strong> - artificial snow prevents recycling</li>
        <li><strong>No artificial trees</strong> - these must go in regular trash</li>
      </ul>

      <h2>Curbside Pickup with Patriot Disposal</h2>
      <p>We make tree disposal easy:</p>
      <ul>
        <li>Place your tree at the curb on your regular pickup day</li>
        <li>Collection available January 2-15, 2026</li>
        <li>Trees over 6 feet should be cut in half</li>
        <li>No bag required—just place at curb</li>
      </ul>

      <h2>Phoenix Drop-Off Locations</h2>
      <p>If you prefer to drop off your tree, Phoenix offers several free recycling locations during the first two weeks of January. Check the City of Phoenix website for locations nearest you.</p>

      <h2>What About Artificial Trees?</h2>
      <p>Artificial trees can't be recycled, but they can last 10+ years with proper care. If yours is worn out:</p>
      <ul>
        <li>Donate if still in good condition</li>
        <li>Check if manufacturer has a take-back program</li>
        <li>Dispose in regular trash as a last resort</li>
      </ul>

      <h2>Questions?</h2>
      <p>Contact Patriot Disposal Phoenix at 480-851-2000 for more information about holiday tree recycling and our collection schedule.</p>
    `
  },
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
    title: 'Construction Waste Disposal Best Practices',
    date: '2024-11-10',
    readTime: '4 min read',
    category: 'Construction',
    content: `
      <p>Effective construction waste disposal is essential for keeping your job site safe, efficient, and compliant with local regulations. Here are the best practices every Phoenix contractor should follow.</p>

      <h2>Plan Ahead</h2>
      <p>Before starting any project, develop a waste disposal plan that includes:</p>
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

      <p>Contact us today at 480-851-2000 to discuss your construction waste disposal needs.</p>
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
            <p className="text-desert-sand mb-8">The blog post you&apos;re looking for doesn&apos;t exist.</p>
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

            <div className="flex flex-wrap items-center gap-6 text-desert-sand mb-4">
              <span className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                {formatDate(post.date)}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-5 h-5" />
                {post.readTime}
              </span>
            </div>
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-patriot-blue">
              <span className="text-desert-sand">Author <span className="text-desert-sand/60 mx-1">|</span> <span className="text-desert-tan font-medium">{author.name}</span></span>
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-[#0A66C2] hover:text-[#004182] transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Hero Image */}
          {post.image && (
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="max-w-4xl mx-auto mb-12"
            >
              <div className="relative aspect-[16/9] rounded-2xl overflow-hidden shadow-2xl shadow-black/30">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 896px"
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-patriot-darkNavy/40 via-transparent to-transparent" />
              </div>
            </motion.div>
          )}

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
              Contact Patriot Disposal Phoenix today for reliable waste disposal services.
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
