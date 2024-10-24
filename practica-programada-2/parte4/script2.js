function verificarEdad() {
    const edad = parseInt(document.getElementById('edad').value);
    const resultado = document.getElementById('resultado');

    if (isNaN(edad)) {
        resultado.innerHTML = 'Por favor, ingresa una edad válida.';
    } else if (edad >= 18) {
        resultado.innerHTML = 'Eres mayor de edad.';
    } else {
        resultado.innerHTML = 'Eres menor de edad.';
    }
}