import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';

const fallbackServices = [
  {
    _id: 's1',
    title: 'Website Development',
    description: 'Ultra-fast, responsive, and SEO-optimized web experiences designed to convert users and support massive load.',
    icon: 'FiGlobe'
  },
  {
    _id: 's2',
    title: 'Software Development',
    description: 'Scalable custom SaaS platforms, complex enterprise software, and bespoke tools built on robust architectures.',
    icon: 'FiCode'
  },
  {
    _id: 's3',
    title: 'AI Automation',
    description: 'Automate repetitive workflows, documents processing, and operations pipelines using custom deep learning models.',
    icon: 'FiCpu'
  },
  {
    _id: 's4',
    title: 'AI Agents',
    description: 'Autonomous AI agents deployed to manage customer success, lead capture, and support tickets 24/7 without delays.',
    icon: 'FiCpu'
  },
  {
    _id: 's5',
    title: 'Mobile Apps',
    description: 'Premium cross-platform mobile apps for iOS and Android built on fast frameworks with offline synchronization support.',
    icon: 'FiSmartphone'
  },
  {
    _id: 's6',
    title: 'UI/UX Design',
    description: 'High-fidelity wireframes, responsive UI designs, interactive mappings, and beautiful visual systems that users love.',
    icon: 'FiLayers'
  },
  {
    _id: 's7',
    title: 'Cloud Deployment',
    description: 'Secure, load-balanced, auto-scaling, and highly available cloud deployments on AWS, Docker, and Kubernetes.',
    icon: 'FiCloud'
  },
  {
    _id: 's8',
    title: 'API Development',
    description: 'Secure, fast, and fully documented REST and GraphQL APIs for seamless third-party and internal integrations.',
    icon: 'FiShare2'
  }
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const res = await axios.get('/services');
        if (res.data && res.data.length > 0) {
          setServices(res.data);
        } else {
          setServices(fallbackServices);
        }
      } catch (error) {
        console.warn('API error fetching services, using fallback mock data.');
        setServices(fallbackServices);
      } finally {
        setLoading(false);
      }
    };
    fetchServices();
  }, []);

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
    }
  };

  return (
    <section id="services" className="py-24 relative overflow-hidden bg-background">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 right-0 w-[300px] h-[300px] bg-electricBlue/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20">
          <h2 className="text-[11px] uppercase tracking-widest text-electricBlue font-bold mb-3">
            Expertise & Capabilities
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Next-Gen Tech Offerings
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            We deliver state-of-the-art engineering and artificial intelligence integration to future-proof your digital operations.
          </p>
        </div>

        {/* Services Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(8)].map((_, index) => (
              <div key={index} className="h-56 rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse" />
            ))}
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {services.map((service) => {
              // Resolve React Icon
              const IconName = service.icon || 'FiCpu';
              const IconComponent = FiIcons[IconName] || FiIcons.FiCpu;

              return (
                <motion.div
                  key={service._id}
                  variants={cardVariants}
                  className="glass-panel glass-panel-hover rounded-3xl p-8 relative overflow-hidden flex flex-col gap-5 group"
                >
                  {/* Decorative corner accent gradient */}
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-electricBlue/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-bl-3xl" />
                  
                  {/* Icon Frame */}
                  <div className="w-12 h-12 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center text-electricBlue group-hover:text-black group-hover:bg-white transition-all duration-300">
                    <IconComponent size={20} />
                  </div>

                  {/* Title & Desc */}
                  <div>
                    <h4 className="font-bold text-lg text-white mb-2 tracking-wide group-hover:text-electricBlue transition-colors duration-300">
                      {service.title}
                    </h4>
                    <p className="text-gray-400 text-xs sm:text-sm leading-relaxed font-normal">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        )}

      </div>
    </section>
  );
};

export default Services;
