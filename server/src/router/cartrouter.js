const express = require('express')
const cartmodel = require('../model/cartmodel')
const checkAuth = require('../middleware/checkAuth')
const cartrouter = express.Router()

cartrouter.post('/addtocart', checkAuth, async (req, res) => {
    try {
        const { productid } = req.body
        const { userid } = req.userdata
        const cartvalue = await cartmodel.findOne({ productid, userid, status: '0' })
        if (cartvalue) {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Product already in cart',

            })
        }
        const final = await cartmodel({ productid, userid, quantity: '1', status: '0' }).save()
        console.log(final);
        if (final) {
            return res.status(200).json({
                success: true,
                error: false,
                details: final,
                message: 'Item Added to Cart'
            })
        }
        else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Item not added'
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
cartrouter.get('/viewcartitems', checkAuth, async (req, res) => {
    try {
        const data = await cartmodel.aggregate([
            {
                '$lookup': {
                    'from': 'products',
                    'localField': 'productid',
                    'foreignField': '_id',
                    'as': 'product'
                }
            },
            {
                '$unwind': '$product'
            },
            {
                '$group': {
                    '_id': '$_id',
                    'productid': { "$first": '$productid' },
                    'productname': { "$first": '$product.productname' },
                    'category': { "$first": '$product.category' },
                    'price': { "$first": '$product.price' },
                    'quantity': { "$first": '$quantity' }


                }
            }
        ])
        console.log(data);
        var total = 0
        data.forEach((item) => {
            total += item.quantity * item.price
        })

        if (data) {
            return res.status(200).json({
                success: true,
                error: false,
                details: data,
                message: 'Viewing cartitems',
                totalamount: total
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Cart empty'
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
cartrouter.get('/deletefromcart/:_id', checkAuth, async (req, res) => {
    try {
        const id = req.params._id;

        const details = await cartmodel.findOne({ _id: id })
        const data = await cartmodel.deleteOne({ _id: id })
        if (data.deletedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: `${details.productname} deleted from cart`,
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Item not deleted from cart'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })

    }
})
cartrouter.get('/addquantity/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dat = await cartmodel.findOne({ _id: id })
        console.log(dat);
        const q = dat.quantity
        const q2 = +q + 1;

        const data = await cartmodel.updateOne({ _id: id }, { $set: { quantity: q2 } })
        console.log(data);
        if (data.modifiedCount == 1) {

            return res.status(200).json({
                success: true,
                error: false,
                message: 'Quantity updated'

            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Quantity not updated'
            })
        }
    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
})
cartrouter.get('/deletequantity/:id', async (req, res) => {
    try {
        const id = req.params.id
        const dat = await cartmodel.findOne({ _id: id })
        console.log(dat);
        const q = dat.quantity
        const q2 = +q - 1;
        if (q2 > 0) {
            const data = await cartmodel.updateOne({ _id: id }, { $set: { quantity: q2 } })
            console.log(data);
            if (data.modifiedCount == 1) {

                return res.status(200).json({
                    success: true,
                    error: false,
                    message: 'Quantity updated'

                })
            } else {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'Quantity not updated'
                })
            }
        }else{
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Quantity cannot be less than 1'
            })
        }


    } catch (error) {
        return res.status(400).json({
            success: false,
            error: true,
            message: 'Something went wrong'
        })
    }
})

module.exports = cartrouter