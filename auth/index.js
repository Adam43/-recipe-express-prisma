import { Strategy, ExtractJwt } from "passport-jwt";

export default function setupJWTStrategy(passport){
    
    passport.use(
        new Strategy({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: "thisIsASecretKey",
        }, function (payload, done){
            try {
                return done(null, {
                    id: payload.id,
                    username: payload.username,
                });
            } catch(error){
                return done(error, null)
            }
        }
    )
    ),    
}