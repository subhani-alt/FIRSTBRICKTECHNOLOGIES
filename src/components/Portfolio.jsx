import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiArrowUpRight, FiGithub } from 'react-icons/fi';

const fallbackProjects = [
  {
    _id: 'p1',
    title: 'Aethera AI Platform',
    description: 'An AI-powered document intelligence SaaS platform that parses documents, extracts parameters, and automates billing.',
    category: 'AI Automation',
    techStack: ['React', 'Node.js', 'MongoDB', 'OpenAI API', 'LangChain'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80',
    liveLink: '#',
    githubLink: '#'
  },
  {
    _id: 'p2',
    title: 'Apex E-Commerce Ecosystem',
    description: 'A headless e-commerce backend built with microservices, offering instant payments and real-time ledger tracking.',
    category: 'Software Development',
    techStack: ['Next.js', 'Express', 'MongoDB', 'Docker', 'AWS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    liveLink: '#',
    githubLink: '#'
  },
  {
    _id: 'p3',
    title: 'Synapse CRM Bot',
    description: 'An autonomous customer support agent integrating with messaging tools, using internal vectors for database queries.',
    category: 'AI Agents',
    techStack: ['Node.js', 'MongoDB', 'LangChain', 'OpenAI', 'Pinecone'],
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    liveLink: '#',
    githubLink: '#'
  },
  {
    _id: 'p4',
    title: 'Zephyr Interface Engine',
    description: 'A dark-mode design ecosystem and UI library designed for heavy data visualizations and real-time dashboard apps.',
    category: 'UI/UX Design',
    techStack: ['Figma', 'React', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
    liveLink: '#',
    githubLink: '#'
  }
];

const Portfolio = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [loading, setLoading] = useState(true);

  const filters = ['All', 'AI Automation', 'AI Agents', 'Software Development', 'UI/UX Design'];

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('/projects');
        if (res.data && res.data.length > 0) {
          setProjects(res.data);
          setFilteredProjects(res.data);
        } else {
          setProjects(fallbackProjects);
          setFilteredProjects(fallbackProjects);
        }
      } catch (error) {
        console.warn('API error fetching projects, loading mock portfolio items instead.');
        setProjects(fallbackProjects);
        setFilteredProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    if (filter === 'All') {
      setFilteredProjects(projects);
    } else {
      setFilteredProjects(projects.filter(p => p.category === filter));
    }
  };

  return (
    <section id="portfolio" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-electricBlue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="text-left">
            <h2 className="text-[11px] uppercase tracking-widest text-electricBlue font-bold mb-3">
              Case Studies & Works
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
              Featured Client Deployments
            </h3>
            <p className="text-gray-400 max-w-xl text-sm sm:text-base">
              Explore real-world software and artificial intelligence integrations that optimized performance and saved resources.
            </p>
          </div>

          {/* Filter Navigation */}
          <div className="flex flex-wrap gap-2 md:justify-end">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => handleFilterSelect(filter)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all duration-300 ${
                  selectedFilter === filter
                    ? 'bg-white text-black shadow-glow-blue'
                    : 'glass-panel text-gray-400 hover:text-white border-white/5'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="h-96 rounded-3xl bg-white/[0.02] border border-white/5 animate-pulse" />
            <div className="h-96 rounded-3xl bg-white/[0.02] border border-white/5 animate-pulse" />
          </div>
        ) : (
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((project) => (
                <motion.div
                  key={project._id}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="glass-panel rounded-3xl overflow-hidden border border-white/5 group hover:border-white/12 transition-all duration-300 flex flex-col h-full"
                >
                  {/* Project Image Panel */}
                  <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900 border-b border-white/5">
                    <img 
                      src={project.image} 
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.16, 1, 0.3, 1]"
                      loading="lazy"
                    />
                    {/* Dark gradient mask */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
                    
                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="text-[10px] font-bold uppercase tracking-widest bg-black/75 backdrop-blur px-3 py-1.5 rounded-full text-electricBlue border border-white/10">
                        {project.category}
                      </span>
                    </div>
                  </div>

                  {/* Project Details Panel */}
                  <div className="p-8 flex flex-col flex-grow justify-between gap-6">
                    <div className="flex flex-col gap-3">
                      <h4 className="text-xl font-bold text-white group-hover:text-electricBlue transition-colors duration-300">
                        {project.title}
                      </h4>
                      <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-col gap-6">
                      {/* Tech Stack Badges */}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span 
                            key={tech}
                            className="text-[10px] font-medium font-mono text-gray-500 bg-white/[0.02] border border-white/5 px-2.5 py-1 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Links Row */}
                      <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-white hover:text-electricBlue transition-colors"
                        >
                          Live Demo <FiArrowUpRight />
                        </a>
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-white transition-colors"
                        >
                          Code <FiGithub />
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Portfolio;
