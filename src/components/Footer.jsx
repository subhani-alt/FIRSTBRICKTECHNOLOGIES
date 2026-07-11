import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiTwitter, FiGithub, FiLinkedin, FiArrowRight, FiCheck } from 'react-icons/fi';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [subscribed, setSubscribed] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please enter a valid email address');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);
    try {
      await axios.post('/newsletter', { email });
      setSubscribed(true);
      setEmail('');
    } catch (err) {
      console.error(err);
      setErrorMsg(err.response?.data?.message || 'Error subscribing. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const quickLinks = [
    { label: 'Services', sectionId: 'services' },
    { label: 'Process', sectionId: 'process' },
    { label: 'Portfolio', sectionId: 'portfolio' },
    { label: 'Pricing', sectionId: 'pricing' },
  ];

  const legalLinks = [
    { label: 'Terms of Service', href: '#' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  const handleNavClick = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-black border-t border-white/5 pt-20 pb-10 relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-electricPurple/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand Info */}
          <div className="md:col-span-4 flex flex-col gap-6 text-left">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electricBlue to-electricPurple flex items-center justify-center font-bold text-white shadow-glow-blue">
                Æ
              </div>
              <span className="font-bold text-xl tracking-wider text-white font-sans uppercase">
                Aethera<span className="text-electricBlue font-light">.ai</span>
              </span>
            </Link>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-xs">
              Designing, developing, and deploying premium software architectures and autonomous AI agents for high-growth enterprises.
            </p>
            <div className="flex gap-4">
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                <FiTwitter size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                <FiGithub size={14} />
              </a>
              <a href="#" className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/10 transition-all duration-300">
                <FiLinkedin size={14} />
              </a>
            </div>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-6">
              Navigation
            </h4>
            <ul className="flex flex-col gap-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleNavClick(link.sectionId)}
                    className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors text-left"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
              <li>
                <Link to="/blog" className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors">
                  Company Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal & Help */}
          <div className="md:col-span-2 text-left">
            <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-6">
              Support
            </h4>
            <ul className="flex flex-col gap-3">
              {legalLinks.map((link) => (
                <li key={link.label}>
                  {link.href ? (
                    <a
                      href={link.href}
                      className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  ) : (
                    <button
                      onClick={() => handleNavClick(link.sectionId)}
                      className="text-gray-500 hover:text-white text-xs sm:text-sm transition-colors text-left"
                    >
                      {link.label}
                    </button>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter signup */}
          <div className="md:col-span-4 text-left flex flex-col gap-6">
            <div>
              <h4 className="text-[10px] uppercase tracking-widest text-gray-400 font-bold mb-3">
                Subscribe to Newsletter
              </h4>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                Stay updated with modern AI strategies and engineering insights.
              </p>
            </div>

            {subscribed ? (
              <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm font-semibold py-3 border-y border-emerald-500/10 bg-emerald-500/5 px-4 rounded-xl">
                <FiCheck size={16} /> Subscribed successfully!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2 relative">
                <div className="flex bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden focus-within:border-electricBlue/40 focus-within:bg-white/[0.04] transition-all">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="enter your email..."
                    className="bg-transparent border-none outline-none flex-grow text-xs sm:text-sm text-white px-4 py-3 placeholder-gray-600 focus:outline-none"
                    disabled={submitting}
                  />
                  <button
                    type="submit"
                    className="p-3 text-electricBlue hover:text-white transition-colors flex items-center justify-center"
                    disabled={submitting}
                  >
                    <FiArrowRight size={16} />
                  </button>
                </div>
                {errorMsg && (
                  <span className="text-[10px] text-red-500 ml-1">{errorMsg}</span>
                )}
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[10px] text-gray-600 font-medium">
            &copy; {new Date().getFullYear()} AETHERA INTERACTIVE INC. ALL RIGHTS RESERVED.
          </p>
          <p className="text-[10px] text-gray-600 font-medium">
            DESIGN INSPIRED BY Sleek Tech Aesthetics.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
