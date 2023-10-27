const mongoose = require('mongoose')
const schema= mongoose.Schema

const categoryschema= new schema({
    
    category:{type:String}

})
const categorymodel = mongoose.model('category',categoryschema)
module.exports=categorymodel