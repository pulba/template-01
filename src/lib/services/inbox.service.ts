import { db } from '../db/client';
import * as schema from '../db/schema';

/**
 * INBOX SERVICE
 * Handles incoming communication from the contact form.
 */
export const InboxService = {
  /**
   * Saves a new message to the inbox table.
   */
  async saveMessage(data: {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
  }) {
    return await db.insert(schema.inbox).values({
      ...data,
      createdAt: new Date().toISOString(),
      isRead: false,
    });
  }
};
