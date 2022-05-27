// const commenFunction = require('../common/Common')
// const UsersModel = require('../../models/user/users');
// const NewsModel = require('../../models/news')
// const BlogModel = require('../../models/blogs')
const ChapterModel = require('../../models/admin/chapters')
const QuestionModel = require('../../models/admin/questions')
var XLSX = require('xlsx');
const fs = require('fs').promises
// const moment = require("moment");
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
class Chapters {
    constructor() {
        return {
            create: this.create.bind(this),
            get: this.get.bind(this),
            uploadeXlsSheet: this.uploadeXlsSheet.bind(this),
            delete: this.delete.bind(this),
            getList: this.getList.bind(this),
            insertXlsSheetData: this.insertXlsSheetData.bind(this),
            viewChapters: this.viewChapters.bind(this),
            editChapters: this.editChapters.bind(this)
            // submitReferral: this.submitReferral.bind(this)
        }
    }
    async insertXlsSheetData(req, res) {

        try {
          
        //    console.log("category_meta in chapters", name, content, category_meta)
           
            let { path, content, id, category_meta,subcategory_meta,time,is_mocktest,questions } = req.body
            var workbook = await XLSX.readFile(path);
            let y = workbook.SheetNames[0]
            let worksheet = workbook.Sheets[y];
            let jsonData = await XLSX.utils.sheet_to_json(worksheet)
            let newArray = []
            if (jsonData.length >= 0) {
                for (const item of jsonData) {
                    let getData = await ChapterModel.findOne({ name: item.Name ,subcategory:subcategory_meta._id})
                    if (getData) {
                       
                    } else {
                    let obj = {}
                    obj.name = item.Name
                    
                    if (is_mocktest =='true'){
                    obj.is_mocktest = true
                    }
                    if (is_mocktest =='false'){
                        obj.is_mocktest = false
                    }
                    if (time ){
                        obj.time = time
                    }
                    if (questions ){
                        obj.questions = questions
                        obj.marks = questions
                    }
                    if (content){
                        obj.content = content
                    }
                    if (category_meta){
                        obj.category = category_meta._id
                        obj.category_meta = category_meta
                    }
                    if (subcategory_meta){
                        obj.subcategory = subcategory_meta._id
                        obj.subcategory_meta = subcategory_meta
                    }
                    newArray.push(obj)
                }
                }
            }
            await fs.unlink(path);
            let savedata = await ChapterModel.insertMany(newArray)
            res.json({ code: 200, success: true, message: 'Chapter created successfully', data: newArray })
        } catch (error) {
            console.log("error in catch", error)
            res.json({ code: 400, success: false, message: "Internal server error", error })
        }
    }
    async create(req, res) {
        try {
            let { name, content, id, category_meta,subcategory_meta,time,is_mocktest,questions } = req.body
        //    console.log("category_meta in chapters", name, content, category_meta)
            let getData = await ChapterModel.findOne({ name: name ,subcategory:subcategory_meta._id})
            if (getData) {
                res.json({ code: 422, success: false, message: 'this name is all ready exist', })
            } else {
                let obj = {}
                if (name){
                    obj.name = name
                }
                if (is_mocktest =='true'){
                    obj.is_mocktest = true
                }
                if (is_mocktest =='false'){
                    obj.is_mocktest = false
                }
                if (time ){
                    obj.time = time
                }
                if (questions ){
                    obj.questions = questions
                    obj.marks = questions
                }
                if (content){
                    obj.content = content
                }
                if (category_meta){
                    obj.category = category_meta._id
                    obj.category_meta = category_meta
                }
                if (subcategory_meta){
                    obj.subcategory = subcategory_meta._id
                    obj.subcategory_meta = subcategory_meta
                }
                let saveData = new ChapterModel(obj)
                await saveData.save();
                res.json({ code: 200, success: true, message: 'Chapter created successfully', })
            }

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async get(req, res) {
        try {
            let options = {
                page: Number(req.body.page) || 1,
                limit: Number(req.body.limit) || 10,
                sort: {  "subcategory_meta.name":1,"name": 1, },
                lean: true,
            }
            let query = {}
            if (req.body.searchData ){
                query = { $or: [{ name: { $regex: req.body.searchData, $options: "i" } },
                 { "subcategory_meta.name": { $regex: req.body.searchData, $options: "i" } },
                 { "category_meta.name": { $regex: req.body.searchData, $options: "i" } }] }
            }
            let data = await ChapterModel.paginate(query, options)
            // console.log("news", data)
            res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async getList(req, res){
        try {

                const page = req.query.page
                const limit = req.query.limit
                const startIndex = (page - 1) * limit
                const endIndex = page * limit

            if(req.query._id){
                let data = await ChapterModel.find({subcategory: req.query._id})
                var total = data.length;
                if(req.query.page)
                {
                    data = data.slice(startIndex,endIndex)
                }

                res.json({ code: 200, success: true, message: "Get list successfully ", data: data,total:total })
            }else{
                let data = await ChapterModel.find()
                res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
            }

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async viewChapters(req, res) {
        try {
            let data = await ChapterModel.findOne({ _id: req.query._id })
            // console.log("news", data)
            res.json({ code: 200, success: true, message: "Get successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async uploadeXlsSheet(req, res) {
        try {
            if (req.file.path) {
                var path2 = req.file.path.replace(/\\/g, "/");
                res.json({ code: 200, success: true, message: 'uploade successfully', data: path2 })
            } else {
                res.json({ code: 400, success: false, message: "order_image is require", })
            }

        } catch (error) {
            res.json({ code: 400, success: false, message: "Internal server error", })
        }
    }
    async editChapters(req, res) {
        try {
            let data = await ChapterModel.findOneAndUpdate({ _id: req.body._id }, { $set: req.body }, { new: true })
            // await SubCategoryModel.updateMany({ category: req.body._id }, { $set: { category_meta: req.body } })
            // await ChapterModel.updateMany({ subcategory: req.body._id }, { $set: { subcategory_meta: req.body } })
            let update_question = await QuestionModel.updateMany({ chapter: req.body._id }, { $set: { chapter_meta: req.body } })
            // console.log("update_question", update_question)
            res.json({ code: 200, success: true, message: "update successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async delete(req, res) {
        try {
        //    console.log("news",  req.query._id)
            let data = await ChapterModel.findByIdAndRemove({_id: req.query._id})
            let data1 = await QuestionModel.deleteMany({chapter: req.query._id})
            // console.log("news", data)
            res.json({ code: 200, success: true, message: "delete successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }

    //////////////////////////////////////////////////////end//////////////////////////////////////////////



    async updateNews(req, res) {
        try {
            let { title, content, id, image, status} = req.body
           console.log("hiiii", title, content, id, status)
            let getData = await NewsModel.findOne({ _id: id }).lean()

            if (getData) {
                if(title){
                    getData.title= title
                }
                if(content){
                    getData.content= content
                }
                if(image){
                    getData.image= image
                }
                if(status){
                    getData.status = status
                }
                console.log("upadate datata", getData, typeof status)
                let update = await NewsModel.findOneAndUpdate({_id: id},getData, {new:true})
                res.json({ code: 200, success: true, message: 'news update successfully',data: update })
            } else {
                res.json({ code: 400, success: false, message: 'this news is not exist', })
            }

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async updateBlogs(req, res) {
        try {
            let { title, content, id, image, status} = req.body
           console.log("hiiii", title, content, id)
            let getData = await BlogModel.findOne({ _id: id })

            if (getData) {
                let obj = {}
                if(title){
                    obj.title= title
                }
                if(content){
                    obj.content= content
                }
                if(image){
                    obj.image= image
                }
                if(status){
                    obj.status= status
                }
                let update = await BlogModel.findOneAndUpdate({_id: id},{$set:obj}, {new:true})
                res.json({ code: 200, success: true, message: 'news update successfully',data: update })
            } else {
                res.json({ code: 400, success: false, message: 'this news is not exist', })
            }

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
   
    async createBlogs(req, res) {
        try {
            let { title, content, id, image} = req.body
            let obj = {
                title: title,
                content: content,
                created_by: '607e5136b24182674c4a8ed6',
                image : image
            }
            let getData = await BlogModel.findOne({ title: title })
            if (getData) {
                res.json({ code: 422, success: false, message: 'this title is all ready exist', })
            } else {
                let saveData = new BlogModel(obj)
                await saveData.save();
                res.json({ code: 200, success: true, message: 'blog save successfully', })
            }
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async uploadeImage(req, res) {
        try {
            console.log("hiiiiiii", req.body, req.file)
            if (req.file) {
                res.json({ code: 200, success: true, message: 'uploade successfully', data: req.file })
            } else {
                res.json({ success: false, message: "Internal server error", })
            }

        } catch (error) {
            res.json({ success: false, message: "Internal server error", })
        }
    }
    async uploadeImagebase64(req, res) {
        try {
            if (req.body.image) {
                let data = await commenFunction._uploadBase64image(req.body.image, 'NewsAndBlogs')
                var path2 = data.replace(/\\/g, "/");
                res.json({ code: 200, success: true, message: 'uploade successfully', data: path2 })
            } else {
                res.json({ code: 400, success: false, message: "order_image is require", })
            }

        } catch (error) {
            res.json({ code: 400, success: false, message: "Internal server error", })
        }
    }
 
   
}



module.exports = new Chapters();