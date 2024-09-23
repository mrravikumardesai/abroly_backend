import express from 'express'
import { validateAdmin } from '../../middleware/authMiddleware'
import LanguagePrepController from '../controller/LanguagePrepController'
import { uploadMedia } from '../../middleware/fileUpload'

const languagePrepRoutes = express.Router()


// add LanguagePrepController
languagePrepRoutes.route("/add").post(validateAdmin,uploadMedia.any(),LanguagePrepController.addLanguage)
languagePrepRoutes.route("/list").post(validateAdmin,LanguagePrepController.listLanguages)

export default languagePrepRoutes