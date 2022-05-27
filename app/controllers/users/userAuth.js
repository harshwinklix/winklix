const commenFunction = require('../../middlewares/common')
const UsersModel = require('../../models/user/users');
const deviceModel = require('../../models/user/device');
const videoModel = require('../../models/admin/video');
const fabricatorModel = require('../../models/user/fabricator');
const fabricatorImagesModel = require('../../models/user/fabricatorImages');
const bannerModel = require('../../models/user/banner');
const moment = require("moment");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const _ = require('underscore');
const mongoose = require('mongoose')
const CategoryModel = require('../../models/admin/categories')
const StateModel = require('../../models/user/state')
// const moment = require("moment");
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken')
// const Constant = require('../../utilities/constants')
const SubCategoryModel = require('../../models/admin/subcategories')
const ChapterModel = require('../../models/admin/chapters')
const QuestionModel = require('../../models/admin/questions');
const constants = require('../../utilities/constants');
const MocktestModel = require('../../models/admin/mocketest');
const SubscriptionModel = require('../../models/admin/subscription');
const BuySubscriptionModel = require('../../models/user/buySubscription');
const CmsModel = require('../../models/user/cms');
const FlageModel = require('../../models/user/questionflag');
const PinQuestionModel = require('../../models/user/pinquestion');
class users {
    constructor() {
        return {
            signUp: this.signUp.bind(this),
            signUpStep2:this.signUpStep2.bind(this),
            fabricator_signup_step2:this.fabricator_signup_step2.bind(this),
            verifyOtp: this.verifyOtp.bind(this),
            home: this.home.bind(this),
            login: this.login.bind(this),
            updateProfile: this.updateProfile.bind(this),
            getCategoryList: this.getCategoryList.bind(this),
            getSubCategoryList: this.getSubCategoryList.bind(this),
            getChapterList: this.getChapterList.bind(this),
            sendotp:this.sendotp.bind(this),
            getStateList: this.getStateList.bind(this),
            getQuestionlist: this.getQuestionlist.bind(this),
            submitTest: this.submitTest.bind(this),
            startTest: this.startTest.bind(this),
            getPlans: this.getPlans.bind(this),
            getPlanById: this.getPlanById.bind(this),
            buySubscription: this.buySubscription.bind(this),
            setNewPassword: this.setNewPassword.bind(this),
            getcms: this.getcms.bind(this),
            getcmsById: this.getcmsById.bind(this),
            getResult: this.getResult.bind(this),
            flageQuestion: this.flageQuestion.bind(this),
            pinQuestions: this.pinQuestions.bind(this),
            SearchApi: this.SearchApi.bind(this),
            getCorrectAnswer: this.getCorrectAnswer.bind(this),
            getIncorrectAnswer: this.getIncorrectAnswer.bind(this),
            getflageQuestion: this.getflageQuestion.bind(this),
            getUnAnswered: this.getUnAnswered.bind(this),
            getKeyword: this.getKeyword.bind(this)
        }
    }
    //create sign_up Api
    async _generateRefID() {
        try {
            let flage = false
            let fourDigitsRandom
            do {
                fourDigitsRandom = await Math.floor(1000 + Math.random() * 9000);
                let getData = await UsersModel.find({ Referral_id: fourDigitsRandom.toString() })
                if (getData.length > 0) {
                    flage = true
                } else {
                    flage = false
                }
            }
            while (flage);
            return '@' + fourDigitsRandom

        } catch (error) {
            throw error
        }

    }

