import { motion } from 'framer-motion';
import { 
  SiReact, 
  SiNodedotjs, 
  SiExpress, 
  SiMongodb, 
  SiPython, 
  SiDocker, 
  SiNextdotjs, 
  SiFirebase, 
  SiSupabase,
  SiLangchain
} from 'react-icons/si';
import { FaAws } from 'react-icons/fa';
import { FiCpu } from 'react-icons/fi';

const techs = [
  { name: 'React', icon: SiReact, color: 'group-hover:text-[#61dafb]', glow: 'rgba(97, 218, 251, 0.15)' },
  { name: 'Node.js', icon: SiNodedotjs, color: 'group-hover:text-[#339933]', glow: 'rgba(51, 153, 51, 0.15)' },
  { name: 'Express', icon: SiExpress, color: 'group-hover:text-[#ffffff]', glow: 'rgba(255, 255, 255, 0.15)' },
  { name: 'MongoDB', icon: SiMongodb, color: 'group-hover:text-[#47a248]', glow: 'rgba(71, 162, 72, 0.15)' },
  { name: 'Python', icon: SiPython, color: 'group-hover:text-[#3776ab]', glow: 'rgba(55, 118, 171, 0.15)' },
  { name: 'Docker', icon: SiDocker, color: 'group-hover:text-[#2496ed]', glow: 'rgba(36, 150, 237, 0.15)' },
  { name: 'AWS', icon: FaAws, color: 'group-hover:text-[#ff9900]', glow: 'rgba(255, 153, 0, 0.15)' },
  { name: 'OpenAI', icon: FiCpu, color: 'group-hover:text-[#74aa9c]', glow: 'rgba(116, 170, 156, 0.15)' },
  { name: 'LangChain', icon: SiLangchain, color: 'group-hover:text-[#1c3c3c]', glow: 'rgba(28, 60, 60, 0.15)' },
  { name: 'Next.js', icon: SiNextdotjs, color: 'group-hover:text-[#ffffff]', glow: 'rgba(255, 255, 255, 0.15)' },
  { name: 'Firebase', icon: SiFirebase, color: 'group-hover:text-[#ffca28]', glow: 'rgba(255, 202, 40, 0.15)' },
  { name: 'Supabase', icon: SiSupabase, color: 'group-hover:text-[#3ecf8e]', glow: 'rgba(62, 207, 142, 0.15)' }
];


const Technologies = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.9, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute bottom-0 right-1/4 w-[300px] h-[300px] bg-electricBlue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-[11px] uppercase tracking-widest text-electricBlue font-bold mb-3">
            Our Stack
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            State-of-the-Art Tech Capabilities
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            We work with cutting-edge open-source software, cloud ecosystems, and artificial intelligence APIs.
          </p>
        </div>

        {/* Tech Grid */}
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {techs.map((tech) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={tech.name}
                variants={itemVariants}
                className="glass-panel rounded-2xl p-6 border border-white/5 flex flex-col items-center justify-center gap-4 group hover:border-white/10 transition-all duration-300 hover:scale-[1.03]"
                whileHover={{
                  boxShadow: `0 10px 30px -10px ${tech.glow}`,
                }}
              >
                <div className={`text-gray-500 transition-colors duration-300 ${tech.color}`}>
                  <Icon size={36} />
                </div>
                <span className="text-xs font-semibold tracking-wider text-gray-400 group-hover:text-white transition-colors duration-300 font-mono">
                  {tech.name}
                </span>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Technologies;
