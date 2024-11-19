import { Request, Response } from "express";
import { returnHelper } from "../../helpers/returnHelper";
import { RequestWithUser } from "../../utils/types";
import path from 'path'
import fs from 'fs'
import ServiceInfo from "../../model/ServiceInfo";

class ServiceInfoController {

    async addBlock(req: RequestWithUser, res: Response) {
        try {

            const { description, section_type, content_of, order } = req.body

            const mustContentType = ["sop", "motivation", "cover", "language", "sim_card", "health_ins"]

            if (!section_type) {
                return returnHelper(res, 200, false, "Please Select Section type")
            }

            if (!content_of) {
                return returnHelper(res, 200, false, "Please Select Page")
            }

            if (!mustContentType.includes(content_of)) {
                return returnHelper(res, 200, false, "Invalid Selected Page, plase navigate back and try again to add block!")
            }

            if (!order) {
                return returnHelper(res, 200, false, "Please Provide Order")
            }

            const createRecords = {
                section_type: section_type,
                content_of: content_of,
                order: order
            }

            if (section_type && section_type == "image") {

                if (!req.file) {
                    return returnHelper(res, 200, false, "Please Select Image")
                }

                const file = `${Date.now()}-${Math.floor(
                    1000 + Math.random() * 9000
                )}${path.parse(req.file.originalname).ext}`;

                createRecords["file"] = file

                fs.writeFileSync(
                    path.join("public/service_info", file),
                    req.file.buffer
                );

            }

            if (section_type && section_type == "text") {
                if (!description) {
                    return returnHelper(res, 200, false, "Please Provide Descrption")
                }
                createRecords["description"] = description
            }


            await ServiceInfo.create(createRecords)

            return returnHelper(res, 200, true, "block Added")



        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async listBlocks(req: Request, res: Response) {
        try {

            const { content_of } = req.body

            if (!content_of) {
                return returnHelper(res, 200, false, "Something went wrong")
            }

            const allBlocks = await ServiceInfo.findAll({
                where: {
                    content_of
                },
                order: [["order", "ASC"]],
                attributes: [
                    "uuid",
                    "description",
                    "file",
                    "access_file",
                    "section_type",
                    "order",
                ]
            })

            return returnHelper(res, 200, true, "Records Found", allBlocks)


        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async updateService(req: RequestWithUser, res: Response) {
        try {

            const { uuid, description, section_type, order } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Valid Section for update")
            }

            const findBlock = await ServiceInfo.findOne({ where: { uuid } })

            if (!findBlock) {
                return returnHelper(res, 200, false, "Block Not Found")
            }

            const createRecords = {
                section_type: section_type,
                order: order
            }

            if (section_type && section_type == "image") {

                if (req.file) {

                    const file = `${Date.now()}-${Math.floor(
                        1000 + Math.random() * 9000
                    )}${path.parse(req.file.originalname).ext}`;

                    createRecords["file"] = file

                    fs.writeFileSync(
                        path.join("public/service_info", file),
                        req.file.buffer
                    );

                    // delete old file if there is any
                    if (findBlock.dataValues.file && findBlock.dataValues.file !== "") {

                        if (fs.existsSync(`./public/service_info/${findBlock.dataValues.file}`)) {
                            fs.unlink("./public/service_info/" + findBlock.dataValues.file, (err) => {
                                if (err) {
                                    console.error("Some issue in deleting file", err);
                                }
                            });
                        }
                    }
                }
            }

            if (section_type && section_type == "text") {

                if (description) {
                    createRecords["description"] = description
                }

                // delete old file if there is any
                if (findBlock.dataValues.file && findBlock.dataValues.file !== "") {

                    if (fs.existsSync(`./public/service_info/${findBlock.dataValues.file}`)) {
                        fs.unlink("./public/service_info/" + findBlock.dataValues.file, (err) => {
                            if (err) {
                                console.error("Some issue in deleting file", err);
                            }
                        });
                    }
                }
            }

            await ServiceInfo.update(createRecords, {
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "block Updated!")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async deleteBlock(req, res) {
        try {

            const { uuid } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Valid Section for update")
            }

            const findBlock = await ServiceInfo.findOne({ where: { uuid } })

            if (!findBlock) {
                return returnHelper(res, 200, false, "Block Not Found")
            }

            if (findBlock.dataValues.file && findBlock.dataValues.file !== "") {

                if (fs.existsSync(`./public/service_info/${findBlock.dataValues.file}`)) {
                    fs.unlink("./public/service_info/" + findBlock.dataValues.file, (err) => {
                        if (err) {
                            console.error("Some issue in deleting file", err);
                        }
                    });
                }
            }

            await ServiceInfo.destroy({
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "Deleted")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

}

export default new ServiceInfoController()