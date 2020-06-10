var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')

var schema = require('mongoose').Schema
const orderSchema = schema({
    order: String,
    totalPrice: Number,
    paymentStatus: Boolean,
    paymentDate: Date
},{
    collection: 'orders'
})

//create or used existing collection
let Orders 
try {
    Orders = mongoose.model('orders')    
} catch (err) {
    Orders = mongoose.model('orders',orderSchema)
}

function getOrder(id){
    return new Promise((resolve, reject) => {
        Orders.findById(id,(err,data) => {
          if(err)
            reject(new Error('Connot get order'))
          else
            if(data)
                resolve(data)
            else
                reject(new Error(`Order ID ${id} is not exist`))
      })
    }) 
}

function getAllOrders(){
    return new Promise((resolve, reject) => {
        Orders.find({},(err,data) => {
          if (err) {
              reject(new Error('Cannot get orders'))
          } else {
              if(data){
                  resolve(data)
              }
              else{
                reject(new Error('Cannot get orders'))
              }
          }
      })
    })   
}
function addOrder(orderDetails){
    return new Promise((res,rej) => {
        var new_user = new Orders({
            order: orderDetails.order,
            totalPrice: orderDetails.totalPrice,
            paymentStatus: orderDetails.paymentStatus,
            paymentDate: orderDetails.paymentDate

        })
        new_user.save((err,data) => {
            if(err){
                rej(new Error('Cannot insert order to DB'))
            }
            else{
                res({message: 'Add order successfully'})
            }
        })
    })
}

router.route('/addOrder').post((req,res) => {
        const payload ={
            order: req.body.order,
            totalPrice: req.body.totalPrice,
            paymentStatus: req.body.paymentStatus,
            paymentDate: req.body.paymentDate
        }
        console.log(payload)
        addOrder(payload)
        .then(ress => {
            console.log(ress)
            res.status(200).json(ress)
        })
        .catch(err => {
            console.log(err)
        })

})

router.route('/getdOrder/:id').get((req,res) => {
    const id = req.params.id
    getOrder(id).then( result => {
        if(data)
            res.status(200).json(result)
        else
            res.status(404).send({message : `Cannot find order with ID  ${id}`})
    }).catch( err => {
        res.status(500).send({message: `Error: ${err}`})
    })
})

router.route('/getshop').get((req,res) => {
    getAllOrders().then( result => {
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