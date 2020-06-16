var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')

var schema = require('mongoose').Schema
const orderSchema = schema({
    menu: Array,
    totalPrice: Number,
    paymentStatus: Boolean,
    paymentDate: Date,
    quantity:Number,
    paymentMethod:String,
    customerPhoneNumber:String,
    shop:String

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



function getOrder(id,shop){
    return new Promise((resolve, reject) => {

        Orders.findd({_id:id,shop:shop},(err,data) => {
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

function getAllOrders(id,shop){

    return new Promise((resolve, reject) => {
        Orders.find({paymentStatus:id,shop:shop},(err,data) => {
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
            menu: orderDetails.menu,
            totalPrice: orderDetails.totalPrice,
            paymentStatus: orderDetails.paymentStatus,
            paymentDate: orderDetails.paymentDate,
            paymentMethod:orderDetails.paymentMethod,
            quantity:orderDetails.quantity,
            customerPhoneNumber:orderDetails.customerPhoneNumber,
            shop:orderDetails.shop

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

router.route('/updateOrder').put((req,res) => {
    const payload =  {
        paymentStatus: req.body.paymentStatus,
        paymentDate: req.body.paymentDate,
        paymentMethod:req.body.paymentMethod,
        customerPhoneNumber:req.body.customerPhoneNumber
    }
    console.log(payload)
    Orders.updateOne({_id:req.body.id},payload,(err,data) => {
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(500).send({message:'Update failed'+err.message})
        }
    })
})

router.route('/addOrder').post((req,res) => {
        const payload ={
            menu: req.body.menu,
            totalPrice: req.body.totalPrice,
            paymentStatus: req.body.paymentStatus,
            paymentDate: req.body.paymentDate,
            paymentMethod:req.body.paymentMethod,
            quantity:req.body.quantity,
            customerPhoneNumber:req.body.customerPhoneNumber,
            shop:req.body.shop

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

router.route('/getdOrder/:shop/:id').get((req,res) => {
    const id = req.params.id
    const shop = req.params.shop
    getOrder(id,shop).then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(404).send({message : `Cannot find order with ID  ${id}`})
    }).catch( err => {
        res.status(500).send({message: `Error: ${err}`})
    })
})

router.route('/getOrder/:shop/:paymentStatus').get((req,res) => {


    getAllOrders(req.params.paymentStatus == "false" ? false : true,req.params.shop).then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(204).send({message : `Document is empty.`})
    })
    .catch( err => {
        res.status(500).send({message: `Eroor: ${err}`})
    })
})
module.exports = router