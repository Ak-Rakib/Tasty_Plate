
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { X, Send, Sparkles, User, Bot, Loader2, ShoppingBag } from 'lucide-react';
import Logo from './Logo';

interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderClick: () => void;
}

const AIChat: React.FC<AIChatProps> = ({ isOpen, onClose, onOrderClick }) => {
  const [messages, setMessages] = useState<{ role: 'user' | 'model'; text: string }[]>([
    { role: 'model', text: "Salams! I'm the Tasty Plate AI Chef. Hungry for some legendary Old Dhaka flavors? I can help you pick the perfect Biryani or Tehari. What are you in the mood for?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Initialize Gemini
  const chatRef = useRef<any>(null);

  useEffect(() => {
    if (isOpen && !chatRef.current) {
      // ১. সঠিক API Key এক্সেস (Vite এর জন্য import.meta.env)
      const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);

      // ২. আগে মডেল কনফিগার এবং System Instruction সেট করতে হবে
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash", // অথবা "gemini-pro"
        systemInstruction: `You are the 'Tasty Plate' AI Chef, a witty, energetic, and proud food expert from Old Dhaka. 
           Your goal is to recommend items from the Tasty Plate menu:
           - Mutton Kacchi Biryani (450 TK): Our crown jewel. Basmati rice, tender mutton, secret spices. 
           - Chicken Tehari (350 TK): Small chunks of chicken, perfectly spiced.
           - Beef Tehari (380 TK): Fragrant rice with slow-cooked beef and mustard oil.
           - Borhani (50 TK): The ultimate yogurt digestive drink.
           
           Guidelines:
           1. Use phrases like 'Joss flavor!', 'Legendary taste!', and 'Mouth-watering!'.
           2. Be helpful but charismatic.
           3. If the user is undecided, ask if they prefer Mutton, Beef, or Chicken.
           4. Keep responses concise and appetizing.
           5. Mention that they can click 'Order Now' anytime to start their feast.`,
      });

      // ৩. এরপর চ্যাট সেশন শুরু করতে হবে
      chatRef.current = model.startChat({
        history: [], // শুরুর চ্যাট হিস্ট্রি ফাঁকা থাকবে
        generationConfig: {
          maxOutputTokens: 500,
        },
      });
    }
  }, [isOpen]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setIsLoading(true);

    try {
      if (!chatRef.current) throw new Error("Chat not initialized");
      
      const streamResponse = await chatRef.current.sendMessageStream({ message: userMessage });
      
      let fullText = "";
      setMessages(prev => [...prev, { role: 'model', text: '' }]);
      
      for await (const chunk of streamResponse) {
        fullText += chunk.text;
        setMessages(prev => {
          const updated = [...prev];
          updated[updated.length - 1].text = fullText;
          return updated;
        });
      }
    } catch (error) {
      console.error("Gemini Error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "Apologies, boss! My spice brain is a bit scrambled. Can you try again?" }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>

      {/* Drawer */}
      <div className="relative w-full max-w-md bg-brand-cream h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 border-l border-black/10">
        {/* Header */}
        <div className="p-6 bg-brand-black text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-brand-cream p-0.5 border-2 border-brand-red flex items-center justify-center overflow-hidden">
              <Logo />
            </div>
            <div>
              <h3 className="font-display font-black uppercase text-xl tracking-tight">AI Flavor Expert</h3>
              <p className="text-[10px] uppercase tracking-widest text-white/50 font-bold">Online & Spicy</p>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-xl transition-all">
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Chat Area */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`shrink-0 w-8 h-8 rounded-full flex items-center justify-center overflow-hidden bg-brand-cream border border-brand-red/20 ${msg.role === 'user' ? 'bg-brand-red text-white' : ''}`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Logo />}
                </div>
                <div className={`p-4 rounded-2xl font-medium text-sm leading-relaxed shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-brand-red text-white rounded-tr-none' 
                    : 'bg-white text-brand-black rounded-tl-none border border-black/5'
                }`}>
                  {msg.text || (isLoading && i === messages.length - 1 ? "Thinking..." : "")}
                </div>
              </div>
            </div>
          ))}
          {isLoading && !messages[messages.length-1].text && (
             <div className="flex justify-start">
               <div className="bg-white border border-black/5 p-4 rounded-2xl rounded-tl-none flex items-center gap-2">
                 <Loader2 className="w-4 h-4 animate-spin text-brand-red" />
                 <span className="text-xs font-bold text-black/40 uppercase tracking-widest">Cooking response...</span>
               </div>
             </div>
          )}
        </div>

        {/* Quick Prompts */}
        {!isLoading && messages.length < 5 && (
          <div className="px-6 pb-2 flex flex-wrap gap-2">
            {[ "What is Mutton Kacchi?", "Which one is spiciest?", "Recommend a full meal" ].map((q) => (
              <button 
                key={q}
                onClick={() => {
                  setInput(q);
                }}
                className="text-[10px] font-black uppercase tracking-wider bg-white border border-black/5 px-3 py-2 rounded-full hover:border-brand-red hover:text-brand-red transition-all"
              >
                {q}
              </button>
            ))}
          </div>
        )}

        {/* Footer / Input */}
        <div className="p-6 bg-white border-t border-black/5">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask for a recommendation..."
              className="flex-1 bg-brand-cream border border-black/5 rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:border-brand-red transition-all"
            />
            <button 
              type="submit"
              disabled={isLoading || !input.trim()}
              className="bg-brand-black text-white p-3 rounded-xl hover:bg-brand-red disabled:opacity-50 transition-all active:scale-95"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
          <button 
            onClick={onOrderClick}
            className="w-full mt-4 flex items-center justify-center gap-2 bg-brand-red text-white py-3 rounded-xl font-display font-black uppercase text-xs tracking-widest hover:bg-black transition-all shadow-lg"
          >
            <ShoppingBag className="w-4 h-4" />
            I'm Ready to Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default AIChat;
