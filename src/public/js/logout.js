// Función para cerrar sesión
function logout() {
    // Eliminar el token del almacenamiento local
    localStorage.removeItem("token");
    // Redireccionar al usuario a la página de inicio de sesión
    window.location.replace('/login');
}