import { db } from '../db/client';
import * as schema from '../db/schema';
import * as mappers from '../mappers/homepage.mapper';
import { eq, asc, desc } from 'drizzle-orm';
import type { GalleryImage, GalleryAlbum } from '@/types/homepage';

/**
 * GALLERY SERVICE
 * Data access layer for Gallery and Media module.
 */
export const GalleryService = {
  /**
   * Fetches all gallery albums.
   */
  async getAllAlbums(): Promise<GalleryAlbum[]> {
    const result = await db.select()
      .from(schema.galleryAlbums)
      .orderBy(desc(schema.galleryAlbums.createdAt));

    return result.map(mappers.mapAlbum);
  },

  /**
   * Fetches an album by slug.
   */
  async getAlbumBySlug(slug: string): Promise<GalleryAlbum | null> {
    const result = await db.select()
      .from(schema.galleryAlbums)
      .where(eq(schema.galleryAlbums.slug, slug))
      .limit(1);

    return result[0] ? mappers.mapAlbum(result[0]) : null;
  },

  /**
   * Fetches images by album ID.
   */
  async getImagesByAlbumId(albumId: number): Promise<GalleryImage[]> {
    const result = await db.select()
      .from(schema.galleries)
      .where(eq(schema.galleries.albumId, albumId))
      .orderBy(asc(schema.galleries.sortOrder));

    return result.map(mappers.mapGallery);
  },

  /**
   * Fetches all gallery images.
   */
  async getAllImages(): Promise<GalleryImage[]> {
    const result = await db.select()
      .from(schema.galleries)
      .orderBy(asc(schema.galleries.sortOrder));

    return result.map(mappers.mapGallery);
  },

  /**
   * Fetches featured images for the homepage preview.
   */
  async getFeaturedImages(limit = 6): Promise<GalleryImage[]> {
    const result = await db.select()
      .from(schema.galleries)
      .where(eq(schema.galleries.isFeatured, true))
      .orderBy(asc(schema.galleries.sortOrder))
      .limit(limit);

    return result.map(mappers.mapGallery);
  }
};
