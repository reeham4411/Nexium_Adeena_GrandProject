import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI!;

if (!uri) {
  throw new Error('Missing MongoDB URI environment variable');
}

const client = new MongoClient(uri);
let cachedDb: ReturnType<typeof client.db> | null = null;

export async function connectToMongo() {
  if (!cachedDb) {
    await client.connect();
    cachedDb = client.db("mental_health_tracker");
  }

  return { db: cachedDb };
}
