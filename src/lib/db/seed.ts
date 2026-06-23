import { db } from './client';
import * as schema from './schema';

/**
 * DATABASE SEEDER
 * Populates Turso/LibSQL with realistic initial data for development.
 */
export async function seed() {
  console.log('🌱 Starting database seed...');

  try {
    // 1. School Profile
    console.log('   - Seeding school_profile...');
    await db.insert(schema.schoolProfile).values({
      schoolName: "Institutional School",
      visionText: "Menjadi lembaga pendidikan terkemuka yang menghasilkan lulusan unggul dalam prestasi, berkarakter mulia, dan mampu bersaing secara global.",
      missionItems: JSON.stringify([
        "Menyelenggarakan pembelajaran inovatif berbasis teknologi.",
        "Mengembangkan potensi spiritual, emosional, dan intelektual.",
        "Membangun kemitraan strategis dengan orang tua dan masyarakat.",
        "Menciptakan lingkungan sekolah yang aman, nyaman, dan asri."
      ]),
      principalName: "Dr. Ahmad Wijaya",
      principalMessage: JSON.stringify([
        "Selamat datang di Institutional School, tempat di mana potensi setiap anak dikembangkan secara optimal.",
        "Kami berkomitmen menciptakan lingkungan belajar yang inspiratif dan adaptif terhadap perkembangan zaman."
      ]),
      principalSignature: "Kepala Sekolah Institutional School",
      principalImage: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
      principalQuote: "Pendidikan adalah senjata paling mematikan di dunia, karena dengan itu Anda dapat mengubah dunia.",
      ppdbIsActive: true,
      ppdbTitle: "Penerimaan Peserta Didik Baru (PPDB) Telah Dibuka!",
      ppdbDescription: "Jadilah bagian dari komunitas pembelajar Institutional School. Kuota terbatas untuk tahun ajaran 2024/2025."
    });

    // 2. Banners
    console.log('   - Seeding banners...');
    await db.insert(schema.banners).values([
      {
        title: "Masa Depan Cerah Dimulai Di Sini",
        subtitle: "Membangun Karakter & Prestasi",
        description: "Institutional School melahirkan generasi pemimpin masa depan yang berintegritas.",
        imageUrl: "https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=1920",
        primaryCtaText: "Daftar PPDB Sekarang",
        primaryCtaHref: "#",
        primaryCtaIcon: "assignment_turned_in",
        secondaryCtaText: "Pelajari Profil Kami",
        secondaryCtaHref: "#",
        sortOrder: 1,
        isActive: true
      }
    ]);

    // 3. Stats
    console.log('   - Seeding school_stats...');
    await db.insert(schema.schoolStats).values([
      { statValue: "1,200+", statLabel: "Siswa Aktif", iconName: "school", sortOrder: 1 },
      { statValue: "85+", statLabel: "Guru Profesional", iconName: "group", sortOrder: 2 },
      { statValue: "30+", statLabel: "Ekstrakurikuler", iconName: "sports_basketball", sortOrder: 3 },
      { statValue: "150+", statLabel: "Penghargaan", iconName: "workspace_premium", sortOrder: 4 }
    ]);

    // 4. Posts
    console.log('   - Seeding posts...');
    await db.insert(schema.posts).values([
      {
        title: "Siswa Kami Meraih Medali Emas di OSN",
        slug: "siswa-raih-emas-osn",
        content: "Prestasi membanggakan diukir oleh siswa kami dalam ajang OSN tingkat nasional.",
        excerpt: "Prestasi membanggakan diukir oleh siswa kami dalam ajang OSN tingkat nasional.",
        featuredImage: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800",
        tags: "AKADEMIK",
        status: "published",
        createdAt: new Date().toISOString()
      },
      {
        title: "Workshop Parenting Era Digital",
        slug: "workshop-parenting-digital",
        content: "Sinergi antara sekolah dan orang tua dalam mendampingi anak.",
        excerpt: "Sinergi antara sekolah dan orang tua dalam mendampingi anak.",
        featuredImage: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800",
        tags: "INFO",
        status: "published",
        createdAt: new Date().toISOString()
      }
    ]);

    // 5. Agendas
    console.log('   - Seeding agendas...');
    await db.insert(schema.agendas).values([
      {
        title: "Upacara Hari Sumpah Pemuda",
        slug: "upacara-sumpah-pemuda",
        eventDate: "2024-10-28T07:30:00Z",
        eventTime: "07:30 - 09:00 WIB",
        location: "Lapangan Utama"
      }
    ]);

    console.log('✅ Database seed completed successfully!');
  } catch (error) {
    console.error('❌ Database seed failed:', error);
    throw error;
  }
}
