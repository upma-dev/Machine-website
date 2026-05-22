import plasticLoomImg from '../assets/images/machine1.png.jpeg';
import needleLoomImg from '../assets/images/machine2.png.jpeg';
import machinePartsImg from '../assets/images/machine3.png.jpeg';

// machine4 = winder machine visual
import winderImg from '../assets/images/machine4.png.jpeg';
// machine5 = tano / warping machine visual  
import tanoImg from '../assets/images/machine5.png.jpeg';
// machine6 = beam machine visual
import beamImg from '../assets/images/machine6.png.jpeg';
// machine7 = wrapping / lapetayu visual
import wrappingImg from '../assets/images/machine7.png.jpeg';


import {
  MachineProduct,
  SparePart,
  ServiceDetail,
  ClientReview,
  VideoDemo,
  GalleryItem,
} from '../types';

export const JP_METADATA = {
  phone: '+91 98251 45437',
  email: 'info@jptoolsandmachine.com',
  address: 'Plot No. 42-A, Industrial Estate, Phase 2, GIDC, Surat, Gujarat - 395023',
  instagram: 'jp.tool.and.machine',
  instagramUrl: 'https://www.instagram.com/jp.tool.and.machine',
  estYear: '2008',
  tagline: 'Quality • Reliability • Performance',
};

