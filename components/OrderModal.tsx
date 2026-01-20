
import React, { useState, useEffect } from 'react';
import { X, CheckCircle, CreditCard, Smartphone, Loader2, ChevronRight, Plus, Minus, ShoppingBasket, MapPin, Phone, User, AlertCircle } from 'lucide-react';
import { saveOrder, OrderData, getMenuItems, MenuItem } from '../lib/db.ts';

interface OrderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CITIES = ['Mirpur', 'Uttara', 'Dhanmondi', 'Banani', 'Gulshan', 'Mohammadpur', 'Badda'];

const OrderModal: React.FC<OrderModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(0); 
  const [processing, setProcessing] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loadingMenu, setLoadingMenu] = useState(true);
  
  const [cart, setCart] = useState<Record<string, number>>({});
  
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: CITIES[0],
    notes: ''
  });

  useEffect(() => {
    if (isOpen) {
      const fetchMenu = async () => {
        setLoadingMenu(true);
        const items = await getMenuItems();
        setMenuItems(items);
        setLoadingMenu(false);
      };
      fetchMenu();
    }
  }, [isOpen]);

  const updateQuantity = (id: string, delta: number) => {
    setCart(prev => {
      const current = prev[id] || 0;
      const next = Math.max(0, current + delta);
      if (next === 0) {
        const { [id]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [id]: next };
    });
  };

  const cartItems = menuItems.filter(item => item.id && cart[item.id] > 0);
  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * (cart[item.id!] || 0)), 0);
  const deliveryFee = subtotal > 0 ? 60 : 0;
  const grandTotal = subtotal + deliveryFee;

  const isValidPhone = /^01[3-9]\d{8}$/.test(formData.phone);
  const isInfoValid = formData.name && formData.address && isValidPhone;
  const isCartEmpty = cartItems.length === 0;

  if (!isOpen) return null;

  const handleNextStep = () => {
    if (step === 0 && !isCartEmpty) setStep(1);
    else if (step === 1 && isInfoValid) {
      setOrderId(`TP-${Math.floor(100000 + Math.random() * 900000)}`);
      setStep(2);
    }
  };

  const handlePayment = async (method: string) => {
    setProcessing(true);
    try {
      const orderData: OrderData = {
        orderId: orderId,
        customer: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
          city: formData.city,
        },
        items: cartItems.map(item => ({
          name: item.name,
          quantity: cart[item.id!],
          price: item.price
        })),
        totals: { subtotal, delivery: deliveryFee, grandTotal },
        notes: formData.notes
      };

      await saveOrder(orderData);
      setTimeout(() => {
        setProcessing(false);
        setStep(3);
      }, 1500);
    } catch (error) {
      console.error("Order Error:", error);
      alert("Failed to process order. Please check your connection.");
      setProcessing(false);
    }
  };

  const resetAndClose = () => {
    setStep(0);
    setCart({});
    setFormData({
      name: '',
      phone: '',
      address: '',
      city: CITIES[0],
      notes: ''
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-hidden">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-brand-cream w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300 flex flex-col max-h-[90vh]">
        <div className="h-4 bg-brand-red w-full shrink-0"></div>
        <button onClick={onClose} className="absolute top-8 right-8 p-3 bg-black text-white rounded-2xl hover:bg-brand-red hover:rotate-90 transition-all z-20"><X className="w-6 h-6" /></button>
        <div className="flex-1 overflow-y-auto p-8 sm:p-12">
          <div className="flex gap-2 mb-8">
            {[0, 1, 2].map((i) => (<div key={i} className={`h-2 flex-1 rounded-full transition-all duration-500 ${step >= i ? 'bg-brand-red' : 'bg-black/10'}`}></div>))}
          </div>
          {step === 0 && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <div className="mb-8">
                <p className="uppercase text-[10px] tracking-[0.4em] text-brand-red font-black font-display mb-2">Step 01: Your Selection</p>
                <h2 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tighter leading-none text-brand-black">Fill Your Plate</h2>
              </div>
              {loadingMenu ? (
                <div className="py-20 flex flex-col items-center"><Loader2 className="w-10 h-10 animate-spin text-brand-red" /><p className="mt-4 text-xs font-black uppercase tracking-widest text-black/30">Loading Heritage Menu...</p></div>
              ) : (
                <div className="space-y-4 mb-8">
                  {menuItems.map((item) => (
                    <div key={item.id} className="bg-white border-2 border-black/5 rounded-[2rem] p-5 flex items-center justify-between group hover:border-brand-red/30 transition-all shadow-sm">
                      <div className="flex-1 pr-4"><h3 className="font-display font-black uppercase text-xl text-brand-black leading-tight">{item.name}</h3><p className="text-brand-red font-black text-lg">৳{item.price}</p></div>
                      <div className="flex items-center gap-4 bg-brand-cream rounded-2xl p-2 border border-black/5">
                        <button onClick={() => updateQuantity(item.id!, -1)} className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center text-brand-black hover:bg-brand-red hover:text-white transition-all active:scale-90"><Minus className="w-4 h-4" /></button>
                        <span className="font-display font-black text-xl w-6 text-center">{cart[item.id!] || 0}</span>
                        <button onClick={() => updateQuantity(item.id!, 1)} className="w-10 h-10 rounded-xl bg-white border border-black/5 flex items-center justify-center text-brand-black hover:bg-brand-red hover:text-white transition-all active:scale-90"><Plus className="w-4 h-4" /></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          {step === 1 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-8"><p className="uppercase text-[10px] tracking-[0.4em] text-brand-red font-black font-display mb-2">Step 02: Delivery Details</p><h2 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tighter leading-none text-brand-black">Where to deliver?</h2></div>
              <div className="space-y-6">
                <div><label className="block uppercase text-[10px] font-black tracking-widest text-black/40 mb-2 ml-4">Full Name</label><div className="relative"><User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" /><input required type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Anisur Rahman" className="w-full bg-white border-2 border-black/5 rounded-2xl px-14 py-4 font-display font-bold text-lg focus:border-brand-red focus:outline-none transition-all" /></div></div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div><label className="block uppercase text-[10px] font-black tracking-widest text-black/40 mb-2 ml-4">Phone Number</label><div className="relative"><Phone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" /><input required type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} placeholder="01712345678" className={`w-full bg-white border-2 rounded-2xl px-14 py-4 font-display font-bold text-lg focus:outline-none transition-all ${formData.phone && !isValidPhone ? 'border-red-500' : 'border-black/5 focus:border-brand-red'}`} /></div></div>
                  <div><label className="block uppercase text-[10px] font-black tracking-widest text-black/40 mb-2 ml-4">City / Area</label><select value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})} className="w-full bg-white border-2 border-black/5 rounded-2xl px-6 py-4 font-display font-bold text-lg focus:border-brand-red focus:outline-none transition-all appearance-none cursor-pointer">{CITIES.map(city => <option key={city} value={city}>{city}</option>)}</select></div>
                </div>
                <div><label className="block uppercase text-[10px] font-black tracking-widest text-black/40 mb-2 ml-4">Complete Address</label><div className="relative"><MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-black/20" /><input required type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})} placeholder="House, Road, Block..." className="w-full bg-white border-2 border-black/5 rounded-2xl px-14 py-4 font-display font-bold text-lg focus:border-brand-red focus:outline-none transition-all" /></div></div>
              </div>
            </div>
          )}
          {step === 2 && (
            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="mb-8"><p className="uppercase text-[10px] tracking-[0.4em] text-brand-red font-black font-display mb-2">Step 03: Final Confirmation</p><h2 className="text-4xl sm:text-5xl font-black font-display uppercase tracking-tighter leading-none text-brand-black">Secure Checkout</h2></div>
              <div className="bg-white border-2 border-black/5 rounded-[2.5rem] p-8 mb-8 shadow-xl">
                <div className="flex justify-between items-center mb-6 border-b border-black/5 pb-4"><h3 className="font-display font-black text-xl uppercase tracking-tight">Your Order Summary</h3><span className="text-[10px] font-black uppercase text-black/30 bg-black/5 px-3 py-1 rounded-lg">ID: {orderId}</span></div>
                <div className="space-y-4 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex justify-between items-center text-sm"><span className="text-black/60 font-medium"><span className="text-brand-black font-black">{cart[item.id!] }x</span> {item.name}</span><span className="font-bold">৳{item.price * cart[item.id!]}</span></div>
                  ))}
                </div>
                <div className="mt-6 pt-6 border-t-2 border-dashed border-black/10 space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase text-black/40"><span>Subtotal</span><span>৳{subtotal}</span></div>
                  <div className="flex justify-between text-xs font-bold uppercase text-black/40"><span>Delivery Charge</span><span>৳{deliveryFee}</span></div>
                  <div className="flex justify-between items-center pt-2"><span className="font-display font-black text-2xl uppercase tracking-tighter">Total Payable</span><span className="font-display font-black text-3xl text-brand-red tracking-tight">৳{grandTotal}</span></div>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => handlePayment('bkash')} disabled={processing} className="flex flex-col items-center justify-center gap-4 bg-[#E2136E] text-white py-8 rounded-[2rem] hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50 group">
                  {processing ? <Loader2 className="w-10 h-10 animate-spin" /> : <><Smartphone className="w-12 h-12 group-hover:rotate-6 transition-transform" /><span className="font-display font-black text-xl uppercase tracking-widest">Pay with bKash</span></>}
                </button>
                <button onClick={() => handlePayment('card')} disabled={processing} className="flex flex-col items-center justify-center gap-4 bg-brand-black text-white py-8 rounded-[2rem] hover:scale-[1.02] transition-all shadow-xl disabled:opacity-50 group">
                  {processing ? <Loader2 className="w-10 h-10 animate-spin" /> : <><CreditCard className="w-12 h-12 group-hover:rotate-6 transition-transform" /><span className="font-display font-black text-xl uppercase tracking-widest">Card Payment</span></>}
                </button>
              </div>
            </div>
          )}
          {step === 3 && (
            <div className="py-12 flex flex-col items-center text-center animate-in zoom-in duration-700">
              <div className="w-24 h-24 bg-green-500 text-white rounded-[2rem] flex items-center justify-center mb-8 shadow-2xl animate-bounce"><CheckCircle className="w-12 h-12" /></div>
              <h2 className="text-5xl font-black font-display uppercase tracking-tighter leading-[0.85] text-brand-black mb-4">Mouth-Watering<br/>Flavor Loading!</h2>
              <p className="text-black/60 font-medium mb-8 max-w-sm">We've received your order. Our chefs are firing up the pots as we speak!</p>
              <div className="p-6 bg-black/5 rounded-3xl mb-10 w-full border border-black/5"><p className="uppercase text-[10px] tracking-widest font-black text-black/40 mb-2">Order Reference</p><p className="text-3xl font-display font-black text-brand-red">{orderId}</p></div>
              <button onClick={resetAndClose} className="w-full bg-brand-black text-white py-6 rounded-[2rem] font-display font-black text-xl uppercase hover:bg-brand-red transition-all shadow-xl active:scale-95">Go Back to Home</button>
            </div>
          )}
        </div>
        {step < 2 && (
          <div className="p-8 bg-white border-t border-black/10 shrink-0 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_-10px_30px_rgba(0,0,0,0.05)]">
            <div className="flex items-center gap-4"><div className="w-14 h-14 bg-brand-cream rounded-2xl flex items-center justify-center text-brand-red relative"><ShoppingBasket className="w-8 h-8" />{Object.values(cart).length > 0 && (<span className="absolute -top-2 -right-2 w-6 h-6 bg-brand-red text-white text-[10px] font-black rounded-full flex items-center justify-center border-2 border-white">{Object.values(cart).reduce((a, b) => a + b, 0)}</span>)}</div><div><p className="text-[10px] font-black uppercase text-black/30 tracking-widest">Grand Total</p><p className="text-3xl font-display font-black text-brand-black leading-none">৳{grandTotal}</p></div></div>
            <div className="flex gap-4 w-full sm:w-auto">{step > 0 && (<button onClick={() => setStep(step - 1)} className="flex-1 sm:flex-none px-8 py-5 rounded-2xl border-2 border-black/5 font-display font-black uppercase text-sm tracking-widest hover:bg-black hover:text-white transition-all">Back</button>)}<button onClick={handleNextStep} disabled={step === 0 ? isCartEmpty : !isInfoValid} className={`flex-1 sm:flex-none px-10 py-5 rounded-2xl font-display font-black uppercase text-sm tracking-widest transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3 ${(step === 0 && !isCartEmpty) || (step === 1 && isInfoValid) ? 'bg-brand-red text-white hover:bg-black' : 'bg-black/10 text-black/30 cursor-not-allowed shadow-none'}`}>{step === 0 ? 'Continue' : 'Final Step'}<ChevronRight className="w-5 h-5" /></button></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderModal;
