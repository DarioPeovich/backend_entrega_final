export const checkRole = (roles)=>{
    return (req,res,next)=>{
        // Comprueba si la solicitud proviene de un socket (no tiene res)
        if (!res) {
            // No hay objeto de respuesta, por lo que no puedes enviar una respuesta JSON
            console.log("El middleware se está utilizando fuera de un contexto de solicitud HTTP");
            // Puedes agregar un manejo adicional aquí según tus necesidades
            return next(); // Continuar con el siguiente middleware o enrutador
        }

        if(!req.user){
            console.log("Usuario no autenticado");
            return res.json({status:"error",
            message:"necesitas estar autenticado"},);
        }
        console.log("roles: (checkRole)", roles);
        console.log("req.user.rol (checkRole): ", req.user.role)
        if(!roles.includes(req.user.role)){
            console.log("Usuario no estas autorizado");
            return res.json({status:"error", message:"no estas autorizado"});
        }
        next();
    }
}