export const MACHINE_PRODUCTS: MachineProduct[] = [
  {
    id: 'plastic-loom',
    name: 'Plastic Loom Machines (Flat & Circular)',
    category: 'loom',
    tagline: 'High-Efficiency Woven Sack Tape Loom with Lower Tension Maintenance',
    description:
      'We manufacture premium automated Plastic Loom Machines optimized for high-tensile HDPE/PP woven fabrics. JP Plastic Looms provide flawless weaving of poly-sack tapes, ensuring heavy weight-bearing capabilities, uniform weaving tension, and extremely low tape break frequencies.',
    image: plasticLoomImg,
    features: [
      'Automatic tape surface lubrication system',
      'Electronic weft break sensor & automatic loom stop',
      'Lower energy consumption with high-torque steel motors',
      'Advanced warp out-feed speed regulator',
      'Double warp tension sensor rollers',
    ],
    specs: [
      { label: 'Working Width (Weft)', value: '450 mm to 850 mm' },
      { label: 'Number of Shuttles', value: '4 / 6 / 8 Shuttles Configuration' },
      { label: 'Maximum Loom Speed', value: '850 RPM (Shuts/min)' },
      { label: 'Installed Motor Power', value: '2.2 kW - 3.7 kW' },
      { label: 'Loom Dimension', value: '4500 x 2400 x 2900 mm' },
    ],
    advantages: [
      'Unmatched efficiency in cement bag and geo-textile sack manufacturing.',
      'Saves up to 18% electricity compared to traditional casting looms.',
      'Extremely user-friendly micro-processor display dashboard.',
    ],
    productionSpeed: '850 picks/min',
    powerRating: '3.0 kW',
    dimensions: '4200 x 2200 x 2800 mm',
  },
  {
    id: 'needle-loom',
    name: 'High-Speed Needle Loom Machines',
    category: 'loom',
    tagline: 'Precision Narrow Fabric Weaving for Heavy Elastic & Cotton Tapes',
    description:
      'JP Needle Looms are the industrial benchmark for weaving non-elastic and high-tension elastic narrow fabrics, tapes, belts, rigid ribbons, zipper cords, and heavy-duty strapping ropes. Engineered utilizing heavy cast steel frames to withstand high speed operations with absolute zero vibration.',
    image: needleLoomImg,
    features: [
      'Advanced mechanical pattern chain mechanism for endless custom designs',
      'Automatic continuous lubrication with recirculating oil pump',
      'Precise harness frame adjustment for optimal shed geometry',
      'Adjustable take-off roller speeds with multiple gear teeth selections',
    ],
    specs: [
      { label: 'Number of Tape Lines', value: '2 / 4 / 6 / 8 / 12 Lines' },
      { label: 'Tape Max Width', value: '25 mm (12 Lines) to 110 mm (2 Lines)' },
      { label: 'Speed Range', value: '1100 to 1400 RPM' },
      { label: 'No. of Harness Frames', value: '12 to 16 Frames' },
      { label: 'Frame Density', value: 'High Carbon Steel Double Cam structure' },
    ],
    advantages: [
      'Capable of non-stop 24/7 manufacturing with lowest wear and tear.',
      'Perfectly clear fabric edges and tension uniformity across stripes.',
      'Symmetric weave lock-stitches preventing fraying or core splitting.',
    ],
    productionSpeed: '1200 picks/min',
    powerRating: '1.5 kW',
    dimensions: '1850 x 1200 x 1700 mm',
  },
  {
    id: 'winder',
    name: 'Industrial Spool & Bobbin Winder Machines',
    category: 'winder',
    tagline: 'Uniform Traverse & Tension Control for Synthetic Tapes and Thread Yarns',
    description:
      'Precision mechanical thread winders with advanced speed profiles to pack optimal yarn densities on steel tubes, paper tubes, or plastic bobbins. Prevents thread slippage during dynamic unpacking in downstream looms.',
    // Use winderImg if available, fallback to machinePartsImg
    image: (() => { try { return winderImg; } catch { return machinePartsImg; } })(),
    features: [
      'Constant linear velocity traverse winding mechanism',
      'Individual motor spindle controls to prevent cross-friction',
      'Digital length counters with automatic stop sensor at preset value',
      'Dual active tension controllers with ceramic guide eyelets',
    ],
    specs: [
      { label: 'Spindle Slots', value: '12 / 24 / 48 / 96 Spindles' },
      { label: 'Take-up Bobbin Weight', value: '250g to 2.5 kg Max' },
      { label: 'Traverse Length', value: '150 mm to 250 mm' },
      { label: 'Winding Speed', value: 'Up to 350 meters/minute' },
    ],
    advantages: [
      'Eliminates knotting and yarn friction marks.',
      'Low power profile with isolated circuit protection.',
      'Quick bobbin replacement latch for expedited workflows.',
    ],
    productionSpeed: '350 m/min',
    powerRating: '0.75 kW per section',
    dimensions: '2200 x 900 x 1400 mm',
  },
  {
    id: 'tano',
    name: 'Tano Machines (Warping Machines)',
    category: 'warping',
    tagline: 'High-Speed Sectional & Direct Beam Warping with Electronic Creels',
    description:
      'High-performance Tano (Warping) Machines engineered to warp yarn onto industrial loom beams. Equipped with electronic computerized creep tension controls and yarn-break detection sensors across more than 400 creel threadways simultaneously.',
    image: (() => { try { return tanoImg; } catch { return machinePartsImg; } })(),
    features: [
      'Hydraulic beam doffing and loading system',
      'Perfect beam surface density regulator roller',
      'Interactive PLC color touch screens for monitoring yarn specs',
      'Laser-aligned computerized length count and split control',
    ],
    specs: [
      { label: 'Beam Flange Diameter', value: 'Up to 1000 mm' },
      { label: 'Maximum Warping Speed', value: '600 meters / minute' },
      { label: 'Yarn Compatibility', value: 'Polyester, Cotton, Nylon, PP Tape, Fiberglass' },
      { label: 'Brake Mechanism', value: 'Tri-point hydraulic disk disc brakes' },
    ],
    advantages: [
      'Precise warp beam alignment reduces loom fabric defects by 94%.',
      'Fast warp thread-up with specialized front separation comb.',
    ],
    productionSpeed: '600 m/min',
    powerRating: '7.5 kW',
    dimensions: '3400 x 2800 x 1900 mm',
  },
  {
    id: 'beam',
    name: 'Heavy-Duty Warp Beam Machines',
    category: 'beam',
    tagline: 'Dynamically Balanced Steel & Aluminum Flanged Textile Beams',
    description:
      'Premium strength warp beams manufactured with high-strength structural tubes and high-pressure forged aluminum flanges. Fully tested for dynamic balancing at high RPMs to prevent machine vibration in ultra-speed air-jet, water-jet, and needle looms.',
    image: (() => { try { return beamImg; } catch { return machinePartsImg; } })(),
    features: [
      'Forged high-strength aluminum alloy flanges (up to 1200mm diameter)',
      'Stainless steel barrel jacket for anti-corrosion protection',
      'Anti-deformation core reinforcements',
      'Precision grooved drive gear slots compatible with all worldwide looms',
    ],
    specs: [
      { label: 'Flange Diameter', value: '600 mm to 1250 mm' },
      { label: 'Barrel Outer Diameter', value: '150 mm to 300 mm' },
      { label: 'Working Width', value: '1100 mm to 3400 mm' },
      { label: 'Dynamic Balance Tolerance', value: '< 2.5 g on ISO balancer' },
    ],
    advantages: [
      'Withstands extreme pressure of synthetic polyester yarns without bending.',
      'Pre-grooved structures allow frictionless connection on loom shafts.',
    ],
    productionSpeed: 'Precision Balancing Standard',
    powerRating: 'N/A (Mechanical/Hydraulic)',
    dimensions: '2500 x 800 x 800 mm',
  },
  {
    id: 'wrapping',
    name: 'Wrapping / Lapetayu Machines',
    category: 'wrapping',
    tagline: 'Specialized Lapetayu Core Spool Wrapping Machines',
    description:
      'We manufacture custom-engineered Wrapping (Lapetayu) machines for high speed automatic tube wrapping of broad web fabrics, core coils, and industrial narrow rollers. Creates an atmospheric seal preventing oxidative degradation of industrial metallic fabrics.',
    image: (() => { try { return wrappingImg; } catch { return machinePartsImg; } })(),
    features: [
      'Fully automated tension feedback control on wrapper membrane',
      'Variable Speed Drive (VSD) with micro-processor controllers',
      'Sturdy heavy-gauge steel body with electrostatic baked coating',
      'Safety photoelectric boundary sensor barriers',
    ],
    specs: [
      { label: 'Max Packing Diameter', value: '600 mm' },
      { label: 'Spindle Rotation Speed', value: '150 RPM' },
      { label: 'Wrapping Film Width', value: '100 mm to 300 mm' },
      { label: 'Load Capacity', value: 'Up to 150 kg' },
    ],
    advantages: [
      'Reduces hand labor by 85% with swift wrapper passes.',
      'Extremely quiet operating environment under 65 dB.',
    ],
    productionSpeed: '120 cycles/hr',
    powerRating: '1.2 kW',
    dimensions: '1500 x 950 x 1400 mm',
  },
];

