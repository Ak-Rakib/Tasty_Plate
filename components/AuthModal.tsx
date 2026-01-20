
import React, { useState } from 'react';
import { X, Mail, Lock, User, Loader2, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';
import { useAuth } from '../context/AuthContext.tsx';
import { isFirebaseConfigured } from '../lib/firebase.ts';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: ''
  });

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (isLogin) {
        await login(formData.email, formData.password);
      } else {
        await signup(formData.email, formData.password, formData.name);
      }
      onClose();
    } catch (err: any) {
      let message = err.message || "An error occurred during authentication.";
      if (message.includes('auth/invalid-credential') || message.includes('auth/wrong-password')) {
        message = "Invalid email or password. Please try again.";
      } else if (message.includes('auth/user-not-found')) {
        message = "No account found with this email.";
      } else if (message.includes('auth/email-already-in-use')) {
        message = "This email is already registered.";
      } else if (message.includes('auth/weak-password')) {
        message = "Password should be at least 6 characters.";
      }
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" onClick={onClose}></div>
      <div className="relative bg-brand-cream w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 border-2 border-white/10">
        <div className="h-3 bg-brand-red w-full"></div>
        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-black text-white rounded-2xl hover:bg-brand-red hover:rotate-90 transition-all z-20"><X className="w-5 h-5" /></button>
        <div className="p-10 sm:p-14">
          <div className="mb-10 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-red/10 text-brand-red rounded-full text-[10px] font-black uppercase tracking-widest mb-4"><ShieldCheck className="w-3 h-3" />{isLogin ? 'Welcome Back' : 'Join the Legend'}</div>
            <h2 className="text-4xl font-display font-black uppercase tracking-tighter leading-none text-brand-black">{isLogin ? 'Tasty Plate Login' : 'Create Account'}</h2>
            {!isFirebaseConfigured && (<p className="mt-4 text-xs font-bold text-amber-600 bg-amber-50 inline-block px-3 py-1 rounded-lg uppercase tracking-wider border border-amber-200">Local Demo Mode Active</p>)}
          </div>
          {error && (<div className="mb-8 p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 text-red-600 text-sm font-bold animate-shake"><AlertCircle className="w-5 h-5 shrink-0" />{error}</div>)}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="block uppercase text-[10px] font-black tracking-widest text-black/40 mb-2 ml-4">Display Name</label>
                <div className="relative"><User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" /><input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="E.g. Chef Anis" className="w-full bg-white border-2 border-black/5 rounded-2xl px-14 py-4 font-display font-bold text-lg focus:border-brand-red focus:outline-none transition-all" /></div>
              </div>
            )}
            <div>
              <label className="block uppercase text-[10px] font-black tracking-widest text-black/40 mb-2 ml-4">Email Address</label>
              <div className="relative"><Mail className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" /><input required type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="name@email.com" className="w-full bg-white border-2 border-black/5 rounded-2xl px-14 py-4 font-display font-bold text-lg focus:border-brand-red focus:outline-none transition-all" /></div>
            </div>
            <div>
              <label className="block uppercase text-[10px] font-black tracking-widest text-black/40 mb-2 ml-4">Password</label>
              <div className="relative"><Lock className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" /><input required type="password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} placeholder="••••••••" className="w-full bg-white border-2 border-black/5 rounded-2xl px-14 py-4 font-display font-bold text-lg focus:border-brand-red focus:outline-none transition-all" /></div>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-brand-red text-white py-6 rounded-[2rem] font-display font-black text-2xl uppercase tracking-tighter hover:bg-black transition-all flex items-center justify-center gap-3 shadow-2xl active:scale-95 disabled:opacity-50">
              {loading ? <Loader2 className="w-8 h-8 animate-spin" /> : (<>{isLogin ? 'Sign In' : 'Sign Up'} <ArrowRight className="w-6 h-6" /></>)}
            </button>
          </form>
          <div className="mt-8 text-center"><button onClick={() => { setIsLogin(!isLogin); setError(''); }} className="text-sm font-black uppercase tracking-widest text-black/40 hover:text-brand-red transition-colors">{isLogin ? "Don't have an account? Create one" : "Already have an account? Sign In"}</button></div>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
