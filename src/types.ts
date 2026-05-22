export type AppPage =
  | 'home'
  | 'about'
  | 'plastic-loom'
  | 'needle-loom'
  | 'winder'
  | 'tano'
  | 'beam'
  | 'wrapping'
  | 'spare-parts'
  | 'gallery'
  | 'videos'
  | 'services'
  | 'clients'
  | 'contact'
  | 'quote';

export interface MachineSpecification {
  label: string;
  value: string;
}

export interface MachineProduct {
  id: string;
  name: string;
  tagline: string;
  description: string;
  category: string;
  image: string;
  features: string[];
  specs: MachineSpecification[];
  advantages: string[];
  productionSpeed?: string; // e.g., meters/min or cycles/min
  powerRating?: string;
  dimensions?: string;
}

export interface SparePart {
  id: string;
  name: string;
  category: string;
  description: string;
  partNumber: string;
  material: string;
  compatibility: string;
  imagePlaceholderColor: string;
}

export interface ServiceDetail {
  id: string;
  title: string;
  description: string;
  iconName: string;
  features: string[];
}

export interface ClientReview {
  id: string;
  name: string;
  company: string;
  location: string;
  feedback: string;
  rating: number;
}

export interface VideoDemo {
  id: string;
  title: string;
  description: string;
  duration: string;
  youtubeIdOrPlaceholder: string;
  category: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'machine' | 'spare-part' | 'factory' | 'dispatch';
  image: string;
  description: string;
}