export const SPARE_PARTS: SparePart[] = [
  {
    id: 'sp1',
    name: 'Tungsten Carbide Loom Needles',
    category: 'Needle Loom Spare Parts',
    description: 'Precision forged weft inserting needles with special eyelet micro-polishing to prevent yarn friction.',
    partNumber: 'NLNL-405-W1',
    material: 'Tungsten Carbide Core alloy',
    compatibility: 'JP High-Speed Needle Looms & Standard Global Brands',
    imagePlaceholderColor: '#38bdf8',
  },
  {
    id: 'sp2',
    name: 'Steel Weft Feed Levers',
    category: 'Needle Loom Spare Parts',
    description: 'Specially lightened alloy arms designed to withstand continuous 1400 RPM structural oscillations.',
    partNumber: 'NLFL-802-A',
    material: 'T6 Aircraft Grade Aluminum-Steel Composite',
    compatibility: 'JP 2-Line & 4-Line Needle Looms',
    imagePlaceholderColor: '#f97316',
  },
  {
    id: 'sp3',
    name: 'Circular Loom Heald Wire Loops',
    category: 'Plastic Loom Spare Parts',
    description: 'Ultra-flex steel heald wires with dual brass solder-beaded eyelets to prevent HDPE tape splitting.',
    partNumber: 'PL-HW-9520',
    material: 'High-Tensile Spring Steel with Tin plating',
    compatibility: 'Circular Looms (4/6/8 Shuttle Models)',
    imagePlaceholderColor: '#64748b',
  },
  {
    id: 'sp4',
    name: 'High-Tensile Shuttle Rollers',
    category: 'Plastic Loom Spare Parts',
    description: 'Self-lubricating polymer shuttle wheel rollers with integrated Japanese steel ball-bearings.',
    partNumber: 'PL-SR-110',
    material: 'DuPont Polyoxymethylene / Chromium Steel Bearings',
    compatibility: 'JP Circular Weaving Looms',
    imagePlaceholderColor: '#ef4444',
  },
  {
    id: 'sp5',
    name: 'Precision Aluminum Beam Flanges',
    category: 'Beam Parts',
    description: 'Forged beam edge plates machined to mirror smoothness to prevent micro-snagging of high count warp.',
    partNumber: 'BM-FL-800',
    material: 'Forged 6061-T6 Aluminum',
    compatibility: 'Beam Shafts: Ø150mm to Ø250mm',
    imagePlaceholderColor: '#10b981',
  },
  {
    id: 'sp6',
    name: 'Hardened Shaft Helical Steel Gears',
    category: 'Gear & Motor Parts',
    description: 'High-torque helical gear couplings with CNC precision grinding for quiet operation in loom gearboxes.',
    partNumber: 'GM-HG-3304',
    material: '20CrMnTi Alloy steel with carbon-nitride hardening',
    compatibility: 'Main Gearbox of JP Looms & Warping Heads',
    imagePlaceholderColor: '#8b5cf6',
  },
  {
    id: 'sp7',
    name: 'Loom Main Variable AC Induction Motor',
    category: 'Gear & Motor Parts',
    description: 'IE3 Premium energy-efficient high torque motor with specialized cooling sink for long dyehouse hours.',
    partNumber: 'GM-MO-3HP',
    material: 'Cast Iron Frame / Copper Core windings',
    compatibility: 'All JP Loom & Warper models',
    imagePlaceholderColor: '#ec4899',
  },
  {
    id: 'sp8',
    name: 'Double-Row Needle Roller Bearings',
    category: 'Bearings & Rollers',
    description: 'Low-clearance bearings designed to support heavy pounding vibration of needle loom shafts.',
    partNumber: 'BR-NB-2044',
    material: 'High-chrome alloy bearing steel',
    compatibility: 'Needle Loom Harness cams & rocker bearings',
    imagePlaceholderColor: '#f59e0b',
  },
  {
    id: 'sp9',
    name: 'Integrated Programmable Control Panel',
    category: 'Electrical Panels',
    description: 'Fully wired electric box containing Siemens VFD controllers, safety fuses, electronic loom stop sensors.',
    partNumber: 'EL-PN-06',
    material: 'Electro-coated anti-shock steel cabinet',
    compatibility: 'Tano Warping Machines and Circular Looms',
    imagePlaceholderColor: '#06b6d4',
  },
  {
    id: 'sp10',
    name: 'Reinforced Polyurethane Timing Belts',
    category: 'Belts & Pulleys',
    description: 'Steel-cord reinforced positive drive belts with anti-static self-cleaning curved tooth profiles.',
    partNumber: 'BP-TB-H850',
    material: 'Polyurethane elastomer with Steel tensile braided core',
    compatibility: 'Winder spindle drives & Loom timing lines',
    imagePlaceholderColor: '#14b8a6',
  },
];

