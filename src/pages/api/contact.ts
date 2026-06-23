import type { APIRoute } from 'astro';
import { InboxService } from '@/lib/services/inbox.service';

export const POST: APIRoute = async ({ request }) => {
  try {
    const data = await request.formData();
    const name = data.get('name')?.toString();
    const email = data.get('email')?.toString();
    const phone = data.get('phone')?.toString();
    const subject = data.get('subject')?.toString();
    const message = data.get('message')?.toString();

    // 1. Basic Validation
    if (!name || !email || !subject || !message) {
      return new Response(
        JSON.stringify({ message: 'Semua field wajib diisi (kecuali telepon).' }),
        { status: 400 }
      );
    }

    // 2. Email Validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ message: 'Format email tidak valid.' }),
        { status: 400 }
      );
    }

    // 3. Save to Database
    await InboxService.saveMessage({
      name,
      email,
      phone,
      subject,
      message
    });

    return new Response(
      JSON.stringify({ message: 'Pesan Anda berhasil terkirim. Terima kasih!' }),
      { status: 200 }
    );

  } catch (error) {
    console.error('Contact API Error:', error);
    return new Response(
      JSON.stringify({ message: 'Terjadi kesalahan pada server. Silakan coba lagi nanti.' }),
      { status: 500 }
    );
  }
};
