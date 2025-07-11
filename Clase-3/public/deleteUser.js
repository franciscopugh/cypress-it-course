const formDelete = document.getElementById('delete-form');
const message = document.getElementById('p_error');

formDelete.addEventListener('submit', (e) => {
  e.preventDefault();

  const userId = document.getElementById('userId').value;

  fetch(`http://localhost:4000/users/${userId}`, {
    method: 'DELETE'
  })
  .then((response) => {
    if (response.ok) {
      message.innerText = 'Usuario eliminado correctamente.';
      message.style.color = 'green';
    } else if (response.status === 404) {
      message.innerText = 'Usuario no encontrado.';
      message.style.color = 'red';
    } else {
      message.innerText = 'Error al eliminar el usuario.';
      message.style.color = 'red';
    }
  })
  .catch(() => {
    message.innerText = 'Error de red al eliminar el usuario.';
    message.style.color = 'red';
  });
});
