
import React from 'react';
import { ArrowLeft, Navigation, Menu, Phone, MapPin } from 'lucide-react';

const LocationsSection: React.FC = () => {
  const address = "Road-6, Block-L, Eastern Housing, Pallabi 2nd link, Mirpur Dhaka";
  const phoneNumber = "01410459768";
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
  
  return (
    <section id="locations" className="min-h-screen bg-brand-black py-32 px-6 border-t border-white/10 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-red/5 blur-[120px] rounded-full pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-16">
          <div>
            <p className="uppercase text-sm tracking-[0.3em] text-white/40 font-display font-bold">
              Find Us
            </p>
            <h2 className="mt-4 uppercase text-6xl sm:text-8xl md:text-9xl leading-[0.85] font-display font-black tracking-tighter text-white">
              VISIT TASTY PLATE
            </h2>
          </div>
          {/* Back button now goes to previous section (Menu) */}
          <a 
            href="#menu" 
            className="shrink-0 inline-flex items-center gap-2 bg-white/5 text-white font-display font-bold text-sm uppercase px-8 py-4 rounded-2xl border border-white/10 hover:bg-brand-red hover:border-brand-red transition-all active:scale-95"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="rounded-[3rem] bg-white/5 border border-white/10 p-10 md:p-16 shadow-2xl backdrop-blur-sm">
              <div className="flex items-start gap-4 mb-4">
                <MapPin className="w-8 h-8 text-brand-red shrink-0 mt-1" />
                <div>
                  <h3 className="uppercase font-display font-black tracking-tighter text-4xl sm:text-5xl text-white">
                    Mirpur, Dhaka
                  </h3>
                  <p className="text-xl text-white/50 font-medium mt-2">
                    {address}
                  </p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-12 mt-8">
                <div className="rounded-3xl bg-black/40 border border-white/5 p-8 hover:border-white/20 transition-all group">
                  <p className="uppercase text-[11px] tracking-[0.3em] text-white/40 font-display font-black mb-4">
                    Hours
                  </p>
                  <div className="space-y-2">
                    <p className="text-lg text-white/80 font-bold">Daily: 11am–11pm</p>
                    <p className="text-lg text-brand-red font-black uppercase italic">Weekends until 12am</p>
                  </div>
                </div>
                <div className="rounded-3xl bg-black/40 border border-white/5 p-8 hover:border-white/20 transition-all">
                  <p className="uppercase text-[11px] tracking-[0.3em] text-white/40 font-display font-black mb-4 flex items-center gap-2">
                    <Phone className="w-3 h-3" /> Call Us
                  </p>
                  <p className="text-2xl text-white/80 font-black tracking-tighter">{phoneNumber}</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-4">
                <a 
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 bg-brand-red text-white uppercase font-display font-black text-lg px-10 py-5 rounded-2xl hover:bg-white hover:text-brand-red transition-all shadow-2xl active:scale-95"
                >
                  <Navigation className="w-6 h-6" />
                  Get Directions
                </a>
              </div>
            </div>

            {/* Map Embed Section */}
            <div className="rounded-[3rem] overflow-hidden h-[400px] border-4 border-white/10 shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
              <iframe
                title="Tasty Plate Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.1190243403565!2d90.3546736!3d23.8157159!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ4JzU2LjYiTiA5MMKwMjEnMTYuOCJF!5e0!3m2!1sen!2sbd!4v1710000000000!5m2!1sen!2sbd"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          <div className="rounded-[3rem] bg-brand-red text-white shadow-2xl p-10 flex flex-col justify-between relative overflow-hidden group">
             <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <h3 className="uppercase font-display font-black tracking-tighter text-4xl mb-6">
                Pure Heritage
              </h3>
              <p className="text-lg text-white/90 leading-relaxed font-medium">
                We're proud to bring the authentic flavors of Old Dhaka to the heart of Mirpur. Taste the legend.
              </p>
            </div>

            <div className="mt-12 flex flex-col gap-4 relative z-10">
              {/* Direct link to menu section */}
              <a 
                href="#menu" 
                className="inline-flex items-center justify-center gap-3 bg-white text-brand-red uppercase font-display font-black text-lg px-8 py-5 rounded-2xl hover:bg-black hover:text-white transition-all shadow-xl active:scale-95"
              >
                <Menu className="w-6 h-6" />
                View Menu
              </a>
              {/* Explicit Back to home button */}
              <a 
                href="#home" 
                className="inline-flex items-center justify-center gap-2 bg-black/20 text-white uppercase font-display font-bold text-sm px-8 py-4 rounded-2xl hover:bg-black/40 transition-all"
              >
                Back to Home
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationsSection;
