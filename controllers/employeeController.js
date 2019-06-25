const express =  require('express');

var router = express();
const mongoose = require('mongoose');
const Employee = mongoose.model('Employee');

router.get('/',(req,res)=> {
    res.render("employee/addOrEdit",{
        viewTittle: "Insert Employee"
    });
});

router.post('/',(req,res)=> {
  console.log(req.body);
    insertRecord(req,res);

});


function insertRecord(req,res){
    var employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.mobile = req.body.mobile;
    employee.city = req.body.city;
    employee.save((err,doc) => {
        if(!err){
            res.redirect('employee/list');
        }
        else{

            if(err.name == 'ValidationError'){
            handleValidationError(err,req.body)
            res.render("employee/addOrEdit",{
                viewTittle: "Insert Employee",
                employee: req.body
            });
            }
            else
                console.log('error during recor insertion : '+ err);
        }
    });
}

router.get('/list', (req,res)=> {
    res.json('from list');
});

function handleValidationError(err,body){
   for(field in err.errors)
   {
       switch(err.errors[field].path){
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;

       }
   }
}
module.exports = router;