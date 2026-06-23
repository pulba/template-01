import { db } from '../db/client';
import * as schema from '../db/schema';
import { eq, asc } from 'drizzle-orm';

export interface Major {
  id: number;
  name: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  thumbnail: string | null;
  seoTitle: string | null;
  seoDescription: string | null;
  isActive: boolean;
  sortOrder: number;
  createdAt: string | null;
  updatedAt: string | null;
}

/**
 * MAJOR SERVICE
 * Data access layer for School Majors / Program Keahlian.
 */
export const MajorService = {
  /**
   * Fetches all active majors, sorted by sortOrder.
   */
  async getActiveMajors(): Promise<Major[]> {
    try {
      const results = await db.select()
        .from(schema.majors)
        .where(eq(schema.majors.isActive, true))
        .orderBy(asc(schema.majors.sortOrder));
      return results as Major[];
    } catch (err) {
      console.error('[MajorService] Failed to fetch active majors:', err);
      return [];
    }
  },

  /**
   * Fetches a single active major by its slug.
   */
  async getMajorBySlug(slug: string): Promise<Major | null> {
    try {
      const results = await db.select()
        .from(schema.majors)
        .where(eq(schema.majors.slug, slug))
        .limit(1);
      
      const major = results[0];
      if (!major || !major.isActive) return null;
      return major as Major;
    } catch (err) {
      console.error(`[MajorService] Failed to fetch major by slug (${slug}):`, err);
      return null;
    }
  }
};
