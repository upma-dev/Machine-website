
import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Cpu, 
  Wrench, 
  Grid, 
  Phone, 
  Mail, 
  MapPin, 
  Instagram, 
  Zap, 
  Clock, 
  Award, 
  Play, 
  ArrowRight, 
  Star, 
  ChevronRight, 
  Building, 
  ListFilter,
  Gauge,
  Weight,
  Ruler,
  Bolt,
  Shield,
  CheckCircle2,
  TrendingUp,
  Layers,
  Settings2,
  Activity
} from 'lucide-react';

import { AppPage } from './types';
import { 
  JP_METADATA, 
  MACHINE_PRODUCTS, 
  SPARE_PARTS, 
  SERVICE_DETAILS, 
  CLIENT_REVIEWS, 
  DEMO_VIDEOS, 
  GALLERY_ITEMS 
} from './data/machineryData';

import Header from './components/Header';
import Footer from './components/Footer';
import InquiryForm from './components/InquiryForm';


// Floating particles component for industrial feel
function FloatingParticles({ count = 12, color = 'sky' }: { count?: number; color?: string }) {
  const colorMap: Record<string, string> = {
    sky: 'bg-sky-400',
    orange: 'bg-orange-400',
    emerald: 'bg-emerald-400',
  };
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-1 h-1 rounded-full ${colorMap[color] || 'bg-sky-400'} opacity-20`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}
    </div>
  );
}

// Animated spec badge
function SpecBadge({ label, value, icon: Icon, accent = 'sky' }: { label: string; value: string; icon?: any; accent?: string }) {
  const accentMap: Record<string, string> = {
    sky: 'border-sky-500/30 bg-sky-500/5 text-sky-300',
    orange: 'border-orange-500/30 bg-orange-500/5 text-orange-300',
    emerald: 'border-emerald-500/30 bg-emerald-500/5 text-emerald-300',
    slate: 'border-slate-600/30 bg-slate-600/5 text-slate-300',
  };
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`border rounded-xl p-4 ${accentMap[accent] || accentMap.sky} flex flex-col gap-1.5`}
    >
      {Icon && <Icon className="w-4 h-4 opacity-70" />}
      <span className="text-[9px] uppercase font-mono tracking-widest opacity-60">{label}</span>
      <span className="text-xs font-bold font-mono leading-tight">{value}</span>
    </motion.div>
  );
}

// Machine Hero Section - reusable beautiful component
function MachineHeroSection({ prod, onGetQuote }: { prod: any; onGetQuote: () => void }) {
  // Pick accent color per category
  const categoryConfig: Record<string, { accent: string; glow: string; badge: string; tagColor: string }> = {
    loom:     { accent: 'sky',     glow: 'rgba(14,165,233,0.15)',  badge: 'bg-sky-500/10 border-sky-500/30 text-sky-300',    tagColor: 'text-sky-400' },
    winder:   { accent: 'emerald', glow: 'rgba(16,185,129,0.15)',  badge: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300', tagColor: 'text-emerald-400' },
    warping:  { accent: 'orange',  glow: 'rgba(249,115,22,0.15)',  badge: 'bg-orange-500/10 border-orange-500/30 text-orange-300',  tagColor: 'text-orange-400' },
    beam:     { accent: 'slate',   glow: 'rgba(100,116,139,0.15)', badge: 'bg-slate-600/10 border-slate-600/30 text-slate-300',   tagColor: 'text-slate-300' },
    wrapping: { accent: 'orange',  glow: 'rgba(249,115,22,0.15)',  badge: 'bg-orange-500/10 border-orange-500/30 text-orange-300', tagColor: 'text-orange-400' },
  };
  const cfg = categoryConfig[prod.category] || categoryConfig.loom;

  const specIcons = [Gauge, Bolt, Ruler, Weight, Layers, Settings2];

  return (
    <div className="space-y-0">
      {/* HERO BANNER with full-width image */}
      <div className="relative h-[380px] sm:h-[480px] overflow-hidden rounded-2xl border border-slate-800">
        {/* Background image with parallax feel */}
        <motion.img
          src={prod.image}
          alt={prod.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover"
          initial={{ scale: 1.08 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />

        {/* Dark gradient overlay - stronger at bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-slate-950/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />

        {/* Floating particles */}
        <FloatingParticles count={16} color={cfg.accent} />

        {/* Animated grid lines overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:3rem_3rem]" />

        {/* Glowing accent line at bottom */}
        <motion.div
          className="absolute bottom-0 inset-x-0 h-[2px]"
          style={{ background: `linear-gradient(to right, transparent, ${cfg.glow.replace('0.15', '0.8')}, transparent)` }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Content overlaid on image */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-3 max-w-2xl"
          >
            {/* Category badge */}
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-mono font-bold uppercase tracking-widest ${cfg.badge}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              {prod.category.toUpperCase()} — VERIFIED MECHANICAL MODEL
            </div>

            <h1 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight drop-shadow-[0_2px_20px_rgba(0,0,0,0.8)]">
              {prod.name}
            </h1>

            <p className={`text-sm font-semibold uppercase tracking-widest ${cfg.tagColor}`}>
              {prod.tagline}
            </p>

            {/* Quick metrics row */}
            <div className="flex flex-wrap gap-3 pt-1">
              <div className="bg-slate-950/80 backdrop-blur border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Gauge className="w-3.5 h-3.5 text-sky-400" />
                <span className="text-[11px] font-mono font-bold text-slate-200">{prod.productionSpeed}</span>
              </div>
              <div className="bg-slate-950/80 backdrop-blur border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2">
                <Bolt className="w-3.5 h-3.5 text-orange-400" />
                <span className="text-[11px] font-mono font-bold text-slate-200">{prod.powerRating}</span>
              </div>
              {prod.dimensions && (
                <div className="bg-slate-950/80 backdrop-blur border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-2">
                  <Ruler className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-[11px] font-mono font-bold text-slate-200">{prod.dimensions}</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* Corner badge - top right */}
        <div className="absolute top-4 right-4 bg-slate-950/90 backdrop-blur border border-slate-700 rounded-xl px-3 py-2 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono font-bold text-emerald-400 uppercase tracking-widest">In Production</span>
        </div>
      </div>

      {/* DETAILS SECTION below image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-10">
        
        {/* Left: Description + Specs */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${cfg.accent === 'sky' ? 'via-sky-500' : cfg.accent === 'orange' ? 'via-orange-500' : 'via-emerald-500'} to-transparent`} />
              <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-slate-500">About This Machine</span>
              <div className={`h-[1px] flex-1 bg-gradient-to-r from-transparent ${cfg.accent === 'sky' ? 'via-sky-500' : cfg.accent === 'orange' ? 'via-orange-500' : 'via-emerald-500'} to-transparent`} />
            </div>
            <p className="text-sm text-slate-300 leading-relaxed">
              {prod.description}
            </p>
          </motion.div>

          {/* Spec Cards Grid */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <Activity className="w-4 h-4 text-sky-400" />
              Technical Parameters
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {prod.specs.map((spec: any, sIdx: number) => {
                const Icon = specIcons[sIdx % specIcons.length];
                const accents = ['sky', 'orange', 'emerald', 'slate', 'sky', 'orange'];
                return (
                  <SpecBadge
                    key={sIdx}
                    label={spec.label}
                    value={spec.value}
                    icon={Icon}
                    accent={accents[sIdx % accents.length]}
                  />
                );
              })}
            </div>
          </div>

          {/* Features with animated reveal */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              Key Engineering Features
            </h3>
            <div className="space-y-2">
              {prod.features.map((feat: string, fIdx: number) => (
                <motion.div
                  key={fIdx}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 * fIdx + 0.4 }}
                  className="flex items-start gap-3 bg-slate-900/40 border border-slate-800/50 rounded-xl p-3 hover:border-slate-700 transition-colors group"
                >
                  <div className={`w-5 h-5 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${cfg.accent === 'sky' ? 'bg-sky-500/10 text-sky-400' : cfg.accent === 'orange' ? 'bg-orange-500/10 text-orange-400' : 'bg-emerald-500/10 text-emerald-400'}`}>
                    <span className="text-[11px] font-bold">{fIdx + 1}</span>
                  </div>
                  <span className="text-xs text-slate-300 leading-relaxed group-hover:text-slate-200 transition-colors">{feat}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: Advantages + CTA */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Performance advantages */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="relative bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 overflow-hidden"
          >
            {/* Glow effect */}
            <div className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl pointer-events-none ${cfg.accent === 'sky' ? 'bg-sky-500/10' : cfg.accent === 'orange' ? 'bg-orange-500/10' : 'bg-emerald-500/10'}`} />
            <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
            
            <h3 className="text-xs font-bold uppercase tracking-widest mb-5 flex items-center gap-2">
              <TrendingUp className={`w-4 h-4 ${cfg.tagColor}`} />
              <span className="text-slate-300">Operational Advantages</span>
            </h3>

            <div className="space-y-4">
              {prod.advantages.map((adv: string, aIdx: number) => (
                <div key={aIdx} className="flex gap-3 items-start">
                  <div className="w-6 h-6 rounded-full flex items-center justify-center shrink-0 mt-0.5 bg-slate-800 border border-slate-700">
                    <span className={`text-[10px] font-black ${cfg.tagColor}`}>✓</span>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">{adv}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Performance meter visual */}
          <div className="bg-slate-900/40 border border-slate-800 rounded-2xl p-5 space-y-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-slate-500 font-bold">Live Performance Index</span>
            {[
              { label: 'Operational Efficiency', val: 97 },
              { label: 'Tension Stability', val: 94 },
              { label: 'Energy Optimization', val: 88 },
              { label: 'Durability Rating', val: 99 },
            ].map((m, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-[10px]">
                  <span className="text-slate-400 font-medium">{m.label}</span>
                  <span className={`font-mono font-bold ${cfg.tagColor}`}>{m.val}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${cfg.accent === 'sky' ? 'bg-gradient-to-r from-sky-600 to-sky-400' : cfg.accent === 'orange' ? 'bg-gradient-to-r from-orange-600 to-orange-400' : 'bg-gradient-to-r from-emerald-600 to-emerald-400'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${m.val}%` }}
                    transition={{ delay: 0.3 + idx * 0.1, duration: 0.8 }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <motion.button
            onClick={onGetQuote}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-sky-600 to-orange-600 hover:to-orange-500 font-bold text-xs uppercase tracking-wider py-4 px-4 rounded-xl text-white transition-all shadow-[0_8px_30px_rgba(14,165,233,0.2)] flex items-center justify-center gap-2 cursor-pointer relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-white/10 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12" />
            <Zap className="w-4 h-4 text-zinc-100 animate-pulse" />
            Prefill In RFQ System Calculator
          </motion.button>

          {/* Contact quick links */}
          <div className="grid grid-cols-2 gap-3">
            <a href={`tel:${JP_METADATA.phone.replace(/\s+/g, '')}`} className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-orange-500/30 text-slate-400 hover:text-orange-400 text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors">
              <Phone className="w-3.5 h-3.5" />
              Call Now
            </a>
            <a href={JP_METADATA.instagramUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-slate-900 border border-slate-800 hover:border-pink-500/30 text-slate-400 hover:text-pink-400 text-xs font-semibold py-2.5 px-3 rounded-xl transition-colors">
              <Instagram className="w-3.5 h-3.5" />
              Instagram
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<AppPage>('home');
  const [partsFilter, setPartsFilter] = useState<string>('All');
  const [galleryFilter, setGalleryFilter] = useState<string>('all');
  const [activeVideo, setActiveVideo] = useState<string | null>(null);
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactName, setContactName] = useState('');
  const [contactMessage, setContactMessage] = useState('');

  const spareCategories = ['All', ...Array.from(new Set(SPARE_PARTS.map(sp => sp.category)))];

  const handleApplyEstimate = (machineId: string) => {
    setCurrentPage('quote');
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  const handleContactSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!contactName) return;
    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setContactName('');
      setContactMessage('');
    }, 4000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-orange-500/30 selection:text-white" id="main-application-hub">
      
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <main className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="w-full pb-16"
          >

            {/* ======================== PAGE 1: HOME ======================== */}
            {currentPage === 'home' && (
              <div id="home-view-canvas">
                {/* HERO */}
                <section className="relative overflow-hidden border-b border-slate-900 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950 py-16 sm:py-24 px-4 sm:px-6">
                  <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-30" />
                  <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
                  <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
                  <FloatingParticles count={20} color="sky" />

                  <div className="mx-auto max-w-7xl relative z-10 text-center space-y-8">
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
                      <div className="inline-flex items-center gap-2 bg-slate-900/90 border border-slate-800 px-3.5 py-1.5 rounded-full text-xs font-mono font-medium tracking-wide">
                        <Award className="w-4 h-4 text-orange-500 animate-pulse" />
                        <span className="text-zinc-400">SURAT'S TRUSTED LOOM & TEXTILE MACHINERY MAKER</span>
                      </div>
                    </motion.div>

                    <motion.h1 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
                      className="text-4xl sm:text-6xl lg:text-7xl font-sans font-black tracking-tight text-white max-w-5xl mx-auto leading-[1.05]"
                    >
                      Precision Machinery Engineered for{' '}
                      <span className="bg-gradient-to-r from-sky-400 via-sky-500 to-orange-500 bg-clip-text text-transparent">
                        Flawless Textile Production
                      </span>
                    </motion.h1>

                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="text-sm sm:text-base text-zinc-400 max-w-3xl mx-auto leading-relaxed">
                      Specializing in extreme stability Plastic Loom Machines, high velocity Needle Looms, Winding Spools, and computerized Warping Beams. Designed for low-tension upkeep, better density profile, and decades of operational endurance.
                    </motion.p>

                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-3">
                      <button onClick={() => setCurrentPage('quote')} className="w-full sm:w-auto bg-gradient-to-r from-sky-600 to-orange-600 hover:to-orange-500 text-white font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl border border-sky-450/20 shadow-lg shadow-sky-500/10 flex items-center justify-center gap-2 transition-all hover:scale-101 active:scale-98 cursor-pointer">
                        <Zap className="w-4 h-4 text-zinc-100" />
                        Configure Live Quote RFQ
                      </button>
                      <button onClick={() => setCurrentPage('about')} className="w-full sm:w-auto bg-slate-900 hover:bg-slate-850 text-slate-300 font-bold text-xs uppercase tracking-wider py-3.5 px-8 rounded-xl border border-slate-800 flex items-center justify-center gap-2 transition-colors cursor-pointer">
                        Explore Our Company History
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </motion.div>

                    <div className="border-t border-slate-900/80 pt-10 mt-12 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                      {[
                        { num: '18K+', label: 'Gears & Spares Shipped', color: 'text-sky-400' },
                        { num: '15+', label: 'States Covered in India', color: 'text-orange-500' },
                        { num: '99.7%', label: 'Loom Operation Uptime', color: 'text-slate-200' },
                        { num: '18%', label: 'Average Power Saved', color: 'text-emerald-400' },
                      ].map((s, i) => (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.1 }}>
                          <div className={`text-3xl sm:text-4xl font-black font-sans ${s.color}`}>{s.num}</div>
                          <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono mt-1">{s.label}</p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* PRODUCT GRID */}
                <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
                    <div>
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-sky-450 bg-sky-950/20 border border-sky-950/60 px-3 py-1 rounded">CATALOG INDEX</span>
                      <h2 className="text-2xl sm:text-3xl font-bold text-white mt-3 tracking-tight">Main Product Portfolios</h2>
                      <p className="text-xs text-slate-400 mt-1">High configuration machinery built from high-grade chromium cast steel.</p>
                    </div>
                    <button onClick={() => setCurrentPage('spare-parts')} className="text-xs text-orange-400 font-semibold uppercase hover:text-orange-300 transition-colors flex items-center gap-1.5">
                      Browse Spare Parts <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MACHINE_PRODUCTS.map((machine, mIdx) => (
                      <motion.div
                        key={machine.id}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: mIdx * 0.08 }}
                        className="group bg-slate-900 border border-slate-850/60 hover:border-sky-500/30 rounded-2xl overflow-hidden flex flex-col justify-between transition-all hover:shadow-[0_0_30px_rgba(14,165,233,0.08)]"
                      >
                        <div>
                          <div className="aspect-[16/10] bg-slate-950 overflow-hidden relative">
                            <img src={machine.image} alt={machine.name} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
                            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-slate-950/80 backdrop-blur border border-slate-700 rounded-lg px-2 py-1">
                              <Gauge className="w-3 h-3 text-sky-400" />
                              <span className="text-[10px] font-mono font-bold text-sky-300">{machine.productionSpeed}</span>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-sky-600 to-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
                          </div>

                          <div className="p-5">
                            <span className="font-mono text-[9px] uppercase font-bold tracking-widest text-orange-400">{machine.category.toUpperCase()} MACHINE</span>
                            <h3 className="text-lg font-bold text-white mt-1 group-hover:text-sky-350 transition-colors">{machine.name}</h3>
                            <p className="text-xs text-slate-400 leading-normal mt-2.5 line-clamp-3">{machine.description}</p>

                            <div className="mt-4 space-y-1.5 border-t border-slate-850 pt-4">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Key Features:</span>
                              {machine.features.slice(0, 2).map((feat, idx) => (
                                <div key={idx} className="flex gap-2 items-start text-xs text-slate-350 leading-relaxed pl-1">
                                  <span className="text-sky-400 font-bold shrink-0">•</span>
                                  <span className="truncate">{feat}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        <div className="p-5 pt-0">
                          <button onClick={() => setCurrentPage(machine.id as AppPage)} className="w-full bg-slate-950 hover:bg-sky-950/30 hover:border-sky-500/40 border border-slate-850 py-2.5 rounded-xl text-xs font-semibold text-slate-250 transition-all flex items-center justify-center gap-1">
                            Inspect Specifications <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </section>

                {/* FEATURE STORY */}
                <section className="bg-slate-900/30 border-y border-slate-900 py-16 px-4">
                  <div className="mx-auto max-w-7xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div className="lg:col-span-6 space-y-6">
                      <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-orange-400 bg-orange-950/20 border border-orange-950/60 px-3 py-1 rounded">ESTABLISHED GIDC TEXTILE LEADERS</span>
                      <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Trusted Name in Industrial Textile Loom Systems</h2>
                      <p className="text-sm text-slate-400 leading-relaxed">JP Tools & Machine has been designing, engineering, and optimizing narrow fabric looms, winding assemblies, and warping systems since {JP_METADATA.estYear}. Our factory coordinates with textile plants across Ludhiana, Surat, Coimbatore, and international zones.</p>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {[
                          { title: 'Quality Manufacturing', desc: 'Crafted from forged high-carb steel alloys' },
                          { title: 'Extreme Durability', desc: 'Symmetric cam-drive designed for 24/7 output' },
                          { title: 'Eco Energy Optimization', desc: 'IE4 performance motors saving up to 18% electricity' },
                          { title: 'Reliable Support', desc: 'Direct fast engineer site visits across textile zones' },
                        ].map((item, idx) => (
                          <div key={idx} className="flex gap-3 items-start p-3 rounded-xl border border-slate-850 bg-slate-950/20">
                            <div className="w-5 h-5 rounded-full bg-sky-500/10 text-sky-400 flex items-center justify-center font-bold font-mono text-[11px] shrink-0 mt-0.5">✓</div>
                            <div>
                              <h4 className="text-xs font-bold text-slate-200">{item.title}</h4>
                              <p className="text-[10px] text-slate-500 mt-0.5">{item.desc}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      <button onClick={() => setCurrentPage('about')} className="bg-sky-600/10 hover:bg-sky-600/20 text-sky-400 hover:text-sky-300 font-semibold text-xs uppercase tracking-wider px-5 py-3 rounded-xl border border-sky-500/20 transition-colors">
                        Read More About Us
                      </button>
                    </div>

                    <div className="lg:col-span-6 relative">
                      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 shadow-2xl font-mono text-xs overflow-hidden">
                        <div className="flex justify-between items-center pb-3 border-b border-slate-900 mb-4 text-slate-500 text-[10px]">
                          <span className="flex items-center gap-1.5 font-bold">
                            <span className="w-2 h-2 rounded-full bg-red-500" />
                            <span className="w-2 h-2 rounded-full bg-yellow-500" />
                            <span className="w-2 h-2 rounded-full bg-green-500" />
                            JP_Loom_Diagnostics.vsh
                          </span>
                          <span>ACTIVE CONSOLE ONLINE</span>
                        </div>
                        <div className="space-y-2.5 text-zinc-400 text-[11px]">
                          <div className="text-sky-400 font-bold">$ jptm --status --check</div>
                          <div>[LOG] Fetching GIDC manufacturing index files...</div>
                          <div className="text-emerald-400">[SUCCESS] Spindle calibrator active: 0.003mm variance tolerance</div>
                          <div>[LOG] Tuning variable speed inverter profile to EcoIE3 class...</div>
                          <div className="text-orange-400">[WARN] Motor draw: 3.0 kW nominal standard load detected</div>
                          <div className="text-white font-semibold">Tension Stabilizer Index: stable - 94/100</div>
                          <div className="border-t border-slate-900 pt-3 flex justify-between text-slate-500 text-[9px]">
                            <span>TOTAL COMMISSIONED: 420+ LOOMS</span>
                            <span>SYS_RELIABLE: PASS</span>
                          </div>
                        </div>
                      </div>
                      <div className="absolute -top-12 -right-12 w-64 h-64 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />
                    </div>
                  </div>
                </section>

                {/* INSTAGRAM */}
                <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
                  <div className="text-center space-y-3 mb-10">
                    <span className="text-[10px] uppercase font-mono font-black text-orange-400 tracking-widest bg-orange-950/25 border border-orange-900 px-3 py-1 rounded">INSTAGRAM CHANNEL</span>
                    <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">Stay Updated on Instagram</h2>
                    <p className="text-xs text-slate-400">Follow <span className="font-bold text-white">@{JP_METADATA.instagram}</span> for workshop dispatch reels!</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[
                      { img: MACHINE_PRODUCTS[0].image, caption: 'Delivering another high configuration 6-Shuttle PolySack Circular Loom package to GIDC Surat cluster. Precision-balanced steel rotor shafts ready for continuous weaving.', tags: '#circularloom #wovensacks #surattextiles', tagColor: 'text-sky-400' },
                      { img: MACHINE_PRODUCTS[1].image, caption: 'High performance double-cam needle looms operating smoothly at 1350 RPM. Excellent rigid tape density with smooth woven borders.', tags: '#needleloom #narrowvelvets #jptools', tagColor: 'text-orange-400' },
                      { img: GALLERY_ITEMS[2].image, caption: 'Premium dynamic aluminum and steel flange beams loaded for dispatch. Fully dynamically balanced at peak rotational speeds.', tags: '#textileaccessories #surattextileindustry', tagColor: 'text-zinc-500' },
                    ].map((post, idx) => (
                      <div key={idx} className="bg-slate-900 border border-slate-850/60 rounded-2xl overflow-hidden p-4 space-y-4">
                        <div className="aspect-[1.1] rounded-xl bg-slate-950 overflow-hidden relative group">
                          <img src={post.img} alt="feed" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-103 transition-transform" />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <Instagram className="w-8 h-8 text-white drop-shadow" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <p className="text-[11px] text-slate-400 line-clamp-3">"{post.caption}"</p>
                          <span className={`text-[10px] font-mono ${post.tagColor}`}>{post.tags}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center mt-8">
                    <a href={JP_METADATA.instagramUrl} target="_blank" rel="noopener noreferrer" className="bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-300 font-semibold text-xs px-5 py-3 rounded-xl flex items-center gap-2">
                      <Instagram className="w-4 h-4 text-orange-400" />
                      View Full Feed on Instagram @{JP_METADATA.instagram}
                    </a>
                  </div>
                </section>
              </div>
            )}

            {/* ======================== PAGE 2: ABOUT ======================== */}
            {currentPage === 'about' && (
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="space-y-12">
                  <div className="text-center max-w-3xl mx-auto space-y-4">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase bg-sky-950/20 border border-sky-900/60 px-3.5 py-1.5 rounded-full">ORGANIZATIONAL BACKGROUND</span>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">JP Tools & Machine</h1>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">Leading manufacturer of industrial-grade textile machinery, high speed weaving looms, dynamic spools, and verified high precision spare parts based out of GIDC Surat.</p>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-7 space-y-6">
                      <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl space-y-4">
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                          <Building className="w-5 h-5 text-sky-400 animate-pulse" />
                          Corporate Evolution & Specialties
                        </h3>
                        <p className="text-xs text-slate-300 leading-relaxed">JP Tools & Machine is a trusted name in Textile Machinery Manufacturing and Solutions. We specialize in Plastic Loom Machines, Needle Loom Machines, Winder Machines, Tano / Warping Machines, Beam Machines and Textile Machinery Spare Parts.</p>
                        <p className="text-xs text-slate-300 leading-relaxed">We provide high-quality industrial machinery designed for better production, long life performance and low maintenance. Our machines are widely used in textile industries for efficient and smooth manufacturing processes.</p>
                      </div>

                      <div className="space-y-4">
                        <h3 className="text-sm font-bold text-orange-400 uppercase tracking-widest">Why Major Looms Choose JP Tools</h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {[
                            { title: 'Quality Products', desc: 'Heavy-gauge chromium alloy castings designed to counteract system fatigue.' },
                            { title: 'Industrial Standard', desc: 'Rigid adherence to ISO parameters ensures standard component replacement.' },
                            { title: 'Durable Performance', desc: 'Rocker arm and pattern chain assemblies built to run for decades.' },
                            { title: 'Affordable Pricing', desc: 'Competitive capital cost providing robust return on investment.' },
                            { title: 'Customer Support', desc: 'Dedicated service engineers based out of GIDC ready for deployment.' },
                            { title: 'Timely Delivery', desc: 'Streamlined logistics keeping site installations synchronized.' },
                          ].map((pillar, idx) => (
                            <div key={idx} className="bg-slate-900 border border-slate-850 p-4 rounded-xl flex items-start gap-3">
                              <span className="w-5 h-5 rounded-full bg-orange-500/10 text-orange-400 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">✓</span>
                              <div>
                                <h4 className="text-xs font-bold text-slate-100">{pillar.title}</h4>
                                <p className="text-[10px] text-slate-400 mt-1 leading-normal">{pillar.desc}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="lg:col-span-5 space-y-6">
                      <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-5">
                        <h4 className="text-xs font-bold uppercase tracking-widest text-sky-400 pb-2 border-b border-slate-850">Primary Product Portfolios</h4>
                        <ul className="space-y-3 text-xs text-slate-350">
                          {['Plastic Loom Machines', 'Needle Loom Machines', 'Bobbin & Cone Winder Machines', 'Tano / Warping Machines', 'Forged Aluminum Beam Machines', 'Wrapping / Lapetayu Machines', 'Textile Machinery Spare Parts'].map((item, idx) => (
                            <li key={idx} className="flex items-center gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0" />
                              <span className="font-semibold leading-normal">{item}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="bg-slate-950 rounded-xl p-4 border border-slate-850">
                          <p className="text-[10px] uppercase font-mono tracking-widest text-slate-500 font-bold">Operational Philosophy:</p>
                          <blockquote className="text-[11px] text-slate-400 italic mt-2 leading-relaxed">"With modern technology, skilled workmanship, and reliable service support, we are committed to delivering durable and cost-effective machinery solutions across India."</blockquote>
                        </div>
                      </div>

                      <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 flex items-start gap-4">
                        <div className="p-2 rounded bg-sky-500/10 text-sky-400 shrink-0">
                          <Clock className="w-5 h-5" />
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-200">18 Years of Engineering Depth</h4>
                          <p className="text-[10px] text-slate-400 leading-normal mt-1">Specialized experience supporting loom operations under hot Indian dyehouse conditions, guaranteeing consistent tension bounds.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================== PAGES 3–8: MACHINE DETAIL PAGES ======================== */}
            {['plastic-loom', 'needle-loom', 'winder', 'tano', 'beam', 'wrapping'].includes(currentPage) && (
              <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
                {(() => {
                  const prod = MACHINE_PRODUCTS.find((p) => p.id === currentPage)!;
                  return (
                    <div className="space-y-2">
                      {/* Breadcrumb */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-6">
                        <button onClick={() => setCurrentPage('home')} className="hover:text-white transition-colors">Home</button>
                        <span>/</span>
                        <span className="text-slate-350">{prod.name}</span>
                      </div>

                      <MachineHeroSection prod={prod} onGetQuote={() => handleApplyEstimate(prod.id)} />
                    </div>
                  );
                })()}
              </div>
            )}

            {/* ======================== PAGE 9: SPARE PARTS ======================== */}
            {currentPage === 'spare-parts' && (
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="space-y-10">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-[10px] font-black uppercase text-orange-400 tracking-widest bg-orange-950/20 border border-orange-900 px-3 py-1 rounded">SPARE PARTS CENTER</span>
                    <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">Textile Machinery Spare Parts</h1>
                    <p className="text-xs text-slate-400 leading-normal">High durability parts matching strict metallurgic values. Filter below by machinery compatibility.</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-850 rounded-2xl p-4 flex flex-wrap gap-2 items-center justify-center">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mr-2 flex items-center gap-1">
                      <ListFilter className="w-3.5 h-3.5" /> Filter:
                    </span>
                    {spareCategories.map((cat) => (
                      <button key={cat} onClick={() => setPartsFilter(cat)} className={`text-xs py-1.5 px-3.5 rounded-lg border font-medium transition-colors ${partsFilter === cat ? 'bg-sky-500/10 border-sky-400 text-sky-400' : 'bg-slate-950/50 border-slate-850 text-slate-400 hover:text-white'}`}>{cat}</button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(partsFilter === 'All' ? SPARE_PARTS : SPARE_PARTS.filter(p => p.category === partsFilter)).map((part) => (
                      <div key={part.id} className="bg-slate-900 border border-slate-850/60 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between space-y-4 transition-all">
                        <div>
                          <div className="flex items-start justify-between">
                            <span className="text-[10px] font-mono uppercase bg-slate-950 text-slate-450 border border-slate-850 px-2.5 py-1 rounded">Part No: {part.partNumber}</span>
                            <div className="w-4 h-4 rounded-full" style={{ backgroundColor: part.imagePlaceholderColor }} />
                          </div>
                          <h3 className="text-base font-bold text-slate-100 mt-3">{part.name}</h3>
                          <span className="text-[10px] font-semibold text-sky-400 tracking-wide block mt-1 uppercase">{part.category}</span>
                          <p className="text-xs text-slate-400 leading-relaxed mt-2.5">{part.description}</p>
                        </div>
                        <div className="border-t border-slate-850 pt-3.5 space-y-3">
                          <div className="flex justify-between text-[11px] font-mono text-slate-500">
                            <span>Material:</span><span className="font-semibold text-slate-350">{part.material}</span>
                          </div>
                          <button onClick={() => handleApplyEstimate(part.id)} className="w-full bg-slate-950 border border-slate-850 text-xs py-2 rounded-lg font-bold text-slate-300 hover:text-white hover:bg-slate-850 transition-colors flex items-center justify-center gap-1.5">
                            Add to Inquiry <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ======================== PAGE 10: GALLERY ======================== */}
            {currentPage === 'gallery' && (
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="space-y-10">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase bg-sky-950/20 border border-sky-900/60 px-3.5 py-1.5 rounded-full">SURAT ASSEMBLY PLANT PORTFOLIO</span>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Active Machine Gallery</h1>
                    <p className="text-xs text-slate-400">Genuine snapshots from our GIDC assembly line, beam testbeds, and client dispatch lots.</p>
                  </div>

                  <div className="bg-slate-900 border border-slate-850 rounded-2xl p-3 flex flex-wrap gap-2 justify-center">
                    {[{ label: 'All Photos', filter: 'all' }, { label: 'Raw Machines', filter: 'machine' }, { label: 'Spare Parts', filter: 'spare-part' }, { label: 'Factory', filter: 'factory' }, { label: 'Dispatch', filter: 'dispatch' }].map((btn) => (
                      <button key={btn.filter} onClick={() => setGalleryFilter(btn.filter)} className={`text-xs px-3.5 py-1.5 rounded-lg border font-medium transition-colors ${galleryFilter === btn.filter ? 'bg-orange-500/10 border-orange-400 text-orange-400' : 'bg-slate-950/50 border-slate-850 text-slate-450 hover:text-white'}`}>{btn.label}</button>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(galleryFilter === 'all' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.category === galleryFilter)).map((item) => (
                      <div key={item.id} className="bg-slate-900 border border-slate-850/60 rounded-2xl overflow-hidden group hover:border-slate-700 transition-colors">
                        <div className="aspect-[16/11] bg-slate-950 overflow-hidden relative">
                          <img src={item.image} alt={item.title} referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-60" />
                        </div>
                        <div className="p-5">
                          <span className="font-mono text-[9px] uppercase tracking-wider text-slate-500 font-bold">{item.category.toUpperCase()}</span>
                          <h4 className="text-sm font-bold text-slate-100 mt-2">{item.title}</h4>
                          <p className="text-[11px] text-slate-400 mt-1">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  
                </div>
              </div>
            )}

            {/* ======================== PAGE 11: VIDEOS ======================== */}
            {currentPage === 'videos' && (
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="space-y-10">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-orange-400 uppercase bg-orange-950/20 border border-orange-900 px-3.5 py-1.5 rounded-full">LIVESTREAM DEMOS</span>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Machine Operational Videos</h1>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-8">
                      <div className="aspect-video bg-slate-950 rounded-2xl border border-slate-800 flex flex-col items-center justify-center p-6 text-center select-none relative overflow-hidden">
                        <FloatingParticles count={8} color="orange" />
                        {activeVideo ? (
                          <div className="w-full h-full flex flex-col justify-between p-4">
                            <div className="flex justify-between items-center border-b border-slate-900/60 pb-2">
                              <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-900 px-2 py-0.5 rounded">● PLAYING</span>
                              <span className="text-xs text-slate-400 font-mono">60 FPS DEMO</span>
                            </div>
                            <div className="my-auto space-y-4">
                              <div className="w-16 h-16 rounded-full bg-orange-500/10 border border-orange-500 text-orange-400 flex items-center justify-center mx-auto animate-pulse">
                                <Play className="w-7 h-7 ml-1 fill-orange-500" />
                              </div>
                              <h3 className="text-base font-bold text-white max-w-sm mx-auto">{DEMO_VIDEOS.find(v => v.youtubeIdOrPlaceholder === activeVideo)?.title}</h3>
                            </div>
                            <div className="border-t border-slate-900 pt-3 flex justify-between text-slate-500 text-[10px]">
                              <span>{DEMO_VIDEOS.find(v => v.youtubeIdOrPlaceholder === activeVideo)?.duration}</span>
                              <span className="cursor-pointer hover:underline" onClick={() => setActiveVideo(null)}>Close</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="w-20 h-20 rounded-full bg-slate-900 border border-slate-850 flex items-center justify-center text-slate-400 mx-auto cursor-pointer hover:border-sky-500 hover:text-sky-400 transition-colors" onClick={() => setActiveVideo(DEMO_VIDEOS[0].youtubeIdOrPlaceholder)}>
                              <Play className="w-8 h-8 ml-1" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-200">Select a Video Below</h3>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="lg:col-span-4 space-y-3">
                      {DEMO_VIDEOS.map((vid) => (
                        <button key={vid.id} onClick={() => setActiveVideo(vid.youtubeIdOrPlaceholder)} className={`w-full text-left p-4 rounded-xl border transition-all ${activeVideo === vid.youtubeIdOrPlaceholder ? 'bg-sky-950/40 border-sky-500' : 'bg-slate-900 border-slate-850 hover:bg-slate-850'}`}>
                          <div className="flex justify-between items-start">
                            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-slate-500">{vid.category}</span>
                            <span className="font-mono text-[9px] text-sky-400">{vid.duration}</span>
                          </div>
                          <h4 className="text-xs font-bold text-slate-200 mt-2 leading-tight">{vid.title}</h4>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================== PAGE 12: SERVICES ======================== */}
            {currentPage === 'services' && (
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase bg-sky-950/20 border border-sky-900/60 px-3.5 py-1.5 rounded-full">RELIABLE SUPPORT</span>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Machinery Repair & Services</h1>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                      {SERVICE_DETAILS.map((srv) => (
                        <div key={srv.id} className="bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 rounded bg-orange-500/10 border border-orange-500/20 text-orange-400">
                              {srv.iconName === 'Cpu' ? <Cpu className="w-5 h-5" /> : srv.iconName === 'Wrench' ? <Wrench className="w-5 h-5" /> : <Grid className="w-5 h-5" />}
                            </div>
                            <h3 className="text-base font-bold text-white">{srv.title}</h3>
                          </div>
                          <p className="text-xs text-slate-400 leading-relaxed">{srv.description}</p>
                          <div className="space-y-2">
                            {srv.features.map((feat, fIdx) => (
                              <div key={fIdx} className="flex gap-2 text-xs text-slate-300 pl-1">
                                <span className="text-sky-400 font-bold shrink-0">•</span>
                                <span>{feat}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-slate-900/40 border border-slate-850 p-6 rounded-2xl space-y-5">
                      <h3 className="text-sm font-bold uppercase tracking-widest text-sky-400 pb-2 border-b border-slate-850">Direct Hotline</h3>
                      <a href={`tel:${JP_METADATA.phone.replace(/\s+/g, '')}`} className="text-white hover:text-orange-400 text-xl font-bold font-mono flex items-center gap-2">
                        <Phone className="w-5 h-5 text-orange-500" /> {JP_METADATA.phone}
                      </a>
                      {['Within 24h engineer responses (Surat district)', '100% Genuine steel components from GIDC', 'Dynamic Balance Reports for Beam units'].map((g, idx) => (
                        <div key={idx} className="flex items-center gap-2.5 text-xs text-slate-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />{g}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================== PAGE 13: CLIENTS ======================== */}
            {currentPage === 'clients' && (
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase bg-sky-950/20 border border-sky-900/60 px-3.5 py-1.5 rounded-full">CLIENT REVIEWS</span>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Active Clients & Reviews</h1>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {CLIENT_REVIEWS.map((review) => (
                      <div key={review.id} className="bg-slate-900 border border-slate-850 p-6 rounded-2xl space-y-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="text-sm font-bold text-white">{review.name}</h3>
                            <p className="text-[10.5px] text-slate-400 font-medium mt-0.5">{review.company}</p>
                            <span className="text-[9.5px] font-mono text-sky-400 font-semibold uppercase">{review.location}</span>
                          </div>
                          <div className="flex gap-1">
                            {[...Array(5)].map((_, starIdx) => (
                              <Star key={starIdx} className={`w-3.5 h-3.5 ${starIdx < Math.floor(review.rating) ? 'text-amber-500 fill-amber-500' : 'text-slate-700'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-xs text-slate-300 leading-relaxed italic">" {review.feedback} "</p>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[{ city: 'Surat & Gujarat', count: '180+ Looms' }, { city: 'Ludhiana Narrow', count: '90+ Needle Cams' }, { city: 'Coimbatore', count: '45+ Beam Flanges' }, { city: 'Ahmedabad', count: '60+ Winders' }].map((item, idx) => (
                      <div key={idx} className="bg-slate-950/60 border border-slate-850 p-4 rounded-xl text-center">
                        <h4 className="text-[11px] font-bold text-slate-200">{item.city}</h4>
                        <p className="text-[10px] text-orange-400 font-medium font-mono mt-1">{item.count}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ======================== PAGE 14: CONTACT ======================== */}
            {currentPage === 'contact' && (
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="space-y-12">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase bg-sky-950/20 border border-sky-900/60 px-3.5 py-1.5 rounded-full">GET IN TOUCH</span>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Contact Us</h1>
                  </div>

                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                    <div className="lg:col-span-5 space-y-6">
                      <div className="bg-slate-900 border border-slate-850 rounded-2xl p-6 space-y-6">
                        <h3 className="text-sm font-bold uppercase tracking-widest text-sky-400 pb-2 border-b border-slate-850">Factory Head Office</h3>
                        <ul className="space-y-4 text-xs text-slate-300">
                          <li className="flex items-start gap-3"><MapPin className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" /><span className="font-semibold">{JP_METADATA.address}</span></li>
                          <li className="flex items-center gap-3"><Phone className="w-5 h-5 text-orange-400" /><a href={`tel:${JP_METADATA.phone.replace(/\s+/g, '')}`} className="hover:text-white font-bold font-mono">{JP_METADATA.phone}</a></li>
                          <li className="flex items-center gap-3"><Mail className="w-5 h-5 text-slate-500" /><a href={`mailto:${JP_METADATA.email}`} className="hover:text-white font-mono">{JP_METADATA.email}</a></li>
                          <li className="flex items-center gap-3"><Instagram className="w-5 h-5 text-orange-400" /><a href={JP_METADATA.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-white">@{JP_METADATA.instagram}</a></li>
                        </ul>
                      </div>
                      
                    </div>

                    <div className="lg:col-span-7 bg-slate-900 border border-slate-850 rounded-2xl p-6 sm:p-8">
                      <h3 className="text-base font-bold text-white mb-4">Send Message to Factory Desk</h3>
                      {contactSubmitted ? (
                        <div className="flex flex-col items-center py-10 text-center space-y-4">
                          <div className="w-10 h-10 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center text-lg">✓</div>
                          <h4 className="text-sm font-bold text-white">Query Lodged!</h4>
                          <p className="text-[11px] text-slate-400">Thank you, {contactName}! We'll revert within 4 hours.</p>
                        </div>
                      ) : (
                        <form onSubmit={handleContactSubmit} className="space-y-4">
                          <div><label className="block text-[11px] text-slate-400 mb-1">Your Full Name *</label><input type="text" required value={contactName} onChange={(e) => setContactName(e.target.value)} placeholder="Enter full name" className="w-full text-xs bg-slate-950 border border-slate-850 rounded-lg p-2.5 outline-none focus:border-sky-500 text-slate-200" /></div>
                          <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-[11px] text-slate-400 mb-1">Email</label><input type="email" placeholder="name@company.com" className="w-full text-xs bg-slate-950 border border-slate-850 rounded-lg p-2.5 outline-none focus:border-sky-500 text-slate-200" /></div>
                            <div><label className="block text-[11px] text-slate-400 mb-1">Phone *</label><input type="tel" required placeholder="98251 XXXXX" className="w-full text-xs bg-slate-950 border border-slate-850 rounded-lg p-2.5 outline-none focus:border-sky-500 text-slate-200" /></div>
                          </div>
                          <div><label className="block text-[11px] text-slate-400 mb-1">Message *</label><textarea required rows={4} value={contactMessage} onChange={(e) => setContactMessage(e.target.value)} placeholder="Type details..." className="w-full text-xs bg-slate-950 border border-slate-850 rounded-lg p-2.5 outline-none focus:border-sky-500 text-slate-200 resize-none" /></div>
                          <button type="submit" className="bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs uppercase tracking-wider px-5 py-3 rounded-xl transition-all cursor-pointer">Submit Query</button>
                        </form>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ======================== PAGE 15: QUOTE ======================== */}
            {currentPage === 'quote' && (
              <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
                <div className="space-y-10">
                  <div className="text-center max-w-2xl mx-auto space-y-3">
                    <span className="text-[10px] font-mono font-bold tracking-widest text-sky-400 uppercase bg-sky-950/20 border border-sky-900/60 px-3.5 py-1.5 rounded-full">DYNAMIC RFQ PLOTTER</span>
                    <h1 className="text-3xl sm:text-5xl font-bold text-white tracking-tight">Inquiry & Get Quote</h1>
                    <p className="text-xs text-slate-400">Configure specs, motor ratings, and spare components to draft certified invoices instantly.</p>
                  </div>
                  <InquiryForm />
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      <Footer setCurrentPage={setCurrentPage} />
    </div>
  );
}