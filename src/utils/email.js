import nodemailer from "nodemailer";
import { config } from "../config/config.js";
//creamos el transporter
const transporter = nodemailer.createTransport({
    service:"gmail",
    port:587,
    auth:{
        user:config.gmail.emailAdmin,
        pass:config.gmail.emailToken
    },
    secure:false,
    tls:{
        rejectUnauthorized:false
    }
});

//funcion envio de recuperacion de contraseña
export const sendRecoveryPass = async (userEmail, token)=>{
    const link = `http://localhost:8080/resetpassword?token=${token}`;
    await transporter.sendMail({
        from:config.gmail.emailAdmin,
        to:userEmail,
        subject:"Reestablecer contraseña",
        html:`
        <div>
            <h2>Has solicitado un cambio de contraseña</h2>
            <p>Da clic en el siguiente enlace para restablecer la contraseña</p>
            </br>
            <a href="${link}">
                <button> Restablecer contraseña </button>
            </a>
        </div>
        `
    })
};