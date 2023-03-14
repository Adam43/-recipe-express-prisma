import express from "express"
import { prisma } from "../db/index.js"

export default function recipeRouter(passport){
  const router = express.Router();

  //GET | get all recipes 
  router.get("/", async (request, response) => {
    const recipes = await prisma.recipes.findMany();
  
    if (recipes.length >= 1 ) {
      response.status(200).json({
        success: true,
        recipes: recipes,
      })
    } else {
      response.status(404).json({
        success: false,
        message: "No Recipes found",
      })
    }
  });
  

  //POST | create a recipe 
  router.post("/", passport.authenticate("jwt", { session: false, }), 
  async (request, response) => {
    try {
      const newRecipe = await prisma.recipes.create({
        data: {
          name: request.body.name,
          description: request.body,description,
          userId: 1,
        }
      });
  
      if(newRecipe){
        response.status(201).json({
          success: true,
          message: "Recipe was created",
        });
      } else {
        response.status(500).json({
          success: false,
          message: "Failed to create Recipe",
        })
      }
    } catch (error) {
      response.status(500).json({
        success: false,
        message: "Failed to create Recipe"
      });
    }
  });
  
  
  //GET | get a specific recipe by ID
  router.get("/:recipeId", async (request, response) => {
      const recipeId = request.params.recipeId;
  
      try {
        const foundRecipe = await prisma.recipes.findFirstOrThrow({
          where: {
            id: parseInt(recipeId),
          },
        });
  
        response.status(200).json({
          success: true,
          recipe: foundRecipe,
        });
      } catch (error) {
        response.status(404).json({
          success: false,
          message: "Could not find the Recipe",
        });
      }
  });


  //PUT |
  router.put("/:recipeId", passport.authenticate("jwt", { session: false }),
  async (request, response) => {
    const recipeId = request.params.recipeId;

    const updateRecipes = await prisma.recipe.updateMany({
      where: {
        id: recipeId,
        userId: request.user.id
      },
      data: {
        name: request.body.name,
        description: request.body.description //or use spread "...request.body,"
      }
    });

    if(updatedRecipes.count == 1) {
      response.status(200).json({
        success: true,
        message: "Updated the recipe"
      });
    } else {
      response.status(500).json({
        success: false,
        message: "No recipe was updated"
      })
    }
  })


  //DELETE |
  router.delete("/:recipeId", passport.authenticate("jwt", { session: false }),
  async (request, response) => { 
    const recipeId = request.params.recipeId;

    const removeRecipe = await prisma.recipe.delete({
      where: {
        id: recipeId,
        userId: request.user.id
      }
    });
    if(removeRecipe) {
      response.status(204).json({
        success: true,
        message: "Recipe has been deleted"
      });
    } else {
      response.status(500).json({
        success: false,
        message: "Recipe cannot be found"
      });
    }
  });


  return router;
}