export const SERVICE_DETAILS: ServiceDetail[] = [
  {
    id: 'custom-mfg',
    title: 'Custom Machine Manufacturing & Optimization',
    description: 'We build textile machines specifically customized around client weaving material, factory floor space, and desired output speeds.',
    iconName: 'Cpu',
    features: [
      'Tailored speed settings & CAD layouts matched to your space',
      'Bespoke pattern cam configurations',
      'Customized voltage controls for regional power parameters',
    ],
  },
  {
    id: 'repair-service',
    title: 'Machine Retrofitting, Repair & On-Site Service',
    description: 'Minimize production downtime with direct factory engineer services. Overhauling old circular looms, upgrading vintage warping panels, and precision re-alignment.',
    iconName: 'Wrench',
    features: [
      'Emergency technician diagnostic visits across India',
      'Electronic PLC controller programming & sensor updates',
      'Complete mechanical stripping, gearbox re-gearing & laser alignment',
    ],
  },
  {
    id: 'spare-support',
    title: 'Genuine High-Grade Spare Supplies',
    description: 'Active warehouse inventory of premium wear-parts for JP Tools machinery. Daily shipping across Surat, Ahmedabad, Ludhiana, Coimbatore, and international markets.',
    iconName: 'Grid',
    features: [
      '100% QA inspected parts for material grade compliance',
      'Custom gear grinding services for deprecated machinery',
      'Batch-size wholesale discounts for large loom installations',
    ],
  },
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'r1',
    name: 'Ramesh Patel',
    company: 'Maruti PolySacks Private Ltd.',
    location: 'Surat, Gujarat',
    feedback: 'We replaced ten legacy circular looms with JP Plastic Loom Machines. Output smoothness is amazing, tape snapping dropped to near zero, and 15% energy savings improved our margins!',
    rating: 5,
  },
  {
    id: 'r2',
    name: 'Aniket Shah',
    company: 'Vibrant Elastics and Narrow Fabrics',
    location: 'Ahmedabad, Gujarat',
    feedback: 'JP High-Speed Needle Looms are solid beasts. Running non-stop at 1300 RPM weaving heavy luggage straps with absolute steel stability.',
    rating: 5,
  },
  {
    id: 'r3',
    name: 'K. Balakrishnan',
    company: 'Lakshmi Textile Spares & Webbing',
    location: 'Coimbatore, Tamil Nadu',
    feedback: 'Ordering custom flanges and steel beam parts from JP Tools is extremely easy. Quality is exceptional, dynamically balanced perfectly.',
    rating: 4.8,
  },
  {
    id: 'r4',
    name: 'Manpreet Singh',
    company: 'Punjab Ribbon Mills',
    location: 'Ludhiana, Punjab',
    feedback: 'Their Tano Warping Machine has transformed our beam preparation. Creel thread-break optical sensors are instantaneous, saving us hours of manual resetting.',
    rating: 5,
  },
];

