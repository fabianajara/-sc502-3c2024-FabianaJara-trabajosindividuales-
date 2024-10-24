// Arreglo de objetos con información de estudiantes
const estudiantes = [
    { nombre: 'Juan', apellido: 'Pérez', nota: 85 },
    { nombre: 'Ana', apellido: 'Gómez', nota: 92 },
    { nombre: 'Luis', apellido: 'Martínez', nota: 78 },
    { nombre: 'María', apellido: 'Rodríguez', nota: 88 },
    { nombre: 'Carlos', apellido: 'Hernández', nota: 95 }
];

// Función para mostrar los estudiantes y calcular el promedio
function mostrarEstudiantes() {
    const resultadoDiv = document.getElementById('resultado');
    let contenido = '';
    let sumaNotas = 0;

    // Recorrer el arreglo de estudiantes
    estudiantes.forEach(estudiante => {
        contenido += `${estudiante.nombre} ${estudiante.apellido}<br>`;
        sumaNotas += estudiante.nota;
    });

    // Calcular el promedio
    const promedio = sumaNotas / estudiantes.length;

    // Mostrar los nombres y apellidos en el div
    resultadoDiv.innerHTML = contenido + `<strong>Promedio de notas: ${promedio.toFixed(2)}</strong>`;
}

// Llamar a la función para mostrar los estudiantes
mostrarEstudiantes();