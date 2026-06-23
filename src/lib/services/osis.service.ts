import { db } from '../db/client';
import { osisMembers } from '../db/schema';

export interface OsisMember {
  id: number;
  name: string;
  position: string | null;
  photo: string | null;
  description: string | null;
}

export class OsisService {
  /**
   * Retrieves all OSIS members.
   * Can be extended later with sorting if `sortOrder` is added.
   */
  static async getMembers(): Promise<OsisMember[]> {
    try {
      const members = await db.select().from(osisMembers);
      return members;
    } catch (error) {
      console.error('Error fetching OSIS members:', error);
      return [];
    }
  }
}
