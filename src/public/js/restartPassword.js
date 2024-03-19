const form = document.getElementById("restartPasswordForm");

form.addEventListener("submit", e =>{
    e.preventDefault();
      const data = new FormData(form);
    const obj = {}; 
    data.forEach((value,key)=>obj[key]=value);
    
    // Obtener el token de la URL
    const token = getTokenFromURL();

    if (token) {
        obj.token = token;
    } else {
        alert("Error token de seguridad no hallado")
        window.location.replace('/login')
    }


    fetch("/api/sessions/restartPassword", {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => {
        if (result.status === 200) {
            alert("Contraseña Restaurada");
            window.location.replace('/login');
        } else if (result.status === 400 || result.status === 401) {
            // Error de datos incorrectos o token inválido
            result.json().then(data => {
                alert(data.message);
            });
        } else {
            // Otro error
            alert("Ha ocurrido un error al restaurar la contraseña. Por favor, inténtalo de nuevo.");
            console.log("Error:", result);
            window.location.replace('/login');
        }
    }).catch(error => {
        // Error de red u otros errores inesperados
        alert("Ha ocurrido un error al conectar con el servidor. Por favor, inténtalo de nuevo más tarde.");
        console.error("Error:", error);
        window.location.replace('/login');
    });
    
    

    //--------------------------------------------
    // fetch("/api/sessions/restartPassword", {
    //     method: "POST",
    //     body:JSON.stringify(obj),
    //     headers:{
    //         "Content-Type":"application/json"
    //     }
    // }).then(result=>{
    //     if(result.status === 200){
    //         //console.log("Contraseña restaurada");
    //         alert("Contraseña Restaurada")
    //         window.location.replace('/login')
    //     }else{
    //         alert("Ha ocurrido un error al restaurar la contraseña. Por favor, inténtalo de nuevo.");
    //         console.log("error");
    //         console.log(result);
    //         window.location.replace('/login')
    //     }
    // })


})

function getTokenFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get('token');
}