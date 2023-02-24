// Código final se aplicaron funciones, constantes, condiciones y ciclos
function ingresarDatos(mensaje) {
    const dato = prompt(mensaje);
    console.log(dato);
    return dato;
}

let datosCorrectos = false;
let primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno;

do {
    // Pedir los nombres y apellidos y aplicar formato para que solo la primer letra de cada ingreso esté en mayúscula
    primerNombre = ingresarDatos("Ingresa tu primer nombre");
    const primeraLetraMayusculaPrimerNombre = primerNombre.charAt(0).toUpperCase();
    const restoPrimerNombre = primerNombre.slice(1).toLowerCase();
    primerNombre = primeraLetraMayusculaPrimerNombre + restoPrimerNombre;

    segundoNombre = ingresarDatos("Ingresa tu segundo nombre");
    const primeraLetraMayusculaSegundoNombre = segundoNombre.charAt(0).toUpperCase();
    const restoSegundoNombre = segundoNombre.slice(1).toLowerCase();
    segundoNombre = primeraLetraMayusculaSegundoNombre + restoSegundoNombre;

    apellidoPaterno = ingresarDatos("Ingresa tu apellido paterno");
    const primeraLetraMayusculaApellidoPaterno = apellidoPaterno.charAt(0).toUpperCase();
    const restoApellidoPaterno = apellidoPaterno.slice(1).toLowerCase();
    apellidoPaterno = primeraLetraMayusculaApellidoPaterno + restoApellidoPaterno;

    apellidoMaterno = ingresarDatos("Ingresa tu apellido materno");
    const primeraLetraMayusculaApellidoMaterno = apellidoMaterno.charAt(0).toUpperCase();
    const restoApellidoMaterno = apellidoMaterno.slice(1).toLowerCase();
    apellidoMaterno = primeraLetraMayusculaApellidoMaterno + restoApellidoMaterno;

    // Mostrar los datos ingresados
    const datosIngresados = `Por favor, revisa que los datos ingresados sean correctos:\nTu primer nombre es: ${primerNombre}\nTu segundo nombre es: ${segundoNombre}\nTu apellido paterno es: ${apellidoPaterno}\nTu apellido materno es: ${apellidoMaterno}`;
    alert(datosIngresados);

    // Preguntar si los datos ingresados son correctos
    const confirmacion = confirm("¿Los datos ingresados son correctos?");

    if (confirmacion) {
        datosCorrectos = true;
    }

} while (!datosCorrectos);
// Formatear el nombre completo
const nombreCompleto = `${primerNombre} ${segundoNombre} ${apellidoPaterno} ${apellidoMaterno}`;

// Mostrar el nombre completo con el formato aplicado usando templete literals
const nombreCompletoMensaje = `Se ha registrado tu nombre completo: "${nombreCompleto}" en nuestra base de datos, gracias por registrarte.`;
console.log(nombreCompletoMensaje);
alert(nombreCompletoMensaje);


/*

A continuación se muestra la evolución del código en comentarios:

--- Primer intento ---

let primerNombre = prompt("Ingresa tu primer nombre");
console.log(primerNombre);
let segundoNombre = prompt("Ingresa tu segundo nombre");
console.log(segundoNombre);
let apellidoPaterno = prompt("Ingresa tu apellido paterno");
console.log(apellidoPaterno);
let apellidoMaterno = prompt("Ingresa tu apellido materno");
console.log(apellidoMaterno);
const nombreCompleto = primerNombre + " " + segundoNombre + " " + apellidoPaterno + " " + apellidoMaterno;
console.log("tu nombre completo es: ", nombreCompleto);
alert("Tu nombre completo es: ", nombreCompleto);
*/

