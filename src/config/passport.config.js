import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
// import jwt from 'passport-jwt';

// import { config } from "./config.js";
import {CartManagerDB} from "../dao/managers/dbMangers/CartManagerDB.js"
import {createHash, validatePassword} from "../utils.js";
import { userDao } from "../dao/index.js";
import userModel from "../dao/models/users.model.js";

const cartManagerDB = new CartManagerDB();

//--a continuacion Instancia de prueba. No funciona 21/02/24
//const userController = new UserController();
//--Instancia de prueba xq no anda el use controller
//const useManagerDb = new UserManagerDB();
//--Hasta lineas de pruebas

const LocalStrategy = local.Strategy;
//Para jwt
// const JWTStrategy = jwt.Strategy;
// const ExtractJWT = jwt.ExtractJwt;
// const jwtOptions = {
//   jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
//   secretOrKey: config.jwt.word  //'tu_secreto_jwt', // Reemplaza 'tu_secreto_jwt' con tu clave secreta
// };
//--Fin const JWT

const inicializePassport = () => {

    passport.use("register", new LocalStrategy(
        {passReqToCallback:true, usernameField:"email"},
        async ( req, username, password, done ) => {
        const { first_name, last_name, email, age, role } = req.body;
        try {
            
            // let user = await userModel.findOne({email:username});
            //let user = await userDao.getEmailUser({username});
            let user = await userDao.getEmailUser(username);
            if(user){
                console.log('Usuario ya registrado');
                return done(null,false)
            }
            
            const cart = await cartManagerDB.createCarts();

            const newUser = {
                first_name,
                last_name,
                email,
                age,
                cart: cart._id,
                password: createHash(password),
                role
                //rol, ya está por default en schema userModel
            }
            // const result = await userModel.create(newUser);
            const result = await userDao.createUser(newUser);
            return done (null, result);

        } catch (error) {
            return done(error)
        }    

    }));

    passport.use("login", new LocalStrategy(
      {usernameField:"email"},
      async (username, password, done)=>{
          //console.log("en passport.login", username + " // " + password)
          try {
              //1ra. linea es el original que anda 21/02/24
              const user = await userModel.findOne({email:username})
              //const user = await userDao.getEmailUser({username});
               
              //Todas estas pruebas no me funcionan 21/02/24
               // const user = await userController.getEmailUser(username);
              //console.log("UserName: " + JSON.stringify(useManagerDb))
              //const user = await useManagerDb.getEmailUser(username);
              
              if(!user){
                  return done(null, false);
              }
              
              if(!validatePassword(password, user)){
                    //console.log("password erroneo")
                  return done(null, false);
              } 
              return done(null,user)
          } catch (error) {
              return done(error);
          }
      }))
  


    passport.serializeUser((user,done)=>{
        done(null, user._id)
    });

    passport.deserializeUser(async (id,done)=>{
        // let user = await userModel.findById(id);
        let user = await userDao.getIdUser(id);
        done(null, user);
    });
    
    passport.use('github', new GitHubStrategy({
        clientID: "Iv1.c4d92ac110a316c6",
        clientSecret:"f5352593c772214e13d8972b06f78be03afbd577",
        callbackURL:"http://localhost:8080/api/sessions/githubcallback"
    }, async(accesToken, refreshToken,profile, done)=>{
        try {
            // console.log(profile._json.name);
            const first_name = profile._json.name
            let email;
            if(!profile._json.email){
                email = profile.username;
            }

            // let user = await userModel.findOne({email:profile._json.email});
            let user = await userDao.getEmailUser(profile._json.email);
            
            if(user){
                console.log('Usuario ya registrado');
                return done(null,false)
            }

            const newUser = {
                first_name,
                last_name: "",
                email,
                age: 18,
                password: ""
            }
            // const result = await userModel.create(newUser);
            const result = await userDao.createUser(newUser);
            
            return done (null, result);

        } catch (error) {
            return done(error)
        }

    }))
}

export default inicializePassport;