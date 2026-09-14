document.addEventListener('DOMContentLoaded', () => {
   
    const especificacionesProductos = {
        "PR001": [
            { id: "gramaje", nombre: "Gramaje", min: 150, max: 200, unidad: "g/m²" },
            { id: "resistencia", nombre: "Resistencia al Rasgado", min: 20, max: 50, unidad: "N" }
        ],
        "PR003": [
            { id: "gramaje", nombre: "Gramaje", min: 120, max: 160, unidad: "g/m²" },
            { id: "encogimiento", nombre: "Encogimiento", min: 0, max: 5, unidad: "%" }
        ]
    };

    
    const formulario = document.getElementById('formulario_inspeccion_producto');
    const selectProducto = document.getElementById('producto');
    const inputEstado = document.getElementById('estado');
    const contenedorParametros = document.getElementById('parametros-productos');

    
    selectProducto.addEventListener('change', (e) => {
        const codigoProducto = e.target.value;
        contenedorParametros.innerHTML = ''; 
        if (!codigoProducto || !especificacionesProductos[codigoProducto]) {
            contenedorParametros.innerHTML = '<p>Seleccione un producto válido para cargar sus parámetros.</p>';
            return;
        }

       
        especificacionesProductos[codigoProducto].forEach(param => {
            const divParametro = document.createElement('div');
            divParametro.classList.add('parametro-item');

            divParametro.innerHTML = `
                <label for="${param.id}">${param.nombre} (Rango: ${param.min} - ${param.max} ${param.unidad})</label>
                <input 
                    type="number" 
                    id="${param.id}" 
                    name="${param.id}" 
                    step="0.01"
                    placeholder="Ingrese valor medido" 
                    class="input-medicion"
                    data-min="${param.min}"
                    data-max="${param.max}"
                    required
                >
                <span class="msj-error" style="color: red; font-size: 0.85em; display: none;"></span>
            `;

            contenedorParametros.appendChild(divParametro);
        });

        
        agregarEventosValidacion();
    });

    
    function agregarEventosValidacion() {
        const inputsMedicion = document.querySelectorAll('.input-medicion');
        
        inputsMedicion.forEach(input => {
            input.addEventListener('input', () => {
                const valor = parseFloat(input.value);
                const min = parseFloat(input.dataset.min);
                const max = parseFloat(input.dataset.max);
                const msjError = input.nextElementSibling;

                if (isNaN(valor)) {
                    input.style.borderColor = '#ccc';
                    msjError.style.display = 'none';
                    return;
                }

                if (valor < min || valor > max) {
                    input.style.borderColor = '#e74c3c';
                    msjError.textContent = `Fuera de rango (${min} - ${max})`;
                    msjError.style.display = 'block';
                } else {
                    input.style.borderColor = '#2ecc71';
                    msjError.style.display = 'none';
                }
            });
        });
    }

    formulario.addEventListener('submit', (e) => {
        e.preventDefault(); 

        if (!selectProducto.value) {
            alert('Por favor, seleccione un producto antes de iniciar la inspección.');
            return;
        }

        const inputsMedicion = document.querySelectorAll('.input-medicion');
        let formValido = true;
        let esAprobado = true;

        inputsMedicion.forEach(input => {
            const valor = parseFloat(input.value);
            const min = parseFloat(input.dataset.min);
            const max = parseFloat(input.dataset.max);

            if (input.value.trim() === '' || isNaN(valor)) {
                formValido = false;
                input.style.borderColor = '#e74c3c';
            } else if (valor < min || valor > max) {
                esAprobado = false; 
            }
        });

        if (!formValido) {
            alert('Por favor, complete todos los parámetros con valores numéricos válidos.');
            return;
        }

        if (esAprobado) {
            inputEstado.value = 'Aprobado';
            inputEstado.style.backgroundColor = '#d4edda';
            inputEstado.style.color = '#155724';
            alert('Inspección finalizada con éxito: El producto cumple con todos los parámetros de calidad.');
        } else {
            inputEstado.value = 'Rechazado';
            inputEstado.style.backgroundColor = '#f8d7da';
            inputEstado.style.color = '#721c24';
            alert('Inspección finalizada: El producto no cumple con los rangos permitidos de calidad.');
        }
    });
});