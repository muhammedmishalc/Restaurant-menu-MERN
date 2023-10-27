const express = require('express');
const registermodel = require('../model/registermodel');
const checkAuth = require('../middleware/checkAuth');
const registerrouter = express.Router()
const bcrypt = require('bcryptjs');
const loginmodel = require('../model/loginmodel');
const multer  = require('multer')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/uploads')
    },
    filename: function (req, file, cb) {
    
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

registerrouter.post('/addcustomer',upload.single('file'), async (req, res) => {
    try {
        console.log(req.body.filename);
       
            const final = await registermodel({ image:req.body.filename}).save()
         
            console.log(final);
            if (final) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    details: final,
                    message: 'Account creation success'
                })
            }
      
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            details: error,
            message: 'Something went wrong'
        })
    }
})

registerrouter.get('/viewcustomers', async (req, res) => {
    try {
        const data = await registermodel.find()
        if (data) {
            return res.status(200).json({
                success: true,
                error: false,
                details: data,
                message: 'Viewing all customers'
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'No data found'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            data: error,
            message: "Something went wrong"
        })
    }
})

registerrouter.get('/viewoneprofile', checkAuth, async (req, res) => {
    try {
        const id = req.userdata.userid;

        const data = await registermodel.findOne({ _id: id })
        if (data) {
            return res.status(200).json({
                success: true,
                error: false,
                details: data,
                message: 'Viewing one customer'
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'User not found'
            })
        }


    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            details: error,
            message: 'Something went wrong'
        })

    }
})

registerrouter.post('/editprofile/:_id', async (req, res) => {
    try {
        const id = req.params._id
        const { image, username, phone } = req.body
        const data = await registermodel.updateOne({ _id: id }, { $set: {image, username, phone } })
        console.log(data);
        if (data.modifiedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'Profile edited'

            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Profile not edited'
            })
        }
    }
    catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
})

registerrouter.get('/deleteall', async (req, res) => {
    try {
        const data = await registermodel.deleteMany()
    } catch (error) {
        console.log(error);
    }
})

module.exports = registerrouter