/*
--- Segundo intento ---

Se reemplazaron los let por const
Se usó una función para ingresar los datos en lugar de generar una variable cada vez
Se aplicó el formato para que solo la primer letra de cada ingreso esté en mayúscula
Se aplicó el formato para que el nombre completo se muestre con la primer letra de cada palabra en mayúscula
Por más que intenté no pude hacer que reconozca la Ñ en un nombre y lo muestra asi "MuñOz"


// Función para ingresar datos
function ingresarDatos(mensaje) {
    const dato = prompt(mensaje);
    console.log(dato);
    return dato;
}

// Pedir los nombres y apellidos y aplicar formato para que solo la primer letra de cada ingreso esté en mayúscula
const primerNombre = ingresarDatos("Ingresa tu primer nombre");
const primeraLetraMayusculaPrimerNombre = primerNombre.charAt(0).toUpperCase();
const restoPrimerNombre = primerNombre.slice(1).toLowerCase();
const primerNombreMayuscula = primeraLetraMayusculaPrimerNombre + restoPrimerNombre;

const segundoNombre = ingresarDatos("Ingresa tu segundo nombre");
const primeraLetraMayusculaSegundoNombre = segundoNombre.charAt(0).toUpperCase();
const restoSegundoNombre = segundoNombre.slice(1).toLowerCase();
const segundoNombreMayuscula = primeraLetraMayusculaSegundoNombre + restoSegundoNombre;

const apellidoPaterno = ingresarDatos("Ingresa tu apellido paterno");
const primeraLetraMayusculaApellidoPaterno = apellidoPaterno.charAt(0).toUpperCase();
const restoApellidoPaterno = apellidoPaterno.slice(1).toLowerCase();
const apellidoPaternoMayuscula = primeraLetraMayusculaApellidoPaterno + restoApellidoPaterno;

const apellidoMaterno = ingresarDatos("Ingresa tu apellido materno");
const primeraLetraMayusculaApellidoMaterno = apellidoMaterno.charAt(0).toUpperCase();
const restoApellidoMaterno = apellidoMaterno.slice(1).toLowerCase();
const apellidoMaternoMayuscula = primeraLetraMayusculaApellidoMaterno + restoApellidoMaterno;

// Mostrar os datos ingresados con el formato aplicado
console.log(`Tu primer nombre es: ${primerNombreMayuscula}`);
console.log(`Tu segundo nombre es: ${segundoNombreMayuscula}`);
console.log(`Tu apellido paterno es: ${apellidoPaternoMayuscula}`);
console.log(`Tu apellido materno es: ${apellidoMaternoMayuscula}`);

// Formatear el nombre completo
const nombreCompleto = `${primerNombreMayuscula} ${segundoNombreMayuscula} ${apellidoPaternoMayuscula} ${apellidoMaternoMayuscula}`;
const nombreCompletoMayuscilas = nombreCompleto
    .toLowerCase() // convertir todo a minúsculas
    .replace(/\b\w/g, (l) => l.toUpperCase()); // reemplazar el primer caracter de cada palabra por mayúscula, por más que intento no puedo corregir que un dato que tenga Ñ se muestre como se espera

// Mostrar el nombre completo con el formato aplicado
console.log(`Tu nombre completo es: ${nombreCompletoMayuscilas}`);
alert(`Tu nombre completo es: ${nombreCompletoMayuscilas}`);

 */

/*
--- Cuarto Intento ---
Se generó una función para aplicar las mayúsculas


// Función para aplicar el formato de primera letra mayúscula
function formatoMayusculas(texto) {
  return texto.charAt(0).toUpperCase() + texto.slice(1).toLowerCase();
}

// Función para ingresar datos
function ingresarDatos(mensaje) {
    const dato = prompt(mensaje);
    console.log(dato);
    return dato;
}

// Pedir los nombres y apellidos y aplicar el formato
const primerNombre = formatoMayusculas(ingresarDatos("Ingresa tu primer nombre"));
const segundoNombre = formatoMayusculas(ingresarDatos("Ingresa tu segundo nombre"));
const apellidoPaterno = formatoMayusculas(ingresarDatos("Ingresa tu apellido paterno"));
const apellidoMaterno = formatoMayusculas(ingresarDatos("Ingresa tu apellido materno"));

// Mostrar los datos ingresados con el formato aplicado
console.log(`Tu primer nombre es: ${primerNombre}`);
console.log(`Tu segundo nombre es: ${segundoNombre}`);
console.log(`Tu apellido paterno es: ${apellidoPaterno}`);
console.log(`Tu apellido materno es: ${apellidoMaterno}`);

// Formatear el nombre completo
const nombreCompleto = `${primerNombre} ${segundoNombre} ${apellidoPaterno} ${apellidoMaterno}`;
const nombreCompletoMayusculas = nombreCompleto.replace(/\b\w/g, (l) => l.toUpperCase());

// Mostrar el nombre completo con el formato aplicado
console.log(`Tu nombre completo es: ${nombreCompletoMayusculas}`);
alert(`Tu nombre completo es: ${nombreCompletoMayusculas}`);

*/