    async rendomOtp(phone) {
        try {
            let fourDigitsRandom
            fourDigitsRandom = 1234;
            return fourDigitsRandom

        } catch (error) {
            throw error
        }

    }
    async rendomOtp1(phone) {
        try {
            let fourDigitsRandom
            fourDigitsRandom = await Math.floor(1000 + Math.random() * 9000);
            return fourDigitsRandom

        } catch (error) {
            throw error
        }

    }
    async signUp(req, res) {
        try {
            let saveData
            let data = {}
            let stoken
            let error
            let getUser
            let getUser1
            let { APP_KEY, PHONE, TYPE} = req.body
            if(APP_KEY!=process.env.APP_KEY){
            return res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Please enter correct app key', })
            }
            else
            {
            getUser1 = await UsersModel.findOne({phone:PHONE}).lean()
            
                getUser = await UsersModel.findOne({ $and: [{ phone: PHONE }, { is_verified_otp: 1 }, { profile_completion: 1 }] })
                if (getUser) {
                    
                    res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Phone already exist'})
                } else {
                    if(getUser1){
                        
                        var otp=await this.rendomOtp()
                        getUser1.otp=otp;
                        getUser1.type=TYPE;
                        let updatedata1 = await UsersModel.findOneAndUpdate({ _id: getUser1._id }, { $set: getUser1 })
                        res.json({ code: 200, STATUS: "SUCCESS", MESSAGE: 'Please check your mobile for otp!', DATA: {'ID' :  getUser1._id,
                        'TYPE' : getUser1.type,
                        'PHONE' :getUser1.phone} })

                    }
                    else
                    {
                        var date = new Date();
                        var dateFormat = require('node-datetime');
    
                        const moment = require("moment");
                        var created_time=(moment().format("YYYY-MM-DD HH:mm:ss"));
                        
                        var otp=await this.rendomOtp()
                    saveData = new UsersModel({
                        phone: PHONE,
                        otp: otp,
                        type: TYPE,
                        created_time:created_time
                        
                    })
                    console.log("saveData", saveData)
                    
                    data = await saveData.save();
                     if (data && !_.isEmpty(data)) {
                stoken = {
                    _id: data._id,
                }
                let data1 = await UsersModel.findOne({ _id: data._id }).lean()
                console.log("dataatatat", data)
                // let token = await jwt.sign(stoken, process.env.SUPERSECRET, { expiresIn: '7d' });
                data1.token = await jwt.sign(stoken, process.env.SUPERSECRET, { expiresIn: '7d' });
                // data1.dictionary = data
                return res.json({ code: 200, STATUS: "SUCCESS", MESSAGE: 'Please check your mobile for otp!', DATA: {"ID":data1._id,"TYPE":data1.type,"PHONE":data1.phone,"OTP":data1.otp} })
            }  else {
                res.json({ success: false, message: "Somthing went wrong", })
            }
                
            }
           
        }
    }
        } catch (error) {
            console.log("Error in catch", error)
            res.json({ success: false, message: "Somthing went wrong", })
        }

    }
    async signUpStep2(req, res) {
        try {
            var crypto = require('crypto');
            let saveData
            let data = {}
            let stoken
            let error
            let getUser
            let getUser1
            let { APP_KEY,NAME,IMEI,EMAIL,PASSWORD,ID,DEVICE_TYPE} = req.body
            if(APP_KEY!=process.env.APP_KEY){
            return res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Please enter correct app key', })
            }
            else
            {
            getUser = await UsersModel.findOne({ $and: [{ _id: ID }, { is_verified_otp: 1 }] })
            getUser1 = await UsersModel.findOne({ $and: [{ email: EMAIL }, { is_verified_otp: 1 }] })
                if (!getUser) {
                    
                    res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Invalid id'})
                } else {
                    if(getUser1 && EMAIL!=''){
                        res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Email already registered!' })
                    }
                    else
                    {
                        let updatedata = await UsersModel.updateMany({"imei": IMEI}, {"$set":{"is_logged_out": 1}});
                        if(getUser.type=='customer'){
                        getUser.is_logged_out=0;
                        let updatedata1 = await UsersModel.findOneAndUpdate({ _id: getUser._id }, { $set: getUser })
                        }
                        var password = PASSWORD;
                        var hash = crypto.createHash('md5').update(password).digest('hex');
                        let updatedata1 = await UsersModel.findOneAndUpdate({ _id: getUser._id }, { $set: {'name':NAME,'password':hash,'email':EMAIL,'profile_completion':1,'device_type':DEVICE_TYPE}} )
                 let data1=  await UsersModel.findOne({ $and: [{ _id: ID }, { is_verified_otp: 1 }] })
                return res.json({ code: 200, STATUS: "SUCCESS", MESSAGE: 'User registered successfully!', DATA: {"ID":data1._id,"NAME":data1.name,"EMAIL":data1.email,"PHONE":data1.phone,"TYPE":data1.type} })
            }   
            }
           }
        
        } catch (error) {
            console.log("Error in catch", error)
            res.json({ success: false, message: "Somthing went wrong", })
        }

    }
    async fabricator_signup_step2(req, res) {
        try {
            var crypto = require('crypto');
            let saveData
            let saveData1
            let data = {}
            let data1 = {}
            let stoken
            let error
            let getUser
            let getUser1
            let phoneExist
            let imageArray
            let { APP_KEY,FABRICATOR_NAME,STORE_NAME,LOCATION,LAT,LNG,COMPLETE_ADDRESS,NEAREST_LANDMARK,CITY,PINCODE,USING_APOLLO,RETAILER_DEALER_NAME,EXPERIENCE,VISITING_CARD_IMAGE,DESIGN_IMAGE_ARRAY,
                CUSTOMER_ID,PHONE,PROFILE_IMAGE,DEVICE_TYPE} = req.body
            if(APP_KEY!=process.env.APP_KEY){
            return res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Please enter correct app key', })
            }
            else
            {
            getUser = await fabricatorModel.findOne({ $and: [{ customer_id: CUSTOMER_ID }, { profile_completion: 1 }] })
            getUser1 = await UsersModel.findOne({ $and: [{ _id: CUSTOMER_ID }, { type: 'fabricator' }] })
                if (!getUser1) {
                    
                    res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Invalid fabricator selected!'})
                } else {
                    if(getUser){
                        res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Fabricator already registered!' })
                    }
                    else
                    {

                        phoneExist = await fabricatorModel.findOne({ $and: [{ store_contact_no: PHONE }, { profile_completion: 1 }] })
                        if(phoneExist)
                        {
                            res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Store contact no already registered!' })
                        }

                        else
                        {
                        var date = new Date();
                        var dateFormat = require('node-datetime');
    
                        const moment = require("moment");
                        var created_time=(moment().format("YYYY-MM-DD HH:mm:ss"));
                        saveData = new fabricatorModel({
                        customer_id: CUSTOMER_ID,
                        store_contact_no: PHONE,
                        fabricator_name: FABRICATOR_NAME,
                        store_name:STORE_NAME,
                        location:LOCATION,
                        lat:LAT,
                        lng:LNG,
                        complete_address:COMPLETE_ADDRESS,
                        nearest_landmark:NEAREST_LANDMARK,
                        city:CITY,
                        pincode:PINCODE,
                        using_apollo:USING_APOLLO,
                        retailer_dealer_name:RETAILER_DEALER_NAME,
                        experience:EXPERIENCE,
                        profile_completion:1,
                        device_type:DEVICE_TYPE,
                        created_time:created_time
                        
                    })
                    console.log("saveData", saveData)
                    
                    data = await saveData.save();
                    var reference_id=data._id+Math.floor(Math.random() * 90 + 10);
                    if(VISITING_CARD_IMAGE!=''){
                        let updatedata1 = await fabricatorModel.findOneAndUpdate({ _id: data._id }, { "$set":{"visiting_card_image": VISITING_CARD_IMAGE} })
                    }
                   
                    if(DESIGN_IMAGE_ARRAY!=''){
                     imageArray = JSON.stringify(DESIGN_IMAGE_ARRAY)
                       imageArray= (JSON.parse(imageArray));
                    
                    for (let item of imageArray) {
                        var date = new Date();
                        var dateFormat = require('node-datetime');
    
                        const moment = require("moment");
                        var created_time=(moment().format("YYYY-MM-DD HH:mm:ss"));
                        saveData1 = new fabricatorImagesModel({
                        fabricator_id: data._id,
                        image_type:"url",
                        image: item,
                        created_time:created_time
                        
                    })
                    console.log("saveData1", saveData1)
                    
                    data1 = await saveData1.save();
                    
                    
                        
                    } 
                    }
                    let updatedata1 = await UsersModel.findOneAndUpdate({ _id: CUSTOMER_ID }, { "$set":{"fabricator_profile": 1,"reference_id":reference_id,"device_type":DEVICE_TYPE,"image_type":"url","image":PROFILE_IMAGE} })
                    return res.json({ code: 200, STATUS: "SUCCESS", MESSAGE: 'Fabricator registered successfully!', DATA: {"ID":CUSTOMER_ID,"REFERENCE_ID":reference_id} })
                    
               
            }   
            }
           }
        
        } }catch (error) {
            console.log("Error in catch", error)
            res.json({ success: false, message: "Somthing went wrong", })
        }

    }
    async login(req, res) {
        try {
            let { APP_KEY, PHONE, PASSWORD,IMEI } = req.body
            var crypto = require('crypto');

var password = PASSWORD;
var hash = crypto.createHash('md5').update(password).digest('hex');
            let getUser = await UsersModel.findOne({ $and: [{ phone: PHONE }, { is_verified_otp: 1 }] }).lean()
           if(APP_KEY!=process.env.APP_KEY){
            return res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Please enter correct app key', })
            }
            else
            {
            if (getUser) {
                if (getUser.type=='fabricator' && getUser.is_verified==0 && getUser.fabricator_profile==1) {
                    return res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Fabricator not verified by admin yet!', })
                }
                else{
                if (getUser.status == 0) {
                    return res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'User is blocked by admin', })
                } else {
                    
                    if (hash==getUser.password) {
                        let updatedata = await UsersModel.updateMany({"imei": IMEI}, {"$set":{"is_logged_out": 1}});
                        getUser.is_logged_out=0;
                        let updatedata1 = await UsersModel.findOneAndUpdate({ _id: getUser._id }, { $set: getUser })
                        
                        var fabricator_status;
                        if((getUser.type=='fabricator' && getUser.fabricator_profile=='1') || getUser.type=='customer'){
                           fabricator_status="true";
                        }
                        else
                        {
                            fabricator_status="false";
                        }
                        let stoken = {
                            _id: getUser._id,
                            user_id: getUser.user_id
                        }
                        var sessionData;
                        sessionData = req.session;

                      sessionData.user = {};
                      sessionData.user.username = getUser.name;
                       console.log(sessionData.user)
                        // getUser.token = await jwt.sign(stoken, process.env.SUPERSECRET, { expiresIn: '7d' });
                       
                        var arr={NAME:getUser.name,ID:getUser.id,PHONE:getUser.phone,EMAIL:getUser.email,TYPE:getUser.type,
                            REFERENCE_ID:getUser.reference_id==0?'':getUser.reference_id,FABRICATOR_STATUS:fabricator_status};
                        

                        res.json({ code: 200, STATUS: "SUCCESS", MESSAGE: 'Login successfully', DATA: arr })
                    } else {
                        res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Invalid password', })
                    }
                }
                }
            } else {
                res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Phone number is not registered', })
            }
        } }catch (error) {
            console.log("Error in catch", error)
            res.json({ STATUS: "FAILURE", MESSAGE: "Somthing went wrong", })
        }
    }
    async home(req, res) {
        try {
            let { APP_KEY, ID,IMEI,LANGUAGE } = req.body
            let getUser = await deviceModel.findOne({imei:IMEI}).lean()
            var notification_count;
            let bannerArray=[];
            let videoArray=[];
            let categoryArray=[];
           if(APP_KEY!=process.env.APP_KEY){
            return res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Please enter correct app key', })
            }
            else
            {
            var language=LANGUAGE==''?'name':LANGUAGE+'_name';
                
                if(getUser)
                {
                    notification_count=getUser.notification_count;
                }
                else
                {
                    notification_count=0;
                }
            let categoryList=await CategoryModel.find({})
            if(categoryList){
                for (let item of categoryList) { 
                    let newObj = {}
                    newObj.id=item._id
                    newObj.name=item[language]
                    newObj.image=item.image
                    categoryArray.push(newObj)
                    
                }
                
            }
            let bannerList=await bannerModel.find({})
            if(bannerList){
                for (let item of bannerList) { 
                    let newObj = {}
                    newObj.ID=item._id
                    newObj.TITLE=item.name
                    newObj.IMAGE=item.image
                    bannerArray.push(newObj)
                    
                }
                
            }
            let videoList=await videoModel.find({})
            if(videoList){
                for (let item of videoList) { 
                    let newObj = {}
                    newObj.ID=item._id
                    newObj.URL=item.url
                    videoArray.push(newObj)
                    
                }
                
            }
                  res.json({ code: 200, STATUS: "SUCCESS", MESSAGE: 'Home', NOTIFICATION_COUNT: language, 'CATEGORY_LIST':categoryArray,'BANNER_LIST':bannerArray,'VIDEO_LIST':videoArray })
                }
                
           
        } catch (error) {
            console.log("Error in catch", error)
            res.json({ STATUS: "FAILURE", MESSAGE: "Somthing went wrong", })
        }
    }
    async setNewPassword(req, res) {
        try {
            let { user_id, password } = req.body
            let getUser = await UsersModel.findOne({ $and: [{ user_id: user_id }, { social_type: 'manual' }, { user_type: 'user' }] }).lean()
            if (getUser) {
                const salt = bcrypt.genSaltSync(10);
                const hash = bcrypt.hashSync(password, salt);
                getUser.password = hash
                let updatedata = await UsersModel.findOneAndUpdate({ _id: getUser._id }, { $set: getUser })
                res.json({ code: 200, success: false, message: 'password is successfully Updated', })
            } else {
                res.json({ code: 404, success: false, message: 'Email/number is not register', })
            }
        } catch (error) {
            console.log("Error in catch", error)
            res.json({ success: false, message: "Somthing went wrong", })
        }
    }
    async updateProfile(req, res) {
        try {
            let { user_id, name, profile_pic, contact_number, gender, address, DOB, email, social_type } = req.body
            let getUser = await UsersModel.findOne({ $and: [{ user_id: user_id }, { social_type: social_type }, { user_type: 'user' }] }).lean()
            if (getUser) {
                if (getUser.block_user == '1') {
                    return res.json({ code: 404, success: false, message: 'User is blocked by admin', })
                } else {
                    if (name && name != "") {
                        getUser.name = name
                    }
                    if (profile_pic && profile_pic != "") {
                        // let data = await commenFunction._uploadBase64image(profile_pic, 'ProfileImage')
                        // getUser.profile_pic = data.replace(/\\/g, "/");
                        getUser.profile_pic = profile_pic
                    }
                    if (contact_number && contact_number != "") {
                        getUser.contact_number = contact_number
                    }
                    if (gender && gender != "") {
                        getUser.gender = gender
                    }
                    if (address && address != "") {
                        getUser.address = address
                    }
                    if (DOB && DOB != "") {
                        getUser.DOB = DOB
                    }
                    if (email && email != "") {
                        getUser.email = email
                    }
                    let data1 = {}
                    data1 = await UsersModel.findOneAndUpdate({ user_id: user_id }, { $set: getUser }, { new: true })
                    res.json({ code: 200, success: true, message: 'Profile updated successfully', data: data1 })
                }
            } else {
                res.json({ code: 404, success: false, message: 'Email is not register', })
            }
        } catch (error) {
            console.log("Error in catch", error)
            res.json({ success: false, message: "Somthing went wrong", })
        }
    }

    async getCategoryList(req, res) {
        try {
            let data = await CategoryModel.find({ status: 'active' })
            // console.log("news", data)
            res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async getSubCategoryList(req, res) {
        try {
            let options = {
                page: Number(req.body.page) || 1,
                limit: Number(req.body.limit) || 10,
                sort: { createdAt: -1 },
                lean: true,
            }
            let query = {}
            if (req.query._id) {
                let data = {}
                data.categorylist = await SubCategoryModel.find({ category: req.query._id, status: 'active' }, { category_meta: 0 }).limit( 10 ).lean()
                data.images = constants.subcategoryImageArray
                // data.push(constants.subcategoryImageArray)
                res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
            }
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async getChapterList(req, res) {
        try {
            let data = await ChapterModel.find({ subcategory: req.query._id }, { subcategory_meta: 0, category_meta: 0 })
            // console.log("news", data)
            res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
  
    async getStateList(req, res) {

        try {
            let getUser = await StateModel.find({})
            res.json({ code: 200, success: true, message: "Get list successfully ", data: getUser })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }

    }
    async sendotp(req, res) {

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

// Set region
AWS.config.update({
    region: `${process.env.AWS_REGION}`,
    accessKeyId:  `${process.env.AWS_ACCESS_KEY_ID}`,
    secretAccessKey: `${process.env.AWS_SRCRET_ACCESS_KEY}`});

// Create publish parameters
var params = {
  Message: 'TEXT_MESSAGE', /* required */
  PhoneNumber: '919999367425',
};

// Create promise and SNS service object
var publishTextPromise = new AWS.SNS({apiVersion: 'latest'}).publish(params).promise();

// Handle promise's fulfilled/rejected states
publishTextPromise.then(
  function(data) {
    res.status(500).json({ success: false, message: data.MessageId, })
    console.log("MessageID is " + data.MessageId);
  }).catch(
    function(err) {
    console.error(err, err.stack);
  });

    }
    async getQuestionlist(req, res) {
        try {
            let { category, subcategory, chapter, difficulty_level, page, limit } = req.body
            let options = {
                page: Number(page) || 1,
                limit: Number(limit) || 20,
                sort: { createdAt: -1 },
                lean: true,
                select: {
                    "question": 1,
                    "options": 1,
                    "question_is_image":1,
                    "option_A_is_image":1,
                    "option_B_is_image":1,
                    "option_C_is_image":1,
                    "option_D_is_image":1,
                    // "chapter_meta": 1,
                    "info": 1,
                    "difficulty_level": 1,
                    "category_meta.name": 1,
                    "subcategory_meta.name": 1,
                    "chapter_meta.name": 1,
                    "chapter": 1,
                    "correct_index": 1,
                    "is_image": 1,
                    // 'question options info chapter_meta'
                }
            }
            let query = {}
            if (category) { query.category = req.body.category }
            if (subcategory) {
                // query['chapter_meta.subcategory'] = req.body.subcategory
                query.subcategory = req.body.subcategory
            }
            if (difficulty_level) {
                query.difficulty_level = req.body.difficulty_level
            }
            let get_chapter
            if (chapter) {
                query.chapter = req.body.chapter
                get_chapter = await ChapterModel.findOne({ _id: req.body.chapter })
            }
            console.log("query", query)

            let data = await QuestionModel.paginate(query, options)
            // console.log("news", data)
            data.time = Number(get_chapter.time.split("m")[0]);
            res.json({ code: 200, success: true, message: "Get list successfully ", data: data })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async startTest(req, res) {
        try {
            const { user_id, chapter_id } = req.body
            // let data ={}
            const start_time = moment().utcOffset("+05:30").format("DD.MM.YYYY HH.mm.ss")
            let data = await MocktestModel.findOne({ user_id: user_id, chapter: chapter_id }).lean()
            if (data) {
                data.start_time = start_time
                data.online_status = 'online'
                data = await MocktestModel.findOneAndUpdate({ user_id: user_id, chapter: chapter_id },
                    { $set: data }, { new: true }).lean()
                res.json({ code: 200, success: true, message: "Test update successfully ", data: data })
            } else {
                let saveData = new MocktestModel({
                    user_id: user_id,
                    start_time: start_time,
                    chapter: chapter_id,
                    online_status: 'online',
                })
                let data1 = await saveData.save();
                res.json({ code: 200, success: true, message: "Test create successfully ", data: data1 })
            }
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    ///// enum: ['online', 'complete', 'pending', ],
    async submitTest(req, res) {
        try {
            const { user_id, chapter_id, attampt_question, end_time, start_time } = req.body
            // let getData = await MocktestModel.findOne({ user_id: user_id, chapter: chapter_id }).lean()
            // if (getData) {
            //     res.json({ code: 200, success: true, message: "Already submit successfully ", data: getData })

            // } else {
            // let newArray = JSON.parse(attampt_question)
            await MocktestModel.deleteOne({ user_id: user_id, chapter: chapter_id }).lean()

            var mins = moment.utc(moment(end_time, "HH:mm:ss").diff(moment(start_time, "HH:mm:ss"))).format("HH:mm:ss")

            let totalQuestionNo = attampt_question.length
            let attampt_question1 = await attampt_question.filter((item) => {
                if (item.questionId != "") {
                    return item
                }
            });
            let correct_question1 = await attampt_question1.filter((item) => item.currectOption == item.selectedOption);
            let percentage = ((correct_question1.length / attampt_question.length) * 100).toFixed(2)
            let tag = percentage < 30 ? 'fail' : percentage > 30 && percentage < 50 ? "poor" : percentage > 50 && percentage < 70 ? "good" : 'excellent'
            let saveData = new MocktestModel({
                user_id: user_id,
                end_time: end_time,
                start_time: start_time,
                chapter: chapter_id,
                online_status: 'complete',
                attampt_questions: attampt_question1,
                attampt_total: attampt_question1.length,
                correct_answer: correct_question1.length,
                wrong_questions: (attampt_question1.length - correct_question1.length),
                total_questions: totalQuestionNo,
                percentage: percentage + "%",
                tag: tag,
                online_time: mins
            })
            let data1 = await saveData.save();
            delete data1.wrong_questions_meta
            delete data1.correct_answer_meta
            res.json({ code: 200, success: true, message: "submit successfully ", data: data1 })
            // }

            // const end_time = moment().utcOffset("+05:30").format("DD.MM.YYYY HH.mm.ss")
            // let data = await MocktestModel.findOne({ user_id: user_id, chapter: chapter_id }).lean()
            // console.log("data",data)
            // if (data.online_status == 'complete') {
            //     res.json({ code: 200, success: true, message: "Already submit successfully ", data: data })
            // } else if (data) {
            //     data.end_time = end_time
            //     data.attampt_question = attampt_question
            //     data.online_status = 'complete'
            //     data = await MocktestModel.findOneAndUpdate({ user_id: user_id, chapter: chapter_id },
            //         { $set: data }, { new: true }).lean()
            //     res.json({ code: 200, success: true, message: "submit successfully ", data: data })
            // } else {
            //     res.json({ code: 200, success: true, message: "first need to start test ", })
            // }
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async _getQuestion(id) {
        try {
            let data = await QuestionModel.findOne({ _id: id }, { question: 1, options: 1, difficulty_level: 1 }).lean()
            return data
        } catch (error) {
            throw error
        }
    }
    async getCorrectAnswer(req, res) {
        try {
            const { user_id, chapter_id } = req.body
            let correctAnsArray = [];
            let getdata = await MocktestModel.findOne({ user_id: user_id, chapter: chapter_id }).lean()
            if (getdata) {
                let correct_question1 = await getdata.attampt_questions.filter((item) => item.currectOption == item.selectedOption);
                for (let item of correct_question1) {
                    let questiondata = await this._getQuestion(item.questionId)
                    correctAnsArray.push(questiondata)
                }
            }
            res.json({ code: 200, success: true, message: "Get list successfully ", data: correctAnsArray })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async getIncorrectAnswer(req, res) {
        try {
            const { user_id, chapter_id } = req.body
            let IncorrectAnsArray = [];
            let getdata = await MocktestModel.findOne({ user_id: user_id, chapter: chapter_id }).lean()
            if (getdata) {
                let Incorrect_question1 = await getdata.attampt_questions.filter((item) => item.currectOption != item.selectedOption);
                for (let item of Incorrect_question1) {
                    let questiondata = await this._getQuestion(item.questionId)
                    IncorrectAnsArray.push(questiondata)
                }
            }
            res.json({ code: 200, success: true, message: "Get list successfully ", data: IncorrectAnsArray })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async getUnAnswered(req, res) {
        try {
            const { user_id, chapter_id } = req.body
            let IncorrectAnsArray = [];
            let getdata = await MocktestModel.findOne({ user_id: user_id, chapter: chapter_id }).lean()
            let getAllQuestion = await QuestionModel.find({ chapter: chapter_id }, { question: 1, options: 1, difficulty_level: 1 })
            var uniqueResultTwo = getAllQuestion.filter(function (obj) {
                return !getdata.attampt_questions.some(function (obj2) {
                    return obj._id == obj2.questionId;
                });
            });
            res.json({ code: 200, success: true, message: "Get list successfully ", data1: uniqueResultTwo })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }


    async getflageQuestion(req, res) {
        try {
            const { user_id, chapter_id } = req.body
            let getdata = await FlageModel.find({ 'user_id': user_id, 'meta_data.chapter': mongoose.Types.ObjectId(chapter_id) }, { meta_data: 0 }).populate('question_id', 'question options difficulty_level')
            // delete getdata['meta_data'] 
            res.json({ code: 200, success: true, message: "Get list successfully ", data: getdata })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async getKeyword(req, res) {
        try {
           
            res.json({ code: 200, success: true, message: "Get list successfully ", data: ['category' ,'subcategory', 'pin', 'flag', 'question', 'chapters'] })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Somthing went wrong", })
        }
    }
    async getPlans(req, res) {
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
    async getPlanById(req, res) {
        try {
            let id = req.query._id
            //    console.log("hiiii", category_meta, subcategory_meta, chapter_meta )
            let getdata = await SubscriptionModel.findOne({ _id: id })

            res.json({ code: 200, success: true, message: 'Update successfully', data: getdata })

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async buySubscription(req, res) {
        try {
            const { user_id, subscription_id, payment_id } = req.body
            let getPlane = await SubscriptionModel.findOne({ _id: subscription_id }).lean()
            if (getPlane) {
                const buy_date = moment().utcOffset("+05:30").format("DD.MM.YYYY HH.mm.ss");
                const expire_date = moment(buy_date, "DD.MM.YYYY HH.mm.ss").add(Number(getPlane.days), 'days')
                // console.log("buy_date  expire_date", buy_date, expire_date)
                // let getBuyPlane = await BuySubscriptionModel.findOne({ subscription_id: subscription_id, user_id: user_id }).lean()
                let data = {}
                // if (getBuyPlane) {
                //     data = await BuySubscriptionModel.findOneAndUpdate({ subscription_id: subscription_id, user_id: user_id },
                //         {
                //             $set: {
                //                 buy_date: buy_date,
                //                 expire_date: expire_date,
                //                 status: 'active',
                //                 // buy_count: getBuyPlane.buy_count +1
                //             },
                //             $inc :{buy_count:1}

                //         }, {new: true}).lean()
                // } else {

                // }
                let saveData = new BuySubscriptionModel({
                    user_id: user_id,
                    subscription_id: subscription_id,
                    buy_date: buy_date,
                    expire_date: expire_date,
                    plan_meta: getPlane,
                    payment_id: payment_id,
                })
                data = await saveData.save();

                res.json({ code: 200, success: true, message: 'Buy successfully', data: data })
            } else {
                res.json({ code: 404, success: true, message: 'Data not found' })
            }
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async getcms(req, res) {
        try {
            let options = {
                page: req.body.page || 1,
                limit: req.body.limit || 10,
                sort: { createdAt: -1 },
                lean: true,
                // select: 'name user_type minner_Activity createdAt',
            }
            let query = {}
            let getUser = await CmsModel.paginate(query, options)
            res.json({ code: 200, success: true, message: "Get list successfully ", data: getUser })
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }

    }
    async getcmsById(req, res) {
        try {
            let id = req.query._id
            //    console.log("hiiii", category_meta, subcategory_meta, chapter_meta )
            let getdata = await CmsModel.findOne({ _id: id })

            res.json({ code: 200, success: true, message: 'Update successfully', data: getdata })

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }

    async getResult(req, res) {
        try {
            const { user_id, chapter_id } = req.body
            let getData = await MocktestModel.findOne({ user_id: user_id, chapter: chapter_id }).lean()
            getData.attampt_question = JSON.parse(getData.attampt_question)
            // console.log( typeof JSON.parse(getData.attampt_question))
            getData.totalCurrectAns = await getData.attampt_question.filter((item) => {
                if (item.questionId != "") {
                    return item.currectOption == item.selectedOption
                }
            });
            res.json({ code: 200, success: true, message: 'Update successfully', data: getData })

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    async flageQuestion(req, res) {
        try {
            const { user_id, question_id, status } = req.body
            let getQuestion = await FlageModel.findOne({ user_id: user_id, question_id: question_id }).lean()
            if (getQuestion) {
                let update
                if (status == '0') {
                    update = await FlageModel.deleteOne({ user_id: user_id, question_id: question_id })
                } else {
                    update = await FlageModel.findOneAndUpdate({ user_id: user_id, question_id: question_id }, { $set: { flag: status } }, { new: true })
                }
                res.json({ code: 200, success: true, message: 'flag update successfully', data: "" })
            } else {
                let getQuestion1 = await QuestionModel.findOne({ _id: question_id }).lean()
                let saveData = new FlageModel({
                    user_id: user_id,
                    question_id: question_id,
                    flag: status,
                    meta_data: getQuestion1
                })
                let data = await saveData.save();
                res.json({ code: 404, success: true, message: 'flag successfully', data: "" })
            }
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }

    async pinQuestions(req, res) {
        try {
            const { user_id, question_id, status } = req.body
            let getQuestion = await PinQuestionModel.findOne({ user_id: user_id, question_id: question_id }).lean()
            if (getQuestion) {
                let update
                if (status == '0') {
                    update = await PinQuestionModel.deleteOne({ user_id: user_id, question_id: question_id })
                } else {
                    update = await PinQuestionModel.findOneAndUpdate({ user_id: user_id, question_id: question_id }, { $set: { pin_status: status } }, { new: true }).lean()
                }

                res.json({ code: 200, success: true, message: 'pin update successfully', data: "" })
            } else {
                let getQuestion1 = await QuestionModel.findOne({ _id: question_id }).lean()
                let saveData = new PinQuestionModel({
                    user_id: user_id,
                    question_id: question_id,
                    pin_status: status,
                    meta_data: getQuestion1
                })
                let data = await saveData.save();

                res.json({ code: 404, success: true, message: 'pin successfully', data: "" })
            }
        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }
    // [category ,subcategory, pin, flag, question, chapters]
    async SearchApi(req, res) {
        try {
            const { user_id, search_data, } = req.body
            let search_types = req.body.search_types || ['category', 'subcategory', 'pin', 'flag', 'question', 'chapter']

            let data = {};
            let categoryData;
            let subcategoryData;
            let pinData;
            let flageData;
            let QuestionData;
            let chapterData;
            if (search_types.length > 0) {
                for (let iterator of search_types) {
                    if (iterator == 'category') {
                        categoryData = await this._categorySearch(search_data)
                        data.categories = categoryData
                    }
                    if (iterator == 'subcategory') {
                        subcategoryData = await this._subcategorySearch(search_data)
                        data.subcategories = subcategoryData
                    }
                    if (iterator == 'pin') {
                        pinData = await this._pinSearch(user_id, search_data)
                        data.pin_questions = pinData
                    }
                    if (iterator == 'flag') {
                        flageData = await this._flageSearch(user_id, search_data)
                        data.flag_question = flageData
                    }
                    if (iterator == 'question') {
                        QuestionData = await this._questionSearch(search_data)
                        data.questions = QuestionData
                    }
                    if (iterator == 'chapter') {
                        chapterData = await this._chapterSearch(search_data)
                        data.chapters = chapterData
                    }
                }
            }



            res.json({ code: 200, success: true, message: 'get successfully', data: data })

        } catch (error) {
            console.log("Error in catch", error)
            res.status(500).json({ success: false, message: "Internal server error", })
        }
    }

    async _categorySearch(data) {
        let searchData = data
        try {
            let SearchResult = await CategoryModel.aggregate([{ $match: { $or: [{ name: { $regex: searchData, $options: "i" } }, { content: { $regex: searchData, $options: "i" } }] } }])
            // let newArray = [];
            // for (let element of articleSearchResult) {
            //     let newObj = {}
            //     newObj.image = "http://52.14.78.31:5000/company_project/thumbnailimage/image-1591176387819.jpg"
            //     if (element.header_media.type == "image") {
            //         if (Array.isArray(element.header_media)) {
            //             newObj.image = element.header_media[0].url
            //         } else {
            //             newObj.image = element.header_media.url
            //         }

            //     }
            //     newObj._id = element._id
            //     newObj.title = element.title
            //     newObj.type = element.type

            //     newArray.push(newObj)

            // }
            return SearchResult;
        } catch (err) {
            console.log("err", err)
            throw err
        }
    }
    async _questionSearch(data) {
        let searchData = data
        try {
            let SearchResult = await QuestionModel.aggregate([{ $match: { $or: [{ question: { $regex: searchData, $options: "i" } }] } }, { $project: { question: 1 } }])
            return SearchResult;
        } catch (err) {
            console.log("err", err)
            throw err
        }
    }
    async _chapterSearch(data) {
        let searchData = data
        try {
            let SearchResult = await ChapterModel.aggregate([{ $match: { $or: [{ name: { $regex: searchData, $options: "i" } }] } }, { $project: { name: 1, is_mocktest: 1, questions: 1, time: 1, marks: 1 } }])
            return SearchResult;
        } catch (err) {
            console.log("err", err)
            throw err
        }
    }
    async _subcategorySearch(data) {
        let searchData = data
        try {
            let SearchResult = await SubCategoryModel.aggregate([{ $match: { $or: [{ name: { $regex: searchData, $options: "i" } }] } }, { $project: { name: 1, status: 1, "category_meta.name": 1 } }])
            return SearchResult;
        } catch (err) {
            console.log("err", err)
            throw err
        }
    }
    async _flageSearch(user_id, data) {
        let searchData = data
        let id = mongoose.Types.ObjectId(user_id);
        try {
            let SearchResult = await FlageModel.aggregate([{
                $match: {
                    $and: [{ user_id: id }, { 'meta_data.question': { $regex: searchData, $options: "i" } }]
                }
            }, { $project: { user_id: 1, flag: 1, "meta_data.question": 1 } }])
            return SearchResult;
        } catch (err) {
            console.log("err", err)
            throw err
        }
    }

    async _pinSearch(user_id, data) {
        let searchData = data
        let id = mongoose.Types.ObjectId(user_id);
        try {
            let SearchResult = await PinQuestionModel.aggregate([{
                $match: {
                    $and: [{ user_id: id }, { 'meta_data.question': { $regex: searchData, $options: "i" } }]
                }
            }, { $project: { user_id: 1, pin_status: 1, "meta_data.question": 1 } }])
            return SearchResult;
        } catch (err) {
            console.log("err", err)
            throw err
        }
    }

    //////////////////////////////////////////////////////////////////////////////////end aipl/////////////////////////////////////////

    async verifyOtp(req, res) {
        try {

            let { APP_KEY,OTP,ID } = req.body
            let getUser = await UsersModel.findOne({ _id: ID }).lean();
             let errorMessage
             let successMessage
            if(APP_KEY!=process.env.APP_KEY){
            return res.json({ code: 404, STATUS: "FAILURE", MESSAGE: 'Please enter correct app key', })
            }
            else
            {
            if (getUser) {
                
                if (getUser.otp != OTP) {
                    errorMessage = "Otp is invalid"
                }
                if (getUser.otp == OTP) {
                    getUser.is_verified_otp = 1
                    getUser.otp = 0
                    let data = await UsersModel.findOneAndUpdate({ _id: getUser._id }, getUser)
                     successMessage = "Otp verified successfully"
                }
            } else {
                errorMessage = "Authentication is Failed"
            }
            if (errorMessage) {
                res.json({ STATUS: "FAILURE", MESSAGE: errorMessage })
            } else {
                res.json({ STATUS: "SUCCESS", MESSAGE: successMessage })
            }
        }
        } catch (error) {
            console.log("error in catch", error)
            res.json({ STATUS: "FAILURE", MESSAGE: "Somthing went wrong", data: null })
        }
    }

}

module.exports = new users();