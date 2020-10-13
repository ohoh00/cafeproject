const expressFunction = require('express')
const mongoose = require('mongoose')

var expressApp = expressFunction()

const URL = 'mongodb://localhost:27017/tencafe'

const config = {
    autoIndex : true,
    useNewUrlParser : true,
    useUnifiedTopology: true
}

expressApp.use((req,res,next) => {
    res.setHeader('Access-Control-Allow-Origin','http://localhost:4200')
    res.setHeader('Access-Control-Allow-Methods','POST, GET, PUT, PATCH, DELETE, OPTIONS')
    res.setHeader('Access-Control-Allow-Headers','Content-Type, Option, Authorization')
    return next()
})

expressApp.use(expressFunction.json())

expressApp.use((req,res,next) => {
    mongoose.connect(URL,config).then(() => {
        console.log('Connected to MongoDB...')
        next()
    })
    .catch(err => {
        console.log('Cannot connect to MongoDB')
        res.status(501).send('Cannot connect to MongoDB')
    })
})

expressApp.use('/owner', require('./routes/owner'))
expressApp.use('/shops', require('./routes/shops'))
expressApp.use('/orders', require('./routes/orders'))
expressApp.use('/menu', require('./routes/menu'))
expressApp.use('/employees', require('./routes/employees'))
expressApp.use('/ingredients', require('./routes/ingredients'))
expressApp.use('/customer', require('./routes/customer'))
expressApp.use('/promotions', require('./routes/promotions'))
expressApp.use('/ingrestatus', require('./routes/ingrestatus'))
expressApp.use('/variation', require('./routes/variation'))
expressApp.use('/type', require('./routes/type'))
expressApp.use('/paytype', require('./routes/paytype'))
expressApp.listen(3000, () => {
    console.log('Listening on port 3000')
})