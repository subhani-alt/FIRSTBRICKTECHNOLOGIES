import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    text: ''
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.name.trim()) return 'Name is required';
    if (!formData.email.trim()) return 'Email is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return 'Please provide a valid email address';
    
    if (!formData.text.trim()) return 'Please enter your message details';
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorMsg = validateForm();
    if (errorMsg) {
      showToast(errorMsg, 'error');
      return;
    }

    setLoading(true);
    try {
      await axios.post('/messages', formData);
      showToast('Inquiry submitted! We will reach out within 24 hours.', 'success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        budget: '',
        text: ''
      });
    } catch (err) {
      console.error(err);
      // Even if database connection failed on our backend, handle user feedback gracefully
      showToast(err.response?.data?.message || 'Error submitting message. Please check server logs.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-electricBlue/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-[11px] uppercase tracking-widest text-electricBlue font-bold mb-3">
            Get In Touch
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-4">
            Let's Engineer Your AI Solution
          </h3>
          <p className="text-gray-400 text-sm sm:text-base">
            Have a project in mind or want to automate your workflow? Send details below.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Glass Form Panel */}
          <form 
            onSubmit={handleSubmit}
            className="glass-panel border border-white/5 p-8 sm:p-12 rounded-[32px] flex flex-col gap-6 shadow-glass relative"
          >
            
            {/* Input Row 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Your Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="John Doe"
                  className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electricBlue/40 focus:bg-white/[0.04] transition-all"
                />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="john@example.com"
                  className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electricBlue/40 focus:bg-white/[0.04] transition-all"
                />
              </div>
            </div>

            {/* Input Row 2 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  placeholder="+1 (555) 000-0000"
                  className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electricBlue/40 focus:bg-white/[0.04] transition-all"
                />
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Company Name</label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  placeholder="Company Inc."
                  className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electricBlue/40 focus:bg-white/[0.04] transition-all"
                />
              </div>
            </div>

            {/* Input Row 3 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Target Service</label>
                <select
                  name="service"
                  value={formData.service}
                  onChange={handleInputChange}
                  className="bg-black border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electricBlue/40 focus:bg-white/[0.04] transition-all appearance-none"
                >
                  <option value="" disabled>Select a service</option>
                  <option value="Website Development">Website Development</option>
                  <option value="Software Development">Software & SaaS Development</option>
                  <option value="AI Automation & Agents">AI Automation & Agents</option>
                  <option value="UI/UX Design">UI/UX Design</option>
                  <option value="Infrastructure / Other">Infrastructure / Other</option>
                </select>
              </div>
              <div className="flex flex-col gap-2 text-left">
                <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Budget Range</label>
                <select
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                  className="bg-black border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electricBlue/40 focus:bg-white/[0.04] transition-all appearance-none"
                >
                  <option value="" disabled>Select budget scale</option>
                  <option value="< $5,000">&lt; $5,000</option>
                  <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                  <option value="$10,000 - $25,000">$10,000 - $25,000</option>
                  <option value="$25,000+">$25,000+</option>
                </select>
              </div>
            </div>

            {/* Input Row 4 */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Project Details *</label>
              <textarea
                name="text"
                rows={5}
                value={formData.text}
                onChange={handleInputChange}
                placeholder="Tell us about the features you need, timeline limits, or current bottlenecks..."
                className="bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-electricBlue/40 focus:bg-white/[0.04] transition-all resize-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="glow-btn mt-4 w-full py-4 bg-gradient-to-r from-electricBlue to-electricPurple rounded-xl text-xs font-semibold uppercase tracking-wider text-white shadow-glow-blue flex items-center justify-center gap-2 hover:scale-[0.99] transition-transform disabled:opacity-50"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-t-white border-white/20 rounded-full animate-spin" />
              ) : (
                <>
                  Send Message <FiSend />
                </>
              )}
            </button>
          </form>
        </div>
      </div>

      {/* Floating Glass Toast Notification Banner */}
      <AnimatePresence>
        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className={`fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-md border ${
              toast.type === 'success'
                ? 'bg-[#0f2115]/80 border-emerald-500/20 text-emerald-400'
                : 'bg-[#251010]/80 border-red-500/20 text-red-400'
            }`}
          >
            {toast.type === 'success' ? (
              <FiCheckCircle size={20} className="text-emerald-400" />
            ) : (
              <FiAlertCircle size={20} className="text-red-400" />
            )}
            <span className="text-xs sm:text-sm font-semibold tracking-wide">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Contact;
