function emptyCart() {
    const cartId = document.getElementById("cartId").getAttribute("data-cart-id");
    
    console.log("llegue a emptyCart")

    fetch(`/api/carts/${cartId}`, {
      method: "DELETE"
    })
    .then(response => {
      if (!response.ok) {
        throw new Error("Error al vaciar el carrito");
      }
      return response.json();
    })
    .then(data => {
      // Actualizar la interfaz de usuario u ofrecer retroalimentación al usuario
      console.log("Carrito vaciado correctamente");
      // Por ejemplo, podrías recargar la página para actualizar la lista del carrito
      location.reload();
    })
    .catch(error => {
      console.error("Error:", error.message);
      // Puedes mostrar un mensaje de error al usuario si la solicitud falla
    });
  }
  
  // Definir una función para redirigir a la página de productos
function redirectProducts() {
  // Obtener el token del localStorage
  const token = localStorage.getItem('token');

  // Verificar si el token existe y no es nulo o vacío
  // if (token && token.trim() !== '') {
  //   // Redirigir al usuario a la página de productos con el token en la URL
  //   window.location.href = `/products?token=${token}`;
  // } else {
  //   // En caso de que no haya token válido, hacer algo o redirigir a otra página
  //   console.log('No se encontró ningún token válido en el localStorage.');
  // }
  window.location.href = `/products`;   //El token se almacena como una coockie, y el navegador solo se encarga d enviarla al Back
}
