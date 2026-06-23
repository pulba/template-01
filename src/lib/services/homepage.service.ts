import { db } from '../db/client';
import * as schema from '../db/schema';
import * as mappers from '../mappers/homepage.mapper';
import { eq, gte, asc, desc, like, and } from 'drizzle-orm';
import type { HomepageData } from '@/types/homepage';

/**
 * HOMEPAGE DATA SERVICE
 * High-level data access layer utilizing Drizzle ORM.
 */
export const HomepageService = {
  /**
   * Fetches all required data for the homepage using Drizzle type-safe queries.
   */
  async getFullHomepageData(): Promise<HomepageData> {
    try {
      // Parallel fetch using Drizzle batch query
      const [
        bannersData,
        statsData,
        newsData,
        announcementsData,
        agendaData,
        profileData,
        galleryData,
        staffData,
        osisData,
        ekskulData,
        achievementsData,
        majorsData
      ] = await db.batch([
        db.select().from(schema.banners).where(eq(schema.banners.isActive, true)).orderBy(asc(schema.banners.sortOrder)),
        db.select().from(schema.schoolStats).orderBy(asc(schema.schoolStats.sortOrder)).limit(4),
        db.select().from(schema.posts).where(eq(schema.posts.status, 'published')).orderBy(desc(schema.posts.createdAt)).limit(4),
        db.select().from(schema.posts).where(and(eq(schema.posts.status, 'published'), like(schema.posts.tags, '%PENGUMUMAN%'))).orderBy(desc(schema.posts.createdAt)).limit(5),
        db.select().from(schema.agendas).where(gte(schema.agendas.eventDate, new Date().toLocaleDateString('sv'))).orderBy(asc(schema.agendas.eventDate)).limit(3),
        db.select().from(schema.schoolProfile).limit(1),
        db.select().from(schema.galleries).where(eq(schema.galleries.isFeatured, true)).orderBy(asc(schema.galleries.sortOrder)).limit(6),
        db.select().from(schema.staff).orderBy(asc(schema.staff.sortOrder)).limit(10),
        db.select().from(schema.osisMembers).limit(10),
        db.select().from(schema.extracurriculars).where(eq(schema.extracurriculars.isActive, true)).orderBy(asc(schema.extracurriculars.sortOrder)).limit(10),
        db.select().from(schema.posts).where(and(eq(schema.posts.status, 'published'), like(schema.posts.tags, '%PRESTASI%'))).orderBy(desc(schema.posts.createdAt)).limit(4),
        db.select().from(schema.majors).where(eq(schema.majors.isActive, true)).orderBy(asc(schema.majors.sortOrder))
      ]);

      const profile = profileData[0];

      return {
        banners: bannersData.map(mappers.mapBanner),
        stats: statsData.map(mappers.mapStat),
        latestNews: newsData.map(mappers.mapNews),
        announcements: announcementsData.map(mappers.mapNews),
        achievements: achievementsData.length > 0 ? achievementsData.map(mappers.mapNews) : [
          {
            id: 'dummy-1',
            image: 'https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=800',
            category: 'PRESTASI',
            date: '10 Mei 2026',
            title: 'Siswa SMAN 1 Raih Medali Emas Olimpiade Sains Nasional',
            excerpt: 'Prestasi membanggakan kembali ditorehkan oleh siswa-siswi terbaik dalam ajang sains bergengsi tingkat nasional.',
            href: '/berita/prestasi-osn-2026',
            slug: 'prestasi-osn-2026',
            published: true
          },
          {
            id: 'dummy-2',
            image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800',
            category: 'PRESTASI',
            date: '5 Mei 2026',
            title: 'Juara Umum Lomba Robotika Cerdas Tingkat Provinsi',
            excerpt: 'Tim Robotika Ekstrakurikuler berhasil menyingkirkan puluhan kompetitor dari berbagai sekolah unggulan di provinsi.',
            href: '/berita/juara-robotika',
            slug: 'juara-robotika',
            published: true
          },
          {
            id: 'dummy-3',
            image: 'https://images.unsplash.com/photo-1546410531-dd4cb32b5040?auto=format&fit=crop&q=80&w=800',
            category: 'PRESTASI',
            date: '28 April 2026',
            title: 'Juara 1 Lomba Pidato Bahasa Inggris',
            excerpt: 'Kemampuan public speaking dan bahasa Inggris siswa kami diakui pada kejuaraan debat dan pidato antar sekolah.',
            href: '/berita/pidato-bahasa-inggris',
            slug: 'pidato-bahasa-inggris',
            published: true
          },
          {
            id: 'dummy-4',
            image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=800',
            category: 'PRESTASI',
            date: '15 April 2026',
            title: 'Tim Basket Bawa Pulang Piala Wali Kota 2026',
            excerpt: 'Perjuangan keras dan latihan disiplin membuahkan hasil manis pada turnamen bola basket tahunan.',
            href: '/berita/basket-walikota',
            slug: 'basket-walikota',
            published: true
          }
        ],
        agendas: agendaData.map(mappers.mapAgenda),
        gallery: galleryData.map(mappers.mapGallery),
        staff: staffData.map(mappers.mapStaff),
        osis: osisData.map(mappers.mapOsis),
        extracurriculars: ekskulData.map(mappers.mapExtracurricular),
        
        // Map singleton profile data
        welcome: profile ? {
          tagline: "Sambutan Kami",
          headline: profile.principalName,
          principalName: profile.principalName,
          signatureLabel: profile.principalSignature,
          message: (() => {
            try { return JSON.parse(profile.principalMessage || '[]'); }
            catch { return [profile.principalMessage || '']; }
          })(),
          quote: profile.principalQuote || undefined,
          image: profile.principalImage
        } : {} as any,

        visionMission: profile ? {
          visionText: profile.visionText,
          missionItems: (() => {
            try { return JSON.parse(profile.missionItems || '[]'); }
            catch { return []; }
          })()
        } : {} as any,

        ppdb: profile ? {
          title: profile.ppdbTitle || '',
          description: profile.ppdbDescription || '',
          primaryButton: { text: 'Daftar Sekarang', href: '/pendaftaran' },
          secondaryButton: { text: 'Unduh Brosur', href: '/pendaftaran#brosur' },
          isActive: profile.ppdbIsActive || false
        } : {} as any,
        majors: majorsData.map(m => ({
          ...m,
          isActive: !!m.isActive,
          sortOrder: m.sortOrder ?? 0
        }))
      };
    } catch (error) {
      console.error('Failed to fetch homepage data via Drizzle:', error);
      throw error;
    }
  }
};
