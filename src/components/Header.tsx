import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown, Phone, Instagram, Send, Star, HelpCircle, ArrowRight, Grid, Zap } from 'lucide-react';
import { AppPage } from '../types';
import Logo from './Logo';
import { JP_METADATA } from '../data/machineryData';

interface HeaderProps {
  currentPage: AppPage;
  setCurrentPage: (page: AppPage) => void;
}

export default function Header({ currentPage, setCurrentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [mediaOpen, setMediaOpen] = useState(false);

  const navigateTo = (page: AppPage) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
    setProductsOpen(false);
    setMediaOpen(false);
    // Smooth scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const productSubmenu: { label: string; page: AppPage }[] = [
    { label: 'Plastic Loom Machines', page: 'plastic-loom' },
    { label: 'Needle Loom Machines', page: 'needle-loom' },
    { label: 'Winder Machines', page: 'winder' },
    { label: 'Tano Machines (Warping)', page: 'tano' },
    { label: 'Beam Machines', page: 'beam' },
    { label: 'Wrapping / Lapetayu', page: 'wrapping' },
  ];

  const mediaSubmenu: { label: string; page: AppPage }[] = [
    { label: 'Machine Gallery', page: 'gallery' },
    { label: 'Videos & Reels', page: 'videos' },
    { label: 'Satisfied Clients', page: 'clients' },
  ];

  const isProductActive = productSubmenu.some((p) => p.page === currentPage);
  const isMediaActive = mediaSubmenu.some((p) => p.page === currentPage);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800 bg-slate-950/80 backdrop-blur-md select-none text-slate-100">
      
      {/* Top micro-bar for quick details */}
      <div className="hidden sm:flex h-9 w-full bg-slate-900 border-b border-slate-800/50 justify-between items-center px-4 max-w-7xl mx-auto text-xs text-slate-400">
        <div className="flex items-center gap-4">
          <a
            href={`tel:${JP_METADATA.phone.replace(/\s+/g, '')}`}
            className="flex items-center gap-1.5 hover:text-sky-400 transition-colors font-mono font-medium"
          >
            <Phone className="w-3 h-3 text-sky-400" />
            {JP_METADATA.phone}
          </a>
          <span className="text-slate-700">|</span>
          <span className="text-amber-500 font-bold tracking-wider">ESTABLISHED {JP_METADATA.estYear}</span>
        </div>
        <div className="flex items-center gap-4">
          <a
            href={`https://www.instagram.com/${JP_METADATA.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
          >
            <Instagram className="w-3.5 h-3.5 text-orange-400" />
            <span className="font-semibold text-[11px]">@{JP_METADATA.instagram}</span>
          </a>
          <span className="text-slate-700">|</span>
          <span className="text-sky-400 font-semibold tracking-wide uppercase text-[10px]">Surat Textile Machinery hub</span>
        </div>
      </div>

      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        
        {/* Brand Logo */}
        <div className="cursor-pointer py-1" onClick={() => navigateTo('home')}>
          <Logo size="md" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          <button
            onClick={() => navigateTo('home')}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
              currentPage === 'home' ? 'text-sky-450' : 'text-slate-300 hover:text-white'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => navigateTo('about')}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
              currentPage === 'about' ? 'text-sky-450' : 'text-slate-300 hover:text-white'
            }`}
          >
            About Company
          </button>

          {/* Loom & Machine Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setProductsOpen(!productsOpen);
                setMediaOpen(false);
              }}
              onMouseEnter={() => {
                setProductsOpen(true);
                setMediaOpen(false);
              }}
              className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                isProductActive ? 'text-sky-450' : 'text-slate-300 hover:text-white'
              }`}
            >
              Our Machines
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Dropdown Box */}
            <AnimatePresence>
              {productsOpen && (
                <>
                  {/* Invisible overlay window to close dropdown */}
                  <div className="fixed inset-0 z-10" onMouseLeave={() => setProductsOpen(false)} onClick={() => setProductsOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-3.5 w-64 origin-top-left rounded-xl border border-slate-800 bg-slate-900/95 p-2 shadow-xl backdrop-blur-lg z-20"
                    onMouseEnter={() => setProductsOpen(true)}
                    onMouseLeave={() => setProductsOpen(false)}
                  >
                    <div className="px-3 py-1.5 text-[10px] font-bold text-sky-450 uppercase tracking-widest border-b border-slate-800/40 mb-1">
                      Machine Categories
                    </div>
                    {productSubmenu.map((item) => (
                      <button
                        key={item.page}
                        onClick={() => navigateTo(item.page)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-all ${
                          currentPage === item.page
                            ? 'bg-sky-600/10 text-sky-400'
                            : 'text-slate-300 hover:bg-slate-850 hover:text-white'
                        }`}
                      >
                        {item.label}
                        {currentPage === item.page && <span className="w-1.5 h-1.5 rounded-full bg-sky-400" />}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => navigateTo('spare-parts')}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
              currentPage === 'spare-parts' ? 'text-sky-450' : 'text-slate-300 hover:text-white'
            }`}
          >
            Spare Parts
          </button>

          <button
            onClick={() => navigateTo('services')}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
              currentPage === 'services' ? 'text-sky-450' : 'text-slate-300 hover:text-white'
            }`}
          >
            Services
          </button>

          {/* Media Galleries Dropdown */}
          <div className="relative">
            <button
              onClick={() => {
                setMediaOpen(!mediaOpen);
                setProductsOpen(false);
              }}
              onMouseEnter={() => {
                setMediaOpen(true);
                setProductsOpen(false);
              }}
              className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                isMediaActive ? 'text-sky-450' : 'text-slate-300 hover:text-white'
              }`}
            >
              Media Center
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${mediaOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {mediaOpen && (
                <>
                  <div className="fixed inset-0 z-10" onMouseLeave={() => setMediaOpen(false)} onClick={() => setMediaOpen(false)} />
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 mt-3.5 w-52 origin-top-left rounded-xl border border-slate-800 bg-slate-900/95 p-2 shadow-xl backdrop-blur-lg z-20"
                    onMouseEnter={() => setMediaOpen(true)}
                    onMouseLeave={() => setMediaOpen(false)}
                  >
                    {mediaSubmenu.map((item) => (
                      <button
                        key={item.page}
                        onClick={() => navigateTo(item.page)}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-medium transition-all ${
                          currentPage === item.page
                            ? 'bg-sky-600/10 text-sky-400'
                            : 'text-slate-300 hover:bg-slate-850 hover:text-white'
                        }`}
                      >
                        {item.label}
                      </button>
                    ))}
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => navigateTo('contact')}
            className={`text-xs font-semibold uppercase tracking-wider transition-colors ${
              currentPage === 'contact' ? 'text-sky-450' : 'text-slate-300 hover:text-white'
            }`}
          >
            Contact
          </button>
        </nav>

        {/* Dynamic CTA Button & Mobile Trigger */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigateTo('quote')}
            className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-sky-600 to-orange-600 hover:to-orange-500 font-bold text-xs uppercase tracking-wider px-4 py-2.5 rounded-xl border border-sky-400/20 text-white transition-all shadow-[0_4px_15px_rgba(14,165,233,0.15)] hover:shadow-[0_4px_20px_rgba(249,115,22,0.25)] hover:scale-101 active:scale-98"
          >
            <Zap className="w-3.5 h-3.5 animate-pulse text-zinc-100" />
            Get Indent Quote
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex p-2 text-slate-300 hover:text-white lg:hidden border border-slate-800 rounded-lg bg-slate-900"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 animate-pulse" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Slideout */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden w-full bg-slate-950 border-t border-slate-800 overflow-hidden pb-6"
          >
            <div className="flex flex-col px-4 pt-3 spacing-y-1">
              
              <button
                onClick={() => navigateTo('home')}
                className={`w-full py-2.5 text-left text-sm font-semibold transition-colors ${
                  currentPage === 'home' ? 'text-sky-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                Home
              </button>

              <button
                onClick={() => navigateTo('about')}
                className={`w-full py-2.5 text-left text-sm font-semibold transition-colors ${
                  currentPage === 'about' ? 'text-sky-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                About Company
              </button>

              {/* Sub-header of Machines */}
              <div className="border-l-2 border-slate-800 pl-3 py-1 my-1 space-y-1 bg-slate-925/40 rounded-r-lg">
                <span className="block text-[10px] font-bold text-sky-450 uppercase tracking-widest pl-1 mb-1">
                  Machinery Catalog
                </span>
                {productSubmenu.map((prod) => (
                  <button
                    key={prod.page}
                    onClick={() => navigateTo(prod.page)}
                    className={`block w-full py-1.5 text-left text-xs font-medium transition-colors ${
                      currentPage === prod.page ? 'text-sky-300' : 'text-slate-450 hover:text-slate-300'
                    }`}
                  >
                    {prod.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigateTo('spare-parts')}
                className={`w-full py-2.5 text-left text-sm font-semibold transition-colors ${
                  currentPage === 'spare-parts' ? 'text-sky-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                Textile Spare Parts
              </button>

              <button
                onClick={() => navigateTo('services')}
                className={`w-full py-2.5 text-left text-sm font-semibold transition-colors ${
                  currentPage === 'services' ? 'text-sky-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                Services & Repair
              </button>

              {/* Sub-header of Media */}
              <div className="border-l-2 border-slate-800 pl-3 py-1 my-1 space-y-1 bg-slate-925/40 rounded-r-lg">
                <span className="block text-[10px] font-bold text-orange-450 uppercase tracking-widest pl-1 mb-1">
                  Media & Portfolio
                </span>
                {mediaSubmenu.map((item) => (
                  <button
                    key={item.page}
                    onClick={() => navigateTo(item.page)}
                    className={`block w-full py-1.5 text-left text-xs font-medium transition-colors ${
                      currentPage === item.page ? 'text-orange-300' : 'text-slate-450 hover:text-slate-350'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>

              <button
                onClick={() => navigateTo('contact')}
                className={`w-full py-2.5 text-left text-sm font-semibold transition-colors ${
                  currentPage === 'contact' ? 'text-sky-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                Contact Us
              </button>

              <button
                onClick={() => navigateTo('quote')}
                className="w-full mt-4 bg-gradient-to-r from-sky-600 to-orange-600 text-white font-bold text-xs uppercase tracking-wider py-3.5 rounded-xl flex items-center justify-center gap-1.5"
              >
                <Zap className="w-4 h-4 text-zinc-100" />
                Inquiry / Get Quote
              </button>

            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </header>
  );
}
