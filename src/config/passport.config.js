import passport from "passport";
import local from "passport-local";
import GitHubStrategy from "passport-github2";
// import jwt from 'passport-jwt';

// import { config } from "./config.js";
import {CartManagerDB} from "../dao/managers/dbMangers/CartManagerDB.js"
import {createHash, validatePassword} from "../utils.js";
import { userDao } from "../dao/index.js";
import userModel from "../dao/models/users.model.js";
import __dirname from "../utils.js";

const cartManagerDB = new CartManagerDB();


const LocalStrategy = local.Strategy;

const inicializePassport = () => {

    passport.use("register", new LocalStrategy(
        {passReqToCallback:true, usernameField:"email"},
        async ( req, username, password, done ) => {
        const { first_name, last_name, email, age, role } = req.body;
        try {
            let filename;
            let profileImageLink = "";
            if (req.file && req.file.filename)  {
                filename = req.file.filename;
                profileImageLink = `/images/profile/${filename}`
            } 
            
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
                role,
                profileImage:profileImageLink   //`/images/profile/${filename}`
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
    
//10/05/24: como configurar github para poder utilizarlo para inicio de Sesion
//In la pagina de GitHub, ir a Settings/Developer Settings, luego seleccionar GitHub Apps, ahi se ven las app que pueden acceder, o gnerar una nueva
//de esa seccion se obtienen los claves que se usan a en el seteo de GitHubStrategy de passport.
//clientID: le brinda al hace new GitHuv App
//clientSecret: Se obtiene al generar la clave Cliet secrets
// En Homepage URL debe ir endPoint que tiene que llamar luego de iniciar sesion, es decir la pagina principal del proyecto, que localmente seria: http://localhost:8080/
// Si se desesa que funcione desde el despilegue, en este caso railWay seria: https://backendentregafinal-production.up.railway.app/
//callbackURL: Debe ir el link al que deriva GitHub una vez que que paso la validacion de passport. Localmente seria: http://localhost:8080/api/sessions/githubcallback, y
// desde el despliegue desde railWay: https://backendentregafinal-production.up.railway.app/api/sessions/githubcallback
passport.use('github', new GitHubStrategy({
    clientID: "Iv1.c4d92ac110a316c6",
    clientSecret:"f5352593c772214e13d8972b06f78be03afbd577",
    callbackURL:"https://backendentregafinal-production.up.railway.app/api/sessions/githubcallback",     //"http://localhost:8080/api/sessions/githubcallback",
    scope: ['user:email'] // Solicitar acceso al correo electrónico del usuario
}, async(accesToken, refreshToken,profile, done)=>{
    
    console.log("Entre a gitHub en passport.config.js")


    try {
        // console.log(profile._json.name);
        const first_name = profile._json.name
        let email;
        if(!profile._json.emails){
            // email = profile.username;
            // email = profile._json.emails[0].value;
            email = profile.emails[0].value;
        }

        // let user = await userModel.findOne({email:profile._json.email});
        let user = await userDao.getEmailUser(email);
        
        if(user){
            console.log('Usuario ya registrado');
            return done(null,user)
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