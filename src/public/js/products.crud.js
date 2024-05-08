const form = document.getElementById('productForm');

form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    //Esto no se debe usar cuando se usa Form en html, se debe enviar el form como body directamente
    //const obj = {};
    //data.forEach((value, key) => obj[key] = value);
    //---*-*-*-*-*--*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**-*
    const token = localStorage.getItem("token");

    // Obtener todos los productos
    fetch('/api/products/', {
        method: "POST",
        body: data,
        headers: {
            'authorization': `Bearer ${token}`
        },
       
        
    })
    .then(result => result.json())
    .then(json => {
        // Verificar si la respuesta indica éxito
        if (json.status === "success") {
            // Mostrar SweetAlert de éxito
            //console.log("En register.js: json.token", json.token)
            Swal.fire({
                title: "Success!",
                text: "Producto agregado con exito!.",
                icon: "success",
                timer: 2000, // Tiempo en milisegundos (2 segundos)
                timerProgressBar: true, // Barra de progreso mostrando el tiempo restante
                showConfirmButton: false // Oculta el botón "OK"
            }).then(() => {
                location.reload();
            });
            
           // window.location.replace("http://localhost:8080/login")

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
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Obtener el token de autenticación desde el localStorage
        const token = localStorage.getItem("token");

        // Obtener todos los productos
        const productsResponse = await fetch('/api/products/all', {
            headers: {
                'authorization': `Bearer ${token}`
            }
        });

        if (!productsResponse.ok) {
            throw new Error('No se pudieron obtener los productos');
        }

        const productsData = await productsResponse.json();
        // console.log(productsData.payload);
        const products = productsData.payload;

        // Limpiar la lista de productos existentes
        const productList = document.getElementById('productsList');
        productList.innerHTML = '';

        // Agregar todos los productos a la lista
        products.forEach(product => {
            appendProductToList(product);
        });
    } catch (error) {
        console.error('Error:', error);
    }
});

function appendProductToList(product) {
    const productList = document.getElementById('productsList');

    const productElement = document.createElement('div');
    productElement.classList.add('mb-3');
    productElement.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h5 class="card-title">${product.title}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">Precio: $${product.price}</p>
                <p class="card-text">Stock: ${product.stock}</p>
                <button class="btn btn-danger" onclick="deleteProduct('${product._id}')">Eliminar</button>
            </div>
        </div>
    `;

    productList.appendChild(productElement);
}


async function deleteProduct(productId) {
    try {
        // Obtener el token de autenticación desde el localStorage
        const token = localStorage.getItem("token");
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE',
            headers: {
                'authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('No se pudo eliminar el producto');
        }
        // location.reload();
        Swal.fire({
            title: "Success!",
            text: "Registro exitoso.",
            icon: "success",
            timer: 2000, // Tiempo en milisegundos (2 segundos)
            timerProgressBar: true, // Barra de progreso mostrando el tiempo restante
            showConfirmButton: false // Oculta el botón "OK"
        }).then(() => {
            location.reload();
        });

    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: "Error!",
            text: "Eliminacion fallida!!.",
            icon: "error",
        });
    }
}
