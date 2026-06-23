import type { APIRoute } from 'astro';

const CMS_URL = import.meta.env.PUBLIC_CMS_URL || 'http://localhost:4321';

export const GET: APIRoute = async ({ request }) => {
  try {
    const url = new URL(request.url);
    const number = url.searchParams.get('number');
    const birthDate = url.searchParams.get('birthDate');

    if (!number) {
      return new Response(
        JSON.stringify({ error: 'Nomor pendaftaran wajib disertakan.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!birthDate) {
      return new Response(
        JSON.stringify({ error: 'Tanggal lahir wajib disertakan.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const cmsUrl = new URL(`${CMS_URL}/api/admissions/registrations/lookup`);
    cmsUrl.searchParams.set('number', number);
    cmsUrl.searchParams.set('birthDate', birthDate);

    const res = await fetch(cmsUrl.toString(), {
      headers: {
        'Accept': 'application/json',
      },
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('[Proxy lookup] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Terjadi kesalahan koneksi server CMS.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
