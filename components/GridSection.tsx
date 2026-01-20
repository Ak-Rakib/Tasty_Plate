
import React from 'react';
import { ArrowRight, Utensils, Heart, ShieldCheck } from 'lucide-react';

interface GridSectionProps {
  onOrderClick: () => void;
}

const GridSection: React.FC<GridSectionProps> = ({ onOrderClick }) => {
  return (
    <section className="bg-brand-cream py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Card 1: Value Prop 1 */}
          <div className="aspect-square flex flex-col bg-white rounded-[3rem] p-10 border-2 border-black/5 shadow-xl justify-between hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">Heritage</h4>
              <h3 className="text-3xl font-display font-black uppercase tracking-tighter text-brand-black leading-none">
                Old Dhaka<br/>Secrets
              </h3>
              <p className="mt-4 text-xs font-medium text-black/50 leading-relaxed uppercase tracking-tighter">
                Recipes passed down through generations for that authentic touch.
              </p>
            </div>
          </div>

          {/* Card 2: Aesthetic Text Card */}
          <div className="aspect-square flex flex-col group bg-brand-cream hover:bg-white transition-all duration-300 text-center rounded-[3rem] p-10 border-2 border-black/5 shadow-xl items-center justify-center">
            <h3 className="md:text-5xl uppercase text-brand-red leading-tight text-4xl font-black font-display italic">
              taste the tradition
            </h3>
            <div className="mt-8 w-16 h-2 bg-brand-red rounded-full group-hover:w-32 transition-all duration-500"></div>
          </div>

          {/* Card 3: Value Prop 2 */}
          <div className="aspect-square flex flex-col bg-white rounded-[3rem] p-10 border-2 border-black/5 shadow-xl justify-between hover:-translate-y-2 transition-all duration-300 group">
            <div className="w-12 h-12 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-red group-hover:bg-brand-red group-hover:text-white transition-colors">
              <Heart className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase tracking-widest text-black/30 mb-2">Quality</h4>
              <h3 className="text-3xl font-display font-black uppercase tracking-tighter text-brand-black leading-none">
                Premium<br/>Basmati
              </h3>
              <p className="mt-4 text-xs font-medium text-black/50 leading-relaxed uppercase tracking-tighter">
                Only the finest grains and freshest meats make it to your plate.
              </p>
            </div>
          </div>

          {/* Card 4: Action Card */}
          <div className="relative aspect-square rounded-[3rem] bg-brand-red p-10 flex flex-col justify-center items-center text-center shadow-2xl group hover:scale-[1.02] transition-transform">
            <div className="absolute top-8 right-8 text-white/20">
              <Utensils className="w-12 h-12" />
            </div>
            <h3 className="md:text-4xl uppercase leading-none text-3xl font-black text-white font-display">
              Enjoy a real piece of Dhaka
            </h3>
            <button 
              onClick={onOrderClick}
              className="inline-flex items-center gap-2 text-brand-red uppercase hover:bg-brand-black hover:text-white transition-all text-sm font-black bg-white rounded-full mt-10 py-3 px-6 shadow-lg active:scale-95"
            >
              Order Now
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default GridSection;
