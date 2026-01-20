
import React from 'react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg 
      viewBox="0 0 500 500" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      {/* Pot Handles */}
      <path d="M78.5 208.5C78.5 208.5 60 215 55 250C50 285 78.5 291.5 78.5 291.5V208.5Z" fill="#7F0E0E" />
      <path d="M421.5 208.5C421.5 208.5 440 215 445 250C450 285 421.5 291.5 421.5 291.5V208.5Z" fill="#7F0E0E" />
      
      {/* Pot Body (Outer) */}
      <circle cx="250" cy="250" r="180" fill="#7F0E0E" />
      
      {/* Pot Body (Inner) */}
      <circle cx="250" cy="250" r="155" fill="#5E0808" />
      
      {/* Fork & Spoon Roof Structure */}
      <path d="M225 150V245M225 150L215 175M225 150L235 175M225 150L210 155M225 150L240 155" stroke="#F7F4EB" strokeWidth="8" strokeLinecap="round" />
      <path d="M275 150V245M275 150C275 130 295 130 295 150C295 170 275 170 275 150Z" fill="#F7F4EB" stroke="#F7F4EB" strokeWidth="4" />
      
      {/* House Roof */}
      <path d="M195 215L250 185L305 215" stroke="#F7F4EB" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M235 245V220C235 211.716 241.716 205 250 205C258.284 205 265 211.716 265 220V245" stroke="#F7F4EB" strokeWidth="8" />
      
      {/* Base Line */}
      <path d="M180 245H320" stroke="#F7F4EB" strokeWidth="6" strokeLinecap="round" />
      
      {/* Tasty Plate Text (Simplified Stylized) */}
      <text x="250" y="300" textAnchor="middle" fill="#F7F4EB" style={{ font: 'italic bold 60px "Bricolage Grotesque"', letterSpacing: '-2px' }}>Tasty Plate</text>
      
      {/* Stars */}
      <g transform="translate(220, 315) scale(0.6)">
        <path d="M10 0L13 7H20L14 11L16 18L10 14L4 18L6 11L0 7H7L10 0Z" fill="#F7F4EB" />
        <path d="M35 0L38 7H45L39 11L41 18L35 14L29 18L31 11L25 7H32L35 0Z" fill="#F7F4EB" />
        <path d="M60 0L63 7H70L64 11L66 18L60 14L54 18L56 11L50 7H57L60 0Z" fill="#F7F4EB" />
        <path d="M85 0L88 7H95L89 11L91 18L85 14L79 18L81 11L75 7H82L85 0Z" fill="#F7F4EB" />
        <path d="M110 0L113 7H120L114 11L116 18L110 14L104 18L106 11L100 7H107L110 0Z" fill="#F7F4EB" />
      </g>
      
      {/* Tagline Curved Text Path */}
      <defs>
        <path id="taglinePath" d="M150,350 Q250,420 350,350" />
      </defs>
      <text fill="#F7F4EB" style={{ font: 'bold 12px "Bricolage Grotesque"', letterSpacing: '4px', textTransform: 'uppercase' }}>
        <textPath href="#taglinePath" startOffset="50%" textAnchor="middle">
          MADE FRESH . SERVED HOT
        </textPath>
      </text>
    </svg>
  );
};

export default Logo;
