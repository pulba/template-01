import { db } from '../db/client';
import * as schema from '../db/schema';
import { eq, asc, and } from 'drizzle-orm';

export interface MenuItem {
  id: number;
  label: string;
  href: string;
  parentId: number | null;
  sortOrder: number;
  isActive: boolean;
  children?: MenuItem[];
}

/**
 * MENU SERVICE
 * Data access layer for Website Navigation.
 */
export const MenuService = {
  /**
   * Fetches all active menus and builds a tree structure.
   */
  async getMenuTree(): Promise<MenuItem[]> {
    const allMenus = await db.select()
      .from(schema.menus)
      .where(eq(schema.menus.isActive, true))
      .orderBy(asc(schema.menus.sortOrder));

    const map = new Map<number, MenuItem>();
    const roots: MenuItem[] = [];

    allMenus.forEach(item => {
      map.set(item.id, {
        id: item.id,
        label: item.label,
        href: item.href,
        parentId: item.parentId,
        sortOrder: item.sortOrder ?? 0,
        isActive: item.isActive ?? true,
        children: []
      });
    });

    allMenus.forEach(item => {
      const node = map.get(item.id)!;
      if (item.parentId && map.has(item.parentId)) {
        map.get(item.parentId)!.children!.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  }
};
