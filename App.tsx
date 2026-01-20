
import React, { useState } from 'react';
import Navbar from './components/Navbar.tsx';
import Hero from './components/Hero.tsx';
import Marquee from './components/Marquee.tsx';
import GridSection from './components/GridSection.tsx';
import MenuSection from './components/MenuSection.tsx';
import LocationsSection from './components/LocationsSection.tsx';
import Footer from './components/Footer.tsx';
import OrderModal from './components/OrderModal.tsx';
import AIChat from './components/AIChat.tsx';
import AuthModal from './components/AuthModal.tsx';

const App: React.FC = () => {
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isAIChatOpen, setIsAIChatOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const openModal = () => setIsOrderModalOpen(true);
  const closeModal = () => setIsOrderModalOpen(false);
  
  const openAIChat = () => setIsAIChatOpen(true);
  const closeAIChat = () => setIsAIChatOpen(false);

  const openAuthModal = () => setIsAuthModalOpen(true);
  const closeAuthModal = () => setIsAuthModalOpen(false);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar onLoginClick={openAuthModal} />
      
      <main>
        {/* Home Section */}
        <section id="home">
          <Hero onAskAIClick={openAIChat} />
          <Marquee />
          <GridSection onOrderClick={openModal} />
        </section>

        {/* Menu Section */}
        <MenuSection onOrderClick={openModal} />

        {/* Locations Section */}
        <LocationsSection />
      </main>

      <Footer />

      {/* Pop up Order Modal */}
      <OrderModal isOpen={isOrderModalOpen} onClose={closeModal} />
      
      {/* AI Flavor Expert Drawer */}
      <AIChat isOpen={isAIChatOpen} onClose={closeAIChat} onOrderClick={openModal} />

      {/* Auth Modal */}
      <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
    </div>
  );
};

export default App;
