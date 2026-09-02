$(document).ready(function () {
    // Inicialización de variables y configuración inicial
    const formatearFecha = () => {
        const hoy = new Date();
        const dia = String(hoy.getDate()).padStart(2, '0');
        const mes = String(hoy.getMonth() + 1).padStart(2, '0');
        const anio = hoy.getFullYear();
        return `${anio}-${mes}-${dia}`;
    };

    // Establecer fecha actual en el input
    $("#inicio_pago").val(formatearFecha());

    // Validación de campos numéricos
    function validarCampoNumerico(selector, mensaje, permitirCero = false) {
        $(selector).on("input", function() {
            const valor = parseFloat($(this).val());
            if (permitirCero) {
                if (valor < 0) {
                    alert(mensaje);
                    $(this).val("");
                }
            } else {
                if (valor <= 0) {
                    alert(mensaje);
                    $(this).val("");
                }
            }
        });
    }

    // Aplicar validaciones a campos numéricos
    validarCampoNumerico("#monto", "El monto debe ser mayor a 0");
    validarCampoNumerico("#inicial", "El inicial no puede ser menor a 0", true); // Permitir cero
    validarCampoNumerico("#plazo", "El plazo debe ser mayor a 0");

    function customRound(num) {
        const parteEntera = Math.floor(num);
        const parteDecimal = num - parteEntera;
        return parteDecimal >= 0.35 ? parteEntera + 1 : parteEntera;
    }

    // Función para calcular el inicial sugerido
    function calcularInicialSugerido() {
        const monto = parseFloat($("#monto").val()) || 0;
        const inicial = parseFloat($("#inicial").val()) || 0;
        const plazo = parseInt($("#plazo").val()) || 1;
        const interes = parseFloat($("#interes").val()) || 0;

        if (monto > 0 && plazo > 0 && inicial < monto) {
            // Calcular la deuda a financiar
            const deuda = monto - inicial;
            
            // Calcular el interés total acumulado
            const montoInteres = customRound(deuda * (interes / 100));
            
            // Calcular monto total de deuda con interés
            const montoDeuda = deuda + (montoInteres * plazo);
            
            // Calcular cuota base
            const cuotaBase = montoDeuda / plazo;
            
            // Calcular inicial sugerido
            // isug = (parte decimal de cuota base * plazo) + inicial
            const parteDecimal = ((cuotaBase - Math.floor(cuotaBase)).toFixed(2));
            const inicialSugerido = (parseFloat(parteDecimal) * plazo) + inicial;
            
            $("#inicial_sugerido").val(inicialSugerido.toFixed(0));
        } else {
            $("#inicial_sugerido").val("");
        }
    }

    // Agregar listeners para actualizar el inicial sugerido
    $("#monto, #inicial, #plazo, #interes").on("input change", function() {
        calcularInicialSugerido();
    });

    // Calcular inicial sugerido al cambiar la forma de pago (afecta el interés)
    $("#forma_pago").change(function () {
        asignarInteres();
        calcularInicialSugerido();
    });

    // Validación de fecha de inicio
    $("#inicio_pago").on("change", function() {
        const selectedDate = new Date($(this).val());
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {
            alert("La fecha de inicio no puede ser anterior a hoy");
            $(this).val(formatearFecha());
        }
    });

    function asignarInteres() {
        const tasasInteres = {
            diario: 0.3,
            semanal: 2.5,
            quincenal: 5,
            mensual: 10
        };
        
        const formaPago = $("#forma_pago").val();
        const interes = tasasInteres[formaPago] || 0;
        $("#interes").val(interes);
    }

    // Prevenir envío tradicional del formulario
    $("#formulario").on("submit", function (e) {
        e.preventDefault();
    });

    // Evento para generar el cronograma
    $("#btnGenerar").click(function () {
        generarCronograma();
    });

    function validarFormulario() {
        const campos = ['forma_pago', 'inicio_pago', 'monto', 'inicial', 'plazo', 'interes'];
        for (const campo of campos) {
            const valor = $(`#${campo}`).val();
            if (!valor || (typeof valor === 'string' && !valor.trim())) {
                alert(`El campo ${campo.replace('_', ' ')} es obligatorio`);
                return false;
            }
        }
        return true;
    }

    function calcularFechaVencimiento(fechaBase, formaPago) {
        const fecha = new Date(fechaBase);
        const incrementos = {
            diario: { dias: 1 },
            semanal: { dias: 7 },
            quincenal: { dias: 15 },
            mensual: { meses: 1 }
        };

        const incremento = incrementos[formaPago];
        if (incremento.dias) {
            fecha.setDate(fecha.getDate() + incremento.dias);
        } else if (incremento.meses) {
            fecha.setMonth(fecha.getMonth() + incremento.meses);
        }

        return fecha;
    }

    function formatDate(date) {
        const d = String(date.getDate()).padStart(2, '0');
        const m = String(date.getMonth() + 1).padStart(2, '0');
        const y = String(date.getFullYear()).slice(-2);
        return `${d}/${m}/${y}`;
    }    

    function generarCronograma() {
        try {
            if (!validarFormulario()) return;
    
            const forma_pago = $("#forma_pago").val();
            const inicio_pago = $("#inicio_pago").val();
            const monto = parseFloat($("#monto").val());
            const inicial = parseFloat($("#inicial").val());
            const plazo = parseInt($("#plazo").val());
            const interesPorcentaje = parseFloat($("#interes").val());
    
            // Validar que inicial no sea mayor que monto
            if (inicial >= monto) {
                alert("El inicial no puede ser mayor o igual al monto del préstamo");
                return;
            }
    
            // Validar plazo máximo
            if (plazo > 168) {
                alert("El plazo no puede ser mayor a 6 meses");
                $("#plazo").val(168);
                return;
            }
    
            // Calcular la deuda a financiar
            const deuda = monto - inicial;
    
            // Calcular el interés por cuota (redondeado) y el monto total de la deuda
            const montoInteres = customRound(deuda * (interesPorcentaje / 100));
            const montoDeuda = deuda + (montoInteres * plazo);
    
            // Mantener los dos decimales de la cuota para no perder centavos
            const cuotaBase = montoDeuda / plazo;
            const cuotaRounded = parseFloat(cuotaBase.toFixed(2));
    
            // Calcular el capital por cuota y redondearlo
            const capital = deuda / plazo;
            var capitalRounded = Math.round(capital);
    
            // Inicializar totales
            let totalInteres = 0;
            let totalCapital = 0;
            let totalCuota = 0;
    
            const schedule = [];
            // Crear fecha inicial de pago
            const partes = inicio_pago.split("-");
            let paymentDate = new Date(partes[0], partes[1] - 1, partes[2]);
            paymentDate = calcularFechaVencimiento(paymentDate, forma_pago);
    
            // Crear fragmento para construir el cronograma
            const fragment = document.createDocumentFragment();
            
            for (let i = 1; i <= plazo; i++) {
                // Calcular saldo restante (se asegura de que no sea negativo)
                const saldo = Math.max(0, Math.round(deuda - (capital * i)));
    
                totalInteres += montoInteres;
                totalCapital += capitalRounded;
                totalCuota += cuotaRounded;
    
                const row = {
                    numero: i,
                    vencimiento: formatDate(paymentDate),
                    interes: montoInteres,
                    capital: capitalRounded,
                    cuota: cuotaRounded,
                    saldo: saldo
                };
    
                schedule.push(row);
    
                // Crear fila de la tabla SIN la columna "capital"
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${row.numero}</td>
                    <td>${row.vencimiento}</td>
                    <td>${row.interes.toFixed(2)}</td>
                    <td>${row.cuota.toFixed(2)}</td>
                    <td>${row.saldo.toFixed(2)}</td>
                `;
                fragment.appendChild(tr);
    
                paymentDate = calcularFechaVencimiento(paymentDate, forma_pago);
            }
    
            // Agregar fila de totales SIN la columna "capital"
            const trTotal = document.createElement('tr');
            trTotal.innerHTML = `
                <td colspan="2" style="font-weight: bold; background-color: #d3d3d3;">TOTALES</td>
                <td style="font-weight: bold; background-color: #d3d3d3;">${totalInteres.toFixed(2)}</td>
                <td style="font-weight: bold; background-color: #d3d3d3;">${totalCuota.toFixed(2)}</td>
                <td style="font-weight: bold; background-color: #d3d3d3;"></td>
            `;
            fragment.appendChild(trTotal);
    
            // Actualizar tabla
            const tbody = $("#tblcronograma tbody");
            tbody.empty().append(fragment);
    
        } catch (error) {
            console.error("Error al generar cronograma:", error);
            alert("Ocurrió un error al generar el cronograma. Por favor, verifique los datos ingresados.");
        }
    }    

    
});
