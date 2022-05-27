const commenFunction = require('../common/Common')
const SubscriptionModel = require('../../models/admin/subscription')
// const { findOneAndUpdate } = require('../../models/admin/faq')
class Subscription {
    constructor() {
        return {
            create: this.create.bind(this),
            get: this.get.bind(this),
            // uploadeImage: this.uploadeImage.bind(this),
            getById: this.getById.bind(this),
            update: this.update.bind(this),
            delete: this.delete.bind(this),
            edit: this.edit.bind(this)
            // updateBlogs: this.updateBlogs.bind(this)
            // submitReferral: this.submitReferral.bind(this)
        }
    }

    async create(req, res) {
        try {
            let { title, price, created_by,days,benefits} = req.body
            let saveData = new SubscriptionModel({
                title: title,
                price: Number(price),
                days: days,
                created_by: created_by,
                benefits: benefits,

            })
           let data= await saveData.save();
            res.json({ code: 200, success: true, message: 'Create successfully',data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async delete(req, res) {
        try {
            //    console.log("news",  req.query._id)
            let data
            data = await SubscriptionModel.findByIdAndRemove({ _id: req.query._id })
            // console.log("news", data)
            res.json({ code: 200, success: true, message: "delete successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async edit(req, res) {
        try {
            let data = await SubscriptionModel.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true })
            
            // console.log("update_question", update_question)
            res.json({ code: 200, success: true, message: "Updated successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async get(req, res) {
        try {
            let options = {
                page: Number(req.body.page) || 1,
                limit: Number(req.body.limit) || 10,
                sort: { createdAt: -1 },
                lean: true,
            }
            let query = {}
            if (req.body.searchData) {
                query = { $or: [{ question: { $regex: req.body.searchData, $options: "i" } }, { content: { $regex: req.body.searchData, $options: "i" } }] }
            }
            let data = await SubscriptionModel.paginate(query, options)
            // console.log("news", data)
            res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async getById(req, res) {
        try {
            let id = req.query._id
            //    console.log("hiiii", category_meta, subcategory_meta, chapter_meta )
            let getdata = await SubscriptionModel.findOne({_id: id})
            
            res.json({ code: 200, success: true, message: 'Update successfully',data:getdata })
           
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async update(req, res) {
        try {
            let {id, answer, status} = req.body
            let getdata = await SubscriptionModel.findOneAndUpdate({_id: id},{$set: {status: status}})
            
            res.json({ code: 200, success: true, message: 'Update successfully',data:getdata })
           
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
}
module.exports = new Subscription();