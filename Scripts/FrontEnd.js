

document.getElementById("tablaHoras").addEventListener("input", function () {
  const contenedor = document.querySelector(".tabla-contenedor");
  contenedor.scrollLeft = 0; // vuelve al inicio si se expandió
});




  function verificarOtro() {
    const selector = document.getElementById('tipoServicio');
    const campo = document.getElementById('campoEspecifique');
    const texto = document.getElementById('especifique');

    if (selector.value === "Otro") {
      campo.style.display = "block";
      texto.setAttribute("required", "required");
    } else {
      campo.style.display = "none";
      texto.removeAttribute("required");
      texto.value = ""; // opcional: limpiar el campo si no se usa
    }
  }

