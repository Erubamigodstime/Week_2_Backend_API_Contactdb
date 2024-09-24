const mongodb = require('../model/database')
const ObjectId = require('mongodb').ObjectId



/**
 * @swagger
 * /user/homepage:
 *   get:
 *     summary: Get the homepage
 *     description: Retrieve the homepage
 *     responses:
 *       200:
 *         description: Home page retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 body:
 *                   type: string
 *       500:
 *         description: Internal Server Error
 */
const homePage = (req, res)=>{
    res.json({title: 'Home Page', body: 'This is the Home page'}); 

}





/**
 * @swagger
 * /user/create:
 *   post:
 *     summary: Create a new user
 *     description: Create a new user in the database
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               _id:
 *                 type: integer
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               favouriteColor:
 *                 type: string
 *               birthdate:
 *                 type: string
 *     responses:
 *       200:
 *         description: User created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: integer
 *                 firstName:
 *                   type: string
 *                 lastName:
 *                   type: string
 *                 favouriteColor:
 *                   type: string
 *                 birthdate:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
const createUsers = async (req, res) => {
    try {
        let number = 1;
        const collection = await mongodb.getDb().collection('users');
        const count = await collection.countDocuments();
        console.log(`The number of users in the collection before inserting is ${count}`);
        
        // Insert user into the collection
        const result = await collection.insertOne(req.body);
        number += count;

        if (result.insertedCount === 0) {
            console.log('User not added');
            return res.status(400).send('User not added');
        }

        console.log('User added successfully');
        const newCount = await collection.countDocuments();
        console.log(`The number of users in the collection after inserting is ${newCount}`);

        res.status(200).json({ message: 'User created successfully' });
    } catch (err) {
        console.log(err);
        res.status(500).send('An error occurred while creating the user');
    }
};



/**
 * @swagger
 * /user/getOne/{id}:
 *   get:
 *     summary: Get a User by ID
 *     description: Retrieve a user by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user_id:
 *                   type: integer
 *                 firstName:
 *                   type: boolean
 *                 lastName:
 *                   type: string
 *                 favouriteColor:
 *                   type: string
 *                 Birthdate:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
const getOneUser = async (req, res)=>{
    try{
        let userId = req.params.id
        if (!ObjectId.isValid(userId)) {
            res.status(400).send('Invalid ObjectId');
            return;
        }
        userId = new ObjectId(req.params.id);
        const collection = mongodb.getDb().collection('users');
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


/**
 * @swagger
 * /user/getAll:
 *   get:
 *     summary: Get all Users
 *     description: Retrieve all users
 *     responses:
 *       200:
 *         description: Users retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties: 
 *                   user_id:
 *                     type: integer
 *                   firstName:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   FavouriteColor:
 *                     type: string
 *                   Birthdate:
 *                     type: string
 *       500:
 *         description: Internal Server Error
 */
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


/**
 * @swagger
 * /user/update/{id}:
 *   post:
 *     summary: Update a user by ID
 *     description: Update an existing user in the database by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               favouriteColour:
 *                 type: string
 *               birthdate:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully
 *       400:
 *         description: Invalid ObjectId
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
const updateUsers = async(req, res) =>{
    try{
        // let userId = req.params.id
        // if (!ObjectId.isValid(userId)) {
        //     res.status(400).send('Invalid ObjectId');
        //     return;
        // }
        // const collection = await mongodb.getDb.collection('users')
        // userId = new ObjectId(req.params.id);        
        // const existingUser = await collection.findOne({_id: new ObjectId(userId)})
        // if (!existingUser) {
        //     res.status(404).send('User not found');
        //     return;
        // }
        // const{_id, ...editableFields} = existingUser

        // res.status(200).json({data: editableFields})

        // const updatedFields = req.body;
        // const updatedUser = await collection.updateOne(
        //  { _id: new ObjectId(userId) },
        //  { $set: updatedFields},
        //  { upsert: true }
        //  );
        // console.log(`${updatedUser.matchedCount} document(s) matched the query criteria.`);
        // console.log(`${updatedUser.modifiedCount} document(s) was/were updated.`);      
                  
        // res.setHeader('Content-Type', 'application/json');
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
        res.status(200).send('User has been updated')
          
    }
    catch(err){
        console.log(err);
        res.status(500).send('An error occured while updating the data')
    }

};


/**
 * @swagger
 * /user/delete/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     description: Delete a user from the database by their ID
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       400:
 *         description: Invalid ObjectId
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */
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
        res.status(200).send('`${result.deletedCount} Document were deleted`')   
        const newCount = await collection.countDocuments();

        console.log(`Now there are ${newCount} document in the collection after deleting `)

    
            
          
    }
    catch(err){
        console.log(err);
        res.status(500).send('An error occured while retrieving the data')
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