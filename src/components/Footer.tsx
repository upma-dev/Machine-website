import { Phone, Mail, MapPin, Instagram, ChevronRight, CornerDownRight, Award, ShieldAlert, Heart } from 'lucide-react';
import { AppPage } from '../types';
import Logo from './Logo';
import { JP_METADATA } from '../data/machineryData';

interface FooterProps {
  setCurrentPage: (page: AppPage) => void;
}

export default function Footer({ setCurrentPage }: FooterProps) {
  const handlePageClick = (page: AppPage) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 font-sans" id="footer-branding-section">
      
      {/* Upper Footer Segment / Call to Action */}
      <div className="border-b border-slate-900 bg-slate-900/10">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-white font-bold text-base tracking-tight">Need a customized engineering solution?</h4>
            <p className="text-xs text-slate-500 mt-1 max-w-lg leading-relaxed">
              We design and construct high speed looms, winders, and heavy warping assemblies scaled to your factory floor requirements.
            </p>
          </div>
          <button
            onClick={() => handlePageClick('quote')}
            className="shrink-0 bg-gradient-to-r from-sky-600 to-orange-600 hover:to-orange-500 border border-sky-400/20 text-white font-bold text-xs uppercase tracking-wider py-3 px-6 rounded-xl transition-all shadow-[0_4px_15px_rgba(14,165,233,0.15)] active:scale-98"
          >
            Initiate Dynamic RFQ
          </button>
        </div>
      </div>

      {/* Main Grid Segment */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:py-16 grid grid-cols-1 md:grid-cols-12 gap-8">
        
        {/* Branding Area */}
        <div className="md:col-span-4 space-y-5">
          <Logo size="md" />
          <p className="text-xs text-slate-500 leading-relaxed mt-2">
            JP Tools & Machine is a trusted name in textile machinery solutions. We engineer durable automatic needle looms, winder spools, warping heads, and beam flanges under stringent ISO guidelines.
          </p>
          
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[10px] uppercase font-mono tracking-wider font-semibold text-emerald-400">
              ISO 9001:2015 CERTIFIED PLANT
            </span>
          </div>

          <div className="pt-2">
            <a
              href={JP_METADATA.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500/10 to-pink-500/10 hover:from-orange-500/20 hover:to-pink-500/20 border border-orange-500/30 hover:border-orange-500/50 text-slate-300 font-semibold text-xs py-2 px-3 rounded-lg transition-colors"
            >
              <Instagram className="w-4 h-4 text-orange-400" />
              Follow @{JP_METADATA.instagram}
            </a>
          </div>
        </div>

        {/* Machinery Categories Columns */}
        <div className="md:col-span-3 space-y-4">
          <h5 className="text-white font-bold text-xs uppercase tracking-wider border-l-2 border-sky-500 pl-2.5">
            Machinery Portfolios
          </h5>
          <ul className="space-y-2.5 text-xs">
            {[
              { label: 'Plastic Loom Machines', page: 'plastic-loom' as AppPage },
              { label: 'Needle Loom Machines', page: 'needle-loom' as AppPage },
              { label: 'Winder Machines', page: 'winder' as AppPage },
              { label: 'Tano Machines (Warping)', page: 'tano' as AppPage },
              { label: 'Beam Machines', page: 'beam' as AppPage },
              { label: 'Wrapping / Lapetayu', page: 'wrapping' as AppPage },
            ].map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handlePageClick(link.page)}
                  className="hover:text-sky-400 transition-colors flex items-center gap-1.5 text-left group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-sky-500 transition-colors" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Core Resources Columns */}
        <div className="md:col-span-2 space-y-4">
          <h5 className="text-white font-bold text-xs uppercase tracking-wider border-l-2 border-orange-500 pl-2.5">
            Resources & Info
          </h5>
          <ul className="space-y-2.5 text-xs">
            {[
              { label: 'Products Spare Parts', page: 'spare-parts' as AppPage },
              { label: 'Interactive Gallery', page: 'gallery' as AppPage },
              { label: 'Operational Videos', page: 'videos' as AppPage },
              { label: 'Certified Services', page: 'services' as AppPage },
              { label: 'Our Active Clients', page: 'clients' as AppPage },
              { label: 'Get Live Quote', page: 'quote' as AppPage },
            ].map((link, idx) => (
              <li key={idx}>
                <button
                  onClick={() => handlePageClick(link.page)}
                  className="hover:text-orange-400 transition-colors flex items-center gap-1.5 text-left group"
                >
                  <ChevronRight className="w-3 h-3 text-slate-700 group-hover:text-orange-500 transition-colors" />
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Direct Factory Contacts */}
        <div className="md:col-span-3 space-y-4">
          <h5 className="text-white font-bold text-xs uppercase tracking-wider border-l-2 border-slate-500 pl-2.5">
            Factory Address
          </h5>
          <ul className="space-y-3.5 text-xs">
            <li className="flex items-start gap-2.5">
              <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <span className="leading-normal text-slate-400 font-medium">
                {JP_METADATA.address}
              </span>
            </li>
            <li className="flex items-center gap-2.5">
              <Phone className="w-4 h-4 text-orange-400 shrink-0" />
              <a
                href={`tel:${JP_METADATA.phone.replace(/\s+/g, '')}`}
                className="hover:text-white transition-colors font-mono font-medium"
              >
                {JP_METADATA.phone}
              </a>
            </li>
            <li className="flex items-center gap-2.5">
              <Mail className="w-4 h-4 text-slate-500 shrink-0" />
              <a
                href={`mailto:${JP_METADATA.email}`}
                className="hover:text-white transition-colors font-mono"
              >
                {JP_METADATA.email}
              </a>
            </li>
          </ul>
        </div>

      </div>

      {/* Sub Footer Legal / Copyright section */}
      <div className="border-t border-slate-900 py-6 bg-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-[10px] text-slate-650 font-mono">
          <p>© {new Date().getFullYear()} JP Tools & Machine GIDC. All rights reserved across India.</p>
          <div className="flex gap-4">
            <span className="hover:text-slate-400 cursor-pointer">Security Code Audit</span>
            <span>•</span>
            <span className="hover:text-slate-400 cursor-pointer">Quality Assured Hardware</span>
            <span>•</span>
            <span className="flex items-center gap-1">
              Made with <Heart className="w-2.5 h-2.5 text-red-500 fill-red-500" /> for Textile Industries
            </span>
          </div>
        </div>
      </div>

    </footer>
  );
}
