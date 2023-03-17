// El proyecto consiste en simular el proceso de inscripción de alumnos a un Diplomado para certificarse como guía Montessori

// Declaración de variables
let nombreCompleto;
let primerNombre;
let segundoNombre;
let primerApellido;
let segundoApellido;
let edad;
let correo;
let telefono;
let direccion;
let ciudad;
let estado;
let pais;
let nacionalidad;
let codigoPostal;
let fechaNacimiento;
let fechaInscripcion;
let fechaInicio;
let fechaFin;
let nivelElegido;
let costo;
let pago;
let pagoTotal;
let pagoRestante;

// Capturar el nombre del alumno usando el método trim para eliminar los espacios en blanco
let nombres = prompt("Ingrese el nombre completo del alumno: ").trim();

// Validar que el usuario haya ingresado al menos un nombre usando el ciclo while
while (!nombres || nombres.split(" ").length < 1) {
    nombres = prompt("Debe ingresar al menos un nombre. Ingrese el nombre completo del alumno: ").trim();
}

// Capturar el nombre del alumno usando el método split() y convertirlo para que esté en minúsculas
let partesNombre = nombres.split(" ");
primerNombre = partesNombre[0].toLowerCase();
segundoNombre = partesNombre.length > 1 ? partesNombre[1].toLowerCase() : null;
primerApellido = partesNombre.length > 2 ? partesNombre[2].toLowerCase() : null;
segundoApellido = partesNombre.length > 3 ? partesNombre.slice(3).join(" ").toLowerCase() : null;

console.log("Nombre completo del alumno:", nombres);

// Capturar la fecha de nacimiento del alumno y validar que lo haya hecho en el formato pedido
// Se declara la variable en false para iniciar el ciclo while
let fechaValida = false;

while (!fechaValida) {
    fechaNacimiento = prompt("Ingrese la fecha de nacimiento (dd/mm/aaaa): ");
    if (/^(\d{2})\/(\d{2})\/(\d{4})$/.test(fechaNacimiento)) {
        // se divide la fecha con split para calcular su edad
        let partesFecha = fechaNacimiento.split("/");
        let fechaNac = new Date(partesFecha[2], partesFecha[1] - 1, partesFecha[0]);
        edad = calcularEdad(fechaNac);
        fechaValida = true;
    } else {
        alert("El formato de la fecha es inválido, debe ser (dd/mm/aaaa)");
    }
}

console.log("Fecha de nacimiento del alumno:", fechaNacimiento);

// Función para calcular la edad usando objeto Math
function calcularEdad(fechaNac) {
    let diff_ms = Date.now() - fechaNac.getTime();
    let age_dt = new Date(diff_ms);
    return Math.abs(age_dt.getUTCFullYear() - 1970);
}

console.log("Edad del alumno:", edad);

// Capturar nacionalidad del alumno
nacionalidad = prompt("Ingrese la nacionalidad del alumno: ");

console.log("Nacionalidad del alumno:", nacionalidad);

// Capturar correo electrónico del alumno
let correoValido = false;
while (!correoValido) {
    correo = prompt("Ingrese el correo electrónico del alumno: ");
    // Validar que el formato sea válido (usuario, @ y dominio)
    if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(correo)) {
        correoValido = true;
    } else {
        alert("El correo electrónico ingresado no es válido.");
    }
}

console.log("Correo electrónico del alumno:", correo);

// Capturar teléfono del alumno validando que sean solo números y no acepte más de 10 dígitos
let telefonoValido = false;
while (!telefonoValido) {
    telefono = prompt("Ingrese el número de teléfono del alumno (10 dígitos): ");
    if (/^\d{10}$/.test(telefono)) {
        telefonoValido = true;
    } else {
        alert("El número de teléfono ingresado no es válido.");
    }
}

console.log("Teléfono del alumno:", telefono);

// Capturar dirección del alumno
direccion = prompt("Ingrese la dirección del alumno: ");

// Capturar ciudad del alumno
ciudad = prompt("Ingrese la ciudad del alumno: ");

// Capturar estado del alumno
estado = prompt("Ingrese el estado del alumno: ");

// Capturar país del alumno
pais = prompt("Ingrese el país del alumno: ");

// Capturar código postal del alumno, validando que solo sean números
let codigoPostalValido = false;
while (!codigoPostalValido) {
    codigoPostal = prompt("Ingrese el código postal del alumno: ");
    if (!isNaN(codigoPostal)) {
        codigoPostalValido = true;
    } else {
        alert("El código postal ingresado no es válido.");
    }
}

