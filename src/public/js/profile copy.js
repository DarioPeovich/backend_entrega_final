// console.log(`Bearer ${localStorage.getItem("token")}`);
let user; // Definir la variable json fuera del bloque fetch
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
    const paragraph = document.getElementById("result");
    paragraph.innerHTML = `<br>
    Usuario: ${json.payload.fullName}<br>
    Email: ${json.payload.email}<br>
    Rol: ${json.payload.role}`;

    // Agregar la imagen de perfil
    if (json.payload.profileImage) {
        const img = document.createElement('img');
        img.src = json.payload.profileImage;
        img.alt = 'Imagen de perfil';
        paragraph.appendChild(img);
    }
})

document.getElementById("btn_cargar_imagen").addEventListener("click", () => {
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
                    "Authorization": `Bearer ${localStorage.getItem("token")}`
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
