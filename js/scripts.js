// Capturar el formulario
const formulario = document.querySelector('#formulario');

// Escuchar el evento submit del formulario
formulario.addEventListener('submit', function (evento) {
  evento.preventDefault();

  // Capturar los datos del formulario
  const nombres = document.querySelector('#nombres').value.trim();
  const fechaNacimiento = document.querySelector('#fecha-nacimiento').value.trim();
  const nacionalidad = document.querySelector('#nacionalidad').value.trim();
  const correo = document.querySelector('#correo').value.trim();
  const telefono = document.querySelector('#telefono').value.trim();
  const direccion = document.querySelector('#direccion').value.trim();
  const ciudad = document.querySelector('#ciudad').value.trim();
  const estado = document.querySelector('#estado').value.trim();
  const pais = document.querySelector('#pais').value.trim();
  const nivel = document.querySelector('#nivel').value.trim();
  const comentario = document.querySelector('#comentario').value.trim();

  // Validar los datos del formulario
  if (nombres === '' || fechaNacimiento === '' || nacionalidad === '' || correo === '' || telefono === '' || direccion === '' || ciudad === '' || estado === '' || pais === '' || nivel === '') {
    alert('Por favor llene todos los campos.');
    return;
  }

  // Crear objeto alumno
  const alumno = {
    nombres,
    fechaNacimiento,
    nacionalidad,
    correo,
    telefono,
    direccion,
    ciudad,
    estado,
    pais,
    nivel,
    comentario
  };

  // Guardar el objeto alumno en Local Storage
  let alumnos = [];
  if (localStorage.getItem('alumnos')) {
    alumnos = JSON.parse(localStorage.getItem('alumnos'));
  }
  alumnos.push(alumno);
  localStorage.setItem('alumnos', JSON.stringify(alumnos));

  // Notificación de que se guardaron los datos del alumno
  const alerta = document.createElement('div');
  alerta.className = 'alert alert-success';
  alerta.appendChild(document.createTextNode('Los datos del alumno han sido guardados correctamente.'));
  formulario.insertBefore(alerta, formulario.firstChild);

  // Limpiar el formulario después de enviarlo
  formulario.reset();

  // Mostrar la lista de alumnos
  mostrarAlumnos();
});

// Función para mostrar la lista de alumnos
function mostrarAlumnos() {
  const alumnos = JSON.parse(localStorage.getItem('alumnos'));
  const listaAlumnos = document.querySelector('#listaAlumnos');
  listaAlumnos.innerHTML = '';

  if (alumnos === null) {
    const alerta = document.createElement('div');
    alerta.className = 'alert alert-danger';
    alerta.appendChild(document.createTextNode('No hay alumnos inscritos.'));
    listaAlumnos.appendChild(alerta);
  } else {
    const tabla = document.createElement('table');
    tabla.className = 'table table-striped';
    const encabezado = document.createElement('thead');
    encabezado.innerHTML = `
      <tr>
        <th>Nombre</th>
        <th>Fecha de nacimiento</th>
        <th>Nacionalidad</th>
        <th>Correo electrónico</th>
        <th>Teléfono</th>
        <th>Dirección</th>
        <th>Ciudad</th>
        <th>Estado</th>
        <th>País</th>
        <th>Nivel</th>
        <th>Comentarios adicionales</th>
        <th>Acciones</th>
      </tr>
    `;
    tabla.appendChild(encabezado);

    const cuerpo = document.createElement('tbody');
    alumnos.forEach(function (alumno, indice) {
      const fila = document.createElement('tr');
      fila.innerHTML = `
        <td>${alumno.nombres}</td>
        <td>${alumno.fechaNacimiento}</td>
        <td>${alumno.nacionalidad}</td>
        <td>${alumno.correo}</td>
        <td>${alumno.telefono}</td>
        <td>${alumno.direccion}</td>
        <td>${alumno.ciudad}</td>
        <td>${alumno.estado}</td>
        <td>${alumno.pais}</td>
        <td>${alumno.nivel}</td>
        <td>${alumno.comentario}</td>
        <td>
          <button class="btn btn-sm btn-warning editar" data-indice="${indice}">
            <i class="fa fa-pencil"></i> Editar
          </button>
          <button class="btn btn-sm btn-danger eliminar" data-indice="${indice}">
            <i class="fa fa-trash"></i> Eliminar
          </button>
        </td>
      `;
      cuerpo.appendChild(fila);
    });
    tabla.appendChild(cuerpo);
    listaAlumnos.appendChild(tabla);
  }
}
