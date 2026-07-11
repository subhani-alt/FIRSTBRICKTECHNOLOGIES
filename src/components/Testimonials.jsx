import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';

const fallbackTestimonials = [
  {
    _id: 't1',
    name: 'Sarah Jenkins',
    company: 'CEO at NexaTech',
    rating: 5,
    text: 'Working with this agency was a game-changer. They built our autonomous sales agent in under 4 weeks, reducing response times by 85%. The dashboard is incredibly intuitive!',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80'
  },
  {
    _id: 't2',
    name: 'Marcus Chen',
    company: 'Director of Product at Innovate Group',
    rating: 5,
    text: 'The headless web app they delivered is incredibly fast, and the design is premium. Their attention to detail and responsiveness throughout development was top-tier.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80'
  },
  {
    _id: 't3',
    name: 'Elena Rostova',
    company: 'Founder of CloudPulse',
    rating: 5,
    text: 'Their AI automated reporting system cut our manual operations overhead in half. Professional, brilliant software engineers who know how to ship stable code.',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80'
  }
];

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await axios.get('/testimonials');
        if (res.data && res.data.length > 0) {
          setTestimonials(res.data);
        } else {
          setTestimonials(fallbackTestimonials);
        }
      } catch (error) {
        console.warn('API error fetching testimonials, loading mock reviews instead.');
        setTestimonials(fallbackTestimonials);
      } finally {
        setLoading(false);
      }
    };
    fetchTestimonials();
  }, []);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-24 bg-black relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/4 left-1/10 w-[300px] h-[300px] bg-electricBlue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        
        {/* Section Header */}
        <div className="mb-16">
          <h2 className="text-[11px] uppercase tracking-widest text-electricBlue font-bold mb-3">
            Social Proof
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Trusted by Industry Innovators
          </h3>
        </div>

        {loading ? (
          <div className="h-64 rounded-3xl bg-white/[0.02] border border-white/5 animate-pulse" />
        ) : (
          <div className="relative">
            {/* Carousel Content */}
            <div className="min-h-[250px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                  className="flex flex-col items-center gap-6"
                >
                  {/* Stars Row */}
                  <div className="flex gap-1 justify-center text-yellow-500">
                    {[...Array(testimonials[activeIndex]?.rating || 5)].map((_, i) => (
                      <FiStar key={i} fill="currentColor" size={16} />
                    ))}
                  </div>

                  {/* Review Text */}
                  <blockquote className="text-lg sm:text-xl font-normal leading-relaxed text-gray-300 italic max-w-2xl">
                    "{testimonials[activeIndex]?.text}"
                  </blockquote>

                  {/* Client Metadata */}
                  <div className="flex items-center gap-4 mt-4">
                    <img
                      src={testimonials[activeIndex]?.image}
                      alt={testimonials[activeIndex]?.name}
                      className="w-12 h-12 rounded-full border border-white/10 object-cover"
                    />
                    <div className="text-left">
                      <div className="font-bold text-sm text-white">
                        {testimonials[activeIndex]?.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {testimonials[activeIndex]?.company}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-center gap-4 mt-12">
              <button
                onClick={handlePrev}
                className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300"
              >
                <FiChevronLeft size={20} />
              </button>
              
              {/* Pagination Dots */}
              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveIndex(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      activeIndex === idx
                        ? 'w-6 bg-electricBlue'
                        : 'bg-white/10 hover:bg-white/20'
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={handleNext}
                className="w-10 h-10 rounded-full bg-white/[0.03] border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default Testimonials;
