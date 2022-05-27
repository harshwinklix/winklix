const express = require('express');
const router = express.Router();

const uploadFile = require('../../middlewares/fileUploadHelper');
const upload=uploadFile.uploadFileMethod('ProfileImage');
// create login routes
const user_controller = require('../../controllers/users/userAuth');
const getNewsAndBlog = require('../../controllers/common/Common')
const wallet = require('../../controllers/users/wallet')

const validationData= require('../../middlewares/FrontendValidatorUser');

router.post('/app_signup_step1',validationData.signUp,  user_controller.signUp);
router.post('/app_signup_step2',validationData.signUpStep2,  user_controller.signUpStep2);
router.post('/fabricator_signup_step2',validationData.fabricator_signup_step2,  user_controller.fabricator_signup_step2);
router.post('/appotpVerification',validationData.verifyOtp,  user_controller.verifyOtp);
router.post('/app_login',validationData.login, user_controller.login)
router.post('/home',validationData.home, user_controller.home)
router.post('/reste-password', user_controller.setNewPassword)
router.get('/state_list', user_controller.getStateList)
router.get('/sendotp', user_controller.sendotp)
router.put('/update-profile',validationData.updateProfile, user_controller.updateProfile)
router.get('/get-category', user_controller.getCategoryList)
router.get('/get-subcategory', user_controller.getSubCategoryList)
router.get('/get-chapters', user_controller.getChapterList)
router.post('/question-list', user_controller.getQuestionlist)

router.post('/submit-test', user_controller.submitTest)
router.post('/start-test', user_controller.startTest)
///////////////////////////////////subscription//////////////////////////////////////

router.post('/get-plans', user_controller.getPlans)
router.get('/get-plan-by-id', user_controller.getPlanById)
router.post('/buy-subscription', user_controller.buySubscription)


router.post('/aboutUs', user_controller.getcms)
router.get('/get-cms-by-id', user_controller.getcmsById)
router.get('/get-keyword', user_controller.getKeyword)

router.post('/get-result', user_controller.getResult)
router.post('/add-flag', user_controller.flageQuestion)
router.post('/add-pin', user_controller.pinQuestions)
router.post('/search-data', user_controller.SearchApi)

router.post('/get-correct-question', user_controller.getCorrectAnswer)
router.post('/get-incorrect-question', user_controller.getIncorrectAnswer)
router.post('/get-flag-question', user_controller.getflageQuestion)
router.post('/get-unanswered-question', user_controller.getUnAnswered)








module.exports = router;

