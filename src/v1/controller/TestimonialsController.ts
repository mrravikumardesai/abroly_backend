import { Response } from "express";
import { RequestWithUser } from "../../utils/types";
import path from 'path'
import fs, { unlink } from 'fs'
import { returnHelper } from "../../helpers/returnHelper";
import Testimonial from "../../model/Testimonial";

class TestimonialsController {


    async addTestimonial(req: RequestWithUser, res: Response) {

        try {
            const { name, description } = req.body
            var file_url = "";
            console.log(req.file);
            
            if (req.file) {
                file_url = `${Date.now()}-${Math.floor(
                    1000 + Math.random() * 9000
                )}${path.parse(req.file.originalname).ext}`;
            }
            await Testimonial.create({
                name,
                description,
                file_url
            }).then(() => {
                if (req.file) {
                    fs.writeFileSync(
                        path.join("public/testimonials", file_url),
                        req.file!.buffer
                    );
                }
            })
            return returnHelper(res, 200, true, "Added!")
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async updateTestimonial(req: RequestWithUser, res: Response) {

        try {
            const { name, description, uuid } = req.body
            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Required params")
            }
            const updateParams = {
                ...(name && { name }),
                ...(description && { description }),
            }

            await Testimonial.update(updateParams, {
                where: {
                    uuid
                }
            })
            return returnHelper(res, 200, true, "Updated!")
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }

    }

    async deleteTestimonial(req: RequestWithUser, res: Response) {

        try {
            const { uuid } = req.body
            if (!uuid) {
                return returnHelper(res, 200, false, "Please Provide Required params")
            }

            const findTestimonial = await Testimonial.findOne({
                where: { uuid }
            })

            await Testimonial.destroy({
                where: {
                    uuid
                }
            })

            // delete file
            if (!fs.existsSync(`public/testimonials/${findTestimonial.dataValues.file_url}`)) {
                unlink(`public/testimonials/${findTestimonial.dataValues.file_url}`, (err) => {
                    console.log(err?.message)
                })
            }

            return returnHelper(res, 200, true, "Deleted!")
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }

    }

    async listTestimonials(req: RequestWithUser, res: Response) {
        try {

            const allTestimonails = await Testimonial.findAll({})
            return res.status(200).json({
                success: true,
                data: allTestimonails
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }


}


export default new TestimonialsController()