import express from 'express'
import { validateAdmin, validateUser } from '../../middleware/authMiddleware'
import LanguagePrepController from '../controller/LanguagePrepController'
import { uploadMedia } from '../../middleware/fileUpload'

const languagePrepRoutes = express.Router()


// add LanguagePrepController
languagePrepRoutes.route("/add").post(validateAdmin, uploadMedia.single("file"), LanguagePrepController.addLanguage)
languagePrepRoutes.route("/edit").post(validateAdmin, uploadMedia.single("file"), LanguagePrepController.editLanguage)
languagePrepRoutes.route("/delete").post(validateAdmin, uploadMedia.single("file"), LanguagePrepController.deleteLanguage)
languagePrepRoutes.route("/toggle").post(validateAdmin, LanguagePrepController.toggleLanguage)
languagePrepRoutes.route("/list").post(validateAdmin, LanguagePrepController.listLanguages)
languagePrepRoutes.route("/details_basic").post(validateAdmin, LanguagePrepController.detailsBasic)


const chapterRoutes = express.Router()

languagePrepRoutes.use("/chapters", chapterRoutes)

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


const studentRoutes = express.Router()
studentRoutes.route("/purchase").post(validateUser, LanguagePrepController.purchaseLevel)
studentRoutes.route("/purchase_check").post(validateUser, LanguagePrepController.purchaseLevelCheck)
studentRoutes.route("/purchase_list").get(validateUser, LanguagePrepController.purchaseList)
studentRoutes.route("/purchase_course_details").post(validateUser, LanguagePrepController.purchaseCourseDetails)
studentRoutes.route("/purchase_sub_point_details").post(validateUser, LanguagePrepController.purchaseCourseSubPointDetails)
studentRoutes.route("/progress_check").post(validateUser, LanguagePrepController.getCourseProgress)
studentRoutes.route("/progress_update").post(validateUser, LanguagePrepController.updateCourseProgress)


languagePrepRoutes.use("/student", studentRoutes)
export default languagePrepRoutes