// console.log(`Bearer ${localStorage.getItem("token")}`);
let user; // Definir la variable json fuera del bloque fetch
const btnAgregarProductos = document.querySelector("#btn_agregar_productos");

fetch("/api/sessions/current", {
    method:"GET",
    headers:{
        "authorization": `Bearer ${localStorage.getItem("token")}`
    }
})
.then(response=>{
    if(response.status===401){
        window.location.replace('/')
    }else{
        return response.json();
    }
})
.then(json =>{
    user = json.payload;
    
    if (user && user.role != "ADMIN") {
        // btnAgregarProductos.style.display = "block";
         btnAgregarProductos.style.display = "none";
    } else {
        // Si el usuario no es ADMIN, ocultar el botón
        btnAgregarProductos.style.display = "none";
    }

    const container = document.getElementById("result");
    //console.log(json.payload.profileImage)
    // Agregar la imagen de perfil
    if (json.payload.profileImage) {
        const img = document.createElement('img');
        img.src = json.payload.profileImage;
        img.alt = 'Imagen de perfil';
        img.style.width = '100px'; // Cambiar el ancho de la imagen
        img.style.height = '100px'; // Cambiar la altura de la imagen
        container.appendChild(img);
    }

    // Agregar los otros datos del perfil
    container.innerHTML += `<br>
    Usuario: ${json.payload.fullName}<br>
    Email: ${json.payload.email}<br>
    Rol: ${json.payload.role}`;
});


document.getElementById("btn_cargar_documents").addEventListener("click", () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";
    fileInput.onchange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append("thumbnail", file);

            fetch(`/api/users/${user._id}/documents`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            .then(response => {
                if (response.status === 401) {
                    window.location.replace('/');
                } else if (response.status === 200) {
                    alert("Imagen cargada exitosamente");
                    // Puedes realizar acciones adicionales después de cargar la imagen si es necesario
                } else {
                    alert("Error al cargar la imagen");
                }
            })
            .catch(error => {
                console.error("Error:", error);
                alert("Error al cargar la imagen");
            });
        }
    };
    fileInput.click();
});


//boton cargar imagen profile
document.addEventListener("DOMContentLoaded", function() {
    
    const btnCargarImagen = document.getElementById("btn_cargar_imagen");
    const btnUsers = document.getElementById("btn_users");

    btnCargarImagen.addEventListener("click", function() {
        // Crear un input de tipo file para seleccionar la imagen
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = "image/*";

        // Escuchar el evento de cambio en el input de archivo
        fileInput.addEventListener("change", function(event) {
            const file = event.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append("thumbnail", file);

                // Realizar la solicitud al endpoint para cargar la imagen de perfil
                fetch(`/api/users/${user._id}/profileimagen`, {
                    method: "POST",
                    body: formData,
                    headers: {
                        authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                .then(response => {
                    if (response.ok) {
                        alert("Imagen de perfil cargada exitosamente.");
                        location.reload(true);
                    } else {
                        throw new Error("Error al cargar la imagen de perfil.");
                    }
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("Ocurrió un error al cargar la imagen de perfil.");
                });
            }
        });

        // Hacer clic en el input de archivo para abrir el diálogo de selección de archivo
        fileInput.click();
    });

    btnUsers.addEventListener("click", function(event) {
        event.preventDefault(); // Evitar el comportamiento predeterminado del enlace

        // Obtener el token de autorización del almacenamiento local
        const token = localStorage.getItem("token");

        if (token) {
            // Redirigir al usuario a la página de usuarios con el token como parámetro de consulta en la URL
            window.location.href = `/users?token=${token}`;
        } else {
            console.error("No se encontró un token de autorización.");
        }
    });

});
