import { db } from '../db/client';
import * as schema from '../db/schema';
import * as mappers from '../mappers/homepage.mapper';
import { asc, eq } from 'drizzle-orm';
import type { Extracurricular } from '@/types/homepage';

/**
 * EXTRACURRICULAR SERVICE
 * Data access layer for Extracurricular Directory module.
 */
export const ExtracurricularService = {
  /**
   * Fetches all active extracurriculars ordered by priority.
   */
  async getAllExtracurriculars(): Promise<Extracurricular[]> {
    const result = await db.select()
      .from(schema.extracurriculars)
      .where(eq(schema.extracurriculars.isActive, true))
      .orderBy(asc(schema.extracurriculars.sortOrder));
    
    return result.map(mappers.mapExtracurricular);
  }
};
