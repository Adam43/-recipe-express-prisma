import express from "express"
import { prisma } from "../db/index.js"


export default function recipeRouter(){
    const router = express.Router();

//todo
router.get("/", async (request, response) => {
    //Send back all recipe

    //tells prisma to talk to database and find stuff
//     const allRecipes = await prisma.recipes.findMany({
//         where: {
//             userId: 1 //find todos where userid is 1
//         },
//         include: {
//             user: true 
//         }
//     });
    
//     //after that, it will send back a response
//     response.status(200).json({
//         success: true,
//         recipes: allRecipes
//     });
// });

//GET | 
router.get("/:userId/:recipeId", async function (request, response) {
    try {
      const getRecipe = await prisma.recipe.findMany({
        where: {
          id: parseInt(request.params.recipeId),
          user: {
            id:{
                equals:parseInt(request.params.userId)
            }
          }
        }
      });

      response.status(200).json({
        success: true,
        data: getRecipe,
      });
    } catch (error) {
      console.log(error);
    }
  });


//POST |
router.post("/", async (request, response) => {
    //creates a recipe
    
    const newRecipe = await prisma.recipes.create({
        data: {
            name: request.body.recipe,
            userId: 1,
            description: request.body.description
        },
    });
    console.log(newRecipe);

    response.status(201).json({
        success: true
    });
});

//PUT | 
router.put("/recipes/:recipeId", async (request, response) => {
  //edit recipe
  
  const updateRecipe = await prisma.recipes.update({
    data: {
      name: request.body.recipe,
      userId: 1,
      description: request.body.description
    }
  });
  console.log(updateRecipe)

  response.status(200).json({
    success: true
  });
});

//DELETE |
router.delete("/recipes/:recipeId", async (request, response) => {
  //delete route ID

  const deleteRecipe = await prisma.recipes.delete({
    data: {
      name: request.body.recipe,
      userId: 1
    }
  });
  console.log(deleteRecipe)

  response.status(200).json({
    success: true
  });
});

return router;
}



