import { Response } from "express";
import { RequestWithUser } from "../../utils/types";
import { returnHelper } from "../../helpers/returnHelper";
import ContentWritingServicesResponses from "../../model/ContentWritingServicesResponses";
import ContentWritingServicesResponsesFiles from "../../model/ContentWritingServicesResponsesFiles";
import path from 'path'
import fs from 'fs'

class ContentWritingResponseController {

    async requestForPayment(req: RequestWithUser, res: Response) {
        try {
            const { name, number, email, message, content_requirement } = req.body

            if (!name) { return returnHelper(res, 200, false, "Please Provide Name") }
            if (!number) { return returnHelper(res, 200, false, "Please Provide Mobile Number") }
            if (!email) { return returnHelper(res, 200, false, "Please Provide Email Address") }
            if (!message) { return returnHelper(res, 200, false, "Please Provide Message") }
            if (!content_requirement) { return returnHelper(res, 200, false, "Please Select Type of Content Writing Request") }

            await ContentWritingServicesResponses.create({
                name, number, email, message, selected_type: content_requirement,
                user_uuid: req?.user?.user?.uuid
            })

            return res.status(200).json({
                success: true,
                message: "Request Added Suuccesfully"
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async changeRequestStatus(req: RequestWithUser, res: Response) {
        try {

            const { status, uuid } = req.body

            await ContentWritingServicesResponses.update({
                application_status: status
            }, {
                where: {
                    uuid
                }
            })

            return returnHelper(res, 200, true, "Updated!")


        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async addFiles(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Required Params")
            }

            if (!req.file) {
                return returnHelper(res, 200, false, "Please Provide file")
            }

            var file_name = "";
            // console.log(req.file);

            const imageTypes = [
                "image/png",
                "image/jpg",
                "image/jpeg",
                "application/octet-stream"
            ]
            const pdfType = [
                "application/pdf"
            ]
            let file_type = "other";
            if (imageTypes.includes(req?.file?.mimetype)) {
                file_type = "image";
            } else if (pdfType.includes(req?.file?.mimetype)) {
                file_type = "pdf";
            }


            if (req.file) {
                // file_name = `${Date.now()}-${Math.floor(
                //     1000 + Math.random() * 9000
                // )}${path.parse(req.file.originalname).ext}`;

                file_name = (path.parse(req?.file?.originalname).name)?.replaceAll(" ", "_").toLowerCase() + `${Date.now()}-${Math.floor(
                    1000 + Math.random() * 9000
                )}${path.parse(req?.file?.originalname).ext}`;
            }


            await ContentWritingServicesResponsesFiles.create({
                ref_uuid: uuid,
                file_name: file_name,
                file_type
            }).then(() => {
                fs.writeFileSync(
                    path.join("public/content_writing_files", file_name),
                    req.file!.buffer
                );
            })

            return returnHelper(res, 200, true, "File Uploaded")


        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async listUser(req: RequestWithUser, res: Response) {
        try {

            const findAll = await ContentWritingServicesResponses.findAll({
                where: {
                    user_uuid: req?.user?.user?.uuid
                },
                order:[["createdAt","DESC"]]
            })

            return res.status(200).json({
                success: true,
                message: "Records Found",
                data: findAll
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async listAdmin(req: RequestWithUser, res: Response) {
        try {

            const { offset, limit ,start_date,end_date} = req.body

            const total = await ContentWritingServicesResponses.count({
                where: {
                    payment_status: "paid",
                }
            }) 

            const findAll = await ContentWritingServicesResponses.findAll({
                where: {
                    payment_status: "paid"
                },
                offset: offset ? +offset : 0,
                limit: +limit ? limit : null,
                order:[["createdAt","DESC"]]
            })

            return res.status(200).json({
                success: true,
                message: "Records Found",
                data: findAll,
                total
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async details(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body
            if (!uuid) {
                return returnHelper(res, 200, false, "Provide Required Params")
            }

            const findOne = await ContentWritingServicesResponses.findOne({
                where: {
                    uuid
                },
            })

            return res.status(200).json({
                success: true,
                message: "Records Found",
                data: findOne,
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async listFiles(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body

            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Required Params")
            }

            const findFiles = await ContentWritingServicesResponsesFiles.findAll({
                where: {
                    ref_uuid: uuid
                }
            })

            return res.status(200).json({
                success: true,
                message: "Files Found",
                data: findFiles
            })


        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }


}

export default new ContentWritingResponseController()