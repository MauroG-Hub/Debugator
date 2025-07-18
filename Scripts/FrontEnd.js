let contadorFilas = 0;


function agregarFila() {
  contadorFilas++;

  const tbody = document.getElementById('tablaHoras');

  // Fila principal (con número de fila y botón eliminar)
  const fila = document.createElement('tr');

  fila.innerHTML = `
    <td rowspan="2">${contadorFilas}</td>
    <td><input type="date" name="dia${contadorFilas}_fecha" required></td>
    <td><input type="time" name="dia${contadorFilas}_entrada" required></td>
    <td><input type="time" name="dia${contadorFilas}_salida" required></td>
    <td rowspan="2" style="text-align:center; vertical-align: middle;">
      <button type="button" class="boton-glossy boton-rojo boton-pequeño" onclick="eliminarFila(this)">Eliminar</button>
    </td>
  `;

  // Fila de descripción (solo bajo las columnas de en medio)
  const filaDescripcion = document.createElement('tr');
  filaDescripcion.classList.add('fila-descripcion');

  filaDescripcion.innerHTML = `
    <td colspan="3">
      <textarea name="dia${contadorFilas}_descripcion" rows="2" placeholder="Descripción de actividades..." required style="width: 100%;"></textarea>
    </td>
  `;

  // Agregar ambas filas al cuerpo de la tabla
  tbody.appendChild(fila);
  tbody.appendChild(filaDescripcion);
}




function eliminarFila(boton) {
  const fila = boton.closest('tr');
  const siguienteFila = fila.nextElementSibling;

  // Eliminar la fila principal y la fila de descripción (que está justo después)
  fila.remove();
  if (siguienteFila && siguienteFila.classList.contains('fila-descripcion')) {
    siguienteFila.remove();
  }

  // Renumerar filas con rowspan
  const filas = document.querySelectorAll('#tablaHoras tr');
  let numero = 1;

  for (let i = 0; i < filas.length; i++) {
    const filaActual = filas[i];

    // Si tiene rowspan es una fila principal, renumerar su primer <td>
    const celdaNumero = filaActual.querySelector('td[rowspan="2"]');
    if (celdaNumero) {
      celdaNumero.textContent = numero++;
    }
  }
  contadorFilas--;
}




  // Agrega la primera fila al cargar la página
  window.onload = agregarFila;
  
  
  let canvas, ctx, firmando = false;

function abrirModalFirma() {
  document.getElementById("modalFirma").style.display = "flex";
  canvas = document.getElementById("canvasFirma");
  ctx = canvas.getContext("2d");
  ctx.strokeStyle = "#000";
  ctx.lineWidth = 2;

  canvas.addEventListener("mousedown", comenzarFirma);
  canvas.addEventListener("mousemove", dibujarFirma);
  canvas.addEventListener("mouseup", terminarFirma);
  canvas.addEventListener("mouseout", terminarFirma);

  // Soporte táctil
  canvas.addEventListener("touchstart", comenzarFirmaTouch);
  canvas.addEventListener("touchmove", dibujarFirmaTouch);
  canvas.addEventListener("touchend", terminarFirma);
}

function cerrarModalFirma() {
  document.getElementById("modalFirma").style.display = "none";
  limpiarFirma(); // opcional
}

function comenzarFirma(e) {
  firmando = true;
  ctx.beginPath();
  ctx.moveTo(e.offsetX, e.offsetY);
  e.preventDefault();
}

function dibujarFirma(e) {
  if (!firmando) return;
  ctx.lineTo(e.offsetX, e.offsetY);
  ctx.stroke();
  e.preventDefault();
}

function terminarFirma() {
  firmando = false;
}

function comenzarFirmaTouch(e) {
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  ctx.beginPath();
  ctx.moveTo(touch.clientX - rect.left, touch.clientY - rect.top);
  firmando = true;
  e.preventDefault();
}

function dibujarFirmaTouch(e) {
  if (!firmando) return;
  const rect = canvas.getBoundingClientRect();
  const touch = e.touches[0];
  ctx.lineTo(touch.clientX - rect.left, touch.clientY - rect.top);
  ctx.stroke();
  e.preventDefault();
}

function limpiarFirma() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function guardarFirma() {
  const imagen = canvas.toDataURL("image/png");
  document.getElementById("firmaGuardada").value = imagen;
  cerrarModalFirma();
}

  
// Al enviar el formulario, guarda la imagen de la firma en un campo oculto
document.getElementById('serviceReport').addEventListener('submit', function(e) {
  const firmaDataURL = canvas.toDataURL();
  document.getElementById('firmaData').value = firmaDataURL;
  // Aquí puedes enviar la imagen base64 al backend o hacer lo que necesites con ella
});


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

