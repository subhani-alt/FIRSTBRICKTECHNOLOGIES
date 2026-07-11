import { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCheck, FiArrowRight } from 'react-icons/fi';

const pricingTiers = [
  {
    name: 'Starter',
    tagline: 'Ideal for early startups launching simple systems.',
    priceMonthly: 2499,
    priceYearly: 1999,
    features: [
      '1 Custom AI Web Application',
      '1 Autonomous AI Agent Node',
      'Standard Database Integration',
      'Basic Vector Store Config',
      'Email & Slack Support (Mon-Fri)',
      '1 Month Support & Handoff'
    ],
    highlighted: false,
    cta: 'Select Starter'
  },
  {
    name: 'Professional',
    tagline: 'Perfect for scaling teams automating operations.',
    priceMonthly: 4999,
    priceYearly: 3999,
    features: [
      'Full Custom SaaS Development',
      'Multi-Agent System Orchestration',
      'Headless CMS & Admin Dashboard',
      'Dedicated LLM Fine-Tuning Integration',
      'Cloud Deployment (AWS/Docker)',
      'Priority 24/7 Support SLA',
      '3 Months Support & Tweaks'
    ],
    highlighted: true,
    cta: 'Select Professional'
  },
  {
    name: 'Enterprise',
    tagline: 'Bespoke AI solutions for corporate networks.',
    priceMonthly: 9999,
    priceYearly: 7999,
    features: [
      'Custom LLM/SLM Model Training',
      'Infinite Active Agent Workflows',
      'On-Premises / Private VPC Hosting',
      'Military-Grade Encryption & Audit Logs',
      'Dedicated DevOps & Prompt Engineers',
      'Custom SLA & 2-Hour Response Time',
      'Lifetime System Maintenance'
    ],
    highlighted: false,
    cta: 'Contact Sales'
  }
];

const Pricing = () => {
  const [billingPeriod, setBillingPeriod] = useState('monthly'); // 'monthly' or 'yearly'

  const containerVariants = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  };

  const cardVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] }
    }
  };

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="pricing" className="py-24 bg-background relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 right-1/10 w-[400px] h-[400px] bg-electricBlue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-[11px] uppercase tracking-widest text-electricBlue font-bold mb-3">
            Pricing Plans
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Transparent, Value-Driven Packages
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Choose a level of software development and AI engineering support built to fit your timeline and budget scale.
          </p>
        </div>

        {/* Billing period switcher */}
        <div className="flex items-center justify-center gap-4 mb-16">
          <span className={`text-xs uppercase tracking-wider font-bold transition-colors ${billingPeriod === 'monthly' ? 'text-white' : 'text-gray-500'}`}>
            Monthly
          </span>
          <button
            onClick={() => setBillingPeriod(billingPeriod === 'monthly' ? 'yearly' : 'monthly')}
            className="w-14 h-8 rounded-full bg-white/[0.04] border border-white/10 relative p-1 flex items-center transition-colors"
          >
            <div 
              className={`w-6 h-6 rounded-full bg-white transition-all duration-300 ${
                billingPeriod === 'yearly' ? 'translate-x-6 bg-gradient-to-r from-electricBlue to-electricPurple' : 'translate-x-0'
              }`}
            />
          </button>
          <span className={`text-xs uppercase tracking-wider font-bold transition-colors flex items-center gap-1.5 ${billingPeriod === 'yearly' ? 'text-white' : 'text-gray-500'}`}>
            Yearly <span className="text-[9px] font-extrabold bg-electricBlue/20 text-electricBlue px-2 py-0.5 rounded border border-electricBlue/10">-20%</span>
          </span>
        </div>

        {/* Pricing Cards Grid */}
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {pricingTiers.map((tier) => {
            const price = billingPeriod === 'monthly' ? tier.priceMonthly : tier.priceYearly;
            
            return (
              <motion.div
                key={tier.name}
                variants={cardVariants}
                className={`glass-panel rounded-3xl p-8 flex flex-col justify-between border relative overflow-hidden ${
                  tier.highlighted 
                    ? 'border-electricPurple bg-[#0c0812]/50 shadow-glow-purple' 
                    : 'border-white/5 hover:border-white/10'
                }`}
              >
                {/* Visual Highlight Badge */}
                {tier.highlighted && (
                  <div className="absolute top-4 right-4">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest bg-electricPurple text-white px-3 py-1 rounded-full">
                      Most Popular
                    </span>
                  </div>
                )}

                {/* Tier Metadata */}
                <div>
                  <h4 className="text-xl font-bold text-white mb-2">{tier.name}</h4>
                  <p className="text-gray-400 text-xs leading-relaxed mb-6">{tier.tagline}</p>
                  
                  {/* Price Frame */}
                  <div className="flex items-baseline gap-1 mb-8 border-b border-white/5 pb-6">
                    <span className="text-gray-400 font-bold text-xl">$</span>
                    <span className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white">
                      {price.toLocaleString()}
                    </span>
                    <span className="text-gray-500 text-xs font-medium">/mo</span>
                  </div>

                  {/* Bullet Deliverables */}
                  <ul className="flex flex-col gap-4 mb-8 text-left">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-gray-300">
                        <span className={`p-0.5 rounded-full border mt-0.5 ${
                          tier.highlighted 
                            ? 'bg-electricPurple/10 border-electricPurple/20 text-electricPurple' 
                            : 'bg-white/5 border-white/10 text-electricBlue'
                        }`}>
                          <FiCheck size={12} />
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Action button */}
                <button
                  onClick={() => handleScrollTo('contact')}
                  className={`w-full py-4 rounded-xl font-semibold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 ${
                    tier.highlighted
                      ? 'bg-gradient-to-r from-electricBlue to-electricPurple text-white shadow-glow-purple'
                      : 'bg-white/5 text-white hover:bg-white hover:text-black border border-white/5 hover:border-transparent'
                  }`}
                >
                  {tier.cta} <FiArrowRight />
                </button>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
};

export default Pricing;
