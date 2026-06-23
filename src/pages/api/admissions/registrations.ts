import type { APIRoute } from 'astro';

const CMS_URL = import.meta.env.PUBLIC_CMS_URL || 'http://localhost:4321';

export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();

    const res = await fetch(`${CMS_URL}/api/admissions/registrations`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      status: res.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error: any) {
    console.error('[Proxy registrations] Error:', error);
    return new Response(
      JSON.stringify({ error: 'Terjadi kesalahan koneksi server CMS.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};
