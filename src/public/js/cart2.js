const form = document.getElementById('purchaseForm');
const cartIdElement = document.getElementById('cartId');
const cartIdValue = cartIdElement.getAttribute('data-cart-id');
const ticketInfoElement = document.getElementById('ticketInfo');
// console.log("cartIdValue", cartIdValue)
form.addEventListener('submit', e => {
    e.preventDefault();
    // const cartId = document.querySelector('input[name="cart_id"]').value;
    //const linkPurchase = `/api/carts/${cartId}/purchase`;
    const linkPurchase = "/api/carts/" + cartIdValue + "/purchase";
    //const linkPurchase = "/carts/" + cartId.value ;
    //  console.log(linkPurchase);
    // se muestra un aviso de que se está procesando la compra
    Swal.fire({
        title: "Procesando compra...",
        text: "Por favor, espera un momento.",
        icon: "info",
        showConfirmButton: false,
        allowOutsideClick: false
    });

    fetch(linkPurchase, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(result => result.json()).then(json => {

        // Se quita el aviso de procesamiento
        Swal.close();
        // Verificar si la respuesta indica éxito
        //console.log("Llegue");
        if (json.status === "success"  && json.ticketCreated) {

            const token = localStorage.getItem("token"); // Obtener el token del localStorage
            // Mostrar SweetAlert de éxito
            Swal.fire({
                title: "Success!",
                html: "Ya se ha registrado su compra!!<br>En su email, tendrá todos los datos para su control.",
                icon: "success",
            }).then(() => {
                // Redireccionar a la página de productos después de cerrar la alerta
                window.location.replace(`/products?token=${token}`);
            });

            // Mostrar la información del ticket en el elemento HTML
            const ticketCreated = json.ticketCreated;
            ticketInfoElement.innerHTML = `
                <p>Código de ticket: ${ticketCreated.code}</p>
                <p>Fecha de compra: ${ticketCreated.purchase_datetime}</p>
                <p>Monto total: ${ticketCreated.amount}</p>
                <p>Comprador: ${ticketCreated.purchaser}</p>
            `;

             // Obtiene el token del localStorage
            //  const token = localStorage.getItem("token"); // Obtener el token del localStorage
        
            //  // Redirecciona a handlebars products
            //   window.location.replace(`/products?token=${token}`)
             
     
        } else {
            
            console.error("Ticket failed:", json.error);
            Swal.fire({
                title: "Error!",
                text: "Generacion del ticket fallido!. " + json.error,
                icon: "error",
            });
        }
    })
    
})
//===========================
document.addEventListener("DOMContentLoaded", function() {
    const btnDeleteProduct = document.querySelectorAll(".btnDeleteProduct");

    btnDeleteProduct.forEach(btn => {
        btn.addEventListener("click", async function(event) {
            const productId = this.getAttribute("data-pid"); // Usar 'this' en lugar de 'btn'
            //const cartIdElement = document.getElementById("cartId");
            //const cartId = cartIdElement.getAttribute("data-cart-id");
            //console.log("productId: ", productId)
            //console.log("cartIdValue: ", cartIdValue)
            try {
                const response = await fetch(`/api/carts/${cartIdValue}/product/${productId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    }
                });

                if (!response.ok) {
                    throw new Error("Error al eliminar el producto del carrito");
                }

                // Si llegamos aquí, el producto se eliminó exitosamente del carrito
                // Puedes actualizar la interfaz de usuario si es necesario
                console.log("Producto eliminado del carrito con éxito");

                // Eliminar el elemento del DOM correspondiente al producto eliminado
                //this.parentElement.remove();
                // Recargar la página actual
                location.reload();
            } catch (error) {
                console.error("Error:", error.message);
                Swal.fire({
                    icon: 'error',
                    title: 'Error al eliminar el producto del carrito',
                    text: 'Por favor, intenta nuevamente más tarde.',
                });
            }
        });
    });
});
