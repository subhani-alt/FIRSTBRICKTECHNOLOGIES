import { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FiMenu, FiX, FiArrowRight, FiUser, FiLogOut } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext.jsx';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);

  const handleNavClick = (sectionId) => {
    setIsOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      // Wait for navigation to complete before scrolling
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const element = document.getElementById(sectionId);
      if (element) element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'Services', sectionId: 'services' },
    { label: 'Process', sectionId: 'process' },
    { label: 'Portfolio', sectionId: 'portfolio' },
    { label: 'Why Us', sectionId: 'why-us' },
    { label: 'Pricing', sectionId: 'pricing' },
    { label: 'FAQ', sectionId: 'faq' },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-black/60 backdrop-blur-md border-b border-white/5 py-4'
          : 'bg-transparent py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-electricBlue to-electricPurple flex items-center justify-center font-bold text-white shadow-glow-blue group-hover:scale-105 transition-transform duration-300">
            Æ
          </div>
          <span className="font-bold text-xl tracking-wider text-white font-sans uppercase">
            Aethera<span className="text-electricBlue font-light">.ai</span>
          </span>
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleNavClick(link.sectionId)}
              className="text-gray-400 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
            >
              {link.label}
            </button>
          ))}
          <Link
            to="/blog"
            className="text-gray-400 hover:text-white text-sm font-medium tracking-wide transition-colors duration-200"
          >
            Blog
          </Link>
        </div>

        {/* CTAs */}
        <div className="hidden md:flex items-center gap-4">
          {isAuthenticated ? (
            <>
              <Link
                to="/admin/dashboard"
                className="flex items-center gap-2 text-sm font-medium text-electricBlue hover:text-white transition-colors duration-200"
              >
                <FiUser /> Dashboard
              </Link>
              <button
                onClick={logout}
                className="p-2 text-gray-400 hover:text-red-500 rounded-lg hover:bg-white/5 transition-all duration-200"
                title="Logout"
              >
                <FiLogOut size={18} />
              </button>
            </>
          ) : (
            <Link
              to="/admin/login"
              className="p-2 text-gray-400 hover:text-electricPurple rounded-lg hover:bg-white/5 transition-all duration-200"
              title="Admin Login"
            >
              <FiUser size={18} />
            </Link>
          )}

          <button
            onClick={() => handleNavClick('contact')}
            className="glow-btn px-6 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-black bg-white hover:bg-transparent hover:text-white border border-transparent hover:border-white/20 transition-all duration-300 flex items-center gap-2"
          >
            Get Started <FiArrowRight />
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white hover:text-electricBlue transition-colors duration-200"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-black/95 backdrop-blur-lg z-30 border-t border-white/5 flex flex-col p-8">
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={() => handleNavClick(link.sectionId)}
                className="text-left text-lg font-medium text-gray-400 hover:text-white border-b border-white/5 pb-2 transition-colors duration-200"
              >
                {link.label}
              </button>
            ))}
            <Link
              to="/blog"
              onClick={() => setIsOpen(false)}
              className="text-left text-lg font-medium text-gray-400 hover:text-white border-b border-white/5 pb-2 transition-colors duration-200"
            >
              Blog
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/admin/dashboard"
                  onClick={() => setIsOpen(false)}
                  className="text-left text-lg font-medium text-electricBlue hover:text-white pb-2 flex items-center gap-2"
                >
                  <FiUser /> Admin Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsOpen(false);
                  }}
                  className="text-left text-lg font-medium text-red-500 flex items-center gap-2"
                >
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <Link
                to="/admin/login"
                onClick={() => setIsOpen(false)}
                className="text-left text-lg font-medium text-gray-400 hover:text-white pb-2 flex items-center gap-2"
              >
                <FiUser /> Admin Login
              </Link>
            )}
          </div>

          <button
            onClick={() => handleNavClick('contact')}
            className="mt-8 w-full py-3 bg-gradient-to-r from-electricBlue to-electricPurple rounded-xl text-sm font-semibold uppercase tracking-wider text-white shadow-glow-blue flex items-center justify-center gap-2"
          >
            Get Started <FiArrowRight />
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
