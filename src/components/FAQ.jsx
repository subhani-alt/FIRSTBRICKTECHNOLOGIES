import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';

const faqs = [
  {
    question: 'What core services does Aethera offer?',
    answer: 'We specialize in MERN stack software engineering, custom SaaS designs, mobile application development, and advanced AI integrations—including LLM prompt orchestration, autonomous client agents, document intelligence vectors, and secure API bridges.'
  },
  {
    question: 'How long does a typical software or AI deployment take?',
    answer: 'Simple AI agent setups or landing pipelines take between 2 to 4 weeks. Large custom SaaS products, enterprise architectures, or systems requiring private LLM fine-tuning and compliance audits average 6 to 12 weeks.'
  },
  {
    question: 'Where are our database records and private data hosted?',
    answer: 'We deploy systems directly into your cloud accounts (AWS, Google Cloud, Supabase, or private VPCs). Your company documents, user profiles, and API logs are kept strictly sandboxed and isolated to preserve absolute data privacy.'
  },
  {
    question: 'Do you offer ongoing system maintenance and model tuning?',
    answer: 'Yes. AI systems require active monitoring to prevent prompt drift and optimize token costs. We offer retainer agreements for model updates, security reviews, feature additions, and cloud scaling.'
  },
  {
    question: 'Can you integrate AI into our existing legacy software applications?',
    answer: 'Absolutely. We design lightweight API wrappers and middleware handlers that plug into your existing databases and backend servers, bringing intelligent analytics and automation without requiring a full code rebuild.'
  }
];

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-24 bg-black relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-electricPurple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-3xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-[11px] uppercase tracking-widest text-electricPurple font-bold mb-3">
            Inquiries
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-2">
            Frequently Asked Questions
          </h3>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <div 
                key={index}
                className="glass-panel rounded-2xl border border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-white/[0.01] transition-colors"
                >
                  <span className="font-bold text-sm sm:text-base text-white tracking-wide">
                    {faq.question}
                  </span>
                  <span className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-electricPurple' : ''}`}>
                    <FiChevronDown size={18} />
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-6 pt-1 text-xs sm:text-sm text-gray-400 leading-relaxed border-t border-white/[0.03]">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default FAQ;
