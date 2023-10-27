const mongoose = require('mongoose')
const schema= mongoose.Schema

const productschema= new schema({
    image:{type:String},
    productname:{type:String},
    category_id:{type:schema.Types.ObjectId,ref:'category'},    
    price:{type:String}

})
const productmodel = mongoose.model('products',productschema)
module.exports=productmodel