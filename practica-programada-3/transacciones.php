<?php
// Inicializar el arreglo de transacciones
$transacciones = [];

// Función para registrar una nueva transacción
function registrarTransaccion($id, $descripcion, $monto)
{
    global $transacciones;
    $transaccion = [
        'id' => $id,
        'descripcion' => $descripcion,
        'monto' => $monto
    ];
    array_push($transacciones, $transaccion);
}

// Función para generar el estado de cuenta
function generarEstadoDeCuenta()
{
    global $transacciones;

    // Inicializar variables
    $montoTotalContado = 0;

    // Calcular monto total de contado
    foreach ($transacciones as $transaccion) {
        $montoTotalContado += $transaccion['monto'];
    }

    // Calcular monto total con interés del 2.6%
    $interes = 0.026 * $montoTotalContado;
    $montoConInteres = $montoTotalContado + $interes;

    // Calcular cash back del 0.1%
    $cashBack = 0.001 * $montoTotalContado;

    // Calcular monto final a pagar
    $montoFinal = $montoConInteres - $cashBack;

    // Mostrar detalles en pantalla
    echo "Estado de Cuenta:\n";
    foreach ($transacciones as $transaccion) {
        echo "ID: {$transaccion['id']}, Descripción: {$transaccion['descripcion']}, Monto: {$transaccion['monto']}\n";
    }

    echo "Monto Total de Contado: {$montoTotalContado}\n";
    echo "Monto Total con Interés: {$montoConInteres}\n";
    echo "Cash Back: {$cashBack}\n";
    echo "Monto Final a Pagar: {$montoFinal}\n";

    // Generar archivo de texto
    $estadoCuenta = "Estado de Cuenta:\n";
    foreach ($transacciones as $transaccion) {
        $estadoCuenta .= "ID: {$transaccion['id']}, Descripción: {$transaccion['descripcion']}, Monto: {$transaccion['monto']}\n";
    }

    $estadoCuenta .= "Monto Total de Contado: {$montoTotalContado}\n";
    $estadoCuenta .= "Monto Total con Interés: {$montoConInteres}\n";
    $estadoCuenta .= "Cash Back: {$cashBack}\n";
    $estadoCuenta .= "Monto Final a Pagar: {$montoFinal}\n";

    file_put_contents('estado_cuenta.txt', $estadoCuenta);
}

// Simulación de Transacciones
registrarTransaccion(1, 'Compra en Supermercado', 150.00);
registrarTransaccion(2, 'Pago de Servicios', 75.00);
registrarTransaccion(3, 'Compra en Electrónica', 200.00);

// Generar y mostrar el estado de cuenta
generarEstadoDeCuenta();
?>