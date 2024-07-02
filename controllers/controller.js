const mongodb = require('../model/database')
const ObjectId = require('mongodb').ObjectId

const homePage = (req, res)=>{
    res.json({title: 'Home Page', body: 'This is the Home page'}); 

}
const getOne = async (req, res)=>{
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

const getAll = async (req, res)=>{
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

module.exports = {
    getOne,    
    getAll,
    homePage
}