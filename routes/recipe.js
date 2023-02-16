import express from "express"
import { prisma } from "../db/index.js"


export default function recipeRouter(){
    const router = express.Router();

//todo
router.get("/", async (request, response) => {
    //Send back all recipe

    //tells prisma to talk to database and find stuff
    const allRecipes = await prisma.recipes.findMany({
        where: {
            userId: 1 //find todos where userid is 1
        },
        include: {
            user: true 
        }
    });
    
    //after that, it will send back a response
    response.status(200).json({
        success: true,
        recipes: allRecipes
    });
})

router.post("/", async (request, response) => {
    //creates a recipe
    
    const newRecipe = await prisma.recipes.create({
        data: {
            name: request.body.recipe,
            userId: 1,
            description: request.body.description
        }
    });
    console.log(newRecipe);

    response.status(201).json({
        success: true
    });
})

return router;
}