import { response, Response } from "express";
import { RequestWithUser } from "../../utils/types";
import { returnHelper } from "../../helpers/returnHelper";
import Courses from "../../model/Courses";
import fs from 'fs'
import path from 'path'
import CourseChapters from "../../model/CourseChapters";
import CourseChapterPoints from "../../model/CourseChapterPoints";

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

            const { chapter_name, description, uuid, order_number } = req.body


            await CourseChapters.update({
                chapter_name,
                description,
                order_number
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
            return returnHelper(res, 500, false, error.message)
        }
    }
    async deleteChapter(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body


            const findChapter = await CourseChapters.findOne({
                where: {
                    uuid
                }
            })

            if (!findChapter) {
                return returnHelper(res, 200, false, "Failed to action!")
            }

            // based on chapters find sub chapters 
            const allSubChapters = await CourseChapterPoints.findAll({
                where: {
                    chapter_uuid: uuid
                }
            })

            if (allSubChapters && allSubChapters.length !== 0) {
                await Promise.all(allSubChapters.map(async (item) => {
                    await deleteChapterFunction(item.dataValues.uuid)
                }))
            }

            // delete chapters
            await CourseChapters.destroy({ where: { uuid } })

            return returnHelper(res, 200, true, "Deleted")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }


    // sub chapters 

    async listSubChapters(req: RequestWithUser, res: Response) {
        try {

            // sub chapters add
            const {
                uuid
            } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, " Failed to Get Data ")
            }


            // based on that create sub chatper with title and description
            const allPoints = await CourseChapterPoints.findAll({
                where: {
                    chapter_uuid: uuid
                }
            })

            return res.status(200).json({
                success: true,
                message: "Records Found",
                data: allPoints
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async getSubChapter(req: RequestWithUser, res: Response) {
        try {

            // sub chapters add
            const {
                uuid
            } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, " Failed to Get Data ")
            }


            // based on that create sub chatper with title and description
            const allPoints = await CourseChapterPoints.findOne({
                where: {
                    uuid: uuid
                }
            })

            return res.status(200).json({
                success: true,
                message: "Records Found",
                data: allPoints
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async deleteSubChapter(req: RequestWithUser, res: Response) {
        try {

            // sub chapters add
            const {
                uuid
            } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, " Failed to Get Data ")
            }

            deleteChapterFunction(uuid)


            return returnHelper(res, 200, true, "deleted")


        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async addSubChapter(req: RequestWithUser, res: Response) {
        try {

            // sub chapters add
            const {
                chapter_uuid,
                title,
                short_description,
                video_url
            } = req.body

            if (!chapter_uuid) {
                return returnHelper(res, 200, false, " Failed to action ")
            }

            if (!title) {
                return returnHelper(res, 200, false, " Please Provide Title ")
            }

            if (!short_description) {
                return returnHelper(res, 200, false, " Please Provide description ")
            }

            // find course_uuid based on chapter_uuid 

            const findChapter = await CourseChapters.findOne({
                where: {
                    uuid: chapter_uuid
                }
            })

            if (!findChapter) {
                return returnHelper(res, 200, false, "Failed to update")
            }

            let file = ""
            let file_type = "pdf";
            if (req.file) {

                // file create here
                file = `${Date.now()}-${Math.floor(
                    1000 + Math.random() * 9000
                )}${path.parse(req.file.originalname).ext}`;

                const imageTypes = [
                    "image/png",
                    "image/jpg",
                    "image/jpeg",
                    "application/octet-stream"
                ]
                const pdfType = [
                    "application/pdf"
                ]

                if (imageTypes.includes(req?.file?.mimetype)) {
                    file_type = "image";
                } else if (pdfType.includes(req?.file?.mimetype)) {
                    file_type = "pdf";
                }
            }

            // based on that create sub chatper with title and description
            await CourseChapterPoints.create({
                title,
                short_description,
                chapter_uuid,
                video_url,
                file,
                file_type
            }).then(() => {
                // add file here 
                if (req.file) {
                    fs.writeFileSync(
                        path.join("public/course_chapter_items", file),
                        req.file!.buffer
                    );
                }
            })

            return returnHelper(res, 200, true, "Created")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async editSubChapter(req: RequestWithUser, res: Response) {
        try {

            // sub chapters add
            const {
                title,
                short_description,
                video_url,
                uuid,
                order_number
            } = req.body
            if (!uuid) {
                returnHelper(res, 200, false, " Failed to action ")
            }

            const findSubchapter = await CourseChapterPoints.findOne({
                where: {
                    uuid
                }
            })
            if (!findSubchapter) {
                return returnHelper(res, 200, false, "Sub Chapter Not Found")
            }

            let file = findSubchapter.dataValues.file
            let file_type = findSubchapter.dataValues.file_type;

            if (req.file) {

                // file create here
                file = `${Date.now()}-${Math.floor(
                    1000 + Math.random() * 9000
                )}${path.parse(req.file.originalname).ext}`;


                const imageTypes = [
                    "image/png",
                    "image/jpg",
                    "image/jpeg",
                    "application/octet-stream"
                ]
                const pdfType = [
                    "application/pdf"
                ]

                if (imageTypes.includes(req?.file?.mimetype)) {
                    file_type = "image";
                } else if (pdfType.includes(req?.file?.mimetype)) {
                    file_type = "pdf";
                }
            }


            const updateParams = {
                ...(title && { title }),
                ...(short_description && { short_description }),
                ...(video_url && { video_url }),
                ...(order_number && { order_number }),
            }

            await CourseChapterPoints.update(updateParams, {
                where: {
                    uuid
                }
            })

            if (req.file) {
                fs.writeFileSync(
                    path.join("public/course_chapter_items", file),
                    req.file!.buffer
                );
            }

            return returnHelper(res, 200, true, "Updated")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    // public apis 
    async publicListLangaugePreps(req: RequestWithUser, res: Response) {
        try {

            const findLanguages = await Courses.findAll({
                attributes: [
                    "uuid",
                    "title",
                    "banner_image",
                    "access_banner"
                ],
                where: {
                    is_public: 1
                }
            })

            return res.status(200).json({
                success: true,
                data: findLanguages
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async publicDetailsLangaugePreps(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body
            if (!uuid) {
                return returnHelper(res, 200, false, "Something not working")
            }

            const findLanguages = await Courses.findOne({
                where: {
                    uuid,
                    is_public: 1
                },
                attributes: [
                    "access_banner",
                    "banner_image",
                    "description",
                    "title",
                ],
                include: [
                    {
                        model: CourseChapters,
                        as: "chapters",
                        attributes: [
                            "chapter_name",
                            "description",
                            "level",
                            "order_number"
                        ]
                    }
                ]
            })

            return res.status(200).json({
                success: true,
                data: findLanguages
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

}

async function deleteChapterFunction(uuid) {

    // based on that create sub chatper with title and description
    const findPoint = await CourseChapterPoints.findOne({
        where: {
            uuid: uuid
        }
    })

    if (findPoint) {
        // based on that point if there is any file than delete it 
        if (findPoint.dataValues.file && findPoint.dataValues.file !== "") {

            if (fs.existsSync(`./public/course_chapter_items/${findPoint.dataValues.file}`)) {
                fs.unlink("./public/course_chapter_items/" + findPoint.dataValues.file, (err) => {
                    if (err) {
                        console.error("Some issue in deleting file", err);
                    }
                });
            }
        }

        // destroy point

        await CourseChapterPoints.destroy({
            where: {
                uuid
            }
        })
    }




}

export default new LanguagePrepController()