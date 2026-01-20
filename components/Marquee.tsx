
import React from 'react';

const Marquee: React.FC = () => {
  const items = [
    "PREMIUM KACCHI",
    "AUTHENTIC DHAKA SPICES",
    "CRAVE THE TASTY PLATE",
    "HAND-CRAFTED EVERYDAY",
    "BEST BIRYANI IN MIRPUR",
    "SINCE 2024",
  ];

  return (
    <div className="overflow-hidden bg-brand-cream border-black/10 border-b py-10 relative z-10">
      <div className="flex animate-scroll whitespace-nowrap">
        {[...Array(3)].map((_, i) => (
          <React.Fragment key={i}>
            {items.map((item, index) => (
              <span 
                key={index} 
                className="flex items-center text-4xl sm:text-7xl text-brand-black uppercase font-black tracking-tighter font-display px-8"
              >
                {item}
                <span className="text-brand-red ml-8 opacity-40">●</span>
              </span>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default Marquee;
