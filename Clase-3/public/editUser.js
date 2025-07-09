const formEditUser = document.getElementById('user-form')
const parrafoError = document.getElementById('p_error')
const urlParams = new URLSearchParams(window.location.search) //Obtener los parámetros de la URL
const UserId = urlParams.get('id') //Obtener el id del usuario de los parámetros de la URL
//Cuando el usuario envía el formulario, se captura el evento submit

fetch(`http://localhost:4000/users/${UserId}`) //Realizar una petición GET a la API para obtener el usuario
.then(response => response.json()) //Convertir la respuesta a JSON
.then(data => { 
    if(data.message == "Usuario no encontrado") {
        parrafoError.innerText = `Error al editar usuario: ${data.message}` //Mostrar el mensaje de error
        parrafoError.style.color = "red" //Cambiar el color del mensaje a rojo
        return //Salir de la función si hay un error
    }
    //Si el usuario existe, rellenar los campos del formulario con los datos del usuario
    document.getElementById('name').value = data.nombre //Rellenar el campo nombre
    document.getElementById('email').value = data.email //Rellenar el campo email
})


formEditUser.addEventListener('submit', (e) => {
    e.preventDefault() //Prevenir el comportamiento por defecto del formulario (recargar la página)
    const formData = new FormData(formEditUser) //Obtener los datos del formulario
    const userData = Object.fromEntries(formData) //Convertir los datos del formulario a un objeto

    console.log(userData) // {nombre: "Pepe", email: "Perez"}

    fetch(`http://localhost:4000/users/${UserId}`, {
        method: 'PUT',
        body: JSON.stringify(userData), //Convertir el objeto a JSON
        headers: {
            'Content-Type': 'application/json' //Indicar que el cuerpo de la petición es JSON
        }
    }).then((response) => response.json())
    .then((data) => {
        console.log(data) //Mostrar los datos del usuario creado
        if(data.message == "El usuario no existe") {
            parrafoError.innerText = `Error al editar usuario: ${data.message}` //Mostrar el mensaje de error
            parrafoError.style.color = "red" //Cambiar el color del mensaje a rojo
            return //Salir de la función si hay un error
        }
        
        formEditUser.reset() //Limpiar el formulario
        parrafoError.innerText = `Usuario editado correctamente` //Mostrar un mensaje de éxito
        parrafoError.style.color = "green" //Cambiar el color del mensaje a verde
    })
    .catch((error) => {
        console.error('Error al crear el usuario:', error) //Mostrar un mensaje de error
        parrafoError.innerText = "Error al crear el usuario" //Mostrar un mensaje de error
        parrafoError.style.color = "red" //Cambiar el color del mensaje a rojo
    })
})