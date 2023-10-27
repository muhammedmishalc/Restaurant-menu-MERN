const express = require('express')
const productmodel = require('../model/productmodel')
const productrouter = express.Router()

productrouter.post('/addproduct',async (req, res) => {
    try {
        console.log(req.body);
        const productname = req.body.productname.toLowerCase()
        const { image, category, price } = req.body
        if (productname && image && category && price) {


            const oldproduct = await productmodel.findOne({ productname: productname })
            if (oldproduct) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'Product name already exists',
                    oldproduct: oldproduct
                })
            }

            const final = await productmodel({ productname, image, category, price }).save()
            if (final) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    details: productname,
                    message: 'Product added'
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
            message: 'Something went wrong'
        })
    }
})

productrouter.get('/viewproducts', async (req, res) => {
    try {
        const data = await productmodel.find()
        if (data) {
            return res.status(200).json({
                success: true,
                error: false,
                details: data,
                message: 'Viewing all Products'
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Products not found'
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

productrouter.post('/editproduct/:_id', async (req, res) => {
    try {
        const id = req.params._id
        const { productname, image, category, subcategory, price } = req.body
        const data = await productmodel.updateOne({ _id: id }, { $set: { productname, image, category, subcategory, price } })
        console.log(data);
        if (data.modifiedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: 'Product edited'

            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Product not edited'
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

productrouter.get('/deleteproduct/:_id', async (req, res) => {
    try {
        const id = req.params._id;

        const details = await productmodel.findOne({ _id: id })
        const data = await productmodel.deleteOne({ _id: id })
        if (data.deletedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: `${details.productname} deleted`,
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: `${details.productname} not deleted`
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

productrouter.get('/viewoneproduct/:_id', async (req, res) => {
    try {
        const id = req.params._id;

        const data = await productmodel.findOne({ _id: id })
        if (data) {
            return res.status(200).json({
                success: true,
                error: false,
                details: data,
                message: 'Viewing one product'
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: 'Product not found'
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



module.exports=productrouter