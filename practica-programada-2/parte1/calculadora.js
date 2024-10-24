function calcularDeducciones() {
    const salarioBruto = parseFloat(document.getElementById('salarioBruto').value);
    
    // Cálculo de cargas sociales (10.67%)
    const cargasSociales = salarioBruto * 0.1067;

    // Cálculo del impuesto sobre la renta
    let impuestoRenta = 0;
    
    if (salarioBruto > 4783000) {
        impuestoRenta += (salarioBruto - 4783000) * 0.25;
        salarioBruto = 4783000;
    }
    if (salarioBruto > 2392000) {
        impuestoRenta += (salarioBruto - 2392000) * 0.20;
        salarioBruto = 2392000;
    }
    if (salarioBruto > 1363000) {
        impuestoRenta += (salarioBruto - 1363000) * 0.15;
        salarioBruto = 1363000;
    }
    if (salarioBruto > 929000) {
        impuestoRenta += (salarioBruto - 929000) * 0.10;
    }

    // Cálculo del salario neto
    const salarioNeto = parseFloat(document.getElementById('salarioBruto').value) - cargasSociales - impuestoRenta;

    // Mostrar resultados
    document.getElementById('resultado').innerHTML = `
        Cargas Sociales: ₡${cargasSociales.toFixed(2)}<br>
        Impuesto sobre la Renta: ₡${impuestoRenta.toFixed(2)}<br>
        Salario Neto: ₡${salarioNeto.toFixed(2)}
    `;
}