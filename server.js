import express from "express";
import recipeRouter from "./routes/recipe.js"
import authRouter from "./routes/authRouters.js"

export default async function createServer(){
    const app = express();

    app.use(express.json());
    
    app.use("auth/", authRouter());
    app.use("/recipe", recipeRouter())

    return app;
}