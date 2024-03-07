export class CustomError {
    static createError({ name = "Error", cause ="nada", message="nada mensaje", errorCode={} }) {

        console.log("En la Clase CustomError cause:", cause );

       // const error = new Error(message, cause);
        const mensajeDeError = "Este es un mensaje de error.";
         const error = new Error(mensajeDeError);

         error.name = name;
         error.code = errorCode;
        throw error;
    }
}



// export class CustomError{
//     static createError({name="Error",cause,message,errorCode}){
//         console.log(cause);
//         const error = new Error(message,{cause});
//         error.name=name;
//         error.code=errorCode;
//         throw error;
//     }
// }