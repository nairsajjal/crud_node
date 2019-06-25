const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EmployeeDB',{useNewUrlParser: true}, (err)=>{

if(!err){console.log('MongoDb connection successful')}
else {console.log('error in connecting to mongodb' + err)}
}); 
 
require('./employee.model');