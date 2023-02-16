import express from "express";
import recipeRouter from "./routes/recipe.js"

export default async function createServer(){
    const app = express();

    app.use(express.json());

    app.use("/recipe", recipeRouter)

    return app;
}