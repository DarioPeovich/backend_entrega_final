let errorCode = null; // Variable global para almacenar el código de error HTTP

document.addEventListener("DOMContentLoaded", function() {
    const btnsAddToCart = document.querySelectorAll(".btnAddToCart");

    if (btnsAddToCart) {
        btnsAddToCart.forEach(btn => {
            btn.addEventListener("click", async function(event) {
                const cartIdElement = document.getElementById("cartId");
                const cartId = cartIdElement.innerText;
                const productId = btn.getAttribute("data-pid");
                try {
                    // console.log("cartId: ", cartId);
                    // console.log("productId: ", productId);

                    const response = await fetch(`/api/carts/${cartId}/product/${productId}`, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                            // "authorization": `Bearer ${localStorage.getItem("token")}`
                        }
                    });

                    if (!response.ok) {
                        errorCode = response.status; // Almacenar el código de estado del error
                        let errorMessage = "Error al agregar el producto al carrito";
                        if (response.status === 403) {
                            errorMessage = "No estás autorizado para agregar este producto al carrito";
                        }
                        throw new Error(errorMessage);
                        
                    }

                    // Si llegamos aquí, el producto se agregó exitosamente al carrito
                    Swal.fire({
                        icon: 'success',
                        title: 'Producto agregado al carrito',
                        showConfirmButton: false,
                        timer: 1500 // Tiempo en milisegundos para cerrar automáticamente el popup
                    });
  
                    console.log("Producto agregado al carrito con éxito");
                } catch (error) {
                    //console.error("Error:", error.message);
  
                    Swal.fire({
                      icon: 'error',
                      title: error.message,     //'Error al agregar el producto al carrito',
                      text: 'Por favor, intenta nuevamente más tarde.',
                      text: errorCode === 403 ? '' : 'Por favor, intenta nuevamente más tarde.',
                    });
                    // Puedes mostrar un mensaje de error al usuario si la solicitud falla
                }
            });
        });
    }
});

