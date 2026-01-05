import { eq, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, ContactRequest, InsertContactRequest, contactRequests } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createContactRequest(data: InsertContactRequest): Promise<ContactRequest | null> {
  const db = await getDb();
  if (!db) {
    console.warn('[Database] Cannot create contact request: database not available');
    return null;
  }

  try {
    await db.insert(contactRequests).values(data);
    // Fetch the most recently created record
    const [created] = await db
      .select()
      .from(contactRequests)
      .orderBy((t) => desc(t.createdAt))
      .limit(1);
    return created || null;
  } catch (error) {
    console.error('[Database] Failed to create contact request:', error);
    throw error;
  }
}

export async function getContactRequests(limit: number = 50, offset: number = 0) {
  const db = await getDb();
  if (!db) {
    console.warn('[Database] Cannot get contact requests: database not available');
    return [];
  }

  try {
    return await db
      .select()
      .from(contactRequests)
      .orderBy((t) => t.createdAt)
      .limit(limit)
      .offset(offset);
  } catch (error) {
    console.error('[Database] Failed to get contact requests:', error);
    throw error;
  }
}

export async function updateContactRequestStatus(
  id: number,
  status: 'new' | 'contacted' | 'qualified' | 'archived'
): Promise<void> {
  const db = await getDb();
  if (!db) {
    console.warn('[Database] Cannot update contact request: database not available');
    return;
  }

  try {
    await db
      .update(contactRequests)
      .set({ status, updatedAt: new Date() })
      .where(eq(contactRequests.id, id));
  } catch (error) {
    console.error('[Database] Failed to update contact request:', error);
    throw error;
  }
}

// TODO: add feature queries here as your schema grows.
