const express = require('express');
const router = express.Router();

const uploadFile = require('../../middlewares/fileUploadHelper');
const upload=uploadFile.uploadFileMethod('NewsAndBlogs');
// create login routes
let getNewsAndBlog = require('../../controllers/common/Common');
let state = require('../../controllers/admin/state');
let validationData= require('../../middlewares/FrontendValidator');
// upload.single('profile_image')
const Auth = require("../../middlewares/loginToken")
router.get('/getList',state.get)



module.exports = router;

