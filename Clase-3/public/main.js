fetch('http://localhost:4000/users')
.then(response => response.json())
.then(data=> {
    const container = document.getElementById('users-container');
    //Por cada elemento en el array de datos, crear un nuevo elemento HTML y agregarlo al contenedor
    data.forEach(element => {
        const userElement = document.createElement('div');
        userElement.id = `user-${element.id}`;
        userElement.className = 'users';
        userElement.innerHTML = `
            <h3>${element.nombre}</h3>
            <p>Email: ${element.email}</p>
        `;
        container.appendChild(userElement);
    });
})