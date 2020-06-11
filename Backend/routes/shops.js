var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')

var schema = require('mongoose').Schema
const shopSchema = schema({
    time: String,
    imageProfile: String,
    name: String,
    description: String,
    phoneNumber: String,
    address: String,
    tumbon: String,
    amphoe: String,
    province: String,
    post: String
},{
    collection: 'shops'
})

//create or used existing collection
let Shop 
try {
    Shop = mongoose.model('shops')    
} catch (err) {
    Shop = mongoose.model('shops',shopSchema)
}

function getShop(id){
    return new Promise((resolve, reject) => {
      Shop.findById(id,(err,data) => {
          if(err)
            reject(new Error('Connot get shop'))
          else
            if(data)
                resolve(data)
            else
                reject(new Error(`Shop ID ${id} is not exist`))
      })
    }) 
}

function getAllShops(){
    return new Promise((resolve, reject) => {
        Shop.find({},(err,data) => {
          if (err) {
              reject(new Error('Cannot get shops'))
          } else {
              if(data){
                  resolve(data)
              }
              else{
                reject(new Error('Cannot get shops'))
              }
          }
      })
    })   
}
function insertShop(shopDetails){
    return new Promise((res,rej) => {
        var new_user = new Shop({
            time: shopDetails.time,
           
            imageProfile: shopDetails.imageProfile,
            name: shopDetails.name,
            description: shopDetails.description,
            phoneNumber: shopDetails.phoneNumber,
            address: shopDetails.address,
            tumbon: shopDetails.tumbon,
            amphoe: shopDetails.amphoe,
            province: shopDetails.province,
            post: shopDetails.post

        })
        new_user.save((err,data) => {
            if(err){
                rej(new Error('Cannot insert shops to DB'))
            }
            else{
                res({message: 'Add Shop successfully'})
            }
        })
    })
}

router.route('/addshop').post((req,res) => {
        const payload ={
            time: req.body.time,
            imageProfile: req.body.imageProfile,
            name: req.body.name,
            description: req.body.description,
            phoneNumber: req.body.phoneNumber,
            address: req.body.address,
            tumbon: req.body.tumbon,
            amphoe: req.body.amphoe,
            province: req.body.province,
            post: req.body.post
        }
        console.log(payload)
        insertShop(payload)
        .then(ress => {
            console.log(ress)
            res.status(200).json(ress)
        })
        .catch(err => {
            console.log(err)
        })

})

router.route('/getshop/:id').get((req,res) => {
    const id = req.params.id
    getShop(id).then( result => {
        if(data)
            res.status(200).json(result)
        else
            res.status(404).send({message : `Cannot find shop with ID  ${id}`})
    }).catch( err => {
        res.status(500).send({message: `Error: ${err}`})
    })
})

router.route('/getshop').get((req,res) => {
    getAllShops().then( result => {
        if(data)
            res.status(200).json(result)
        else
            res.status(204).send({message : `Document is empty.`})
    })
    .catch( err => {
        res.status(500).send({message: `Eroor: ${err}`})
    })
})
module.exports = router