
import React from 'react';
import { Sparkles, Star, UtensilsCrossed } from 'lucide-react';
import Logo from './Logo';

interface HeroProps {
  onAskAIClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onAskAIClick }) => {
  return (
    <section className="min-h-[85vh] flex flex-col overflow-hidden text-center bg-brand-black pt-32 pb-12 relative items-center justify-center px-4">
      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-red/15 via-brand-black to-brand-black pointer-events-none"></div>
      
      {/* Main Typography Group */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo Badge */}
        <div className="mb-8 relative group">
          <div className="absolute inset-0 bg-brand-red blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
          <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full border-4 border-white/10 overflow-hidden shadow-2xl relative z-10 bg-brand-cream p-2 flex items-center justify-center">
            <Logo />
          </div>
        </div>

        <span className="font-display font-bold text-brand-red text-sm sm:text-base tracking-[0.5em] uppercase mb-6 animate-pulse">
          Authentic Heritage
        </span>
        <h1 className="text-[14vw] sm:text-[10rem] md:text-[12rem] lg:text-[14rem] leading-[0.7] uppercase font-black text-white tracking-tighter font-display drop-shadow-[0_0_50px_rgba(185,28,28,0.5)]">
          TASTY<br/>PLATE
        </h1>

        <div className="flex flex-col sm:flex-row gap-4 mt-8">
          <p className="sm:text-lg uppercase text-xs font-bold text-white/50 tracking-[0.5em] font-display">
            The Legend of Old Dhaka
          </p>
        </div>
      </div>

      {/* Featured Tehari Card */}
      <div className="relative z-20 mt-16 group">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-4 flex items-center gap-6 shadow-2xl hover:bg-white/10 transition-all duration-500 max-w-sm sm:max-w-md mx-auto">
          <div className="w-24 h-24 sm:w-32 sm:h-32 shrink-0 rounded-[1.5rem] overflow-hidden border-2 border-brand-red/30">
            <img 
              src="https://images.unsplash.com/photo-1589302168068-964664d93dc0?q=80&w=1974&auto=format&fit=crop" 
              alt="Signature Tehari" 
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
          </div>
          <div className="text-left pr-4">
            <div className="flex items-center gap-1 text-brand-red mb-1">
              <Star className="w-3 h-3 fill-brand-red" />
              <Star className="w-3 h-3 fill-brand-red" />
              <Star className="w-3 h-3 fill-brand-red" />
              <Star className="w-3 h-3 fill-brand-red" />
              <Star className="w-3 h-3 fill-brand-red" />
            </div>
            <h3 className="text-white font-display font-black uppercase text-xl sm:text-2xl leading-tight">
              Chicken Tehari
            </h3>
            <p className="text-white/40 text-[10px] uppercase font-black tracking-widest mt-1">
              Featured Specialty • ৳350
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="relative z-10 mt-12 flex flex-col sm:flex-row items-center gap-4">
        <button 
          onClick={onAskAIClick}
          className="group flex items-center gap-4 bg-brand-red hover:bg-white text-white hover:text-brand-red px-10 py-5 rounded-full font-display font-black uppercase text-sm tracking-widest transition-all duration-500 shadow-[0_0_30px_rgba(185,28,28,0.5)] active:scale-95"
        >
          <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
          Ask our AI Chef
        </button>
        
        <a 
          href="#menu"
          className="group flex items-center gap-4 bg-transparent border-2 border-white/20 hover:border-white text-white px-10 py-5 rounded-full font-display font-black uppercase text-sm tracking-widest transition-all duration-500 active:scale-95"
        >
          <UtensilsCrossed className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          View Menu
        </a>
      </div>
      
      <p className="relative z-10 mt-8 text-white/20 text-[10px] uppercase tracking-[0.4em] font-black">
        Experience the Flavor Daily until 11 PM
      </p>

      {/* Smooth Transition to Cream Content */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-brand-cream to-transparent z-0"></div>
    </section>
  );
};

export default Hero;
