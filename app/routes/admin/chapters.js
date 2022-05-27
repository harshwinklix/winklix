const express = require('express');
const router = express.Router();
const uploadFile = require('../../middlewares/fileUploadHelper');
const upload=uploadFile.uploadFileMethod('QuestionsSheets');
let chapters = require('../../controllers/admin/chapters');
router.post('/get-chapters',chapters.get)
router.post('/add-chapter',chapters.create)
router.delete('/delete-chapter',chapters.delete)
router.get('/chapter-list',chapters.getList)
router.post('/uploade-sheet',upload.single('xlsSheet'),chapters.uploadeXlsSheet)
router.get('/view-chapter',chapters.viewChapters)
router.put('/edit-chapter',chapters.editChapters)
router.post('/insert-chapter',chapters.insertXlsSheetData)
module.exports = router;

