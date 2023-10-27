const mongoose = require("mongoose")
const schema = mongoose.Schema

const cartschema = new schema({
    productid:{type:schema.Types.ObjectId,ref:'products'},
    userid:{type:schema.Types.ObjectId,ref:'customers'},
    quantity:{type:String},
    status:{type:String}
})

const cartmodel= mongoose.model('cart',cartschema)
module.exports=cartmodel