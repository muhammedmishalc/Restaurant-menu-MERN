const express = require('express');
const categorymodel = require('../model/categorymodel');
const categoryrouter= express.Router()

categoryrouter.post('/addcategory',async (req, res) => {
    try {
        console.log(req.body);
        
        const { category} = req.body
        if (category) {


            const oldcategory = await categorymodel.findOne({ category: category })
            if (oldcategory) {
                return res.status(400).json({
                    success: false,
                    error: true,
                    message: 'Category name already exists',
                    oldcategory: oldcategory
                })
            }

            const final = await categorymodel({category}).save()
            if (final) {
                return res.status(200).json({
                    success: true,
                    error: false,
                    message: `${category} category added`
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

categoryrouter.get('/deletecategory/:_id', async (req, res) => {
    try {
        const id = req.params._id;

        const details = await categorymodel.findOne({ _id: id })
        const data = await categorymodel.deleteOne({ _id: id })
        if (data.deletedCount == 1) {
            return res.status(200).json({
                success: true,
                error: false,
                message: `${details.category} deleted`,
            })
        } else {
            return res.status(400).json({
                success: false,
                error: true,
                message: `${details.category} not deleted`
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
module.exports=categoryrouter