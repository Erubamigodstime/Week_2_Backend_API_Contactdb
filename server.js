const express = require('express');
const app = express();
 const {connecToDb} = require('./model/database');
 const port = process.env.PORT || 8000




//  database connection
 connecToDb((err)=>{
  if (!err) {
    app.listen( port, () => {
      console.log('Web Server is listening at port ' + ( port));
    })   
  }  
 })




app.use('/', require('./routes/index'))

