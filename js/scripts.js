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
    // Alerta con Toastify JS
    Toastify({
      text: 'Por favor, rellena todos los campos.',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      stopOnFocus: true,
      color: '#ffffff',
      onClick: function () { }
    }).showToast();
    return;
  }

  // Calcular la edad del alumno
  const hoy = new Date();
  const fechaNacimientoAlumno = new Date(fechaNacimiento);
  let edad = hoy.getFullYear() - fechaNacimientoAlumno.getFullYear();
  const mes = hoy.getMonth() - fechaNacimientoAlumno.getMonth(); // no se usa esta constante pero la agrego para hacer el código escalable
  if (edad < 15 || edad > 120) {
    // alerta usando toastify js
    Toastify({
      text: 'Por favor ingrese una fecha de nacimiento válida.',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      stopOnFocus: true,
      color: '#ffffff',
      onClick: function () { }
    }).showToast();

    return;
  }

  // Validar que el alumno tenga al menos 15 años y máximo 120
  if (edad < 15 || edad > 120) {
    // alerta usando toastify js
    Toastify({
      text: 'Por favor ingrese una fecha de nacimiento válida.',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      stopOnFocus: true,
      color: '#ffffff',
      onClick: function () { }
    }).showToast();
    return;
  }

  // Validar Correo usuario @ y dominio
  const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  if (!regex.test(correo)) {
    // alerta usando toastify js
    Toastify({
      text: 'Por favor ingrese correo electrónico valido.',
      duration: 3000,
      close: true,
      gravity: 'top',
      position: 'right',
      backgroundColor: 'linear-gradient(to right, #ff5f6d, #ffc371)',
      stopOnFocus: true,
      color: '#ffffff',
      onClick: function () { }
    }).showToast();
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

  // Llamar a mostrarAlumnos() para actualizar la tabla
  mostrarAlumnos();

  // Notificación de que se guardaron los datos del alumno usando sweet
  Swal.fire({
    position: 'center',
    icon: 'success',
    title: 'Los datos del alumno han sido guardados correctamente.',
    showConfirmButton: false,
    timer: 2000
  })

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
    const tablaWrapper = document.createElement('div');
    tablaWrapper.className = 'table-responsive';

    const tabla = document.createElement('table');
    tabla.className = 'table table-striped table-sm';

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
        <button class="btn btn-sm btn-danger eliminar" data-indice="${indice}">
          <i class="fa fa-trash"></i> Eliminar
        </button>
        </td>
      `;
      cuerpo.appendChild(fila);
    });
    tabla.appendChild(cuerpo);
    tablaWrapper.appendChild(tabla);
    listaAlumnos.appendChild(tablaWrapper);

    // Agregar event listener para botones de eliminar
    const botonesEliminar = document.querySelectorAll('.eliminar');
    botonesEliminar.forEach(function (boton) {
      boton.addEventListener('click', function () {
        const indice = this.dataset.indice;
        Swal.fire({
          title: '¿Estás seguro que deseas eliminar este alumno?',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Sí, eliminar!',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            // Eliminar el alumno
            alumnos.splice(indice, 1);

            // Actualizar Local Storage con el arreglo de alumnos actualizado
            localStorage.setItem('alumnos', JSON.stringify(alumnos));

            // Actualizar la tabla de alumnos
            mostrarAlumnos();

            // Mostrar mensaje de confirmación al usuario
            Swal.fire({
              title: 'Eliminado!',
              text: 'El alumno ha sido eliminado correctamente.',
              icon: 'success',
              confirmButtonText: 'Aceptar'
            });
          }
        });
      });
    });
  }
}
// Llamar a mostrarAlumnos() para mostrar la lista de alumnos
mostrarAlumnos();
