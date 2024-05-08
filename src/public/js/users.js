// actions.js

function changeRole(userId) {
  // Realizar una solicitud POST al endpoint con el ID de usuario
  fetch(`api/users/premium/${userId}`, {
      method: 'POST',
      // Puedes incluir más opciones como headers, body, etc., según sea necesario
  })
  .then(response => {
      if (response.ok) {
          // Si la respuesta es exitosa, 
          console.log("El rol del usuario ha sido cambiado con éxito");
          alert("Se cambio el Rol con exito!");
          window.location.reload();
      } else {
          // Si la respuesta indica un error
          console.error("No se pudo cambiar el rol del usuario");
          // Intenta leer el cuerpo de la respuesta como JSON para obtener el mensaje de error
          response.json().then(data => {
              alert(`No se pudo cambiar el rol del usuario. Error: ${data.message}`);
          }).catch(error => {
              console.error("Error al leer el cuerpo de la respuesta:", error);
              alert("Ocurrió un error al intentar cambiar el rol del usuario. Por favor, inténtalo de nuevo más tarde.");
          });
      }
  })
  .catch(error => {
      // Manejar errores de red u otros errores
      console.error("Error al cambiar el rol del usuario:", error);
      // Muestra un mensaje de error al usuario
      alert("Ocurrió un error al intentar cambiar el rol del usuario. Por favor, inténtalo de nuevo más tarde.");
  });
}


  
  function deleteUser(userId) {
    // Realizar una solicitud POST al endpoint con el ID de usuario
    fetch(`api/users/delete/${userId}`, {
      method: 'POST',
    }).then(response => {
      // Manejar la respuesta
      console.log("El usuario ha sido eliminado con éxito");
      alert("Usuario eliminado con exito!");
      window.location.reload();
    }).catch(error => {
      // Manejar errores
      alert("Ocurrió un error al intentar eliminar el usuario. Por favor, inténtalo de nuevo más tarde.");
    });
  }
  
  function deleteUsersTimeout() {
      // Mostrar mensaje de alerta mientras se procesa
    let alertaProceso = Swal.fire({
      title: 'Procesando...',
      text: 'Eliminando usuarios con timeout. Por favor, espera un momento.',
      icon: 'info',
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false
    });
    fetch('/api/users/deletetimeout', {
      method: 'DELETE',
      headers: {
        'authorization': `Bearer ${localStorage.getItem('token')}` // Agrega el token de autorización si es necesario
      }
    })
    .then(response => {
      
      alertaProceso.close();
      
      

      if (response.ok) {
        //alert('Usuarios eliminados con timeout exitosamente.');
        Swal.fire({
          title: 'Proceso completado',
          text: 'El proceso ha terminado correctamente.',
          icon: 'success'
          
      });
        
        // Recargar la página actual
        location.reload();
        
      } else {
        throw new Error('Error al eliminar usuarios con timeout.');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('Ocurrió un error al eliminar usuarios con timeout.');
    });
  }
  