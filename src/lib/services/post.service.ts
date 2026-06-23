import { db } from '../db/client';
import * as schema from '../db/schema';
import * as mappers from '../mappers/homepage.mapper';
import { eq, desc, ne, and, count, like } from 'drizzle-orm';
import type { NewsPost } from '@/types/homepage';

/**
 * POST SERVICE
 * Data access layer for News module.
 */
export const PostService = {
  /**
   * Fetches all published news posts.
   */
  async getAllPosts(): Promise<NewsPost[]> {
    const result = await db.select()
      .from(schema.posts)
      .where(eq(schema.posts.status, 'published'))
      .orderBy(desc(schema.posts.createdAt));
    
    return result.map(mappers.mapNews);
  },

  /**
   * Fetches paginated published news posts.
   */
  async getPostsPaginated(page: number = 1, limit: number = 9): Promise<NewsPost[]> {
    const offset = (page - 1) * limit;
    const result = await db.select()
      .from(schema.posts)
      .where(eq(schema.posts.status, 'published'))
      .orderBy(desc(schema.posts.createdAt))
      .limit(limit)
      .offset(offset);
    
    return result.map(mappers.mapNews);
  },

  /**
   * Gets total count of published posts.
   */
  async getTotalPosts(): Promise<number> {
    const result = await db.select({ value: count() })
      .from(schema.posts)
      .where(eq(schema.posts.status, 'published'));
    
    return result[0]?.value || 0;
  },

  /**
   * Fetches paginated published news posts by category.
   */
  async getPostsByCategoryPaginated(category: string, page: number = 1, limit: number = 9): Promise<NewsPost[]> {
    const offset = (page - 1) * limit;
    const result = await db.select()
      .from(schema.posts)
      .where(and(
        eq(schema.posts.status, 'published'),
        like(schema.posts.tags, `%${category}%`)
      ))
      .orderBy(desc(schema.posts.createdAt))
      .limit(limit)
      .offset(offset);
    
    return result.map(mappers.mapNews);
  },

  /**
   * Gets total count of published posts by category.
   */
  async getTotalPostsByCategory(category: string): Promise<number> {
    const result = await db.select({ value: count() })
      .from(schema.posts)
      .where(and(
        eq(schema.posts.status, 'published'),
        like(schema.posts.tags, `%${category}%`)
      ));
    
    return result[0]?.value || 0;
  },

  /**
   * Gets all distinct categories from published posts.
   */
  async getAllCategories(): Promise<string[]> {
    const result = await db.select({ tags: schema.posts.tags })
      .from(schema.posts)
      .where(eq(schema.posts.status, 'published'));
    
    const categories = new Set<string>();
    result.forEach(row => {
      if (row.tags) {
        row.tags.split(',').forEach(tag => {
          const trimmed = tag.trim().toUpperCase();
          if (trimmed) categories.add(trimmed);
        });
      }
    });
    // Default to 'BERITA' if empty, otherwise return sorted
    const cats = Array.from(categories).sort();
    return cats.length > 0 ? cats : ['BERITA'];
  },

  /**
   * Gets all distinct categories with counts and latest post details (image, etc.) in a single query.
   */
  async getAllCategoriesWithDetails(): Promise<{
    categories: string[];
    counts: Record<string, number>;
    thumbnails: Record<string, string>;
  }> {
    const result = await db.select({
      tags: schema.posts.tags,
      image: schema.posts.featuredImage,
      createdAt: schema.posts.createdAt
    })
      .from(schema.posts)
      .where(eq(schema.posts.status, 'published'))
      .orderBy(desc(schema.posts.createdAt));

    const counts: Record<string, number> = {};
    const categories = new Set<string>();

    result.forEach(row => {
      if (row.tags) {
        row.tags.split(',').forEach(tag => {
          const trimmed = tag.trim().toUpperCase();
          if (trimmed) {
            categories.add(trimmed);
            counts[trimmed] = (counts[trimmed] || 0) + 1;
          }
        });
      }
    });

    const sortedCategories = Array.from(categories).sort();
    const thumbnails: Record<string, string> = {};

    // For each category, resolve the first (latest) post that has this tag
    sortedCategories.forEach(cat => {
      const match = result.find(row =>
        row.tags?.split(',').map(t => t.trim().toUpperCase()).includes(cat)
      );
      thumbnails[cat] = match?.image || 'https://via.placeholder.com/400x300';
    });

    return {
      categories: sortedCategories.length > 0 ? sortedCategories : ['BERITA'],
      counts: sortedCategories.length > 0 ? counts : { 'BERITA': result.length },
      thumbnails
    };
  },

  /**
   * Fetches a single post by its slug.
   */
  async getPostBySlug(slug: string): Promise<NewsPost | null> {
    const result = await db.select()
      .from(schema.posts)
      .where(and(
        eq(schema.posts.slug, slug),
        eq(schema.posts.status, 'published')
      ))
      .limit(1);
    
    return result[0] ? mappers.mapNews(result[0]) : null;
  },

  /**
   * Fetches related posts (excluding current).
   */
  async getRelatedPosts(excludeSlug: string, limit = 3): Promise<NewsPost[]> {
    const result = await db.select()
      .from(schema.posts)
      .where(and(
        ne(schema.posts.slug, excludeSlug),
        eq(schema.posts.status, 'published')
      ))
      .orderBy(desc(schema.posts.createdAt))
      .limit(limit);
    
    return result.map(mappers.mapNews);
  },

  /**
   * Fetches most viewed posts.
   */
  async getPopularPosts(limit = 3): Promise<NewsPost[]> {
    const result = await db.select()
      .from(schema.posts)
      .where(eq(schema.posts.status, 'published'))
      .orderBy(desc(schema.posts.viewCount))
      .limit(limit);
    
    return result.map(mappers.mapNews);
  }
};