console.log("Dirección del alumno:", direccion, ciudad, codigoPostal, estado, pais);

// Capturar fecha de inscripción del alumno
fechaInscripcion = new Date();

console.log("Fecha de inscripción del alumno:", fechaInscripcion.toLocaleDateString());

//Array de los niveles a los que puede inscribirse
let niveles = ["(1) Nido & Comunidad Infantil", "(2) Casa de Niños", "(3) Taller 1 & 2"];

// Usando el método join para mostrar los niveles en el navegador
alert("Elige uno de los niveles disponibles:\n\n" + niveles.join("\n"));

// validar que solo acepte números que correspondan a un nivel existente
// Se declara la variable en false para iniciar el ciclo while
let nivelValido = false;
while (!nivelValido) {
    nivelElegido = prompt("Ingrese el número del nivel al que desea inscribirse: ");
    if (nivelElegido >= 1 && nivelElegido <= niveles.length) {
        nivelValido = true;
    } else {
        alert(`Debe ingresar un número entre 1 y ${niveles.length}.`);
    }
}

// Seleccionar el nivel elegido
let nivelInscripcion = niveles[nivelElegido - 1];
alert(`El alumno se ha inscrito en el nivel ${nivelInscripcion}`);


// Capturar fecha de inicio del diplomado
fechaInicio = new Date();

// Capturar fecha de fin del diplomado
fechaFin = new Date();
fechaFin.setMonth(fechaFin.getMonth() + 6);

console.log("Fecha de inicio del diplomado:", fechaInicio.toLocaleDateString());

console.log("Fecha de fin del diplomado:", fechaFin.toLocaleDateString());

// Capturar costo del diplomado
costo = 5000;

console.log("Costo del diplomado:", costo);

// Capturar pago del alumno
let pagoValido = false;
while (!pagoValido) {
    pago = prompt("Ingrese el pago del alumno: ");
    if (!isNaN(pago)) {
        pagoValido = true;
    } else {
        alert("El pago ingresado no es válido.");
    }
}

console.log("Pago del alumno:", pago);

// Calcular el pago total del alumno
pagoTotal = pago * 6;

console.log("Pago total del alumno:", pagoTotal);

// Calcular el pago restante del alumno
pagoRestante = pagoTotal - pago;

console.log("Pago restante del alumno:", pagoRestante);

// Mostrar los datos del alumno en el navegador
alert(`Nombre del alumno: ${nombres}
Fecha de nacimiento: ${fechaNacimiento}
Edad: ${edad}
Nacionalidad: ${nacionalidad}
Correo electrónico: ${correo}
Teléfono: ${telefono}
Dirección: ${direccion}, ${ciudad}, ${codigoPostal}, ${estado}, ${pais}
Fecha de inscripción: ${fechaInscripcion.toLocaleDateString()}
Nivel de inscripción: ${nivelInscripcion}
Fecha de inicio del diplomado: ${fechaInicio.toLocaleDateString()}
Fecha de fin del diplomado: ${fechaFin.toLocaleDateString()}
Costo del diplomado: ${costo}
Pago del alumno: ${pago}
Pago total del alumno: ${pagoTotal}
Pago restante del alumno: ${pagoRestante}`);

// Mostrar los datos del alumno en la consola
console.log(`Nombre del alumno: ${nombres}
Fecha de nacimiento: ${fechaNacimiento}
Edad: ${edad}
Nacionalidad: ${nacionalidad}
Correo electrónico: ${correo}
Teléfono: ${telefono}
Dirección: ${direccion}, ${ciudad}, ${codigoPostal}, ${estado}, ${pais}
Fecha de inscripción: ${fechaInscripcion.toLocaleDateString()}
Nivel de inscripción: ${nivelInscripcion}
Fecha de inicio del diplomado: ${fechaInicio.toLocaleDateString()}
Fecha de fin del diplomado: ${fechaFin.toLocaleDateString()}
Costo del diplomado: ${costo}
Pago del alumno: ${pago}
Pago total del alumno: ${pagoTotal}
Pago restante del alumno: ${pagoRestante}`);

// Dar la bienvenida al diplomado al alumno y dirigirlo a la página para que pueda empezar a tomarlo
alert(`${nombres}, bienvenido al diplomado para certificarte como Guía Montessori en el nivel ${nivelInscripcion} otorgado por la Asociación Montessori de México`);
window.location.href = "https://www.certificacionmontessori.com";
