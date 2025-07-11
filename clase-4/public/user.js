const container = document.getElementById('detalle-user');
const params = new URLSearchParams(window.location.search);
const id = params.get('id');

fetch(`http://localhost:4000/users/${id}`)
  .then(res => {
    if (!res.ok) throw new Error('Usuario no encontrado');
    return res.json();
  })
  .then(user => {
    container.innerHTML = `
    <div class="user-card" id="user">
      <h2>${user.nombre}</h2>
      <p>${user.email}</p>
    </div>
    `;
  })
  .catch(err => {
    container.innerText = 'Error: ' + err.message;
  });
