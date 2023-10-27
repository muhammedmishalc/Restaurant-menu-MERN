const mongoose = require('mongoose')
const schema = mongoose.Schema

const loginschema = new schema({
    password:{type:String},
    phone:{type:String},
    role:{type:String},

})
const loginmodel = mongoose.model('logindetails', loginschema)
module.exports=loginmodel