export const DEMO_VIDEOS: VideoDemo[] = [
  {
    id: 'v1',
    title: 'JP High-Speed Needle Loom Machine Running Live',
    description: 'Watch our 4-Line high speed automatic needle loom manufacturing surgical elastic bands at 1400 RPM with total vibration isolation.',
    duration: '3:45',
    youtubeIdOrPlaceholder: 'live_needle_loom_1400',
    category: 'Needle Loom',
  },
  {
    id: 'v2',
    title: 'Automatic Circular PP Plastic Woven Sack Loom Demo',
    description: 'Complete operational cycle of a 6-Shuttle circular plastic tape weaving machine producing cement bags fabric rolls.',
    duration: '4:12',
    youtubeIdOrPlaceholder: 'circular_plastic_loom_demo',
    category: 'Plastic Loom',
  },
  {
    id: 'v3',
    title: 'Tano Warping Machine Electronic Creel Setup',
    description: 'Step-by-step review of our high speed warping machine beam automatic load and computerized tension balancing controls.',
    duration: '5:20',
    youtubeIdOrPlaceholder: 'tano_warper_tech',
    category: 'Tano Warping',
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Precision Needle Loom Cam Box Assembly',
    category: 'machine',
    image: needleLoomImg,
    description: 'Interconnected hardened steel cams controlling double warp-shed arrays during automatic weaving.',
  },
  {
    id: 'g2',
    title: 'Woven Sack Circular Loom Upper Ring Feed',
    category: 'machine',
    image: plasticLoomImg,
    description: 'Perfect radial symmetry guide ring controlling PP poly-tape tension with minimal friction indices.',
  },
  {
    id: 'g3',
    title: 'Textile Machine Spare Parts Dispatch Lot',
    category: 'dispatch',
    image: machinePartsImg,
    description: 'Over 10,000 loom needles and harness wires fully polished and packaged — certified metallurgic grade.',
  },
  {
    id: 'g4',
    title: 'Heavy Flanged Beam Assembly Check',
    category: 'spare-part',
    image: machinePartsImg,
    description: 'Final alignment testing of dynamically balanced steel beams on ISO testbed prior to customer shipment.',
  },
  {
    id: 'g5',
    title: 'Our Modern Assembly Floor',
    category: 'factory',
    image: plasticLoomImg,
    description: 'Inside the JP Tools assembly plant where engineers build, wire, and test every loom for continuous performance.',
  },
  {
    id: 'g6',
    title: 'Custom Electrical Panel Commissioning',
    category: 'spare-part',
    image: machinePartsImg,
    description: 'Siemens VFD and automated thermal break fuses installed into durable steel dustproof enclosures.',
  },
];