const jwt = require('jsonwebtoken')
module.exports=(req,res,next)=>{
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token);
        const decodedtoken = jwt.verify(token,'secretid')
        req.userdata={
            userid:decodedtoken.userId,
            username:decodedtoken.userName,
            phone:decodedtoken.userPhone,
            role:decodedtoken.role

        }
        next()
    } catch (error) {
        return res.status(400).json({
            success:false,
            error:true,
            message:'auth failed'
        })
    }
}