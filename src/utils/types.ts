
import express from 'express'
interface User {
    user: {
        uuid: string,
        email: string,
        role: string
    }
}

interface RequestWithUser extends express.Request {
    user?: User;
    uuid?: string
} // Explicitly extend 'express.Request' with the 'user' property

export const userAttributes = ["uuid", "username", "email", "description","country_code","phone_number" ,"profile_image", "access_profile","phone"]
export const postAttributes = ["uuid", "title", "description", "createdAt"]

export { RequestWithUser }