/**
 * ADMISSION SERVICE
 * Fetches admission data from the CMS API (headless backend).
 * Used in SSR frontmatter — no client-side calls needed for initial render.
 */

const CMS_URL = import.meta.env.PUBLIC_CMS_URL || 'http://localhost:4321';

export interface AdmissionProgram {
  id: number;
  title: string;
  slug: string;
  academicYear: string;
  isActive: boolean;
  registrationOpen: boolean;
  startDate: string | null;
  endDate: string | null;
  enableMajorSelection: boolean;
  maxApplicants: number | null;
  autoCloseWhenFull: boolean;
  description: string | null;
  totalRegistrations: number;
  activeStep?: number;
  examDate?: string | null;
  announcementDate?: string | null;
  reRegistrationDate?: string | null;
}

export interface AdmissionMajor {
  id: number;
  programId: number;
  name: string;
  slug: string;
  description: string | null;
  quota: number;
  currentApplicants: number;
  isActive: boolean;
}

export const AdmissionService = {
  /**
   * Fetch all active admission programs from CMS.
   * Called in Astro frontmatter (SSR) — no client waterfall.
   */
  async getActivePrograms(): Promise<AdmissionProgram[]> {
    try {
      const res = await fetch(`${CMS_URL}/api/admissions/programs`, {
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      });
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      console.error('[AdmissionService] Failed to fetch programs:', err);
      return [];
    }
  },

  /**
   * Fetch active majors for a specific program from CMS.
   * Called in Astro frontmatter (SSR) for programs with enableMajorSelection.
   */
  async getMajorsByProgram(programId: number): Promise<AdmissionMajor[]> {
    try {
      const res = await fetch(`${CMS_URL}/api/admissions/majors?programId=${programId}`, {
        headers: { 'Accept': 'application/json' },
        cache: 'no-store',
      });
      if (!res.ok) return [];
      return await res.json();
    } catch (err) {
      console.error('[AdmissionService] Failed to fetch majors:', err);
      return [];
    }
  },
};
