import { useState } from 'react';
import { motion } from 'motion/react';
import { Camera, Folder, ArrowRight, Check, Database, Image, Play, RefreshCw } from 'lucide-react';

export default function ImageGuide() {
  const [copiedPath, setCopiedPath] = useState<string | null>(null);

  const handleCopyPath = (pathStr: string) => {
    navigator.clipboard.writeText(pathStr);
    setCopiedPath(pathStr);
    setTimeout(() => setCopiedPath(null), 2000);
  };

  const steps = [
    {
      title: 'Choose Your Real Machine Photo',
      desc: 'Take high-resolution landscapes (horizontal, 16:9 ratio) or close-ups of your actual looms or spare parts.',
    },
    {
      title: 'Place in Assets Folder',
      desc: 'Copy your raw JPG/PNG photo into the project directory at the path displayed below.',
    },
    {
      title: 'Overwrites Automatically',
      desc: 'The website instantly renders your real industrial metal instead of our AI generative placeholder!',
    }
  ];

  const filesToReplace = [
    {
      label: 'Plastic Loom Main Photo',
      path: '/src/assets/images/machine4.png.jpeg',
      page: 'Plastic Loom Page',
    },
    {
      label: 'Needle Loom Main Photo',
      path: '/src/assets/images/machine.6png.jpeg',
      page: 'Needle Loom Page',
    },
    {
      label: 'Spare Parts & Backdrops',
      path: '/src/assets/images/machine7.png.jpeg',
      page: 'Winder, Tano & Parts Pages',
    },
  ];

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 relative overflow-hidden select-none">
      {/* Visual glowing frame */}
      <div className="absolute top-0 right-0 w-48 h-48 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between pb-6 border-b border-slate-800/60 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-sky-500/10 border border-sky-500/20 text-sky-400 rounded-2xl">
            <Camera className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <span className="text-[10px] font-bold text-orange-400 tracking-widest uppercase">Client Customizer Tool</span>
            <h3 className="text-xl font-bold text-white mt-1">Real-Time Custom Image Feead Guidelines</h3>
            <p className="text-xs text-slate-400 mt-0.5">Follow this direct instruction set to load your own real machines on our live layout.</p>
          </div>
        </div>

        <div className="bg-slate-950/60 border border-slate-850 px-4 py-2 rounded-xl flex items-center gap-2">
          <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping" />
          <span className="font-mono text-xs font-semibold text-slate-350">AUTO-DETECTOR ENGINE DETECTING PATHS</span>
        </div>
      </div>

      {/* Visual Path Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {filesToReplace.map((item, idx) => (
          <div 
            key={idx}
            className="bg-slate-950/60 border border-slate-850 rounded-2xl p-5 hover:border-slate-800 transition-colors flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200">{item.label}</span>
                <span className="text-[9px] font-mono font-semibold text-slate-500 uppercase bg-slate-900 border border-slate-800 px-2 py-0.5 rounded">
                  {item.page}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-2">
                Replace this exact file with your own picture (recommended name should match fully or keep the extension)
              </p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-900 flex flex-col gap-2">
              <span className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">Target Codebase Path:</span>
              <div className="bg-zinc-900 border border-zinc-850 rounded-lg p-2.5 select-all font-mono text-[9.5px] text-zinc-350 flex items-center justify-between overflow-x-auto whitespace-nowrap scrollbar-none">
                <span className="truncate">{item.path}</span>
                <button
                  onClick={() => handleCopyPath(item.path)}
                  className="p-1 text-slate-500 hover:text-sky-400 border border-zinc-800 rounded bg-zinc-950 transition-colors cursor-pointer ml-2 shrink-0"
                  title="Copy Path String"
                >
                  {copiedPath === item.path ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Folder className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Structured workflow steps */}
      <div className="bg-slate-950/40 border border-slate-850/50 rounded-2xl p-5">
        <h4 className="text-xs font-bold text-slate-300 uppercase tracking-widest mb-4 flex items-center gap-2">
          <Database className="w-4 h-4 text-orange-400" />
          Three-Step Asset Upload Sequence
        </h4>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div key={idx} className="relative pl-9">
              <div className="absolute left-0 top-0 w-6 h-6 rounded-lg bg-sky-500/10 border border-sky-500/30 text-sky-400 font-mono text-xs font-bold flex items-center justify-center">
                {idx + 1}
              </div>
              <h5 className="text-xs font-bold text-slate-200">{step.title}</h5>
              <p className="text-[11px] text-slate-500 mt-1 leading-normal">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
