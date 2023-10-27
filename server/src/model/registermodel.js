const mongoose = require('mongoose')
const schema= mongoose.Schema

const registerschema= new schema({
    image:{type:String},
    password:{type:String},
   
    login_id:{type:schema.Types.ObjectId,ref:'logindetails'}, 

})
const registermodel = mongoose.model('customers',registerschema)
module.exports=registermodel