import express from 'express'
import { validateAdmin } from '../../middleware/authMiddleware'
import LanguagePrepController from '../controller/LanguagePrepController'
import { uploadMedia } from '../../middleware/fileUpload'

const languagePrepRoutes = express.Router()


// add LanguagePrepController
languagePrepRoutes.route("/add").post(validateAdmin,uploadMedia.single("file"),LanguagePrepController.addLanguage)
languagePrepRoutes.route("/edit").post(validateAdmin,uploadMedia.single("file"),LanguagePrepController.editLanguage)
languagePrepRoutes.route("/list").post(validateAdmin,LanguagePrepController.listLanguages)
languagePrepRoutes.route("/details_basic").post(validateAdmin,LanguagePrepController.detailsBasic)


const chapterRoutes = express.Router()

languagePrepRoutes.use("/chapters",chapterRoutes)

chapterRoutes.route("/add").post(validateAdmin,LanguagePrepController.addChapter)
chapterRoutes.route("/update").post(validateAdmin,LanguagePrepController.updateChapter)
chapterRoutes.route("/list").post(validateAdmin,LanguagePrepController.getChapters)
chapterRoutes.route("/get").post(validateAdmin,LanguagePrepController.getChapter)
export default languagePrepRoutes