import express from 'express'
import { validateAdmin } from '../../middleware/authMiddleware'
import LanguagePrepController from '../controller/LanguagePrepController'
import { uploadMedia } from '../../middleware/fileUpload'

const languagePrepRoutes = express.Router()


// add LanguagePrepController
languagePrepRoutes.route("/add").post(validateAdmin, uploadMedia.single("file"), LanguagePrepController.addLanguage)
languagePrepRoutes.route("/edit").post(validateAdmin, uploadMedia.single("file"), LanguagePrepController.editLanguage)
languagePrepRoutes.route("/list").post(validateAdmin, LanguagePrepController.listLanguages)
languagePrepRoutes.route("/details_basic").post(validateAdmin, LanguagePrepController.detailsBasic)


const chapterRoutes = express.Router()

languagePrepRoutes.use("/chapters", chapterRoutes)

chapterRoutes.route("/add").post(validateAdmin,LanguagePrepController.addChapter)
chapterRoutes.route("/update").post(validateAdmin,LanguagePrepController.updateChapter)
chapterRoutes.route("/list").post(validateAdmin,LanguagePrepController.getChapters)
chapterRoutes.route("/get").post(validateAdmin,LanguagePrepController.getChapter)

// video content 
chapterRoutes.route("/add").post(validateAdmin, LanguagePrepController.addChapter)
chapterRoutes.route("/update").post(validateAdmin, LanguagePrepController.updateChapter)
chapterRoutes.route("/list").post(validateAdmin, LanguagePrepController.getChapters)
chapterRoutes.route("/get").post(validateAdmin, LanguagePrepController.getChapter)
chapterRoutes.route("/delete").post(validateAdmin, LanguagePrepController.deleteChapter)

// sub chapters 
const subChapters = express.Router()

languagePrepRoutes.use("/sub_chapters", subChapters)

subChapters.route("/list").post(validateAdmin, LanguagePrepController.listSubChapters)
subChapters.route("/get").post(validateAdmin, LanguagePrepController.getSubChapter)
subChapters.route("/delete").post(validateAdmin, LanguagePrepController.deleteSubChapter)
subChapters.route("/add").post(validateAdmin, uploadMedia.single("file"), LanguagePrepController.addSubChapter)
subChapters.route("/update").post(validateAdmin, uploadMedia.single("file"), LanguagePrepController.editSubChapter)

const publicRoutes = express.Router()
languagePrepRoutes.use("/public", publicRoutes)
publicRoutes.route("/list").get(LanguagePrepController.publicListLangaugePreps)
publicRoutes.route("/details").post(LanguagePrepController.publicDetailsLangaugePreps)

export default languagePrepRoutes