import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';

if (!uri) {
	throw new Error('MONGODB_URI environment variable is not set');
}

let client: MongoClient;

declare global {
	var _mongoClient: MongoClient | undefined;
}

if (process.env.NODE_ENV === 'development') {
	if (!global._mongoClient) {
		global._mongoClient = new MongoClient(uri);
	}
	client = global._mongoClient;
} else {
	client = new MongoClient(uri);
}

export async function connectDB() {
	await client.connect();
	return client.db('raftlabs-order-management');
}
