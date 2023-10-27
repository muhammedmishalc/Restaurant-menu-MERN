const express = require('express')
const registermodel = require('../model/registermodel')
const loginrouter = express.Router()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const loginmodel = require('../model/loginmodel')


loginrouter.post('/login', async (req, res) => {
    try {
        const { phone, password } = req.body
        if (phone && password) {
            const data = await loginmodel.findOne({ phone: phone })
            console.log(data);
            if (data) {
                const user = await registermodel.findOne({ login_id: data._id })
                const checkpassword = await bcrypt.compare(password, data.password)
                console.log(checkpassword);
                if (checkpassword == true) {
                    const token = jwt.sign({ loginId: data._id, userPhone:data.phone, role: data.role },
                        'secretid',
                        { expiresIn: '5h' })
                    return res.status(200).json({
                        token: token,
                        role: data.role,
                        userid: data._id,
                        username: data.username,
                        userPhone: data.phone,
                        message: 'Login successfull'
                    })
                } else {
                    return res.status(400).json({
                        success: false,
                        error: true,
                        message: 'Incorrect password'
                    })
                }
            } else {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'Username not found'
                })
            }
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Please enter required details'
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


module.exports = loginrouter