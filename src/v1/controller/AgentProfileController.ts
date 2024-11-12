import { Response } from "express";
import { RequestWithUser } from "../../utils/types";
import { AgentProfile, BranchOffice, Certification, Language } from "../../model/AgentProfile";
import { returnHelper } from "../../helpers/returnHelper";
import fs from 'fs'
import path from 'path'
import Agent from "../../model/Agent";

class AgentProfileController {

    async getAgentOfficeAddress(req: RequestWithUser, res: Response) {

        try {
            const agentUuid = req.user?.user?.uuid;

            // Check if the agent profile already exists
            let agentProfile = await AgentProfile.findOne({
                where: { agent_uuid: agentUuid },
                attributes: [
                    "officeStreetAddress",
                    "officeCity",
                    "officeStateProvince",
                    "officeCountry",
                    "officePostalCode"
                ]
            });

            return returnHelper(res, 200, true, "Profile Found", agentProfile)
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async getAgentAboutUs(req: RequestWithUser, res: Response) {

        try {
            const agentUuid = req.user?.user?.uuid;

            // Check if the agent profile already exists
            let agentProfile = await AgentProfile.findOne({
                where: { agent_uuid: agentUuid },
                attributes: [
                    "aboutUs",
                    "detailedDescription",
                    "website",
                ]
            });

            return returnHelper(res, 200, true, "Profile Found", agentProfile)
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async getAgentContactProfile(req: RequestWithUser, res: Response) {

        try {
            const agentUuid = req.user?.user?.uuid;

            // Check if the agent profile already exists
            let agentProfile = await AgentProfile.findOne({
                where: { agent_uuid: agentUuid },
                attributes: [
                    "socialFacebook",
                    "socialInstagram",
                    "socialLinkedIn",
                    "socialTwitter",
                    "socialYouTube",
                    "socialOther",
                    "contactEmail",
                    "contactPhoneNumber",
                    "contactWhatsApp",
                ]
            });

            return returnHelper(res, 200, true, "Profile Found", agentProfile)
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async getAgentOperatingHours(req: RequestWithUser, res: Response) {

        try {
            const agentUuid = req.user?.user?.uuid;

            // Check if the agent profile already exists
            let agentProfile = await AgentProfile.findOne({
                where: { agent_uuid: agentUuid },
                attributes: [
                    "operatingHoursWeekdays",
                    "operatingHoursWeekends",
                    "operatingHoursTimeZone",
                ]
            });

            return returnHelper(res, 200, true, "Profile Found", agentProfile)
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async updateAgentDetails(req: RequestWithUser, res: Response) {
        const {
            officeStreetAddress,
            officeCity,
            officeStateProvince,
            officeCountry,
            officePostalCode,
            aboutUs,
            detailedDescription,
            website,
            socialFacebook,
            socialInstagram,
            socialLinkedIn,
            socialTwitter,
            socialYouTube,
            socialOther,
            contactEmail,
            contactPhoneNumber,
            contactWhatsApp,
            otherCommunicationChannels,
            operatingHoursWeekdays,
            operatingHoursWeekends,
            operatingHoursTimeZone,
        } = req.body;

        try {
            const agentUuid = req.user?.user?.uuid;

            // Check if the agent profile already exists
            let agentProfile = await AgentProfile.findOne({ where: { agent_uuid: agentUuid } });

            if (!agentProfile) {
                // Create a new Agent Profile
                agentProfile = await AgentProfile.create({
                    agent_uuid: agentUuid,
                    officeStreetAddress,
                    officeCity,
                    officeStateProvince,
                    officeCountry,
                    officePostalCode,
                    aboutUs,
                    detailedDescription,
                    website,
                    socialFacebook,
                    socialInstagram,
                    socialLinkedIn,
                    socialTwitter,
                    socialYouTube,
                    socialOther,
                    contactEmail,
                    contactPhoneNumber,
                    contactWhatsApp,
                    otherCommunicationChannels,
                    operatingHoursWeekdays,
                    operatingHoursWeekends,
                    operatingHoursTimeZone,
                });
            } else {
                // Update existing Agent Profile
                const updateParams = {
                    ...(officeStreetAddress !== undefined && { officeStreetAddress }),
                    ...(officeCity !== undefined && { officeCity }),
                    ...(officeStateProvince !== undefined && { officeStateProvince }),
                    ...(officeCountry !== undefined && { officeCountry }),
                    ...(officePostalCode !== undefined && { officePostalCode }),
                    ...(aboutUs !== undefined && { aboutUs }),
                    ...(detailedDescription !== undefined && { detailedDescription }),
                    ...(website !== undefined && { website }),
                    ...(socialFacebook !== undefined && { socialFacebook }),
                    ...(socialInstagram !== undefined && { socialInstagram }),
                    ...(socialLinkedIn !== undefined && { socialLinkedIn }),
                    ...(socialTwitter !== undefined && { socialTwitter }),
                    ...(socialYouTube !== undefined && { socialYouTube }),
                    ...(socialOther !== undefined && { socialOther }),
                    ...(contactEmail !== undefined && { contactEmail }),
                    ...(contactPhoneNumber !== undefined && { contactPhoneNumber }),
                    ...(contactWhatsApp !== undefined && { contactWhatsApp }),
                    ...(otherCommunicationChannels !== undefined && { otherCommunicationChannels }),
                    ...(operatingHoursWeekdays !== undefined && { operatingHoursWeekdays }),
                    ...(operatingHoursWeekends !== undefined && { operatingHoursWeekends }),
                    ...(operatingHoursTimeZone !== undefined && { operatingHoursTimeZone }),
                };
                await agentProfile.update(updateParams);
            }
            return returnHelper(res, 200, true, "Profile Updated Successfully")
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async addCertificate(req: RequestWithUser, res: Response) {
        try {

            const {
                certificationName,
                accreditationBody
            } = req.body

            if (!req.file) {
                return returnHelper(res, 200, false, "Please Select Image")
            }

            const name = `${Date.now()}-${Math.floor(
                1000 + Math.random() * 9000
            )}${path.parse(req.file.originalname).ext}`;

            // type
            const imageTypes = [
                "image/png",
                "image/jpg",
                "image/jpeg",
                "application/octet-stream"
            ]
            const pdfType = [
                "application/pdf"
            ]

            let type = "other";
            if (imageTypes.includes(req?.file?.mimetype)) {
                type = "image";
            } else if (pdfType.includes(req?.file?.mimetype)) {
                type = "pdf";
            }

            // create certificate
            await Certification.create({
                name,
                type,
                certificationName,
                accreditationBody,
                agent_uuid: req.user?.user?.uuid
            })

            fs.writeFileSync(
                path.join("public/certificates", name),
                req.file.buffer
            );

            return returnHelper(res, 200, true, "Certificate Added")

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }
    async deleteCertificate(req: RequestWithUser, res: Response) {
        try {

            const { uuid } = req.body

            const findCertificate = await Certification.findOne({
                where: {
                    uuid,
                    agent_uuid: req.user?.user?.uuid
                }
            })

            if (!findCertificate) {
                return returnHelper(res, 200, false, "Can't Delete")
            }

            // delete file too 

            if (findCertificate.dataValues.name && findCertificate.dataValues.name !== "") {

                if (fs.existsSync(`./public/certificates/${findCertificate.dataValues.name}`)) {
                    fs.unlink("./public/certificates/" + findCertificate.dataValues.name, (err) => {
                        if (err) {
                            console.error("Some issue in deleting file", err);
                        }
                    });
                }
            }

            await Certification.destroy({
                where: {
                    uuid
                }
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async addLanguages(req: RequestWithUser, res: Response) {
        try {

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async deleteLanguage(req: RequestWithUser, res: Response) {
        try {
            const { uuid } = req.body

            const findLanguage = await Language.findOne({
                where: {
                    uuid,
                    agent_uuid: req.user?.user?.uuid
                }
            })

            if (!findLanguage) {
                return returnHelper(res, 200, false, "Can't Delete")
            }

            await Language.destroy({
                where: {
                    uuid
                }
            })

        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    async getBranchOfficeAddress(req: RequestWithUser, res: Response) {
        try {

            // delete all old branch officies
            const findAddress = await BranchOffice.findAll({
                where: {
                    agent_uuid: req.user?.user?.uuid
                }
            })

            return returnHelper(res, 200, true, "Address Found", findAddress)


        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }


    async updateBranchOfficeAddress(req: RequestWithUser, res: Response) {
        try {

            const { branchOffices } = req.body

            // delete all old branch officies
            await BranchOffice.destroy({
                where: {
                    agent_uuid: req.user?.user?.uuid
                }
            })

            if (branchOffices && branchOffices.length) {
                await Promise.all(branchOffices.map(async (item: {
                    streetAddress: string,
                    city: string,
                    stateProvince: string,
                    country: string,
                    postalCode: string,
                }) => {
                    await BranchOffice.create({
                        agent_uuid: req.user?.user?.uuid,
                        streetAddress: item?.streetAddress,
                        city: item?.city,
                        stateProvince: item?.stateProvince,
                        country: item?.country,
                        postalCode: item?.postalCode,
                    })
                }))
            }

            return returnHelper(res, 200, true, "Address Updated")


        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

    // admin 
    async getAgentBasicProfileAdmin(req: RequestWithUser, res: Response) {

        try {
            const { agentUuid } = req.body

            // Check if the agent profile already exists
            let agentProfile = await AgentProfile.findOne({
                where: { agent_uuid: agentUuid },
            });

            // branch office address

            let branchOfficeAddress = await BranchOffice.findAll({
                where: {
                    agent_uuid: agentUuid
                }
            })

            // agent profile
            let agentInfo = await Agent.findOne({
                where: {
                    uuid: agentUuid
                },
                attributes: [
                    "access_profile",
                    "country_code",
                    "createdAt",
                    "email",
                    "is_verified",
                    "phone",
                    "phone_number",
                    "profile_image",
                    "status",
                    "updatedAt",
                    "username",
                ]
            })

            return returnHelper(res, 200, true, "Profile Found", { basic_profile: agentProfile, branch_office_address: branchOfficeAddress, information: agentInfo })
        } catch (error: any) {
            return returnHelper(res, 500, false, error.message)
        }
    }

}


export default new AgentProfileController()