var expressFunction = require('express')

const router = expressFunction.Router()
const mongoose = require('mongoose')

var schema = require('mongoose').Schema
const ingredientSchema = schema({
   name:String,
   status:String
},{
    collection: 'ingredients'
})

//create or used existing collection
let Ingredients 
try {
    Ingredients = mongoose.model('ingredients')    
} catch (err) {
    Ingredients = mongoose.model('ingredients',ingredientSchema)
}

function getIngredients(){
    return new Promise((resolve, reject) => {
        Ingredients.find({},(err,data) => {
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
function addIngredient(ingredientDetails){
    return new Promise((res,rej) => {
        var new_user = new Ingredients({
            name:ingredientDetails.name,
            status:ingredientDetails.status

        })
        new_user.save((err,data) => {
            if(err){
                rej(new Error('Cannot insert user to DB'))
            }
            else{
                res({message: 'Ingredient add successfully'})
            }
        })
    })
}



router.route('/update/:id').put(function (req,res){
    Ingredients.findById(req.params.id, function(err,ingredient){
        if(!ingredient)
           res.status(404).send("Record not found");
        else{
            ingredient.status = req.body.status;

            ingredient.save().then(ingredient => {
                res.json('Update complte');
            }).catch(err => {
                res.status(400).send("unagle to update the database");
            });
        }
    });
});


router.route('/addIngredient').post((req,res) => {
        const payload ={
            name:req.body.name,
            status:req.body.status
        }
        console.log(payload)
        addIngredient(payload)
        .then(ress => {
            console.log(ress)
            res.status(200).json(ress)
        })
        .catch(err => {
            console.log(err)
        })

})


router.route('/getIngredients').get((req,res) => {
    getIngredients().then( result => {
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