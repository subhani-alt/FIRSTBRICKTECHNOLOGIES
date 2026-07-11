import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { FiMail, FiLock, FiAlertCircle, FiHome } from 'react-icons/fi';
import CursorGlow from '../components/CursorGlow.jsx';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim() || !password.trim()) {
      setErrorMsg('Please enter both email and password');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin/dashboard', { replace: true });
    } catch (err) {
      console.error(err);
      setErrorMsg(typeof err === 'string' ? err : 'Invalid admin credentials');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-background bg-grid-pattern flex items-center justify-center p-6 text-white overflow-hidden">
      <CursorGlow />

      {/* Background Gradient Blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-electricPurple/10 rounded-full blur-[100px] pointer-events-none" />

      {/* Centered Glass Panel */}
      <div className="w-full max-w-md relative z-10">
        
        {/* Home redirection link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-500 hover:text-white uppercase tracking-wider mb-8 transition-colors"
        >
          <FiHome /> Back To Website
        </Link>

        <div className="glass-panel border border-white/5 p-8 sm:p-10 rounded-[32px] shadow-glass flex flex-col gap-8">
          
          {/* Header */}
          <div className="text-center flex flex-col gap-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-electricBlue to-electricPurple flex items-center justify-center font-bold text-white shadow-glow-blue mx-auto mb-2 text-lg">
              Æ
            </div>
            <h1 className="text-2xl font-bold tracking-tight text-white">Admin Authentication</h1>
            <p className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Authorized Personnel Only</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
            {errorMsg && (
              <div className="flex items-center gap-2 text-xs font-semibold text-red-400 bg-red-500/5 border border-red-500/10 p-4 rounded-xl">
                <FiAlertCircle size={16} className="flex-shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Email Address</label>
              <div className="flex bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 items-center gap-3 focus-within:border-electricBlue/40 focus-within:bg-white/[0.04] transition-all">
                <FiMail className="text-gray-600" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@aiagency.com"
                  className="bg-transparent border-none outline-none text-sm text-white flex-grow placeholder-gray-600 focus:outline-none"
                  disabled={submitting}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 text-left">
              <label className="text-[10px] font-bold uppercase tracking-wider text-gray-500">Security Password</label>
              <div className="flex bg-white/[0.02] border border-white/5 rounded-xl px-4 py-3.5 items-center gap-3 focus-within:border-electricBlue/40 focus-within:bg-white/[0.04] transition-all">
                <FiLock className="text-gray-600" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="bg-transparent border-none outline-none text-sm text-white flex-grow placeholder-gray-600 focus:outline-none"
                  disabled={submitting}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="glow-btn mt-4 w-full py-4 bg-gradient-to-r from-electricBlue to-electricPurple rounded-xl text-xs font-semibold uppercase tracking-wider text-white shadow-glow-blue flex items-center justify-center gap-2 hover:scale-[0.99] transition-transform disabled:opacity-50"
            >
              {submitting ? (
                <div className="w-5 h-5 border-2 border-t-white border-white/20 rounded-full animate-spin" />
              ) : (
                'Access Dashboard'
              )}
            </button>
          </form>

          {/* Helper details */}
          <div className="border-t border-white/5 pt-4 text-center">
            <p className="text-[10px] text-gray-600 leading-normal">
              For initial staging test access, use the seeded admin credentials:<br />
              <span className="font-mono text-gray-500">admin@aiagency.com / admin123</span>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
