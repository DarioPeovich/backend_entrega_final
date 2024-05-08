const form = document.getElementById('loginForm');
const purchase = document.getElementById('purchase');
form.addEventListener("submit", e => {
    e.preventDefault();
    const data = new FormData(form);
    const obj = {};

    data.forEach((value, key) => obj[key] = value);
    
    fetch('/api/sessions/login', {
        method: "POST",
        body: JSON.stringify(obj),
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        // Verifica si la respuesta fue exitosa (código de estado 200)
        if (response.status === 200) {
            // Extrae el cuerpo de la respuesta como JSON
            return response.json();
        } else {
            // Si la respuesta no es exitosa, lanza un error
            //throw new Error('Failed to login');
            alert("Error en usuario o contraseña")
        }
    }).then(data => {
        // Accede al token desde el cuerpo de la respuesta JSON
        const token = data.token;
        console.log("Token recibido:", token);
        
        // Guarda el token en localStorage
        localStorage.setItem("token", token);
        
        // Redirecciona a handlebars products
         window.location.replace(`/products?token=${token}`)

    }).catch(error => {
        console.error('Error:', error);
    });
});