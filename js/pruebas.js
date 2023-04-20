// Capturar el formulario
const formulario = document.querySelector('#formulario');

// Escuchar el evento submit del formulario
formulario.addEventListener('submit', async function (evento) {
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

    // Validar Correo usuario @ y dominio
    const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
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
    // Consumir la API de países para validar la nacionalidad
    const url = 'https://restcountries.com/v2/name/${nacionalidad}';
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 404) {
        // alerta usando toastify js
        Toastify({
            text: 'Por favor ingrese una nacionalidad válida.',
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
    } else {
        const bandera = data[0].flag;
        const nombrePais = data[0].name;
        nacionalidad = <img src="${bandera}" alt="${nombrePais}" width="20px"> ${nombrePais}</img>;
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
async function mostrarAlumnos() {
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
        for (let i = 0; i < alumnos.length; i++) {
            const alumno = alumnos[i];
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
        <button class="btn btn-sm btn-danger eliminar" data-indice="${i}">
          <i class="fa fa-trash"></i> Eliminar
        </button>
      </td>
      `;

            // Consumir la API de países para obtener información adicional del país
            const url = `https://restcountries.com/v2/name/${alumno.nacionalidad}`;
            const response = await fetch(url);
            const data = await response.json();
            if (data.status === 404) {
                fila.children[2].innerHTML = `${alumno.nacionalidad}`;
            } else {
                const bandera = data[0].flag;
                const nombrePais = data[0].name;
                fila.children[2].innerHTML = `<img src="${bandera}" alt="${nombrePais}" width="20px"> ${nombrePais}`;
            }

            cuerpo.appendChild(fila);
        }

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
        // Agregar event listener para botones de editar
        const botonesEditar = document.querySelectorAll('.editar');
        botonesEditar.forEach(function (boton) {
            boton.addEventListener('click', function () {
                const indice = this.dataset.indice;
                // Obtener el alumno correspondiente al índice seleccionado
                const alumnos = JSON.parse(localStorage.getItem('alumnos'));
                const alumno = alumnos[indice];

                // Preparar el modal de edición
                const modalEdicion = document.querySelector('#modal-edicion');
                const formEdicion = modalEdicion.querySelector('#form-edicion');
                const nombresEdicion = formEdicion.querySelector('#nombres-edicion');
                const fechaNacimientoEdicion = formEdicion.querySelector('#fecha-nacimiento-edicion');
                const nacionalidadEdicion = formEdicion.querySelector('#nacionalidad-edicion');
                const correoEdicion = formEdicion.querySelector('#correo-edicion');
                const telefonoEdicion = formEdicion.querySelector('#telefono-edicion');
                const direccionEdicion = formEdicion.querySelector('#direccion-edicion');
                const ciudadEdicion = formEdicion.querySelector('#ciudad-edicion');
                const estadoEdicion = formEdicion.querySelector('#estado-edicion');
                const paisEdicion = formEdicion.querySelector('#pais-edicion');
                const nivelEdicion = formEdicion.querySelector('#nivel-edicion');
                const comentarioEdicion = formEdicion.querySelector('#comentario-edicion');

                nombresEdicion.value = alumno.nombres;
                fechaNacimientoEdicion.value = alumno.fechaNacimiento;
                nacionalidadEdicion.value = alumno.nacionalidad;
                correoEdicion.value = alumno.correo;
                telefonoEdicion.value = alumno.telefono;
                direccionEdicion.value = alumno.direccion;
                ciudadEdicion.value = alumno.ciudad;
                estadoEdicion.value = alumno.estado;
                paisEdicion.value = alumno.pais;
                nivelEdicion.value = alumno.nivel;
                comentarioEdicion.value = alumno.comentario;

                // Escuchar el evento submit del formulario de edición
                formularioEditar.addEventListener('submit', async function (evento) {
                    evento.preventDefault();

                    // Capturar los datos del formulario de edición
                    const nombres = document.querySelector('#nombresEditar').value.trim();
                    const fechaNacimiento = document.querySelector('#fecha-nacimientoEditar').value.trim();
                    const nacionalidad = document.querySelector('#nacionalidadEditar').value.trim();
                    const correo = document.querySelector('#correoEditar').value.trim();
                    const telefono = document.querySelector('#telefonoEditar').value.trim();
                    const direccion = document.querySelector('#direccionEditar').value.trim();
                    const ciudad = document.querySelector('#ciudadEditar').value.trim();
                    const estado = document.querySelector('#estadoEditar').value.trim();
                    const pais = document.querySelector('#paisEditar').value.trim();
                    const nivel = document.querySelector('#nivelEditar').value.trim();
                    const comentario = document.querySelector('#comentarioEditar').value.trim();

                    // Validar los datos del formulario de edición
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

                    // Validar Correo usuario @ y dominio
                    const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
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
                    // Consumir la API de países para validar la nacionalidad
                    const urlPais = 'https://restcountries.com/v2/name/${nacionalidad}';
                    const responsePais = await fetch(urlPais);
                    const dataPais = await responsePais.json();
                    if (dataPais.status === 404) {
                        // alerta usando toastify js
                        Toastify({
                            text: 'Por favor ingrese una nacionalidad válida.',
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

                    // Actualizar los datos del alumno
                    alumnos[indice].nombres = nombres;
                    alumnos[indice].fechaNacimiento = fechaNacimiento;
                    alumnos[indice].nacionalidad = nacionalidad;
                    alumnos[indice].correo = correo;
                    alumnos[indice].telefono = telefono;
                    alumnos[indice].direccion = direccion;
                    alumnos[indice].ciudad = ciudad;
                    alumnos[indice].estado = estado;
                    alumnos[indice].pais = pais;
                    alumnos[indice].nivel = nivel;
                    alumnos[indice].comentario = comentario;

                    // Guardar el objeto alumno en Local Storage
                    localStorage.setItem('alumnos', JSON.stringify(alumnos));

                    // Llamar a mostrarAlumnos() para actualizar la tabla
                    mostrarAlumnos();

                    // Notificación de que se actualizaron los datos del alumno usando sweet
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Los datos del alumno han sido actualizados correctamente.',
                        showConfirmButton: false,
                        timer: 2000
                    })

                    // Cerrar el modal de edición
                    $('#editarAlumno').modal('hide');
                });

                // Función para mostrar el formulario de edición con los datos del alumno a editar
                function mostrarFormularioEdicion(indice) {
                    const alumnos = JSON.parse(localStorage.getItem('alumnos'));
                    const alumno = alumnos[indice];
                    const modalEdicion = document.querySelector('#editarAlumno');

                    // Rellenar el formulario con los datos del alumno a editar
                    modal.querySelector('#editar-nombres').value = alumno.nombres;
                    modal.querySelector('#editar-fecha-nacimiento').value = alumno.fechaNacimiento;
                    modal.querySelector('#editar-nacionalidad').value = alumno.nacionalidad;
                    modal.querySelector('#editar-correo').value = alumno.correo;
                    modal.querySelector('#editar-telefono').value = alumno.telefono;
                    modal.querySelector('#editar-direccion').value = alumno.direccion;
                    modal.querySelector('#editar-ciudad').value = alumno.ciudad;
                    modal.querySelector('#editar-estado').value = alumno.estado;
                    modal.querySelector('#editar-pais').value = alumno.pais;
                    modal.querySelector('#editar-nivel').value = alumno.nivel;
                    modal.querySelector('#editar-comentario').value = alumno.comentario;

                    // Agregar el atributo data-indice al botón de guardar para identificar al alumno a editar
                    modal.querySelector('#editar-guardar').setAttribute('data-indice', indice);
                    // Mostrar el modal de edición
                    const modal = new bootstrap.Modal(document.querySelector('#modal-edicion'));
                    modal.show();

                    // Escuchar el evento submit del formulario de edición
                    const formularioEdicion = document.querySelector('#formulario-edicion');
                    formularioEdicion.addEventListener('submit', async function (evento) {
                        evento.preventDefault();

                        // Capturar los datos del formulario de edición
                        const nuevosNombres = modalNombres.value.trim();
                        const nuevaFechaNacimiento = modalFechaNacimiento.value.trim();
                        const nuevaNacionalidad = modalNacionalidad.value.trim();
                        const nuevoCorreo = modalCorreo.value.trim();
                        const nuevoTelefono = modalTelefono.value.trim();
                        const nuevaDireccion = modalDireccion.value.trim();
                        const nuevaCiudad = modalCiudad.value.trim();
                        const nuevoEstado = modalEstado.value.trim();
                        const nuevoPais = modalPais.value.trim();
                        const nuevoNivel = modalNivel.value.trim();
                        const nuevoComentario = modalComentario.value.trim();

                        // Validar los datos del formulario de edición
                        if (nuevosNombres === '' || nuevaFechaNacimiento === '' || nuevaNacionalidad === '' || nuevoCorreo === '' || nuevoTelefono === '' || nuevaDireccion === '' || nuevaCiudad === '' || nuevoEstado === '' || nuevoPais === '' || nuevoNivel === '') {
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
                            // Validar los datos del formulario de edición
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

                            // Validar Correo usuario @ y dominio
                            const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2, 4}$/;
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

                            // Consumir la API de países para validar la nacionalidad
                            const url = 'https://restcountries.com/v2/name/${nacionalidad}';
                            const response = await fetch(url);
                            const data = await response.json();
                            if (data.status === 404) {
                                // alerta usando toastify js
                                Toastify({
                                    text: 'Por favor ingrese una nacionalidad válida.',
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

                            // Actualizar el objeto alumno en Local Storage
                            const alumnos = JSON.parse(localStorage.getItem('alumnos'));
                            alumnos[indice] = alumno;
                            localStorage.setItem('alumnos', JSON.stringify(alumnos));

                            // Llamar a mostrarAlumnos() para actualizar la tabla
                            mostrarAlumnos();
                        }
                    });
                }
            });
        })
    }
};
