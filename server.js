import express from "express";
import recipeRouter from "./routes/recipe.js"
import authRouter from "./routes/authRouters.js"
import passport from "passport";
import setupJWTStrategy from "./auth/index.js"; 

export default async function createServer(){
    const app = express();

    app.use(express.json());
    
    setupJWTStrategy(passport);
    app.use("auth/", authRouter());
    app.use("/recipe", 
    passport.authenticate("jwt", { session: false, }), recipeRouter())

    return app;
}