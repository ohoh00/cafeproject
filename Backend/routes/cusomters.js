var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')

var schema = require('mongoose').Schema
const userSchema = schema({
    email: String,
    name: String,
    phoneNumber: String,
    birth: Date

},{
    collection: 'customers'
})

//create or used existing collection
let User 
try {
    User = mongoose.model('customers')    
} catch (err) {
    User = mongoose.model('customers',userSchema)
}
//Save data to collection
function insertUser(dataUsers){
    return new Promise((res,rej) => {
        var new_user = new User({
            email: dataUsers.email,
            name: dataUsers.name,
            phoneNumber: dataUsers.phoneNumber,
            birth: dataUsers.birth

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

router.route('/signup').post((req,res) => {
        const payload ={
            email: req.body.email,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            birth: req.body.birth
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