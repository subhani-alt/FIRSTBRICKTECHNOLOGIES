import { motion } from 'framer-motion';
import { FiCpu, FiTrendingUp, FiZap, FiShield } from 'react-icons/fi';

const stats = [
  { value: '85%', label: 'Workflows Automated' },
  { value: '4x', label: 'Average Delivery Velocity' },
  { value: '24/7', label: 'Agent Infrastructure Uptime' }
];

const cards = [
  {
    icon: FiCpu,
    title: 'Custom Architectures',
    description: 'We do not wrap generic API scripts. We build custom agent loops, orchestrate prompt databases, and tune models tailored for your specific domain.'
  },
  {
    icon: FiZap,
    title: 'Rapid Deployment',
    description: 'Using modular system templates and optimized CI/CD cycles, we ship fully functional custom AI products and SaaS platforms in weeks, not months.'
  },
  {
    icon: FiShield,
    title: 'Enterprise Security',
    description: 'Data privacy is paramount. We build secure API layers, set up private vector stores, and follow OWASP standards for role-based permissions.'
  },
  {
    icon: FiTrendingUp,
    title: 'Proven Yield',
    description: 'Every solution is designed with clear metrics: saving operational manual hours, reducing customer wait times, or optimizing cloud usage costs.'
  }
];

const WhyChooseUs = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.1 }
    }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="why-us" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[350px] h-[350px] bg-electricPurple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Stats & Copy */}
          <div className="lg:col-span-5 text-left flex flex-col gap-8">
            <div>
              <h2 className="text-[11px] uppercase tracking-widest text-electricPurple font-bold mb-3">
                Value Proposition
              </h2>
              <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
                Engineered for Impact and Velocity
              </h3>
              <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
                We combine deep technical competence in full-stack architecture with cutting-edge prompt engineering and model optimization to build highly stable AI products.
              </p>
            </div>

            {/* Statistics indicators */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-white/5">
              {stats.map((stat, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Interactive cards */}
          <div className="lg:col-span-7">
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
            >
              {cards.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    className="glass-panel rounded-3xl p-6 border border-white/5 relative group hover:border-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-electricPurple group-hover:text-black group-hover:bg-white transition-all duration-300 mb-4">
                      <Icon size={18} />
                    </div>
                    <h4 className="font-bold text-base text-white mb-2 tracking-wide">
                      {card.title}
                    </h4>
                    <p className="text-gray-400 text-[11px] sm:text-xs leading-relaxed">
                      {card.description}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
