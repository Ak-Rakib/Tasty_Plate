
import React, { useState } from 'react';
import { User, LogOut, UserCircle, Settings } from 'lucide-react';
import Logo from './Logo.tsx';
import { useAuth } from '../context/AuthContext.tsx';

interface NavbarProps {
  onLoginClick: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onLoginClick }) => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = async () => {
    await logout();
    setShowDropdown(false);
  };

  return (
    <header className="fixed flex z-50 pt-9 pr-4 pb-9 pl-4 top-0 right-0 left-0 justify-center pointer-events-none">
      <nav className="flex bg-black w-full max-w-7xl rounded-xl py-4 px-6 shadow-2xl items-center justify-between pointer-events-auto border border-white/10">
        <div className="flex items-center gap-2">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-brand-red/50 group-hover:border-brand-red transition-all flex items-center justify-center bg-brand-cream">
              <Logo className="w-10 h-10" />
            </div>
          </a>
          <a href="#home" className="uppercase text-2xl font-black text-white tracking-tighter font-display italic hidden sm:block">
            TASTY PLATE
          </a>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setShowDropdown(!showDropdown)}
                className="relative flex items-center justify-center w-12 h-12 rounded-full bg-brand-red text-white hover:bg-white hover:text-brand-red transition-all duration-300 shadow-lg border-2 border-white/10 group active:scale-90"
              >
                <User className="w-6 h-6" />
                <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full shadow-sm animate-pulse"></span>
              </button>

              {showDropdown && (
                <>
                  <div className="fixed inset-0 z-[-1]" onClick={() => setShowDropdown(false)}></div>
                  <div className="absolute top-full right-0 mt-4 w-64 bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden border border-black/5 animate-in slide-in-from-top-4 duration-300">
                    <div className="p-6 border-b border-black/5 bg-brand-cream/30">
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-full bg-brand-black flex items-center justify-center text-white font-black text-sm">
                          {user.displayName?.[0] || user.email?.[0] || 'U'}
                        </div>
                        <div className="flex-1 overflow-hidden">
                           <p className="font-display font-black text-brand-black truncate leading-tight">
                            {user.displayName || 'Authentic User'}
                          </p>
                          <p className="text-[10px] font-bold uppercase tracking-widest text-black/40 truncate">
                            {user.email}
                          </p>
                        </div>
                      </div>
                      <div className="mt-4 flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 rounded-lg text-[9px] font-black uppercase tracking-widest w-fit">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full"></span>
                        Session Active
                      </div>
                    </div>
                    
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-brand-cream rounded-2xl text-black/60 hover:text-brand-black transition-all group">
                        <UserCircle className="w-5 h-5 group-hover:text-brand-red" />
                        <span className="font-display font-black uppercase text-xs tracking-widest">My Account</span>
                      </button>
                      <button className="w-full flex items-center gap-3 px-5 py-4 hover:bg-brand-cream rounded-2xl text-black/60 hover:text-brand-black transition-all group">
                        <Settings className="w-5 h-5 group-hover:text-brand-red" />
                        <span className="font-display font-black uppercase text-xs tracking-widest">Order History</span>
                      </button>
                      <div className="h-px bg-black/5 my-2 mx-4"></div>
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-5 py-4 hover:bg-red-50 rounded-2xl text-red-600 transition-all group"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-display font-black uppercase text-xs tracking-widest">Sign Out</span>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button 
              onClick={onLoginClick}
              className="flex items-center gap-3 bg-brand-red text-white px-8 py-3.5 rounded-xl font-display font-black uppercase text-xs tracking-widest hover:bg-white hover:text-brand-red transition-all duration-300 active:scale-95 shadow-lg border-2 border-transparent hover:border-brand-red"
            >
              <User className="w-4 h-4" />
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
