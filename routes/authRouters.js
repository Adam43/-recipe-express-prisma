import express from "express";
import { prisma } from "../db/index.js";
import jwt from "jsonwebtoken";
import argon2 from "argon2";


const router = express.Router();

//CREATED SIGNUP
router.post("/signup", async (request, response) => {
  try {
    const foundUser = await prisma.user.findFirst({
      where: {
        username: request.body.username,
      },
    });

    if(foundUser) {
      response.status(401).json({
        success: false,
        message: "User already exist",
      });
    } else {
      try {
        const hashPassword = await argon2.hash(request.body.password);

        const newUser = await prisma.user.create({
          data: {
            username: request.body.username,
            password: hashPassword,
          },
        });

        if (newUser) {
          response.status(201).json({
            success: true,
            message: "User created successfully",
          });
        } else {
          response.status(500).json({
            success: false,
            message: "User was not created", 
          });
        }
      } catch (error) {
        response.status(500).json({
          success: false,
          message: "User was not created",
        });
      }
    }
  } catch (error) {
    response.status(500).json({
      success: false,
      message: "User was not created",
    });
  }
});


//CREATED LOGIN
router.post("/login", async (request, response) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                username: request.body.username,
            }
        });

        if(foundUser){ //Ask questions about this part
            try {
            const verifyPassword = await argon2.verify(
                foundUser.password, 
                request.body.password
                );   
            
            if(verifyPassword===true){
                const token = jwt.sign({
                    id:foundUser.id,
                    username:foundUser.username,
                }, 
                    "thisIsASecretKey")

                response.status(200).json({
                    success: true,
                    token: token,
                });
            } else {
                response.status(401).json({
                    success: false,
                    message: "Wrong username or password",
                });
            }
        }catch (error) {
            
        }
    }
    } catch(error){
        response.status(500).json({
            success: false,
            message: "Something went wrong",
        });
    }
})
export default router;
