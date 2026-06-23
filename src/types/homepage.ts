/**
 * HOMEPAGE DATA CONTRACT
 * These interfaces define the strict data structure required by the frontend components.
 * They will be mapped to the Turso database schema during the integration phase.
 */

export interface BannerItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  primaryCTA: {
    text: string;
    href: string;
    icon?: string;
  };
  secondaryCTA: {
    text: string;
    href: string;
  };
  order: number;
}

export interface StatItem {
  id: string;
  value: string;
  label: string;
  icon: string;
  order: number;
}

export interface PrincipalWelcomeData {
  tagline?: string;
  headline: string;
  principalName: string;
  signatureLabel: string;
  message: string[];
  quote?: string;
  image: string;
}

export interface VisionMissionData {
  tagline?: string;
  headline?: string;
  visionText: string;
  missionItems: string[];
}

export interface NewsPost {
  id: string;
  image: string;
  category: 'AKADEMIK' | 'KEGIATAN' | 'INFO' | string;
  date: string;
  title: string;
  excerpt: string;
  content?: string;
  href: string;
  slug: string;
  published: boolean;
}

export interface AgendaItemData {
  id: string;
  day: string;
  month: string;
  title: string;
  time: string;
  location: string;
  description?: string;
  href?: string;
  date: Date; // For sorting
}

export interface GalleryAlbum {
  id: string;
  name: string;
  slug: string;
  description?: string;
  coverImage?: string;
  createdAt: string;
}

export interface GalleryImage {
  id: string;
  image: string;
  alt: string;
  span: 'large' | 'small';
  order: number;
  category?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  title: string;
  subject?: string;
  image: string;
  bio?: string;
  category: string;
  order: number;
}

export interface PpdbConfig {
  title: string;
  description: string;
  primaryButton: {
    text: string;
    href: string;
  };
  secondaryButton: {
    text: string;
    href: string;
  };
  isActive: boolean;
}

export interface OsisMember {
  id: string;
  name: string;
  position: string;
  photo: string;
  description?: string;
}

export interface Extracurricular {
  id: string;
  name: string;
  category: string;
  image?: string;
  description?: string;
  schedule?: string;
  supervisor?: string;
}

export interface HomepageData {
  banners: BannerItem[];
  stats: StatItem[];
  welcome: PrincipalWelcomeData;
  visionMission: VisionMissionData;
  latestNews: NewsPost[];
  announcements: NewsPost[];
  achievements: NewsPost[];
  agendas: AgendaItemData[];
  gallery: GalleryImage[];
  staff: StaffMember[];
  osis: OsisMember[];
  extracurriculars: Extracurricular[];
  ppdb: PpdbConfig;
  majors: import('../lib/services/major.service').Major[];
}