/*
--- Cuarto intento ---
Se creó una lista map() para aplicar la conversión de mayúsculas a minúsculas a cada nombre, y se unieron los nombres con join() para convertirlos en la cadena que muestre el nombre completo en mayúsculas y así admitir el uso de la Ñ


function ingresarDatos(mensaje) {
  const dato = prompt(mensaje);
  console.log(dato);
  return dato;
}

const primerNombre = ingresarDatos("Ingresa tu primer nombre");
const segundoNombre = ingresarDatos("Ingresa tu segundo nombre");
const apellidoPaterno = ingresarDatos("Ingresa tu apellido paterno");
const apellidoMaterno = ingresarDatos("Ingresa tu apellido materno");

const nombres = [primerNombre, segundoNombre];
const nombreCompleto = [...nombres, apellidoPaterno, apellidoMaterno]
  .map((nombre) => nombre.charAt(0).toUpperCase() + nombre.slice(1).toLowerCase())
  .join(" ");

const nombreCompletoMayusculas = nombreCompleto.toLocaleUpperCase();

console.log(`Tu nombre completo es: ${nombreCompletoMayusculas}`);
alert(`Tu nombre completo es: ${nombreCompletoMayusculas}`);

--------------------------------------------------------------------

 Último intento: Se aplicó un while para validar los datos

// Función para ingresar datos
function ingresarDatos(mensaje) {
    const dato = prompt(mensaje);
    console.log(dato);
    return dato;
}

let datosCorrectos = false;
let primerNombre, segundoNombre, apellidoPaterno, apellidoMaterno;

while (!datosCorrectos) {
    // Pedir los nombres y apellidos y aplicar formato para que solo la primer letra de cada ingreso esté en mayúscula
    primerNombre = ingresarDatos("Ingresa tu primer nombre");
    const primeraLetraMayusculaPrimerNombre = primerNombre.charAt(0).toUpperCase();
    const restoPrimerNombre = primerNombre.slice(1).toLowerCase();
    primerNombre = primeraLetraMayusculaPrimerNombre + restoPrimerNombre;

    segundoNombre = ingresarDatos("Ingresa tu segundo nombre");
    const primeraLetraMayusculaSegundoNombre = segundoNombre.charAt(0).toUpperCase();
    const restoSegundoNombre = segundoNombre.slice(1).toLowerCase();
    segundoNombre = primeraLetraMayusculaSegundoNombre + restoSegundoNombre;

    apellidoPaterno = ingresarDatos("Ingresa tu apellido paterno");
    const primeraLetraMayusculaApellidoPaterno = apellidoPaterno.charAt(0).toUpperCase();
    const restoApellidoPaterno = apellidoPaterno.slice(1).toLowerCase();
    apellidoPaterno = primeraLetraMayusculaApellidoPaterno + restoApellidoPaterno;

    apellidoMaterno = ingresarDatos("Ingresa tu apellido materno");
    const primeraLetraMayusculaApellidoMaterno = apellidoMaterno.charAt(0).toUpperCase();
    const restoApellidoMaterno = apellidoMaterno.slice(1).toLowerCase();
    apellidoMaterno = primeraLetraMayusculaApellidoMaterno + restoApellidoMaterno;

    // Mostrar los datos ingresados
    const datosIngresados = `Por favor, revisa que los datos ingresados sean correctos:\nTu primer nombre es: ${primerNombre}\nTu segundo nombre es: ${segundoNombre}\nTu apellido paterno es: ${apellidoPaterno}\nTu apellido materno es: ${apellidoMaterno}`;
    alert(datosIngresados);

    const confirmacion = confirm("¿Los datos ingresados son correctos?");

    if (confirmacion) {
        datosCorrectos = true;
    }
}

// Formatear el nombre completo
const nombreCompleto = `${primerNombre} ${segundoNombre} ${apellidoPaterno} ${apellidoMaterno}`;

// Mostrar el nombre completo con el formato aplicado usando templete literals
const nombreCompletoMensaje = `Se ha registrado tu nombre completo: "${nombreCompleto}" en nuestra base de datos, gracias por registrarte.`;
console.log(nombreCompletoMensaje);
alert(nombreCompletoMensaje);

 */