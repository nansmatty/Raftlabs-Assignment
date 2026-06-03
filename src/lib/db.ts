import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
	throw new Error('MONGODB_URI environment variable is not set');
}

type CachedConnection = {
	conn: typeof mongoose | null;
	promise: Promise<typeof mongoose> | null;
};

declare global {
	var mongooseCache: CachedConnection | undefined;
}

const cached: CachedConnection = global.mongooseCache || {
	conn: null,
	promise: null,
};

if (!global.mongooseCache) {
	global.mongooseCache = cached;
}

export async function connectDB() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		cached.promise = mongoose.connect(MONGODB_URI!, {
			dbName: 'raftlabs-order-management',
		});
	}

	cached.conn = await cached.promise;

	return cached.conn;
}
