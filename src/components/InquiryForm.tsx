import { useState, useMemo, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Check, Copy, Printer, RefreshCw, Send, Settings, Shield, Award, Sparkles } from 'lucide-react';
import { MACHINE_PRODUCTS, SPARE_PARTS, JP_METADATA } from '../data/machineryData';

export default function InquiryForm() {
  const [selectedProduct, setSelectedProduct] = useState(MACHINE_PRODUCTS[0].id);
  const [powerSelection, setPowerSelection] = useState('standard');
  const [speedSelection, setSpeedSelection] = useState('high');
  const [customWidth, setCustomWidth] = useState('650');
  const [includeServiceContract, setIncludeServiceContract] = useState(true);
  const [additionalNotes, setAdditionalNotes] = useState('');
  
  // Selected spare parts checkboxes
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  
  // Buyer Details State
  const [buyerName, setBuyerName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [targetTimeline, setTargetTimeline] = useState('30-days');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedQuote, setCopiedQuote] = useState(false);

  // Toggle parts
  const handlePartToggle = (partId: string) => {
    if (selectedParts.includes(partId)) {
      setSelectedParts(selectedParts.filter((p) => p !== partId));
    } else {
      setSelectedParts([...selectedParts, partId]);
    }
  };

  const getProductObj = useMemo(() => {
    return MACHINE_PRODUCTS.find((p) => p.id === selectedProduct) || MACHINE_PRODUCTS[0];
  }, [selectedProduct]);

  // Compute live engineering scores/metrics for the customized machine
  const computedMetrics = useMemo(() => {
    const basePicks = parseInt(getProductObj.productionSpeed) || 1000;
    const isWinderOrBeam = getProductObj.category === 'winder' || getProductObj.category === 'beam' || getProductObj.category === 'warping';
    
    // speed multiplier
    let speedMult = 1.0;
    if (speedSelection === 'ultra') speedMult = 1.25;
    if (speedSelection === 'economic') speedMult = 0.85;

    // width tension factor
    const widthNum = parseFloat(customWidth) || 600;
    const widthFactor = widthNum > 800 ? 1.15 : 0.95;

    // power
    let powerKw = parseFloat(getProductObj.powerRating) || 3.0;
    if (powerSelection === 'premium-ie4') powerKw = powerKw * 0.92; // 8% more energy efficient

    const rawOutputCapacity = Math.round(basePicks * speedMult);
    const calculatedTensionIndex = Math.min(100, Math.round(85 * widthFactor));
    const estimatedDailyYield = isWinderOrBeam 
      ? `${Math.round(rawOutputCapacity * 60 * 20 / 1000)} thousand meters / day`
      : `${Math.round(rawOutputCapacity * 60 * 20 / 1000)} thousand picks / day`;

    return {
      outputCapacity: isWinderOrBeam ? `${rawOutputCapacity} meters/min` : `${rawOutputCapacity} picks/min`,
      dailyYield: estimatedDailyYield,
      tensionIndex: `${calculatedTensionIndex}/100`,
      estimatedPower: `${powerKw.toFixed(1)} kW (Active Rating)`,
      structuralRating: speedSelection === 'ultra' ? 'Heavy Forged Reinforced' : 'Industrial Casting Standard',
      recommendedUpkeep: includeServiceContract ? 'Complimentary On-Site Year-1 included' : 'Self-upkeep / Standard parts warrantee only',
    };
  }, [getProductObj, speedSelection, customWidth, powerSelection, includeServiceContract]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!buyerName || !companyName || !phone) {
      alert('Please fill out Name, Company, and Mobile Phone so we can generate your quotation!');
      return;
    }
    setIsSubmitted(true);
  };

  const resetQuote = () => {
    setIsSubmitted(false);
    setSelectedParts([]);
    setAdditionalNotes('');
    setBuyerName('');
    setCompanyName('');
    setPhone('');
    setEmail('');
  };

  // Generate a premium raw text quote for clipboard copying
  const rfqText = useMemo(() => {
    const partsString = selectedParts.length > 0 
      ? selectedParts.map((spId) => `  * ${SPARE_PARTS.find(p => p.id === spId)?.name || spId}`).join('\n')
      : '  * No auxiliary spare parts selected';

    return `==========================================
JP TOOLS & MACHINE - INDUSTRIAL RFQ DIRECT
==========================================
EST QUOTATION REFERENCE: JPTM-2026-RFQ
DATE GENERATED: 2026-05-22 UTC

[BUYER PROFILE]
Company Name: ${companyName || 'N/A'}
Contact Person: ${buyerName || 'N/A'}
Phone Contact: ${phone || 'N/A'}
Email: ${email || 'N/A'}
Expected Delivery Timeline: ${targetTimeline}

[SELECTED MACHINERY SPECIFICATIONS]
Machine Model: ${getProductObj.name}
Target Configuration: ${customWidth} mm (Working Sizing width)
Motor Eff Rating: ${powerSelection === 'premium-ie4' ? 'IE4 Premium low-draw copper core' : 'Standard High Torque Industrial'}
Rotor Class Tuning: ${speedSelection === 'ultra' ? 'Ultra Speed (Reinforced Frame)' : 'Eco Performance Tuning'}
Include Onsite Service Contract: ${includeServiceContract ? 'YES (1 Year premium contract)' : 'NO (Standard Warrantee)'}

[ESTIMATED PERFORMANCE PROFILE]
Design Speed: ${computedMetrics.outputCapacity}
Daily Operating Yield: ${computedMetrics.dailyYield}
Dynamic Tension Score: ${computedMetrics.tensionIndex}
Motor Configuration: ${computedMetrics.estimatedPower}
Structural Integrity Level: ${computedMetrics.structuralRating}

[ADDITIONAL SPARE PARTS REQUESTED]
${partsString}

[BUYER MEMORANDUM & TECHNICAL NOTES]
${additionalNotes || 'None specfied.'}

==========================================
Email this RFQ to info@jptoolsandmachine.com OR
send via Whatsapp to ${JP_METADATA.phone}!
==========================================`;
  }, [buyerName, companyName, phone, email, targetTimeline, getProductObj, customWidth, powerSelection, speedSelection, includeServiceContract, computedMetrics, selectedParts, additionalNotes]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(rfqText);
    setCopiedQuote(true);
    setTimeout(() => setCopiedQuote(false), 2000);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-slate-100" id="inquiry-form-section">
      
      {/* Configuration & Input Section */}
      <div className="lg:col-span-7 bg-slate-900/90 border border-slate-800 rounded-2xl p-6 sm:p-8 backdrop-blur-md relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-sky-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center gap-3 mb-6">
          <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-400">
            <Settings className="w-5 h-5 animate-spin-slow" />
          </div>
          <div>
            <h2 className="text-xl font-bold tracking-tight text-white">Dynamic RFQ Console</h2>
            <p className="text-xs text-slate-400">Configure machine parameters to output automated engineering data lines.</p>
          </div>
        </div>

        {!isSubmitted ? (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Step 1: Base Machine Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                1. Select Machine Base Module
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {MACHINE_PRODUCTS.map((prod) => (
                  <button
                    type="button"
                    key={prod.id}
                    onClick={() => setSelectedProduct(prod.id)}
                    className={`flex items-start gap-3 p-3.5 rounded-xl border text-left transition-all relative ${
                      selectedProduct === prod.id
                        ? 'bg-sky-950/40 border-sky-500 text-white shadow-[0_0_15px_rgba(14,165,233,0.15)]'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                    }`}
                  >
                    {selectedProduct === prod.id && (
                      <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-sky-400" />
                    )}
                    <div className="text-sm font-semibold truncate leading-snug w-11/12">{prod.name.split(' (')[0]}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dynamic Custom Engineering Specs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  2. Working Sizing Width (mm)
                </label>
                <div className="relative">
                  <input
                    type="range"
                    min="200"
                    max="1400"
                    step="50"
                    value={customWidth}
                    onChange={(e) => setCustomWidth(e.target.value)}
                    className="w-full accent-sky-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1 font-mono">
                    <span>200mm</span>
                    <span className="text-sky-400 font-bold">{customWidth} mm</span>
                    <span>1400mm</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  3. Drive Induction Motor Class
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPowerSelection('standard')}
                    className={`text-xs py-2 px-3 rounded-lg border font-medium transition-all ${
                      powerSelection === 'standard'
                        ? 'bg-sky-500/10 border-sky-500 text-sky-300'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    IE3 Ind. Copper
                  </button>
                  <button
                    type="button"
                    onClick={() => setPowerSelection('premium-ie4')}
                    className={`text-xs py-2 px-3 rounded-lg border font-medium transition-all ${
                      powerSelection === 'premium-ie4'
                        ? 'bg-orange-500/10 border-orange-500 text-orange-400'
                        : 'bg-slate-950/50 border-slate-800 text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    IE4 Low-Draw Spec
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  4. Mechanical Rotor Tuning
                </label>
                <select
                  value={speedSelection}
                  onChange={(e) => setSpeedSelection(e.target.value)}
                  className="w-full text-xs bg-slate-950 border border-slate-850 rounded-lg p-2.5 outline-none focus:border-sky-500 text-slate-300 transition-colors"
                >
                  <option value="economic">Eco Performance (Steady Yarn Weight)</option>
                  <option value="high">Standard Fast Action (Highly Versatile)</option>
                  <option value="ultra">Ultra-Velocity Warp Tuning (Reinforced Cams)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  5. Annual Service Support Plan
                </label>
                <label className="flex items-center gap-2 cursor-pointer bg-slate-950/40 border border-slate-850 rounded-lg p-2 hover:bg-slate-950/70 transition-colors">
                  <input
                    type="checkbox"
                    checked={includeServiceContract}
                    onChange={(e) => setIncludeServiceContract(e.target.checked)}
                    className="w-4 h-4 rounded text-sky-500 bg-slate-900 border-slate-800 focus:ring-sky-500"
                  />
                  <span className="text-xs text-slate-300 select-none">
                    Include On-site Diagnostic coverage
                  </span>
                </label>
              </div>
            </div>

            {/* Step 3: Auxiliary Spare Parts Check list */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                6. Auxiliary Spare Parts to Include in Quote (Optional)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-40 overflow-y-auto pr-1 select-none border border-slate-800/60 rounded-xl p-3 bg-slate-950/30">
                {SPARE_PARTS.map((part) => (
                  <button
                    type="button"
                    key={part.id}
                    onClick={() => handlePartToggle(part.id)}
                    className={`flex items-center gap-2 text-xs py-1.5 px-2.5 rounded-lg border text-left transition-colors ${
                      selectedParts.includes(part.id)
                        ? 'bg-sky-500/10 border-sky-500 text-slate-200 font-medium'
                        : 'bg-transparent border-slate-850 text-slate-400 hover:text-slate-350 hover:bg-slate-900/30'
                    }`}
                  >
                    <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center shrink-0 ${
                      selectedParts.includes(part.id) ? 'bg-sky-500 border-sky-400' : 'border-slate-700 bg-slate-900'
                    }`}>
                      {selectedParts.includes(part.id) && <Check className="w-2.5 h-2.5 text-white" />}
                    </div>
                    <span className="truncate">{part.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Buyer contact section */}
            <div className="border-t border-slate-800/80 pt-5 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-sky-400">7. Industrial Purchaser Details</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="Enter full name"
                    className="w-full text-xs bg-slate-950 border border-slate-850 rounded-lg p-2.5 outline-none focus:border-sky-500 text-slate-200"
                  />
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Company / Factory Name *</label>
                  <input
                    type="text"
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="E.g., Maruti Fabrics Pvt Ltd"
                    className="w-full text-xs bg-slate-950 border border-slate-850 rounded-lg p-2.5 outline-none focus:border-sky-500 text-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="sm:col-span-2">
                  <label className="block text-[11px] text-slate-400 mb-1">Mobile Hotline Contact *</label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-500 text-xs font-bold">+91</span>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="98765 43210"
                      className="w-full text-xs bg-slate-950 border border-slate-850 rounded-lg p-2.5 pl-11 outline-none focus:border-sky-500 text-slate-200"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-slate-400 mb-1">Timeline *</label>
                  <select
                    value={targetTimeline}
                    onChange={(e) => setTargetTimeline(e.target.value)}
                    className="w-full text-xs bg-slate-950 border border-slate-850 rounded-lg p-2.5 outline-none focus:border-sky-500 text-slate-300"
                  >
                    <option value="immediate">Immediate (Ready Lot)</option>
                    <option value="30-days">Within 30 Days</option>
                    <option value="60-days">Within 60 Days</option>
                    <option value="custom-spec">Bespoke Lead Time</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-slate-400 mb-1">Special Structural Requests or Specific Yarn Material</label>
                <textarea
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="E.g., We need special heavy cams for weaving PP tape width 800mm with extra edge lock."
                  rows={2}
                  className="w-full text-xs bg-slate-950 border border-slate-850 rounded-lg p-2.5 outline-none focus:border-sky-500 text-slate-200 resize-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-sky-600 to-orange-600 hover:from-sky-500 hover:to-orange-500 text-white font-semibold py-3 px-4 rounded-xl text-xs transition-all tracking-wider uppercase flex items-center justify-center gap-2 shadow-[0_4px_20px_rgba(14,165,233,0.2)] active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              Build Live Technical Quote Spec
            </button>
          </form>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 space-y-5 text-center">
            <div className="w-14 h-14 rounded-full bg-gradient-to-tr from-sky-500 to-emerald-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-sky-500/20">
              <Check className="w-7 h-7 stroke-[3px]" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Quotation Generated with Success!</h3>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Your custom machinery configurations have been plotted. Please review your printable RFQ sheet on the right pane!
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={copyToClipboard}
                className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                {copiedQuote ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedQuote ? 'Copied Specs!' : 'Copy to Clipboard'}
              </button>
              <button
                onClick={resetQuote}
                className="bg-slate-950 border border-slate-850 hover:bg-slate-900 text-slate-400 px-4 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Configure New Machine
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Real-time calculated engineering spec sheet display */}
      <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
        
        {/* Engineering Metrics Card */}
        <div className="bg-gradient-to-b from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-6 relative overflow-hidden flex-1 flex flex-col justify-between">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-sky-500/30 to-transparent" />
          
          <div>
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-800/60">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-3 rounded-full bg-orange-500" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-300">Live Machine Analytics</h3>
              </div>
              <span className="font-mono text-[10px] text-sky-400 bg-sky-950/60 border border-sky-900/60 px-2 py-0.5 rounded">
                CALIBRATED
              </span>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-widest">Selected Base System</p>
                <p className="text-sm font-bold text-slate-200 mt-0.5">{getProductObj.name}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/40 border border-slate-850/60 rounded-xl p-3">
                  <p className="text-[9px] text-slate-500 uppercase">Target Velocity</p>
                  <p className="text-sky-400 font-mono text-xs font-extrabold mt-1">{computedMetrics.outputCapacity}</p>
                </div>
                <div className="bg-slate-900/40 border border-slate-850/60 rounded-xl p-3">
                  <p className="text-[9px] text-slate-500 uppercase">Est. Daily Output</p>
                  <p className="text-orange-400 font-mono text-xs font-extrabold mt-1">{computedMetrics.dailyYield}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-900/40 border border-slate-850/60 rounded-xl p-3">
                  <p className="text-[9px] text-slate-500 uppercase">Power Consumption</p>
                  <p className="text-slate-300 font-mono text-xs font-bold mt-1">{computedMetrics.estimatedPower}</p>
                </div>
                <div className="bg-slate-900/40 border border-slate-850/60 rounded-xl p-3">
                  <p className="text-[9px] text-slate-500 uppercase">Tension Stability Index</p>
                  <p className="text-emerald-400 font-mono text-xs font-bold mt-1">{computedMetrics.tensionIndex}</p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Frame Type:</span>
                  <span className="font-semibold text-slate-200 text-[11px]">{computedMetrics.structuralRating}</span>
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Support Plan:</span>
                  <span className="font-semibold text-orange-400 text-[11px] truncate max-w-[200px]" title={computedMetrics.recommendedUpkeep}>
                    {computedMetrics.recommendedUpkeep}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 border-t border-slate-800/60 pt-4 text-[10px] text-slate-500 leading-relaxed font-mono">
            * Note: These metrics are plotted using computational mechanical values for PP, HDPE, and Polyester standard deniers. Actual output might fluctuate as per raw tape quality.
          </div>
        </div>

        {/* Live Document Preview Card */}
        <div className="bg-slate-950 border border-slate-850 rounded-2xl p-5 relative overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <span className="flex items-center gap-1.5 text-xs text-slate-400 font-semibold uppercase">
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              RFQ DOCUMENT SHEET PROPOSAL
            </span>
            <div className="flex gap-2">
              <button 
                onClick={copyToClipboard}
                className="p-1 px-2 hover:bg-slate-900 text-slate-400 hover:text-white rounded text-[10px] border border-slate-850 flex items-center gap-1"
                title="Copy Text Plan"
              >
                <Copy className="w-3 h-3" />
                Copy
              </button>
              <button 
                onClick={() => window.print()}
                className="p-1 px-2 hover:bg-slate-900 text-slate-400 hover:text-white rounded text-[10px] border border-slate-850 flex items-center gap-1"
                title="Print Quote Spec"
              >
                <Printer className="w-3 h-3" />
                Print
              </button>
            </div>
          </div>

          <div className="bg-zinc-900 text-zinc-300 font-mono text-[9px] p-4 rounded-xl border border-zinc-850 overflow-x-auto h-56 select-all scrollbar-thin whitespace-pre leading-relaxed">
            {rfqText}
          </div>

          <div className="mt-4 bg-sky-950/20 border border-sky-850/30 rounded-xl p-3 flex items-start gap-2">
            <Shield className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-[11px] font-semibold text-sky-350">Export Options Available</p>
              <p className="text-[10px] text-slate-400 leading-normal">
                Simply copy the formatted text block above and send directly to JP Tools via WhatsApp or Instagram ID <span className="font-bold text-white">@{JP_METADATA.instagram}</span> to instantly fast-track your factory commission!
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
