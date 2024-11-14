import { response, Response } from "express";
import { RequestWithUser } from "../../utils/types";
import { returnHelper } from "../../helpers/returnHelper";
import Courses from "../../model/Courses";
import fs from 'fs'
import path from 'path'
import CourseChapters from "../../model/CourseChapters";
import CourseChapterPoints from "../../model/CourseChapterPoints";
import CoursePurchase from "../../model/CoursePurchase";

class LanguagePrepController {

    async addLanguage(req: RequestWithUser, res: Response) {
        try {

            const { title, description, level1_price, level2_price, level3_price } = req.body

            if (!title) {
                return returnHelper(res, 200, false, "Please Provide Title")
            }

            if (!description) {
                return returnHelper(res, 200, false, "Please Provide Description")
            }

            var banner_image = "";

            if (req.file) {
                banner_image = `${Date.now()}-${Math.floor(
                    1000 + Math.random() * 9000
                )}${path.parse(req.file.originalname).ext}`;
            }


            await Courses.create({
                title,
                description,
                banner_image,
                level1_price, level2_price, level3_price
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

            const { title, description, uuid, level1_price, level2_price, level3_price } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Invalid Action")
            }

            var banner_image = "";

            if (req.file) {
                banner_image = `${Date.now()}-${Math.floor(
                    1000 + Math.random() * 9000
                )}${path.parse(req.file.originalname).ext}`;
            }

            const updateParams = {
                ...(title !== undefined && { title }),
                ...(description !== undefined && { description }),
                ...(level1_price !== undefined && { level1_price }),
                ...(level2_price !== undefined && { level2_price }),
                ...(level3_price !== undefined && { level3_price }),
            }


            await Courses.update(updateParams, {
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
    async deleteLanguage(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Invalid Action")
            }

            await Courses.destroy({
                where: { uuid }
            })

            return returnHelper(res, 200, true, "Language Deleted!")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async toggleLanguage(req: RequestWithUser, res: Response) {
        try {

            const { uuid, status } = req.body

            if (!uuid || !status) {
                return returnHelper(res, 200, false, "Invalid Action")
            }

            const statusMustBe = ["active", "inactive"]

            if (status && !statusMustBe.includes(status)) {
                return returnHelper(res, 200, false, "Inavlid Action")
            }

            const isExist = await Courses.findOne({
                where: {
                    uuid
                }
            })

            if (!isExist) {
                return returnHelper(res, 200, false, "Invalid Action")
            }

            await Courses.update({ is_public: status == "active" ? 1 : 0 }, {
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "Updated")


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
                    "level1_price",
                    "level2_price",
                    "level3_price",
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
    // purchase level
    async purchaseLevel(req: RequestWithUser, res: Response) {
        try {

            const levelMustBe = ["level1", "level2", "level3"]

            const { course_uuid, level } = req.body

            if (course_uuid == undefined) {
                return returnHelper(res, 200, false, "Invalid Action")
            }
            if (level == undefined) {
                return returnHelper(res, 200, false, "Invalid Action")
            }
            if (level && level == "") {
                return returnHelper(res, 200, false, "Invalid Action")
            }
            if (!levelMustBe.includes(level)) {
                return returnHelper(res, 200, false, "Invalid Action")
            }

            const isExist = await CoursePurchase.findOne({
                where: {
                    course_uuid,
                    level,
                    student_uuid: req?.uuid
                }
            })

            if (isExist) {
                return returnHelper(res, 200, false, "This Level already Purchased!!")
            }

            await CoursePurchase.create({
                course_uuid,
                level,
                student_uuid: req?.uuid
            })

            return returnHelper(res, 200, true, "Purchase Successfully")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    // check purchased or not
    async purchaseLevelCheck(req: RequestWithUser, res: Response) {
        try {

            const levelMustBe = ["level1", "level2", "level3"]

            const { course_uuid, level } = req.body

            if (course_uuid == undefined) {
                return returnHelper(res, 200, false, "Invalid Action")
            }
            if (level == undefined) {
                return returnHelper(res, 200, false, "Invalid Action")
            }
            if (level && level == "") {
                return returnHelper(res, 200, false, "Invalid Action")
            }
            if (!levelMustBe.includes(level)) {
                return returnHelper(res, 200, false, "Invalid Action")
            }

            const isExist = await CoursePurchase.findOne({
                where: {
                    course_uuid,
                    level,
                    student_uuid: req?.uuid
                }
            })

            if (!isExist) {
                return returnHelper(res, 200, true, "", { purchase: false })
            }

            return returnHelper(res, 200, true, "", { purchase: true })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async purchaseList(req: RequestWithUser, res: Response) {
        try {

            const findPurchases = await CoursePurchase.findAll({
                where: {
                    student_uuid: req?.uuid
                },
                attributes: [
                    "uuid",
                    "level",
                    "createdAt"
                ],
                include: [
                    {
                        model: Courses,
                        as: "course_of",
                        paranoid: false,
                        attributes: [
                            "title",
                            "description",
                            "banner_image",
                            "access_banner"
                        ]
                    }
                ]
            })

            return returnHelper(res, 200, true, "Purchase Found", findPurchases)

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async purchaseCourseDetails(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Invalid Action")
            }

            const findPurchases = await CoursePurchase.findOne({
                where: {
                    student_uuid: req?.uuid,
                    uuid: uuid
                },
                attributes: [
                    "uuid",
                    "level",
                    "course_uuid",
                    "createdAt"
                ],
            })

            if (!findPurchases) {
                return returnHelper(res, 200, false, "Invalid Action")
            }


            const findCourse = await Courses.findOne({
                where: {
                    uuid: findPurchases?.dataValues?.course_uuid
                },
                attributes: [
                    "title",
                    "description",
                    "banner_image",
                    "access_banner",
                    "deletedAt",
                    "uuid"
                ],
                include: [
                    {
                        model: CourseChapters,
                        where: {
                            level: findPurchases?.dataValues?.level
                        },
                        as: "chapters",
                        attributes: [
                            "chapter_name",
                            "createdAt",
                            "description",
                            "order_number",
                        ],
                        include: [
                            {
                                model: CourseChapterPoints,
                                as: "chapter_points",
                                attributes: [
                                    "access_file",
                                    "file",
                                    "file_type",
                                    "order_number",
                                    "short_description",
                                    "title",
                                    "uuid",
                                    "video_url",
                                ]
                            }
                        ]
                    }
                ],
                paranoid: false
            })





            return returnHelper(res, 200, true, "Purchase Found", findCourse)

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async purchaseCourseSubPointDetails(req: RequestWithUser, res: Response) {
        try {

            const { purchase_id ,point_id} = req.body

            if (!purchase_id) {
                return returnHelper(res, 200, false, "Invalid Action")
            }

            const findPurchases = await CoursePurchase.findOne({
                where: {
                    student_uuid: req?.uuid,
                    uuid: purchase_id
                },
                attributes: [
                    "uuid",
                    "level",
                    "course_uuid",
                    "createdAt"
                ],
            })

            if (!findPurchases) {
                return returnHelper(res, 200, false, "Invalid Action")
            }

            const findSubPoint = await CourseChapterPoints.findOne({
                where:{
                    uuid:point_id,
                    course_uuid:findPurchases?.dataValues?.course_uuid
                },
                attributes: [
                    "access_file",
                    "file",
                    "file_type",
                    "order_number",
                    "short_description",
                    "title",
                    "uuid",
                    "video_url",
                ]
            })
            
            return returnHelper(res, 200, true, "Purchase Found", findSubPoint)

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