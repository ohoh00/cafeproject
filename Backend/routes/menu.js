var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')

var schema = require('mongoose').Schema
const menuSchema = schema({
   name:String,
   type: String,
   price: Number,
   img: String,
   shop: String
},{
    collection: 'menu'
})

//create or used existing collection
let Menu 
try {
    Menu = mongoose.model('menu')    
} catch (err) {
    Menu = mongoose.model('menu',menuSchema)
}

function getMenu(){
    return new Promise((resolve, reject) => {
        Menu.find({},(err,data) => {
          if (err) {
              reject(new Error('Cannot get menu'))
          } else {
              if(data){
                  resolve(data)
              }
              else{
                reject(new Error('Cannot get menu'))
              }
          }
      })
    })   
}
function addMenu(MenuDetails){
    return new Promise((res,rej) => {
        var new_user = new Menu({
            name:MenuDetails.name,
            type:MenuDetails.type,
            price:MenuDetails.price,
            img:MenuDetails.img,
            shop:MenuDetails.shop
        })
        new_user.save((err,data) => {
            if(err){
                rej(new Error('Cannot insert menu to DB'))
            }
            else{
                res({message: 'Add successfully'})
            }
        })
    })
}
function getMenuShop(shop){
    return new Promise((resolve, reject) => {
        Menu.find({shop:shop},(err,data) => {
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
router.route('/getMenuShop/:id').get((req,res) => {
    const id = req.params.id
    getMenuShop(id).then( result => {
        if(result)
            res.status(200).json(result)
        else
            res.status(404).send({message : `Cannot find employee with ID  ${id}`})
    }).catch( err => {
        res.status(500).send({message: `Error: ${err}`})
    })
})

router.route('/delete/:id').delete(function (req,res){
    Menu.findByIdAndRemove({_id: req.params.id},function(err,menu){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});



router.route('/updatemenus').put((req,res) => {
    const payload =  {
        price:req.body.price
    }
    console.log(payload)
    Menu.updateOne({_id:req.body.id},{price: payload.price},(err,data) => {
        if(data){
            res.status(200).json(data)
        }
        else{
            res.status(500).send({message:'Update failed'+err.message})
        }
    })
})



router.route('/addMenu').post((req,res) => {
        const payload ={
            name:req.body.name,
            type:req.body.type,
            price:req.body.price,
            img:req.body.img,
            shop:req.body.shop
        }
        console.log(payload)
        addMenu(payload)
        .then(ress => {
            console.log(ress)
            res.status(200).json(ress)
        })
        .catch(err => {
            console.log(err)
        })

})


router.route('/getMenu').get((req,res) => {
    getMenu().then( result => {
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