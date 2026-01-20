
import React, { useState, useEffect } from 'react';
import { ArrowLeft, ShoppingBag, Filter, Loader2, AlertCircle, RefreshCw } from 'lucide-react';
import { getMenuItems, MenuItem, isFirebaseConfigured } from '../lib/db.ts';

interface MenuSectionProps {
  onOrderClick: () => void;
}

const MenuSection: React.FC<MenuSectionProps> = ({ onOrderClick }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const loadMenu = async () => {
    setLoading(true);
    const items = await getMenuItems();
    setMenuItems(items);
    setLoading(false);
  };

  useEffect(() => {
    loadMenu();
  }, []);

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'breakfast', label: 'Breakfast' },
    { id: 'mains', label: 'Lunch & Dinner' },
    { id: 'sides', label: 'Drinks & Sides' },
  ];

  const filteredItems = activeCategory === 'all' 
    ? menuItems 
    : menuItems.filter(item => item.category?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <section id="menu" className="min-h-screen bg-brand-cream py-32 px-4 md:px-8 border-t border-black/5">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-4">
              <p className="uppercase text-sm tracking-[0.3em] text-black/50 font-display font-bold">
                Live Menu from Cloud
              </p>
              {!isFirebaseConfigured && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-red-100 text-red-700 rounded-full text-[10px] font-black uppercase tracking-widest border border-red-200">
                  <AlertCircle className="w-3 h-3" />
                  Connection Required
                </span>
              )}
            </div>
            <h2 className="uppercase text-6xl sm:text-8xl md:text-9xl leading-[0.85] font-display font-black tracking-tighter text-brand-black">
              CRAVE TASTY PLATE
            </h2>
          </div>
          <div className="flex gap-4">
            <button 
              onClick={loadMenu}
              className="shrink-0 inline-flex items-center gap-2 bg-brand-black/5 text-black/40 font-display font-bold text-xs uppercase px-6 py-4 rounded-2xl border border-black/10 hover:border-brand-red hover:text-brand-red transition-all group"
            >
              <RefreshCw className={`w-4 h-4 group-hover:rotate-180 transition-transform duration-500 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <a 
              href="#home" 
              className="shrink-0 inline-flex items-center gap-2 bg-black text-white font-display font-bold text-sm uppercase px-8 py-4 rounded-2xl hover:bg-brand-red transition-all shadow-xl active:scale-95"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </a>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-3 mb-12">
          <div className="flex items-center gap-2 mr-4 text-black/30">
            <Filter className="w-4 h-4" />
            <span className="uppercase text-[10px] font-black tracking-widest">Filter by</span>
          </div>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-8 py-4 rounded-full font-display font-black uppercase text-xs tracking-widest transition-all duration-300 border-2 ${
                activeCategory === cat.id
                  ? 'bg-brand-red border-brand-red text-white shadow-[0_10px_20px_-5px_rgba(185,28,28,0.4)] translate-y-[-2px]'
                  : 'bg-white border-black/5 text-black/40 hover:border-black/20 hover:text-black/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="py-40 flex flex-col items-center justify-center text-brand-red">
            <Loader2 className="w-16 h-16 animate-spin mb-6" />
            <p className="uppercase font-display font-black tracking-widest text-sm animate-pulse">Fetching from Database...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-8">
              {filteredItems.map((item, idx) => (
                <div 
                  key={item.id || idx} 
                  className="rounded-[2.5rem] border-2 border-black/5 bg-white shadow-xl p-8 hover:border-brand-red hover:-translate-y-2 transition-all duration-300 group flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <h3 className="uppercase font-display font-black tracking-tighter text-3xl group-hover:text-brand-red transition-colors leading-none">
                        {item.name}
                      </h3>
                      <p className="font-display font-black tracking-tight text-3xl text-brand-red shrink-0">
                        ৳{item.price}
                      </p>
                    </div>
                    <p className="text-black/60 font-medium leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {item.tags?.map((tag, tIdx) => (
                      <span 
                        key={tIdx} 
                        className="uppercase text-[9px] tracking-widest font-black bg-brand-cream border border-black/5 px-4 py-2 rounded-full text-black/60"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
              {filteredItems.length === 0 && (
                <div className="col-span-full py-20 text-center bg-white/50 rounded-[2.5rem] border-2 border-dashed border-black/5">
                  <p className="text-black/30 font-display font-black uppercase text-xl">No items in cloud</p>
                  <p className="mt-2 text-black/20 text-xs uppercase font-bold tracking-widest">Add items to your 'menu' collection in Firebase</p>
                </div>
              )}
            </div>

            <div className="rounded-[2.5rem] bg-brand-red text-white shadow-2xl p-10 flex flex-col justify-between relative overflow-hidden group h-fit lg:sticky lg:top-32">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="uppercase font-display font-black tracking-tighter text-4xl">Order</h3>
                  <div className="p-4 bg-white/10 rounded-2xl">
                    <ShoppingBag className="w-8 h-8" />
                  </div>
                </div>
                <p className="text-lg text-white/90 leading-relaxed font-medium">
                  {isFirebaseConfigured 
                    ? "Your selection is fetched directly from the Heritage Database. Every item is verified for authentic Old Dhaka flavor." 
                    : "Please ensure your Firebase API keys are correctly configured to fetch your custom menu."}
                </p>
              </div>
              <div className="mt-12 flex flex-col gap-4 relative z-10">
                <button 
                  onClick={onOrderClick}
                  className="inline-flex items-center justify-center gap-3 bg-white text-brand-red uppercase font-display font-black text-lg px-8 py-5 rounded-2xl hover:bg-black hover:text-white transition-all shadow-xl active:scale-95"
                >
                  <ShoppingBag className="w-5 h-5" />
                  Order Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuSection;
