import { motion } from 'motion/react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function Logo({ size = 'md', showText = true }: LogoProps) {
  const isSm = size === 'sm';
  const isLg = size === 'lg';

  const pixelSize = isSm ? 44 : isLg ? 110 : 64;

  return (
    <div className="flex items-center gap-3 select-none">
      {/* Dynamic Animated Gear with JP Lettering */}
      <div 
        className="relative flex items-center justify-center shrink-0"
        style={{ width: pixelSize, height: pixelSize }}
      >
        <motion.svg
          id="jp-gear-logo-svg"
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-[0_0_12px_rgba(14,165,233,0.35)]"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
          whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
        >
          {/* Outer Rotating Gear Body */}
          <circle cx="50" cy="50" r="34" fill="none" stroke="#0e5a9e" strokeWidth="6" />
          <circle cx="50" cy="50" r="41" fill="none" stroke="#2563eb" strokeWidth="1" strokeDasharray="3,3" />
          
          {/* Gear Teeth */}
          {[...Array(12)].map((_, i) => {
            const angle = (i * 360) / 12;
            return (
              <path
                key={i}
                d="M 45,6 L 55,6 L 53,15 L 47,15 Z"
                transform={`rotate(${angle} 50 50)`}
                fill="url(#iron-gradient)"
                stroke="#1d4ed8"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            );
          })}

          {/* Gradients */}
          <defs>
            <linearGradient id="iron-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="50%" stopColor="#2563eb" />
              <stop offset="100%" stopColor="#1e3a8a" />
            </linearGradient>
            <linearGradient id="orange-fire-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffedd5" />
              <stop offset="40%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <linearGradient id="blue-metal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="50%" stopColor="#0e5a9e" />
              <stop offset="100%" stopColor="#0369a1" />
            </linearGradient>
          </defs>
        </motion.svg>

        {/* Static Inner JP Letters (does not rotate to remain perfectly readable) */}
        <div className="absolute inset-0 flex items-center justify-center font-bold font-sans tracking-tighter" style={{ fontSize: isSm ? '14px' : isLg ? '38px' : '20px' }}>
          <span className="text-sky-400 font-extrabold translate-x-[-1px] translate-y-[-2px] select-none hover:text-sky-300 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">J</span>
          <span className="text-orange-500 font-extrabold translate-x-[1px] translate-y-[2px] select-none hover:text-orange-400 transition-colors drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">P</span>
        </div>
      </div>

      {/* Brand Text */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-center gap-1">
            <span className="font-sans font-black tracking-wider text-sky-400 uppercase text-lg sm:text-xl">JP</span>
            <span className="font-sans font-black tracking-wider text-orange-500 uppercase text-lg sm:text-xl">TOOLS</span>
          </div>
          <span className="font-sans font-semibold tracking-[0.2em] text-[8px] sm:text-[9px] uppercase text-slate-400 mt-1 pb-1 border-b border-slate-800">
            AND MACHINE
          </span>
          <span className="font-mono text-[5.5px] sm:text-[6.5px] text-zinc-500 tracking-widest mt-0.5">
            QUALITY • RELIABILITY • PERFORMANCE
          </span>
        </div>
      )}
    </div>
  );
}
