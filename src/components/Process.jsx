import { motion } from 'framer-motion';

const steps = [
  {
    phase: '01',
    title: 'Discover & Analyze',
    description: 'We audit your existing software infrastructure, identify workflow bottleneck areas, and map target AI opportunities.'
  },
  {
    phase: '02',
    title: 'Plan & Architect',
    description: 'Our engineers draft database schemas, select appropriate foundation models, and plan scalable system flowcharts.'
  },
  {
    phase: '03',
    title: 'Design UI/UX & Workflows',
    description: 'We craft high-fidelity premium mockups and detail step-by-step vector search paths and decision agent loops.'
  },
  {
    phase: '04',
    title: 'Develop & Deploy APIs',
    description: 'We write robust MERN code, wrap custom LLM chains, connect security keys, and wire backend dashboard interfaces.'
  },
  {
    phase: '05',
    title: 'Deploy & Optimize',
    description: 'Your services are containerized, load-balanced, and hosted across reliable cloud channels with low-latency DNS routes.'
  },
  {
    phase: '06',
    title: 'Scale & Support',
    description: 'We analyze live logs, perform prompt tuning, retrain algorithms on clean user input, and ensure 99.9% uptime.'
  }
];

const Process = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = (index) => ({
    hidden: { 
      opacity: 0, 
      x: index % 2 === 0 ? -40 : 40 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
    }
  });

  return (
    <section id="process" className="py-24 relative overflow-hidden bg-black">
      {/* Glow Blob */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-electricPurple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-[11px] uppercase tracking-widest text-electricPurple font-bold mb-3">
            Execution Timeline
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Our Structured Development Process
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            From initial conceptual brainstorms to robust production deployments and ongoing optimizations.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Central Connecting Line */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-electricBlue via-electricPurple to-electricBlue/20" />

          <motion.div 
            className="flex flex-col gap-12"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {steps.map((step, idx) => (
              <div 
                key={step.phase} 
                className={`flex flex-col md:flex-row relative items-start md:items-center ${
                  idx % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                
                {/* Visual Dot on Central Line */}
                <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-black border border-white/10 flex items-center justify-center z-10">
                  <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-electricBlue to-electricPurple animate-pulse" />
                </div>

                {/* Timeline Card Column */}
                <div className="w-full md:w-1/2 pl-12 md:pl-0 md:px-12">
                  <motion.div 
                    variants={itemVariants(idx)}
                    className="glass-panel rounded-3xl p-6 border border-white/5 relative group hover:border-white/10 transition-colors duration-300"
                  >
                    {/* Big Phase Number Indicator */}
                    <div className="absolute top-4 right-6 text-5xl font-extrabold text-white/[0.02] group-hover:text-electricPurple/5 select-none transition-colors duration-300">
                      {step.phase}
                    </div>

                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-xs font-semibold px-2.5 py-1 rounded bg-white/5 text-electricBlue border border-white/5">
                        PHASE {step.phase}
                      </span>
                      <h4 className="font-bold text-lg text-white">
                        {step.title}
                      </h4>
                    </div>

                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </motion.div>
                </div>

                {/* Empty Spacer Column for Spacing Symmetry */}
                <div className="hidden md:block w-1/2" />
              </div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default Process;
