import { db } from '../db/client';
import * as schema from '../db/schema';

/**
 * SCHOOL SERVICE
 * Data access layer for Institutional Profile module.
 */
export const SchoolService = {
  /**
   * Fetches the singleton school profile settings.
   */
  async getProfile() {
    const result = await db.select()
      .from(schema.schoolProfile)
      .limit(1);
    
    const profile = result[0];
    
    if (!profile) return null;

    // Parse JSON fields safely
    let missionItems: string[] = [];
    try {
      missionItems = JSON.parse(profile.missionItems || '[]') as string[];
    } catch {
      missionItems = [];
    }

    let principalMessage: string[] = [];
    try {
      principalMessage = JSON.parse(profile.principalMessage || '[]') as string[];
    } catch {
      principalMessage = [profile.principalMessage || ''];
    }

    return {
      ...profile,
      missionItems,
      principalMessage,
    };
  }
};
