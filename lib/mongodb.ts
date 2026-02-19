import { MongoClient, Db, Collection, ObjectId } from 'mongodb';

const MONGODB_URI = process.env.MONGODB_URI || '';

if (!MONGODB_URI) {
  console.warn('MONGODB_URI not set - database operations will fail');
}

let cached: { client: MongoClient; db: Db } | null = null;

export async function getDb(): Promise<Db> {
  if (cached) return cached.db;

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  const db = client.db('ticketwatch');
  cached = { client, db };
  return db;
}

// Collection helpers
export async function getUsersCollection(): Promise<Collection> {
  const db = await getDb();
  return db.collection('users');
}

export async function getWatchesCollection(): Promise<Collection> {
  const db = await getDb();
  return db.collection('watches');
}

export async function getAlertsCollection(): Promise<Collection> {
  const db = await getDb();
  return db.collection('alerts');
}

// Database operations (ported from database.py)

export async function createUser(userId: string, phone: string) {
  const users = await getUsersCollection();
  await users.updateOne(
    { _id: userId as any },
    {
      $set: { phone, lastActivity: new Date() },
      $setOnInsert: { tier: 'free', createdAt: new Date(), conversationState: null },
    },
    { upsert: true }
  );
}

export async function getUser(userId: string) {
  const users = await getUsersCollection();
  return users.findOne({ _id: userId as any });
}

export async function getUserTier(userId: string): Promise<string> {
  const user = await getUser(userId);
  return user?.tier || 'free';
}

export async function setConversationState(userId: string, state: any) {
  const users = await getUsersCollection();
  await users.updateOne({ _id: userId as any }, { $set: { conversationState: state } });
}

export async function getConversationState(userId: string) {
  const user = await getUser(userId);
  return user?.conversationState || null;
}

export async function createWatch(
  userId: string,
  eventId: string,
  eventName: string,
  venue: string,
  dateStart: string,
  maxPrice: number | null,
  quantity: number,
  buyUrl: string
): Promise<string | null> {
  const watches = await getWatchesCollection();

  // Check for duplicate
  const existing = await watches.findOne({ userId, eventId, status: 'active' });
  if (existing) return null;

  const result = await watches.insertOne({
    userId,
    eventId,
    eventName,
    venue,
    dateStart,
    maxPrice,
    quantity,
    status: 'active',
    buyUrl,
    createdAt: new Date(),
    lastChecked: null,
    alertedAt: null,
  });

  return result.insertedId.toString();
}

export async function getUserWatches(userId: string, status = 'active') {
  const watches = await getWatchesCollection();
  return watches.find({ userId, status }).sort({ createdAt: -1 }).toArray();
}

export async function getActiveWatches() {
  const watches = await getWatchesCollection();
  return watches.find({ status: 'active' }).sort({ lastChecked: 1 }).toArray();
}

export async function updateWatchStatus(watchId: string, status: string) {
  const watches = await getWatchesCollection();
  await watches.updateOne(
    { _id: new ObjectId(watchId) },
    { $set: { status, lastChecked: new Date() } }
  );
}

export async function cancelWatch(watchId: string) {
  const watches = await getWatchesCollection();
  await watches.updateOne(
    { _id: new ObjectId(watchId) },
    { $set: { status: 'cancelled' } }
  );
}

export async function countActiveWatches(userId: string): Promise<number> {
  const watches = await getWatchesCollection();
  return watches.countDocuments({ userId, status: 'active' });
}

export async function recordAlert(
  watchId: string,
  userId: string,
  eventName: string,
  currentPrice: number
) {
  const alerts = await getAlertsCollection();
  await alerts.insertOne({
    watchId: new ObjectId(watchId),
    userId,
    eventName,
    currentPrice,
    sentAt: new Date(),
  });

  const watches = await getWatchesCollection();
  await watches.updateOne(
    { _id: new ObjectId(watchId) },
    { $set: { status: 'alerted', alertedAt: new Date() } }
  );
}
