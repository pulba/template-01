/**
 * REALISTIC INDONESIAN SCHOOL SEEDER
 * Populates the database with coherent, formal, and realistic Indonesian school data.
 * Run: npx tsx src/lib/db/run_seed.ts
 */
import { createClient } from '@libsql/client';
import * as dotenv from 'dotenv';

dotenv.config();

const url = process.env.TURSO_DATABASE_URL;
const authToken = process.env.TURSO_AUTH_TOKEN;

if (!url) {
  console.error('❌ TURSO_DATABASE_URL is not set in .env');
  process.exit(1);
}

const client = createClient({ url, authToken });

async function seed() {
  console.log('🌱 Seeding Realistic Indonesian School Data...\n');
  const tables = [
    'school_profile', 'banners', 'school_stats', 'posts', 
    'agendas', 'gallery_albums', 'galleries', 'staff', 
    'osis_members', 'extracurriculars', 'menus', 'majors'
  ];
  for (const t of tables) {
    await client.execute(`DELETE FROM ${t}`);
  }
  console.log('  🗑️  Cleared existing data');

  // 1. School Profile
  await client.execute({
    sql: `INSERT INTO school_profile (
            school_name, short_description, 
            address, phone, email, 
            social_facebook, social_instagram, social_youtube,
            accreditation, npsn, founded_year, curriculum,
            history_text, history_image, 
            profile_hero_title, profile_hero_subtitle, profile_hero_image,
            google_maps_embed_url,
            vision_text, mission_items, 
            principal_name, principal_message, principal_signature, 
            principal_image, principal_quote, 
            ppdb_is_active, ppdb_title, ppdb_description
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      "SMA Negeri 1 Nusantara",
      "Membentuk generasi cerdas, berkarakter, dan berwawasan global melalui pendidikan berkualitas yang berlandaskan nilai-nilai luhur bangsa.",
      "Jl. Pendidikan Raya No. 1, Menteng, Jakarta Pusat",
      "(021) 345-6789",
      "info@sman1nusantara.sch.id",
      "https://facebook.com/sman1nusantara",
      "https://instagram.com/sman1nusantara",
      "https://youtube.com/sman1nusantara",
      "A (Unggul)",
      "20104567",
      "1978",
      "Kurikulum Merdeka",
      "SMA Negeri 1 Nusantara didirikan pada tahun 1978 atas prakarsa tokoh pendidikan nasional untuk menjawab kebutuhan akan institusi pendidikan berkualitas di jantung ibukota. Berawal dari gedung pinjaman, sekolah ini bertransformasi menjadi pusat keunggulan akademik yang telah melahirkan ribuan alumni yang kini berkontribusi di berbagai sektor, baik nasional maupun internasional.\n\nDalam empat dekade perjalanannya, SMA Negeri 1 Nusantara terus berinovasi dengan mengintegrasikan teknologi dalam pembelajaran tanpa meninggalkan nilai-nilai budi pekerti. Komitmen kami terhadap kualitas pendidikan tercermin dari berbagai penghargaan tingkat nasional yang kami raih serta tingkat penerimaan alumni di perguruan tinggi negeri terbaik yang mencapai lebih dari 90% setiap tahunnya.",
      "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1200",
      "Tentang SMA Negeri 1 Nusantara",
      "Menelusuri sejarah, visi, dan dedikasi kami dalam mencerdaskan kehidupan bangsa selama lebih dari 40 tahun.",
      "https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=1920",
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.66642700962!2d106.82496417586!3d-6.1753923938118!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f5d2e7643b2d%3A0xc09f1234567890!2sMonumen%20Nasional!5e0!3m2!1sid!2sid!4v1714540000000!5m2!1sid!2sid",
      "Menjadi lembaga pendidikan unggulan yang menghasilkan lulusan berakhlak mulia, cerdas, kreatif, dan mandiri dalam harmoni keberagaman.",
      JSON.stringify([
        "Menyelenggarakan proses pembelajaran yang inovatif dan berbasis teknologi untuk mengoptimalkan potensi akademik siswa.",
        "Membentuk karakter siswa yang religius, disiplin, bertanggung jawab, dan memiliki rasa cinta tanah air.",
        "Mengembangkan bakat dan minat siswa melalui berbagai program ekstrakurikuler dan pengembangan diri yang terencana.",
        "Mewujudkan lingkungan sekolah yang sehat, aman, dan ramah anak demi mendukung terciptanya ekosistem belajar yang kondusif.",
        "Menjalin kerjasama yang harmonis dengan orang tua, alumni, dan masyarakat untuk kemajuan institusi."
      ]),
      "Dr. H. Ahmad Fauzi, M.Pd.",
      JSON.stringify([
        "Assalamu'alaikum Warahmatullahi Wabarakatuh,",
        "Selamat datang di laman resmi SMA Negeri 1 Nusantara. Sebagai bagian dari tonggak pendidikan di Indonesia, kami berkomitmen untuk terus menghadirkan layanan pendidikan terbaik bagi putra-putri bangsa.",
        "Era digital menuntut kita untuk selalu adaptif and inovatif. Oleh karena itu, SMA Negeri 1 Nusantara senantiasa memperbarui metode pembelajaran agar relevan dengan tuntutan zaman, namun tetap memegang teguh akar budaya dan etika nusantara.",
        "Mari bersama-sama kita bangun masa depan yang gemilang bagi anak-anak kita. Sekolah, keluarga, dan masyarakat adalah mitra sejajar dalam mewujudkan impian ini.",
        "Wassalamu'alaikum Warahmatullahi Wabarakatuh."
      ]),
      "Kepala Sekolah SMA Negeri 1 Nusantara",
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
      "Pendidikan bukan sekadar mengisi wadah, melainkan menyalakan api semangat belajar yang tak kunjung padam.",
      1,
      "PPDB Online Tahun Ajaran 2025/2026 Telah Dibuka!",
      "Segera bergabung dengan sekolah berprestasi. Pendaftaran periode gelombang pertama dibuka dari 1 Mei hingga 30 Juni 2025."
    ]
  });
  console.log('  ✅ school_profile');

  // 2. Banners
  const banners = [
    [
      "Mencetak Pemimpin Masa Depan",
      "Cerdas, Berkarakter, Berwawasan Global",
      "SMA Negeri 1 Nusantara berdedikasi melahirkan generasi muda yang unggul dalam prestasi dan kuat dalam integritas.",
      "https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=1920",
      "Daftar PPDB Sekarang", "/kontak", "assignment_turned_in",
      "Profil Sekolah", "/profil", 1
    ],
    [
      "Fasilitas Modern & Terakreditasi",
      "Dukung Potensi Maksimal Siswa",
      "Laboratorium teknologi tingkat tinggi, perpustakaan digital, dan fasilitas olahraga standar nasional untuk kenyamanan belajar.",
      "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=1920",
      "Lihat Galeri", "/galeri", "photo_library",
      "Hubungi Kami", "/kontak", 2
    ],
    [
      "Prestasi Tanpa Batas",
      "Tradisi Juara Setiap Tahun",
      "Lebih dari 100 medali olimpiade sains dan kompetisi internasional diraih oleh siswa-siswi terbaik kami dalam 3 tahun terakhir.",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=1920",
      "Berita Terbaru", "/berita", "newspaper",
      "Agenda Sekolah", "/agenda", 3
    ]
  ];
  for (const [title, sub, desc, img, p_text, p_href, p_icon, s_text, s_href, order] of banners) {
    await client.execute({
      sql: `INSERT INTO banners (title, subtitle, description, image_url, primary_cta_text, primary_cta_href, primary_cta_icon,
            secondary_cta_text, secondary_cta_href, sort_order, is_active) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [title, sub, desc, img, p_text, p_href, p_icon, s_text, s_href, order, 1]
    });
  }
  console.log('  ✅ banners');

  // 3. Stats
  const stats = [
    ["1.250+", "Siswa Aktif", "school", 1],
    ["95%", "Lulus PTN", "workspace_premium", 2],
    ["45+", "Guru Tersertifikasi", "group", 3],
    ["28", "Ekstrakurikuler", "sports_basketball", 4],
  ];
  for (const [val, label, icon, order] of stats) {
    await client.execute({
      sql: `INSERT INTO school_stats (stat_value, stat_label, icon_name, sort_order) VALUES (?, ?, ?, ?)`,
      args: [val, label, icon, order]
    });
  }
  console.log('  ✅ school_stats');

  // 4. Posts (News)
  const posts = [
    [
      "SMA Negeri 1 Nusantara Raih Juara Umum Olimpiade Sains Provinsi", 
      "raih-juara-umum-osp-2025",
      "Kontingen SMA Negeri 1 Nusantara menyapu bersih medali emas pada bidang Matematika, Fisika, dan Informatika dalam ajang OSP 2025.",
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=800", "PRESTASI"
    ],
    [
      "Kunjungan Industri & Studi Banding ke Universitas Terkemuka", 
      "studi-banding-ptn-2025",
      "Siswa kelas XI melakukan perjalanan edukasi ke ITB dan UGM untuk mengenal lebih dekat lingkungan kampus dan program studi.",
      "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800", "AKADEMIK"
    ],
    [
      "Semarak Festival Budaya 'Nusantara Harmoni' 2025", 
      "festival-budaya-nusantara-2025",
      "Ratusan siswa menampilkan tarian tradisional dan pertunjukan seni dari seluruh provinsi di Indonesia dalam acara tahunan sekolah.",
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800", "KEGIATAN"
    ],
  ];
  for (const [title, slug, excerpt, thumb, tags] of posts) {
    await client.execute({
      sql: `INSERT INTO posts (title, slug, excerpt, featured_image, tags, status, created_at) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [title, slug, excerpt, thumb, tags, 'published', new Date().toISOString()]
    });
  }
  console.log('  ✅ posts');

  // 5. Agendas
  const agendas = [
    ["Upacara Peringatan Hari Pendidikan Nasional", "upacara-hardiknas-2025", "2025-05-02T07:00:00Z", "07:00 - 08:30 WIB", "Lapangan Utama SMAN 1 Nusantara"],
    ["Rapat Pleno Persiapan Ujian Akhir Semester", "rapat-pleno-uas-2025", "2025-05-15T13:00:00Z", "13:00 - 15:00 WIB", "Ruang Guru Utama"],
    ["Pelaksanaan Ujian Satuan Pendidikan (USP)", "pelaksanaan-usp-2025", "2025-05-20T07:30:00Z", "07:30 - 12:30 WIB", "Seluruh Ruang Kelas"],
    ["Wisuda & Pelepasan Siswa Kelas XII Angkatan 45", "wisuda-angkatan-45", "2025-06-10T08:00:00Z", "08:00 - 14:00 WIB", "Grand Ballroom Hotel Mulia"],
  ];
  for (const [title, slug, date, time, loc] of agendas) {
    await client.execute({
      sql: `INSERT INTO agendas (title, slug, event_date, event_time, location) VALUES (?, ?, ?, ?, ?)`,
      args: [title, slug, date, time, loc]
    });
  }
  console.log('  ✅ agendas');

  // 6. Gallery Albums & Galleries
  console.log('   - Seeding gallery_albums...');
  await client.execute({
    sql: `INSERT INTO gallery_albums (id, name, slug, description, cover_image_url, created_at, updated_at) VALUES 
          (1, 'Fasilitas Sekolah', 'fasilitas-sekolah', 'Dokumentasi prasarana belajar mengajar, laboratorium, perpustakaan, dan area olahraga.', 'https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800', ?, ?),
          (2, 'Kegiatan Belajar Mengajar', 'kegiatan-kbm', 'Suasana interaktif kelas, kunjungan edukasi, praktikum laboratorium, dan workshop.', 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800', ?, ?),
          (3, 'Ekstrakurikuler & Karakter', 'ekstrakurikuler-karakter', 'Kegiatan kepramukaan, olahraga, seni musik, dan pembentukan kedisiplinan siswa.', 'https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=800', ?, ?)`,
    args: [new Date().toISOString(), new Date().toISOString(), new Date().toISOString(), new Date().toISOString(), new Date().toISOString(), new Date().toISOString()]
  });
  console.log('  ✅ gallery_albums');

  const galleries = [
    // [url, alt, cat, span, order, featured, album_id]
    ["https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=800", "Laboratorium Komputer iMAC Terbaru", "Fasilitas", "large", 1, 1, 1],
    ["https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=400", "Perpustakaan 'Cakra Buana'", "Fasilitas", "small", 2, 1, 1],
    ["https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400", "Pembelajaran Interaktif di Kelas", "Kegiatan", "small", 3, 1, 2],
    ["https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800", "Gedung Utama SMAN 1 Nusantara", "Fasilitas", "large", 4, 1, 1],
    ["https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=400", "Upacara Bendera Senin Pagi", "Kegiatan", "small", 5, 1, 3],
    ["https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=400", "Kunjungan Laboratorium Fisika", "Kegiatan", "small", 6, 1, 2],
  ];
  for (const [url, alt, cat, span, order, featured, albumId] of galleries) {
    await client.execute({
      sql: `INSERT INTO galleries (image_url, alt_text, category, span, sort_order, is_featured, album_id) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [url, alt, cat, span, order, featured, albumId]
    });
  }
  console.log('  ✅ galleries');

  // 7. Staff
  const staffList = [
    ["Dr. H. Ahmad Fauzi, M.Pd.", "Kepala Sekolah", "Manajemen Pendidikan",
     "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=800",
     "Berkomitmen membangun ekosistem pendidikan yang inovatif, inklusif, dan berkarakter.", 1, "Pimpinan"],
    ["Dra. Hj. Siti Rohmah, M.Si.", "Wakil Kepala Sekolah", "Kurikulum",
     "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800",
     "Menjamin mutu kurikulum agar selalu relevan dengan dinamika pendidikan global.", 2, "Pimpinan"],
    ["Ir. Bambang Wijaya, M.Kom.", "Guru Mata Pelajaran", "Informatika",
     "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=800",
     "Mendorong literasi digital dan penguasaan pemrograman sejak dini.", 3, "Guru"],
    ["Rina Safitri, S.Pd., M.Hum.", "Guru Mata Pelajaran", "Bahasa Inggris",
     "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=800",
     "Membangun kepercayaan diri siswa dalam berkomunikasi secara internasional.", 4, "Guru"],
    ["Drs. M. Taufik, M.Pd.", "Guru Mata Pelajaran", "Fisika",
     "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&q=80&w=800",
     "Mengajarkan logika berpikir analitis melalui fenomena alam.", 5, "Guru"],
    ["Nurul Hidayah, S.Si.", "Guru Mata Pelajaran", "Biologi",
     "https://images.unsplash.com/photo-1598550874175-4d0fe4a2c90b?auto=format&fit=crop&q=80&w=800",
     "Menginspirasi kecintaan terhadap lingkungan dan sains hayati.", 6, "Guru"],
  ];
  for (const [name, title, subject, img, bio, order, cat] of staffList) {
    await client.execute({
      sql: `INSERT INTO staff (name, title, subject, image_url, bio, sort_order, category) VALUES (?, ?, ?, ?, ?, ?, ?)`,
      args: [name, title, subject, img, bio, order, cat]
    });
  }
  console.log('  ✅ staff');

  // 8. OSIS Members
  console.log('   - Seeding osis_members...');
  const osisList = [
    ["Rian Hidayat", "Ketua OSIS", "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400", "Siswa Kelas XI MIPA 1, bertekad memajukan kreativitas dan kolaborasi siswa."],
    ["Larasati Putri", "Wakil Ketua OSIS", "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=400", "Siswa Kelas XI IPS 2, fokus pada peningkatan disiplin dan kegiatan kerohanian."],
    ["Farhan Saputra", "Sekretaris Umum", "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400", "Siswa Kelas XI MIPA 3, bertanggung jawab atas administrasi dan dokumentasi OSIS."],
    ["Dewi Lestari", "Bendahara Umum", "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=400", "Siswa Kelas XI MIPA 2, mengelola anggaran kas OSIS secara transparan."]
  ];
  for (const [name, position, photo, description] of osisList) {
    await client.execute({
      sql: `INSERT INTO osis_members (name, position, photo, description) VALUES (?, ?, ?, ?)`,
      args: [name, position, photo, description]
    });
  }
  console.log('  ✅ osis_members');

  // 9. Extracurriculars
  console.log('   - Seeding extracurriculars...');
  const extracurriculars = [
    [
      "Pramuka", "pramuka", "Wajib", 
      "Membentuk karakter disiplin, mandiri, dan tangguh.", 
      "Membentuk karakter disiplin, mandiri, dan tangguh melalui berbagai kegiatan kepramukaan lapangan dan kepemimpinan.", 
      "Bpk. Ahmad Soleh", "Jumat, 15:00 WIB", 
      "https://images.unsplash.com/photo-1523050335392-93851179ae22?auto=format&fit=crop&q=80&w=800", 1
    ],
    [
      "Paskibra", "paskibra", "Kedisiplinan", 
      "Melatih baris-berbaris dan patriotisme.", 
      "Melatih baris-berbaris, upacara bendera hari besar, dan mengibarkan sang saka merah putih dengan penuh kebanggaan.", 
      "Ibu Ratna", "Selasa & Kamis, 16:00 WIB", 
      "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?auto=format&fit=crop&q=80&w=800", 2
    ],
    [
      "Klub Basket", "klub-basket", "Olahraga", 
      "Mengembangkan bakat olahraga bola basket.", 
      "Mengembangkan bakat olahraga bola basket siswa melalui latihan taktis terprogram dan mengikuti berbagai turnamen antarpelajar.", 
      "Coach Bima", "Senin & Rabu, 15:30 WIB", 
      "https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800", 3
    ],
    [
      "Paduan Suara", "paduan-suara", "Seni", 
      "Mengembangkan kemampuan tarik suara dan harmoni vokal.", 
      "Mengembangkan kemampuan teknik vokal, olah rasa musik, paduan suara harmoni, dan persiapan pagelaran seni serta upacara rutin.", 
      "Ibu Siska", "Sabtu, 10:00 WIB", 
      "https://images.unsplash.com/photo-1511192336575-5a79af67a629?auto=format&fit=crop&q=80&w=800", 4
    ]
  ];
  for (const [name, slug, category, shortDesc, desc, coach, schedule, imageUrl, sortOrder] of extracurriculars) {
    await client.execute({
      sql: `INSERT INTO extracurriculars (name, slug, category, short_description, description, coach_name, schedule, image_url, sort_order, is_active, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1, ?)`,
      args: [name, slug, category, shortDesc, desc, coach, schedule, imageUrl, sortOrder, new Date().toISOString()]
    });
  }
  console.log('  ✅ extracurriculars');

  // 10. Menus
  console.log('   - Seeding menus...');
  const menuList = [
    [1, "Beranda", "/", null, 1],
    [2, "Profil", "/profil", null, 2],
    [3, "Guru & Staff", "/guru-staff", null, 3],
    [4, "OSIS", "/osis", null, 4],
    [5, "Berita", "/berita", null, 5],
    [6, "Galeri", "/galeri", null, 6],
    [7, "Agenda", "/agenda", null, 7],
    [8, "Kontak", "/kontak", null, 8],
  ];
  for (const [id, label, href, parentId, sortOrder] of menuList) {
    await client.execute({
      sql: `INSERT INTO menus (id, label, href, parent_id, sort_order, is_active, created_at) VALUES (?, ?, ?, ?, ?, 1, ?)`,
      args: [id, label, href, parentId, sortOrder, new Date().toISOString()]
    });
  }
  console.log('  ✅ menus');

  // 11. Majors
  console.log('   - Seeding majors...');
  const majorsList = [
    [
      1, "Rekayasa Perangkat Lunak", "rekayasa-perangkat-lunak",
      "Mempelajari pengembangan perangkat lunak, pembuatan aplikasi web dan mobile, serta basis data.",
      "<p>Jurusan Rekayasa Perangkat Lunak (RPL) adalah salah satu kompetensi keahlian di bidang teknologi informasi dan komunikasi. Siswa akan mempelajari dasar-dasar pemrograman, desain database, pengembangan web, pembuatan aplikasi mobile, hingga pengujian perangkat lunak.</p><p>Prospek karir lulusan RPL mencakup Web Developer, Mobile App Developer, Database Administrator, Software Quality Assurance, dan wirausaha di bidang teknologi digital.</p>",
      "https://res.cloudinary.com/dfuefpxo0/image/upload/v1779787731/school-cms/grjvicjgtmbw4lorj7zf.webp",
      "Jurusan Rekayasa Perangkat Lunak (RPL)",
      "Kompetensi Keahlian Rekayasa Perangkat Lunak mempelajari dasar pemrograman, web development, dan pembuatan aplikasi mobile.",
      1, 1
    ],
    [
      2, "Teknik Komputer dan Jaringan", "teknik-komputer-dan-jaringan",
      "Mempelajari instalasi jaringan, administrasi server, perawatan komputer, dan keamanan jaringan.",
      "<p>Jurusan Teknik Komputer dan Jaringan (TKJ) membekali siswa dengan kemampuan di bidang perakitan komputer, instalasi sistem operasi, konfigurasi jaringan LAN/WAN, administrasi server, serta keamanan jaringan komputer.</p><p>Lulusan TKJ dapat bekerja sebagai Network Administrator, IT Support, Technical Support, System Administrator, dan pengusaha di bidang jaringan komputer.</p>",
      "https://res.cloudinary.com/dfuefpxo0/image/upload/v1779639613/school-cms/bqfjzwpnkh7rnd4nkab9.webp",
      "Jurusan Teknik Komputer dan Jaringan (TKJ)",
      "Kompetensi Keahlian Teknik Komputer dan Jaringan mempelajari administrasi server, jaringan komputer, dan keamanan siber.",
      1, 2
    ],
    [
      3, "Akuntansi dan Keuangan Lembaga", "akuntansi-dan-keuangan-lembaga",
      "Mempelajari pencatatan transaksi keuangan, penyusunan laporan keuangan, perpajakan, dan aplikasi komputer akuntansi.",
      "<p>Jurusan Akuntansi dan Keuangan Lembaga (AKL) fokus pada pengelolaan keuangan secara sistematis dan akurat. Siswa mempelajari proses pencatatan jurnal transaksi, penyusunan laporan keuangan perusahaan jasa, dagang, dan manufaktur, serta pengelolaan perpajakan dan penggunaan software komputer akuntansi.</p><p>Peluang kerja lulusan meliputi Staf Akuntansi, Staf Administrasi Keuangan, Staf Pajak, Teller Bank, dan Kasir.</p>",
      "https://res.cloudinary.com/dfuefpxo0/image/upload/v1777801036/school-cms/f0tsmgqgoytkdovoelci.webp",
      "Jurusan Akuntansi dan Keuangan Lembaga (AKL)",
      "Kompetensi Keahlian Akuntansi dan Keuangan Lembaga mempelajari pengelolaan kas, pembukuan keuangan, perpajakan, dan audit.",
      1, 3
    ]
  ];
  for (const [id, name, slug, excerpt, content, thumb, seo_t, seo_d, is_active, sort_order] of majorsList) {
    await client.execute({
      sql: `INSERT INTO majors (id, name, slug, excerpt, content, thumbnail, seo_title, seo_description, is_active, sort_order, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [id, name, slug, excerpt, content, thumb, seo_t, seo_d, is_active, sort_order, new Date().toISOString(), new Date().toISOString()]
    });
  }
  console.log('  ✅ majors');

  console.log('\n🎉 Realistic Indonesian school content seeded successfully!');
}

seed().catch(e => { console.error(e); process.exit(1); });
