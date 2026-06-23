import { db } from '../db/client';
import * as schema from '../db/schema';
import * as mappers from '../mappers/homepage.mapper';
import { eq, asc, gte, and, ne } from 'drizzle-orm';
import type { AgendaItemData } from '@/types/homepage';

/**
 * AGENDA SERVICE
 * Data access layer for Agenda and Events module.
 */
export const AgendaService = {
  /**
   * Fetches all upcoming events.
   */
  async getAllAgendas(): Promise<AgendaItemData[]> {
    const todayStr = new Date().toLocaleDateString('sv');
    const result = await db.select()
      .from(schema.agendas)
      .where(gte(schema.agendas.eventDate, todayStr))
      .orderBy(asc(schema.agendas.eventDate));
    
    return result.map(mappers.mapAgenda);
  },

  /**
   * Fetches a single agenda by its slug.
   */
  async getAgendaBySlug(slug: string): Promise<AgendaItemData | null> {
    const result = await db.select()
      .from(schema.agendas)
      .where(eq(schema.agendas.slug, slug))
      .limit(1);
    
    return result[0] ? mappers.mapAgenda(result[0]) : null;
  },

  /**
   * Fetches related/upcoming agendas (excluding current).
   */
  async getRelatedAgendas(excludeSlug: string, limit = 3): Promise<AgendaItemData[]> {
    const todayStr = new Date().toLocaleDateString('sv');
    const result = await db.select()
      .from(schema.agendas)
      .where(and(
        ne(schema.agendas.slug, excludeSlug),
        gte(schema.agendas.eventDate, todayStr)
      ))
      .orderBy(asc(schema.agendas.eventDate))
      .limit(limit);
    
    return result.map(mappers.mapAgenda);
  }
};
