
import React from 'react';
import { Instagram, Mail, Facebook } from 'lucide-react';
import Logo from './Logo';

const Footer: React.FC = () => {
  const emailAddress = "rakibulhossain@tastyplate.food";
  const instagramUrl = "https://www.instagram.com/tast_yplate?igsh=MWpiZG1xeWJ4M21peA%3D%3D&utm_source=qr";
  const facebookUrl = "https://www.facebook.com/profile.php?id=61586941796709";
  // Direct link to Gmail's compose window as requested
  const gmailComposeLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;

  return (
    <footer id="location" className="bg-brand-black py-24 px-6 border-t border-white/10 relative z-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-12">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full border-2 border-white/10 overflow-hidden bg-brand-cream p-1 shrink-0 flex items-center justify-center">
            <Logo />
          </div>
          <div>
            <h2 className="uppercase text-5xl font-black text-white font-display tracking-tighter italic mb-4">
              TASTY PLATE
            </h2>
            <p className="text-sm text-white/40 font-medium tracking-widest uppercase">
              © 2025 Tasty Plate. Authentic Old Dhaka Flavors.
            </p>
          </div>
        </div>
        
        <div className="flex gap-4">
          {[
            { Icon: Instagram, href: instagramUrl },
            { Icon: Mail, href: gmailComposeLink },
            { Icon: Facebook, href: facebookUrl }
          ].map(({ Icon, href }, idx) => (
            <a 
              key={idx}
              href={href} 
              target={href !== "#" ? "_blank" : undefined}
              rel={href !== "#" ? "noopener noreferrer" : undefined}
              className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-white hover:bg-brand-red hover:scale-110 transition-all duration-300 group"
            >
              <Icon className="w-6 h-6 transition-transform group-hover:rotate-12" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
