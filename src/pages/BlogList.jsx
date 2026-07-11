import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiUser, FiArrowRight } from 'react-icons/fi';
import CursorGlow from '../components/CursorGlow.jsx';
import ScrollProgress from '../components/ScrollProgress.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const fallbackBlogs = [
  {
    _id: 'b1',
    title: 'The Future of Business Automation: Autonomous AI Agents',
    summary: 'Discover how autonomous AI agents are moving beyond simple chatbots to handle complex corporate workflows independently.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    tags: ['AI Agents', 'Automation', 'Tech Trends'],
    author: 'AI Agency Lead',
    createdAt: new Date().toISOString()
  }
];

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get('/blogs');
        if (res.data && res.data.length > 0) {
          setBlogs(res.data);
        } else {
          setBlogs(fallbackBlogs);
        }
      } catch (err) {
        console.warn('API error fetching blogs, loading mock blog list instead.');
        setBlogs(fallbackBlogs);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-white font-sans overflow-x-hidden">
      <CursorGlow />
      <ScrollProgress />
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 pt-36 pb-24 relative z-10 text-left">
        
        {/* Header Block */}
        <div className="mb-16">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-white uppercase tracking-wider mb-6 transition-colors"
          >
            <FiArrowLeft /> Back To Home
          </Link>
          <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white mb-4">
            The Aethera Journal
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-xl">
            Insights, engineering blueprints, and structural frameworks exploring custom software, SaaS, and autonomous systems.
          </p>
        </div>

        {/* Blogs grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 rounded-3xl bg-white/[0.02] border border-white/5 animate-pulse" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogs.map((blog) => (
              <motion.article
                key={blog._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="glass-panel rounded-3xl overflow-hidden border border-white/5 group hover:border-white/10 transition-colors flex flex-col h-full"
              >
                {/* Image */}
                <div className="aspect-[16/10] overflow-hidden bg-zinc-900 border-b border-white/5 relative">
                  <img 
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                    loading="lazy"
                  />
                  {/* Category tag badges */}
                  <div className="absolute top-4 left-4 flex gap-1">
                    {blog.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-black/80 px-2.5 py-1 rounded-md text-electricBlue border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="p-6 flex flex-col justify-between flex-grow gap-6">
                  <div className="flex flex-col gap-3">
                    <h2 className="text-lg font-bold text-white group-hover:text-electricPurple transition-colors leading-snug">
                      {blog.title}
                    </h2>
                    <p className="text-gray-400 text-xs leading-relaxed">
                      {blog.summary}
                    </p>
                  </div>

                  {/* Metadata line */}
                  <div className="flex items-center justify-between pt-4 border-t border-white/5 text-[10px] text-gray-500 font-medium">
                    <div className="flex items-center gap-1.5">
                      <FiUser /> {blog.author}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <FiClock /> {new Date(blog.createdAt).toLocaleDateString()}
                    </div>
                  </div>

                  <Link
                    to={`/blog/${blog._id}`}
                    className="w-full py-3 bg-white/5 hover:bg-white text-white hover:text-black rounded-xl text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 border border-white/5 hover:border-transparent mt-2"
                  >
                    Read Article <FiArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}

      </div>

      <Footer />
    </div>
  );
};

export default BlogList;
