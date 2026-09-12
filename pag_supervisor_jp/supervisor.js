const formularioSupervisor = document.getElementById("sup-formulario");

const codigoLote = document.getElementById("sup-lote");
const lineaProduccion = document.getElementById("sup-linea");

const errorLote = document.getElementById("sup-error-lote");
const errorLinea = document.getElementById("sup-error-linea");

const resultado = document.getElementById("sup-resultado");
const resultadoCodigo = document.getElementById("sup-resultado-codigo");
const resultadoLinea = document.getElementById("sup-resultado-linea");

formularioSupervisor.addEventListener("submit", function(event) {

    event.preventDefault();

    errorLote.textContent = "";
    errorLinea.textContent = "";

    let formularioValido = true;

if (codigoLote.value === "") {
    errorLote.textContent = "Debe ingresar el codigo del lote";
    formularioValido = false;
} else if (!codigoLote.value.toUpperCase().startsWith("LOT-")) {
    errorLote.textContent = "El codigo debe comenzar con LOT-";
    formularioValido = false;
}

    if (lineaProduccion.value === "") {
        errorLinea.textContent = "Debe seleccionar una linea de produccion";
        formularioValido = false;
    }

   if (formularioValido === true) {

    resultadoCodigo.textContent = codigoLote.value;
    resultadoLinea.textContent = lineaProduccion.options[lineaProduccion.selectedIndex].text;

    resultado.style.display = "block";

}

});