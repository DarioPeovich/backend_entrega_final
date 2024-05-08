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

//funcion envio Compra exitosa
export const sendPurchaseOk = async (userEmail, ticketPurchase, ticketProducts) => {
    let productsHTML = ''; // Inicializamos una cadena vacía para almacenar el HTML de los productos
    if (userEmail === "") {
        console.log("No se pudo enviar email al Comprador por faltar direccion destinataria")
        return
    }
    // Iteramos sobre el array de productos y construimos el HTML dinámicamente
    ticketProducts.forEach((product, index) => {
        productsHTML += `
            <p>Producto ${index + 1}:</p>
            <p>ID: ${product._id}</p>
            <p>Descripcion: ${product.description}</p>
            <p>Cantidad: ${product.quantity}</p>
            <br>
        `;
    });

    // Enviamos el correo electrónico con los datos de la compra
    await transporter.sendMail({
        from: config.gmail.emailAdmin,
        to: userEmail,
        subject: "Compra Exitosa!!",
        html: `
            <div>
                <h2>Su compra se realizó con éxito</h2>
                <h3>Los datos del ticket de compra son:</h3>
                <p>Código de ticket: ${ticketPurchase.code}</p>
                <p>Fecha de compra: ${ticketPurchase.purchase_datetime}</p>
                <p>Monto total: ${ticketPurchase.amount}</p>
                <p>Comprador: ${ticketPurchase.purchaser}</p>
                <br>
                <h3>Los productos comprados son:</h3>
                ${productsHTML} 
            </div>
        `
    });
};

//funcion envio al Usuario que su cuenta fue Eliminada
export const sendUsereAccountEliminated = async (user) => {

    if (!user.email || user.email === "")  {
        console.log("No se pudo enviar email al usuario eliminado por faltar direccion destinataria")
        return
    }
    // Enviamos el correo electrónico con los datos de la compra
    await transporter.sendMail({
        from: config.gmail.emailAdmin,
        to: user.email,
        subject: "Su cuenta a sido eliminada",
        html: `
            <div>
                <h2>Cuenta Eliminada</h2>
                <h3>Atencion ${user.last_name}, ${user.first_name} </h3>
                <h3>Registrado con el email: ${user.email}</h3>
                <h3>Se a procedido a la baja de su cuenta por inactividad. </h3>
                <p>(No responda a este email)<p>
            </div>
        `
    });
};

//funcion envio al Usuario Premium que un producto agregado por el fue eliminado
export const sendUserProductEliminated = async (product) => {

    if (product.owner) {

       if (product.owner === "" || product.owner === undefined) {

        console.log("Error: No se envio email por eliminacion de producto, por faltar el destinatario")
        return
        }
    }else {
        console.log("Error: No se envio email por eliminacion de producto, por faltar el destinatario")
        return

    }
    // Enviamos el correo electrónico con los datos de la compra
    await transporter.sendMail({
        from: config.gmail.emailAdmin,
        to: product.owner,          //owner contiene el email del Usuario que lo creo.
        subject: `El producto ${product.description} fue eliminado`,
        html: `
            <div>
                <h2>Producto Eliminado</h2>
                <h3>P${product.description} Id.: ${product._id}</h3>
                <h3>Este aviso se disparó, porque Ud. figuraba como su creador</h3>
                <p>(No responda a este email)<p>
            </div>
        `
    });
};

// export const sendPurchaseOk = async (userEmail, ticketPurchase, ticketProducts)=>{

//     await transporter.sendMail({
//         from:config.gmail.emailAdmin,
//         to:userEmail,
//         subject:"Reestablecer contraseña",
//         html:`
//         <div>
//             <h2>Su compra se realizo con exito</h2>
//             <h3>Los datos del ticket de compra son:</h3>
//             <p>Código de ticket: ${ticketPurchase.code}</p>
//             <p>Fecha de compra: ${ticketPurchase.purchase_datetime}</p>
//             <p>Monto total: ${ticketPurchase.amount}</p>
//             <p>Comprador: ${ticketPurchase.purchaser}</p>
//             </br>
//             <h3>Los productos comprados son:</h3>
//         </div>
//         `
//     })
// };