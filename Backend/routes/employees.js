var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')

var schema = require('mongoose').Schema
const userSchema = schema({
    email: String,
    name: String,
    phoneNumber: String,
    position: String

},{
    collection: 'employees'
})

//create or used existing collection
let Employees 
try {
    Employees = mongoose.model('employees')    
} catch (err) {
    Employees = mongoose.model('employees',userSchema)
}


//Save data to collection
function insertUser(dataUsers){
    return new Promise((res,rej) => {
        var new_user = new Employees({
            email: dataUsers.email,
            name: dataUsers.name,
            phoneNumber: dataUsers.phoneNumber,
            position: dataUsers.position

        })
        new_user.save((err,data) => {
            if(err){
                rej(new Error('Cannot insert user to DB'))
            }
            else{
                res({message: 'Singn up successfully'})
            }
        })
    })
}
function getUser(id){
    return new Promise((resolve, reject) => {
        Employees.findById(id,(err,data) => {
            if(err)
              reject(new Error('Connot get employee'))
            else
              if(data)
                  resolve(data)
              else
                  reject(new Error(`Employee ID ${id} is not exist`))
        })
    })
    
}

router.route('/getEmployee/:id').get((req,res) => {
    const id = req.params.id
    getUser(id).then( result => {
        if(data)
            res.status(200).json(result)
        else
            res.status(404).send({message : `Cannot find employee with ID  ${id}`})
    }).catch( err => {
        res.status(500).send({message: `Error: ${err}`})
    })
})
router.route('/signup').post((req,res) => {
        const payload ={
            email: req.body.email,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            birth: req.body.position
        }
        console.log(payload)
        insertUser(payload)
        .then(ress => {
            console.log(ress)
            res.status(200).json(ress)
        })
        .catch(err => {
            console.log(err)
        })
})
module.exports = router