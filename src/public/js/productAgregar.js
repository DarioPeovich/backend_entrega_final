const form = document.getElementById('productAgregar');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    // fetch("/api/products/create/test", {
    fetch("/api/products/", {
        method: "POST",
        body: data
        // headers: {
        //     "Content-Type": "application/json"
        // }
    })
    .then(result => result.json())
    .then(json => {
        // Verificar si la respuesta indica éxito
        if (json.status === "success") {
            // Mostrar SweetAlert de éxito
            //console.log("En register.js: json.token", json.token)
            //localStorage.setItem("token", json.token)
            Swal.fire({
                title: "Success!",
                text: "Registro exitoso.",
                icon: "success",
            });
            
            //window.location.replace("/productAgregar")

        } else {
            // Si hay errores, puedes manejarlos aquí o simplemente mostrar una alerta
            console.error("Registration failed:", json.error);
            Swal.fire({
                title: "Error!",
                text: "Registracion fallido. Por favor vuelva a intentarlo.",
                icon: "error",
            });
        }
    })
    .catch(error => {
        // Manejar errores de red o de la solicitud
        console.error("Fetch error:", error);
        Swal.fire({
            title: "Error!",
            text: "Un error a ocurrido. Vuelva a intentar.",
            icon: "error",
        });
    });

})

