import type {
  BannerItem,
  StatItem,
  NewsPost,
  AgendaItemData,
  GalleryImage,
  StaffMember,
  OsisMember,
  Extracurricular
} from '@/types/homepage';

/**
 * HOMEPAGE DATA MAPPERS
 * Transform Drizzle schema objects into UI-Ready interfaces.
 */

export const mapBanner = (row: any): BannerItem => ({
  id: String(row.id),
  title: row.title,
  subtitle: row.subtitle,
  description: row.description,
  image: row.imageUrl,
  primaryCTA: {
    text: row.primaryCtaText || '',
    href: row.primaryCtaHref === '#' ? '/pendaftaran' : (row.primaryCtaHref || '/pendaftaran'),
    icon: row.primaryCtaIcon || undefined,
  },
  secondaryCTA: {
    text: row.secondaryCtaText || '',
    href: row.secondaryCtaHref === '#' ? '/profil' : (row.secondaryCtaHref || '/profil'),
  },
  order: row.sortOrder || 0,
});

export const mapStat = (row: any): StatItem => ({
  id: String(row.id),
  value: row.statValue,
  label: row.statLabel,
  icon: row.iconName,
  order: row.sortOrder || 0,
});

export const mapNews = (row: any): NewsPost => {
  let dateObj = new Date(row.createdAt);
  if (!row.createdAt || isNaN(dateObj.getTime())) {
    dateObj = new Date(); // Fallback to current date if missing or invalid
  }

  return {
    id: String(row.id),
    image: row.featuredImage || '',
    category: (row.tags?.split(',')[0] || 'BERITA').toUpperCase(),
    date: dateObj.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }),
    title: row.title,
    excerpt: row.excerpt || '',
    content: row.content || '',
    href: `/berita/${row.slug}`,
    slug: row.slug,
    published: row.status === 'published',
  };
};

export const mapAgenda = (row: any): AgendaItemData => {
  const date = new Date(row.eventDate);
  return {
    id: String(row.id),
    day: date.getDate().toString().padStart(2, '0'),
    month: date.toLocaleString('id-ID', { month: 'short' }),
    title: row.title,
    time: row.eventTime,
    location: row.location,
    description: row.description || undefined,
    href: `/agenda/${row.slug}`,
    date: date,
  };
};

export const mapGallery = (row: any): GalleryImage => ({
  id: String(row.id),
  image: row.imageUrl,
  alt: row.altText,
  span: row.span as 'large' | 'small',
  order: row.sortOrder || 0,
  category: row.category || 'Umum',
});

export const mapStaff = (row: any): StaffMember => ({
  id: String(row.id),
  name: row.name,
  title: row.title,
  subject: row.subject || undefined,
  image: row.imageUrl,
  bio: row.bio || undefined,
  category: row.category,
  order: row.sortOrder || 0,
});

export const mapOsis = (row: any): OsisMember => ({
  id: String(row.id),
  name: row.name,
  position: row.position || '',
  photo: row.photo || '',
  description: row.description || undefined,
});

export const mapExtracurricular = (row: any): Extracurricular => ({
  id: String(row.id),
  name: row.name,
  category: row.category || 'Umum',
  image: row.imageUrl || undefined,
  description: row.shortDescription || row.description || undefined,
  schedule: row.schedule || undefined,
  supervisor: row.coachName || row.contactPerson || undefined,
});

export const mapAlbum = (row: any): any => ({
  id: String(row.id),
  name: row.name,
  slug: row.slug,
  description: row.description || undefined,
  coverImage: row.coverImageUrl || undefined,
  createdAt: row.createdAt,
});
