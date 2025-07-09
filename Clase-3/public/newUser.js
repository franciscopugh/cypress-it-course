const formNewUser = document.getElementById('user-form')
const parrafoError = document.getElementById('p_error')
//Cuando el usuario envía el formulario, se captura el evento submit
formNewUser.addEventListener('submit', (e) => {
    e.preventDefault() //Prevenir el comportamiento por defecto del formulario (recargar la página)
    const formData = new FormData(formNewUser) //Obtener los datos del formulario
    const userData = Object.fromEntries(formData) //Convertir los datos del formulario a un objeto

    console.log(userData) // {nombre: "Pepe", email: "Perez"}

    fetch('http://localhost:4000/users', {
        method: 'POST',
        body: JSON.stringify(userData), //Convertir el objeto a JSON
        headers: {
            'Content-Type': 'application/json' //Indicar que el cuerpo de la petición es JSON
        }
    }).then((response) => response.json())
    .then((data) => {
        console.log(data) //Mostrar los datos del usuario creado
        if(data.message == "Nombre y email son requeridos" || data.message == "El email ya está en uso") {
            parrafoError.innerText = `Error al crear usuario: ${data.message}` //Mostrar el mensaje de error
            parrafoError.style.color = "red" //Cambiar el color del mensaje a rojo
            return //Salir de la función si hay un error
        }
        
        formNewUser.reset() //Limpiar el formulario
        parrafoError.innerText = `Usuario creado correctamente` //Mostrar un mensaje de éxito
        parrafoError.style.color = "green" //Cambiar el color del mensaje a verde
    })
    .catch((error) => {
        console.error('Error al crear el usuario:', error) //Mostrar un mensaje de error
        parrafoError.innerText = "Error al crear el usuario" //Mostrar un mensaje de error
        parrafoError.style.color = "red" //Cambiar el color del mensaje a rojo
    })
})