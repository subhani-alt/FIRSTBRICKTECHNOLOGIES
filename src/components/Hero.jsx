import { motion } from 'framer-motion';
import { FiArrowRight, FiPlay, FiCpu, FiTrendingUp, FiActivity, FiGlobe } from 'react-icons/fi';

const Hero = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen pt-32 pb-24 flex items-center justify-center bg-background bg-grid-pattern overflow-hidden">
      {/* Decorative Blur Blobs */}
      <div className="absolute top-1/4 left-1/10 w-[400px] h-[400px] bg-electricBlue/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-[400px] h-[400px] bg-electricPurple/10 rounded-full blur-[120px] animate-pulse-slow pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Column: Text Content */}
        <motion.div 
          className="lg:col-span-7 text-left"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Tagline */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-panel border-white/5 mb-6 text-xs font-semibold uppercase tracking-widest text-electricBlue"
          >
            <FiCpu className="animate-spin" style={{ animationDuration: '6s' }} /> Next-Gen AI Integration
          </motion.div>

          {/* Main Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] font-sans text-white mb-6"
          >
            Architecting <br />
            <span className="text-gradient-neon">Autonomous Intelligence</span> <br />
            for Enterprise.
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-gray-400 text-lg sm:text-xl font-normal leading-relaxed max-w-xl mb-8"
          >
            We design, build, and deploy custom AI solutions, custom software, and autonomous agents that automate complex workflows and drive explosive business growth.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-4 mb-10"
          >
            <button
              onClick={() => handleScrollTo('contact')}
              className="glow-btn px-8 py-4 rounded-full bg-white text-black font-semibold text-sm uppercase tracking-wider flex items-center gap-2 hover:bg-transparent hover:text-white border border-transparent hover:border-white/20 transition-all duration-300"
            >
              Launch Project <FiArrowRight />
            </button>
            <button
              onClick={() => handleScrollTo('services')}
              className="px-8 py-4 rounded-full glass-panel border-white/10 hover:border-white/20 text-white font-semibold text-sm uppercase tracking-wider flex items-center gap-2 transition-all duration-300"
            >
              Our Services <FiPlay />
            </button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-wrap items-center gap-8 border-t border-white/5 pt-8"
          >
            <div>
              <div className="text-2xl font-bold text-white">99.4%</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Agent Precision Rate</div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div>
              <div className="text-2xl font-bold text-white">100+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Solutions Deployed</div>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div>
              <div className="text-2xl font-bold text-gradient-neon">$12M+</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider font-semibold mt-1">Client Cost Saved</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Interactive AI Dashboard Mockup */}
        <motion.div 
          className="lg:col-span-5"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <div className="relative group">
            {/* Ambient Background Glow */}
            <div className="absolute -inset-1.5 bg-gradient-to-r from-electricBlue to-electricPurple rounded-3xl opacity-20 blur-xl group-hover:opacity-30 transition duration-500" />
            
            {/* Dashboard Wrapper */}
            <div className="relative glass-panel rounded-3xl overflow-hidden border border-white/10 p-6 flex flex-col gap-6 shadow-glass">
              
              {/* Dashboard Header */}
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <div className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-gray-400 tracking-wider uppercase font-semibold">
                  Aethera Agent Engine v2.4
                </div>
              </div>

              {/* Status Section Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1.5 relative overflow-hidden group/card hover:border-white/10 transition-all">
                  <div className="text-gray-500 text-[10px] uppercase font-bold flex items-center gap-1.5">
                    <FiActivity className="text-electricBlue" /> Processing Load
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tight">42.8 GB/s</div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-electricBlue h-full rounded-full w-3/4 animate-pulse" />
                  </div>
                </div>
                <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-4 flex flex-col gap-1.5 relative overflow-hidden group/card hover:border-white/10 transition-all">
                  <div className="text-gray-500 text-[10px] uppercase font-bold flex items-center gap-1.5">
                    <FiTrendingUp className="text-electricPurple" /> Productivity
                  </div>
                  <div className="text-2xl font-bold text-white tracking-tight">+382%</div>
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden mt-1">
                    <div className="bg-electricPurple h-full rounded-full w-[85%]" />
                  </div>
                </div>
              </div>

              {/* Server Console Logs */}
              <div className="bg-black/45 border border-white/5 rounded-2xl p-4 font-mono text-[11px] text-gray-400 flex flex-col gap-2 h-44 overflow-y-auto no-scrollbar relative">
                <div className="absolute top-0 right-4 py-1.5 text-[9px] text-emerald-500 uppercase tracking-widest flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" /> System Live
                </div>
                <div className="text-gray-600">[{new Date().toLocaleTimeString()}] INITIATING AGENT_GRID...</div>
                <div className="text-gray-400"><span className="text-electricBlue">&gt;</span> Booting vector DB index: Pinecone</div>
                <div className="text-gray-400"><span className="text-electricBlue">&gt;</span> Active agents connected: 28 nodes</div>
                <div className="text-electricPurple">[{new Date().toLocaleTimeString()}] CRON_JOB: Analyzing customer flow...</div>
                <div className="text-emerald-400"><span className="text-emerald-400">&gt;</span> Success. Automation yield: +14.8 hrs saved</div>
                <div className="text-gray-600">[{new Date().toLocaleTimeString()}] LISTENING FOR INCOMING WEBHOOKS...</div>
              </div>

              {/* Active Nodes list */}
              <div className="flex items-center justify-between text-xs border-t border-white/5 pt-4">
                <div className="flex items-center gap-1 text-gray-500">
                  <FiGlobe className="text-electricBlue animate-pulse" /> Global latency
                </div>
                <div className="font-semibold text-white">12ms (optimized)</div>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
