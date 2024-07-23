const mongodb = require('../model/database')
const ObjectId = require('mongodb').ObjectId

const homePage = (req, res)=>{
    res.json({title: 'Home Page', body: 'This is the Home page'}); 

}
const getOneUser = async (req, res)=>{
    try{
        let userId = req.params.id
        if (!ObjectId.isValid(userId)) {
            res.status(400).send('Invalid ObjectId');
            return;
        }
         userId = new ObjectId(req.params.id);
        console.log('connected to database')
        const collection = mongodb.getDb().collection('users');
        const count = await collection.countDocuments();
        console.log(`The number of users in the collection is ${count}`);
        if (count === 0) {
            console.log('user collection is empty');
          }

          const result = await collection.find({_id: userId});
          if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }
          const lists = await result.toArray();     
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(lists[0]);
    }
    catch(err){
        console.log(err);
        res.status(500).send('An error occured while retrieving the data')
    }

}

const getAllUsers = async (req, res)=>{
    try{
        console.log('connected to database')
        const collection = mongodb.getDb().collection('users');
        const count = await collection.countDocuments();
        console.log(`The number of users in the collection is ${count}`);
        if (count === 0) {
            console.log('user collection is empty');
          }

          const result = await collection.find();
          if (!result) {
            return res.status(404).json({ error: 'User not found' });
        }
          const lists = await result.toArray();     
          res.setHeader('Content-Type', 'application/json');
          res.status(200).json(lists);
    }
    catch(err){
        console.log(err);
        res.status(500).send('An error occured while retrieving the data')

}
}

const updateUsers = async(req, res) =>{
    try{
        let userId = req.params.id
        if (!ObjectId.isValid(userId)) {
            res.status(400).send('Invalid ObjectId');
            return;
        }
        userId = new ObjectId(req.params.id);        
        const collection = await mongodb.getDb().collection('users');
        const result = await collection.updateOne({_id: userId}, {$set: req.body}, {upsert:true}) 
        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);           
        res.setHeader('Content-Type', 'application/json');
          
    }
    catch(err){
        console.log(err);
        res.status(500).send('An error occured while updating the data')
    }

};
const deleteUsers =  async(req, res) =>{
    try{
        let userId = req.params.id
        if (!ObjectId.isValid(userId)) {
            res.status(400).send('Invalid ObjectId');
            return;
        }
         userId = new ObjectId(req.params.id);        
        const collection = await mongodb.getDb().collection('users');
        const count = await collection.countDocuments();
        console.log(`there are ${count} document in the collection before deleting `)
        const result = await collection.deleteOne({_id: userId}) 
        console.log(`${result.deletedCount} Document were deleted`)    
        const newCount = await collection.countDocuments();

        console.log(`Now there are ${newCount} document in the collection after deleting `)

    
            
          
    }
    catch(err){
        console.log(err);
        res.status(500).send('An error occured while retrieving the data')
    }

}


const createUsers =  async(req, res) =>{
    try{
        let number = 1;
        const collection = await   mongodb.getDb().collection('users');
        const count = await collection.countDocuments();
        console.log(`The number of users in the collection before inserting is ${count}`)
        collection.insertOne(req.body)  
        number += count      
               
        if (number < count) {
            console.log('User not added');
          }
        else{ 
            console.log('User Added succesfuly')
            console.log(collection.insertedCount);
            const newCount = await collection.countDocuments();
            console.log(`The number of users in the collection after inserting is ${newCount}`)
        }
      
    }
    catch(err){
        console.log(err);
        res.status(500).send('An error occured while creating the user')
    }
    

}
module.exports = {
    getOneUser,    
    getAllUsers,
    homePage,
    updateUsers,
    deleteUsers,
    createUsers
}