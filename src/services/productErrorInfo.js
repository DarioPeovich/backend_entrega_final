export const generateUserErrorInfo = (product) => {
    return {
        title: product.title || "No se proporcionó un título",
        description: product.description || "No se proporcionó una descripción"
    };
};

// export const generateUserErrorInfo = (product) =>{
//     return `
//     Algunos campos obligatorios para crear al usuario vinieron vacios:
//     title: llego ${product.title},
//     description: llego ${product.description}
//     `
// }

// first_name: llego ${user.first_name},
// last_name: llego ${user.last_name},
// email: tiene que ser del tipo string, pero llego: ${user.emil}