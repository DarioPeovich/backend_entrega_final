
// const form = document.getElementById('productForm');

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




document.getElementById('productForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    let token = localStorage.getItem("token");
    const formData = new FormData(event.target);
    const productData = Object.fromEntries(formData.entries());
    //const data = new FormData(form);
    console.log("Entre")
    try {
        const response = await fetch('/api/products/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify(productData)
        });

        if (response.ok) {
            alert("Producto agregado con exito")
            window.location.reload();
            
        }else {
            throw new Error('No se pudo agregar el producto');
        }

        // // Obtener todos los productos después de agregar uno nuevo
        // const productsResponse = await fetch('/api/products/all');
        // if (!productsResponse.ok) {
        //     throw new Error('No se pudieron obtener los productos');
        // }
        // const productsData = await productsResponse.json();
        // //console.log(productsData.payload);
        // const products = productsData.payload;

        // // Limpiar la lista de productos existentes
        // const productList = document.getElementById('productsList');
        // productList.innerHTML = '';

        // // Agregar todos los productos a la lista
        // products.forEach(product => {
        //     appendProductToList(product);
        // });
    } catch (error) {
        console.error('Error:', error);
    }
});

// Esta función ya está definida
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
        const response = await fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('No se pudo eliminar el producto');
        }

        const deletedProduct = document.getElementById(productId);
        deletedProduct.remove();
    } catch (error) {
        console.error('Error:', error);
    }
}
