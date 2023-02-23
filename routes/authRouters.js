import express from "express";
import { prisma } from "../db";
import argon2 from "argon2";

const router = express.Router()

router.post("/signup", (request, response) => {

    try{

        const foundUser = await prisma.user.findFirst({
            where:{
                username: request.body.username,
            }
            
        })

        if(foundUser){
            response.status.(401).json({
                success: false,
                message: "User already exist"
            });
        }else{
            
            try{
                const hashPassword = await argon2.hash(request.body.password)

                const newUser = await prisma.user.create({
                    data: {
                        username: request.body.username,
                        password: hashPassword,
                    },
                });

                if(newUser){
                    response.status(201).json({
                        success: true,
                        message: "User created"
                    });
                }else {
                    response.status(500).json({
                        success: false,
                        message: "User was not created"
                    });
                }

            }catch (error){
                response.status(500).json({
                    success: false,
                    message: "User was not created"
                });
            }
        }

    }catch (error){
        response.status(500).json({
            success: false,
            message: "User was not created"
        });
    }

})

export default router;