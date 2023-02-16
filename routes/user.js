import express, { request, response } from "express";
import { Prisma } from "../db/index.js";

export default function userRouter(){
    const router = express.Router()

//GET | Get All     
    routes.get("/", async (request, response) => { //localhost:3000/user/
        const user = await prisma.user.findMany({})

        response.status(200).json({
            success: true,
            users: users,
        })
    })

//POST |
    router.post("/"), async (request, response) => {
        const user = await prisma.user.create({
            data: {
                username: request.body.username
            }
        })
        response.status(201).json({
            success: true,
            message: "New user is created"
        })
    }

    return router;
}
