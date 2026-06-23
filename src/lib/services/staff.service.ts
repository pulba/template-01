import { db } from '../db/client';
import * as schema from '../db/schema';
import * as mappers from '../mappers/homepage.mapper';
import { asc } from 'drizzle-orm';
import type { StaffMember } from '@/types/homepage';

/**
 * STAFF SERVICE
 * Data access layer for Teacher and Staff Directory module.
 */
export const StaffService = {
  /**
   * Fetches all staff members ordered by priority.
   */
  async getAllStaff(): Promise<StaffMember[]> {
    const result = await db.select()
      .from(schema.staff)
      .orderBy(asc(schema.staff.sortOrder));
    
    return result.map(mappers.mapStaff);
  }
};
