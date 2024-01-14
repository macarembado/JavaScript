let usuariosRegistrados = [];
const url = './usuarios.json';

const botonRegistro = document.getElementById('registerButton');
const botonInicioSesion = document.getElementById('loginButton');
const botonVerUsuarios = document.getElementById('viewUsersButton');
const contenedorRegistro = document.getElementById('registerContainer');
const contenedorInicioSesion = document.getElementById('loginContainer');
const mensajeBienvenida = document.getElementById('welcomeMessage');
const listaUsuarios = document.getElementById('usersList');
const botonesVolverAlMenu = document.querySelectorAll('#VolverAlMenu');

botonRegistro.addEventListener('click', () => {
    contenedorRegistro.style.display = 'block';
    contenedorInicioSesion.style.display = 'none';
    mensajeBienvenida.style.display = 'none';
});

botonInicioSesion.addEventListener('click', () => {
    contenedorInicioSesion.style.display = 'block';
    contenedorRegistro.style.display = 'none';
    mensajeBienvenida.style.display = 'none';
});

botonVerUsuarios.addEventListener('click', () => {
    contenedorInicioSesion.style.display = 'none';
    contenedorRegistro.style.display = 'none';
    mensajeBienvenida.style.display = 'none';
    listaUsuarios.innerHTML = '';
    for (const usuario of usuariosRegistrados) {
        const elementoLista = document.createElement('li');
        elementoLista.textContent = `Nombre: ${usuario.nombre}, Apellido: ${usuario.apellido}, Edad: ${usuario.Edad}, Email: ${usuario.email}`;
        listaUsuarios.appendChild(elementoLista);
    }
    document.getElementById('registeredUsers').style.display = 'block';
});

for (const boton of botonesVolverAlMenu) {
    boton.addEventListener('click', () => {
        contenedorRegistro.style.display = 'none';
        contenedorInicioSesion.style.display = 'none';
        mensajeBienvenida.style.display = 'none';
        document.getElementById('registeredUsers').style.display = 'none';
    });
}

const formularioRegistro = document.getElementById('registrarte');
formularioRegistro.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = document.getElementById('nombre').value;
    const apellido = document.getElementById('apellido').value;
    const Edad = document.getElementById('Edad').value;
    const email = document.getElementById('email').value;
    const contraseña = document.getElementById('contraseña').value;
    const confirmarContraseña = document.getElementById('confirmContraseña').value;

    if (parseInt(Edad) < 18) {
        Swal.fire('Error', 'Debes ser mayor de 18 años para registrarte', 'error');
        return;
    }

    if (contraseña !== confirmarContraseña) {
        Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
        return;
    }

    const usuario = { nombre, apellido, Edad, email, contraseña };
    usuariosRegistrados.push(usuario);

    contenedorRegistro.style.display = 'none';
    contenedorInicioSesion.style.display = 'block';
    mensajeBienvenida.style.display = 'none';

    formularioRegistro.reset();
});

const formularioInicioSesion = document.getElementById('login');
formularioInicioSesion.addEventListener('submit', (e) => {
    e.preventDefault();
    const email2 = document.getElementById('email2').value;
    const contraseña2 = document.getElementById('contraseña2').value;

    const usuario = usuariosRegistrados.find((usuario) => usuario.email === email2);

    if (!usuario) {
        Swal.fire('Error', 'Usuario no encontrado', 'error');
        return;
    }

    if (usuario.contraseña !== contraseña2) {
        Swal.fire('Error', 'Contraseña incorrecta', 'error');
        return;
    }

    contenedorInicioSesion.style.display = 'none';

    mensajeBienvenida.style.display = 'block';

    formularioInicioSesion.reset();
});


function cargarUsuariosJSON() {
  return fetch(url)
      .then((response) => {
          if (!response.ok) {
              throw new Error('No se pudo cargar el archivo JSON.');
          }
          return response.json();
      })
      .then((data) => data.usuarios) 
      .catch((error) => {
          console.error(error);
          return [];
      });
}

cargarUsuariosJSON()
  .then((data) => {
      usuariosRegistrados = data;
      console.log('Usuarios cargados:', usuariosRegistrados);
  })
  .catch((error) => {
      console.error('Error al cargar usuarios:', error);
  });

function agregarUsuario(usuario) {
  usuariosRegistrados.push(usuario);

  contenedorRegistro.style.display = 'none';
  contenedorInicioSesion.style.display = 'block';
  mensajeBienvenida.style.display = 'none';

  guardarUsuariosJSON({ usuarios: usuariosRegistrados }); 
}

function guardarUsuariosJSON(data) {
  fetch('usuarios.json', {
      method: 'PUT', 
      headers: {
          'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
  })
  .then((response) => {
      if (!response.ok) {
          throw new Error('No se pudieron guardar los datos en el archivo JSON.');
      }
      console.log('Datos guardados exitosamente.');
  })
  .catch((error) => {
      console.error('Error al guardar usuarios:', error);
  });
}

