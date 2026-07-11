import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { FiArrowLeft, FiClock, FiUser, FiCalendar } from 'react-icons/fi';
import CursorGlow from '../components/CursorGlow.jsx';
import ScrollProgress from '../components/ScrollProgress.jsx';
import Navbar from '../components/Navbar.jsx';
import Footer from '../components/Footer.jsx';

const fallbackBlog = {
  _id: 'b1',
  title: 'The Future of Business Automation: Autonomous AI Agents',
  summary: 'Discover how autonomous AI agents are moving beyond simple chatbots to handle complex corporate workflows independently.',
  content: `## The Era of Autonomous Systems

In 2026, the discussion around AI has shifted from simple prompt-response interactions to fully autonomous agents. These agents can log into software, fetch reports, analyze charts, and make decisions without human intervention.

### Key Drivers of the AI Agent Shift:
1. **Tool Use (Function Calling)**: LLMs can now select which API to call based on user query inputs.
2. **Long-Term Memory**: Integration with Vector databases enables agents to retain context across days and weeks.
3. **Multi-Agent Collaboration**: Teams of agents (e.g., a writer agent, proofreader agent, and supervisor agent) work together to produce higher quality outputs.

### What this means for your agency:
By deploying custom-tailored AI agents, businesses can free up thousands of hours of manual labor, allowing employees to focus on creative and relationship-driven strategies rather than data-entry tasks.`,
  tags: ['AI Agents', 'Automation', 'Tech Trends'],
  author: 'AI Agency Lead',
  createdAt: new Date().toISOString(),
  image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80'
};

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`/blogs/${id}`);
        if (res.data) {
          setBlog(res.data);
        } else {
          setBlog(fallbackBlog);
        }
      } catch (err) {
        console.warn('API error fetching single blog post, displaying fallback post details.');
        setBlog(fallbackBlog);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  // Simple custom Markdown rendering function for headers, subheaders, bullet lists, and paragraphs
  const renderContent = (text) => {
    if (!text) return null;
    return text.split('\n').map((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith('## ')) {
        return <h2 key={idx} className="text-2xl font-bold text-white mt-8 mb-4 tracking-wide">{trimmed.replace('## ', '')}</h2>;
      }
      if (trimmed.startsWith('### ')) {
        return <h3 key={idx} className="text-xl font-bold text-white mt-6 mb-3 tracking-wide">{trimmed.replace('### ', '')}</h3>;
      }
      if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
        return <li key={idx} className="ml-6 list-disc text-gray-300 text-sm sm:text-base leading-relaxed mb-2">{trimmed.substring(2)}</li>;
      }
      if (/^\d+\.\s/.test(trimmed)) {
        return <li key={idx} className="ml-6 list-decimal text-gray-300 text-sm sm:text-base leading-relaxed mb-2">{trimmed.replace(/^\d+\.\s/, '')}</li>;
      }
      if (trimmed === '') {
        return <div key={idx} className="h-4" />;
      }
      return <p key={idx} className="text-gray-300 text-sm sm:text-base leading-relaxed mb-4">{line}</p>;
    });
  };

  return (
    <div className="relative min-h-screen bg-background text-white font-sans overflow-x-hidden">
      <CursorGlow />
      <ScrollProgress />
      <Navbar />

      {loading ? (
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-t-electricBlue border-r-electricPurple border-b-darkAccent border-l-darkAccent rounded-full animate-spin"></div>
        </div>
      ) : (
        <article className="max-w-4xl mx-auto px-6 pt-36 pb-24 relative z-10 text-left">
          
          {/* Back link */}
          <Link 
            to="/blog" 
            className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-white uppercase tracking-wider mb-8 transition-colors"
          >
            <FiArrowLeft /> Back To Journals
          </Link>

          {/* Header Metadata */}
          <header className="mb-10 flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {blog.tags.map(tag => (
                <span key={tag} className="text-[9px] font-bold uppercase tracking-widest bg-white/5 border border-white/10 px-3 py-1 rounded-full text-electricBlue">
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight text-white">
              {blog.title}
            </h1>
            <p className="text-gray-400 text-sm sm:text-base leading-relaxed italic border-l-2 border-electricPurple pl-4 my-2">
              {blog.summary}
            </p>

            <div className="flex items-center gap-6 mt-4 pt-4 border-t border-white/5 text-xs text-gray-500 font-semibold">
              <div className="flex items-center gap-1.5">
                <FiUser size={14} className="text-electricPurple" /> By {blog.author}
              </div>
              <div className="flex items-center gap-1.5">
                <FiCalendar size={14} className="text-electricBlue" /> {new Date(blog.createdAt).toLocaleDateString()}
              </div>
            </div>
          </header>

          {/* Big Featured Image */}
          <div className="aspect-[21/9] rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 mb-12 shadow-glass">
            <img 
              src={blog.image} 
              alt={blog.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Parsed content body */}
          <div className="prose prose-invert max-w-none text-left">
            {renderContent(blog.content)}
          </div>

        </article>
      )}

      <Footer />
    </div>
  );
};

export default BlogDetail;
