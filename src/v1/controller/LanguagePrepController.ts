import { response, Response } from "express";
import { RequestWithUser } from "../../utils/types";
import { returnHelper } from "../../helpers/returnHelper";
import Courses from "../../model/Courses";
import fs from 'fs'
import path from 'path'
import CourseChapters from "../../model/CourseChapters";

class LanguagePrepController {

    async addLanguage(req: RequestWithUser, res: Response) {
        try {

            const { title, description } = req.body

            var banner_image = "";

            if (req.file) {
                banner_image = `${Date.now()}-${Math.floor(
                    1000 + Math.random() * 9000
                )}${path.parse(req.file.originalname).ext}`;
            }



            await Courses.create({
                title,
                description,
                banner_image
            })

            if (req.file) {
                fs.writeFileSync(
                    path.join("public/courses", banner_image),
                    req.file!.buffer
                );
            }

            return returnHelper(res, 200, true, "Language Added!")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async editLanguage(req: RequestWithUser, res: Response) {
        try {

            const { title, description, uuid } = req.body

            var banner_image = "";

            if (req.file) {
                banner_image = `${Date.now()}-${Math.floor(
                    1000 + Math.random() * 9000
                )}${path.parse(req.file.originalname).ext}`;
            }


            await Courses.update({ title, description }, {
                where: { uuid }
            })

            if (req.file) {
                await Courses.update({ banner_image }, {
                    where: { uuid }
                })
                fs.writeFileSync(
                    path.join("public/courses", banner_image),
                    req.file!.buffer
                );
            }

            return returnHelper(res, 200, true, "Language Updated!")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async listLanguages(req: RequestWithUser, res: Response) {
        try {

            const findLanguages = await Courses.findAll({})

            return res.status(200).json({
                success: true,
                data: findLanguages
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async detailsBasic(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body

            const findLanguages = await Courses.findOne({ where: { uuid } })

            return res.status(200).json({
                success: true,
                data: findLanguages
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async addChapter(req: RequestWithUser, res: Response) {
        try {

            const { chapter_name, description, course_uuid, level } = req.body

            const levels = [
                "level1",
                "level2",
                "level3"
            ]

            await CourseChapters.create({
                chapter_name,
                description,
                course_uuid,
                level: levels[+level - 1]
            })

            return returnHelper(res, 200, true, "Chapter Added!")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async updateChapter(req: RequestWithUser, res: Response) {
        try {

            const { chapter_name, description, uuid } = req.body


            await CourseChapters.update({
                chapter_name,
                description,
            }, {
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "Chapter Updated!")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async getChapters(req: RequestWithUser, res: Response) {
        try {

            const { course_uuid, level } = req.body

            const levels = [
                "level1",
                "level2",
                "level3"
            ]

            const allChapters = await CourseChapters.findAll({
                where: {
                    course_uuid,
                    level: levels[+level - 1]
                }
            })

            return res.status(200).json({
                success: true,
                message: "Chapter Found",
                data: allChapters
            })

        } catch (error: any) {
            console.log(error);

            return returnHelper(res, 500, false, error.message)
        }
    }
    async getChapter(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body


            const allChapters = await CourseChapters.findOne({
                where: {
                    uuid
                }
            })

            return res.status(200).json({
                success: true,
                message: "Chapter Found",
                data: allChapters
            })

        } catch (error: any) {
            console.log(error);

            return returnHelper(res, 500, false, error.message)
        }
    }

}

export default new LanguagePrepController()