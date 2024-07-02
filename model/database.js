const { MongoClient } = require('mongodb');

let db;

const connecToDb = async (callback) => {
    const connectionString = 'mongodb+srv://erubamigodstime:godstime@cse340.uclncjl.mongodb.net/Contacts';

    try {
        const client = await MongoClient.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true });
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

module.exports = { connecToDb, getDb };
