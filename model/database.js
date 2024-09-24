const { MongoClient } = require('mongodb');
const dotenv = require('dotenv')
dotenv.config()

let db;

const connecToDb = async (callback) => {
    const connectionString = process.env.MONGODB_URL;

    try {
        const client = await MongoClient.connect(connectionString, );
        db = client.db(); 
        console.log('Connected to MongoDB');
        callback(null, db); 
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
        callback(error, null); 
    } 
    
};

const getDb = () => {
    if (!db) {
        throw new Error('Database not initialized. Call connecToDb first.');
    }
    return db;
};

module.exports = { connecToDb, getDb,  };
