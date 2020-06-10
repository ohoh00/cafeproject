var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')
const bcr = require('bcryptjs')

var schema = require('mongoose').Schema
const userSchema = schema({
    email: String,
    password: String,
    imageProfile: String,
    name: String,
    phoneNumber: String,
    birth: Date,
    personalId: String,
    address: String,
    tumbon: String,
    amphoe: String,
    province: String,
    post: String
},{
    collection: 'owners'
})

//create or used existing collection
let User 
try {
    User = mongoose.model('owners')    
} catch (err) {
    User = mongoose.model('owners',userSchema)
}

async function makeHash(Text) {
    const res = await bcr.hash(Text,10)
    return res
}
//Save data to collection
function insertUser(dataUsers){
    return new Promise((res,rej) => {
        var new_user = new User({
            email: dataUsers.email,
            password: dataUsers.password,
            imageProfile: dataUsers.imageProfile,
            name: dataUsers.name,
            phoneNumber: dataUsers.phoneNumber,
            birth: dataUsers.birth,
            id: dataUsers.id,
            address: dataUsers.address,
            tumbon: dataUsers.tumbon,
            amphoe: dataUsers.amphoe,
            province: dataUsers.province,
            post: dataUsers.post

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
    makeHash(req.body.password).then(hashtext => {
        const payload ={
            email: req.body.email,
            password: hashtext,
            imageProfile: req.body.imageProfile,
            name: req.body.name,
            phoneNumber: req.body.phoneNumber,
            birth: req.body.birth,
            id: req.body.id,
            address: req.body.address,
            tumbon: req.body.tumbon,
            amphoe: req.body.amphoe,
            province: req.body.province,
            post: req.body.post
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
    .catch(err => {
        console.log(err)
    })
})
module.exports = router