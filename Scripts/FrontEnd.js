  let contadorFilas = 0;

  function agregarFila() {
    contadorFilas++;
    const tbody = document.getElementById('tablaHoras');
    const fila = document.createElement('tr');

    fila.innerHTML = `
      <td>${contadorFilas}</td>
      <td><input type="date" name="dia${contadorFilas}_fecha" required></td>
      <td><input type="number" name="dia${contadorFilas}_horas" min="0" step="0.5" required></td>
      <td><button type="button" class="boton-glossy boton-rojo" onclick="eliminarFila(this)">Eliminar</button></td>
    `;

    tbody.appendChild(fila);
  }

  function eliminarFila(boton) {
    const fila = boton.closest('tr');
    fila.remove();
    // Opcional: puedes volver a numerar las filas si quieres
  }

  // Agrega la primera fila al cargar la página
  window.onload = agregarFila;
  
  
  
  const canvas = document.getElementById('canvasFirma');
const ctx = canvas.getContext('2d');
let dibujando = false;
let ultimoX = 0;
let ultimoY = 0;

function empezarDibujo(e) {
  dibujando = true;
  const pos = obtenerPosicion(e);
  ultimoX = pos.x;
  ultimoY = pos.y;
}

function dibujar(e) {
  if (!dibujando) return;
  e.preventDefault();
  const pos = obtenerPosicion(e);

  ctx.strokeStyle = '#000000'; // color negro para la firma
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  ctx.beginPath();
  ctx.moveTo(ultimoX, ultimoY);
  ctx.lineTo(pos.x, pos.y);
  ctx.stroke();

  ultimoX = pos.x;
  ultimoY = pos.y;
}

function terminarDibujo() {
  dibujando = false;
}

// Obtener posición del cursor o toque relativa al canvas
function obtenerPosicion(e) {
  const rect = canvas.getBoundingClientRect();
  if (e.touches) {
    return {
      x: e.touches[0].clientX - rect.left,
      y: e.touches[0].clientY - rect.top
    };
  } else {
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }
}

// Limpiar el canvas
document.getElementById('limpiarFirma').addEventListener('click', () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById('firmaData').value = '';
});

// Eventos mouse
canvas.addEventListener('mousedown', empezarDibujo);
canvas.addEventListener('mousemove', dibujar);
canvas.addEventListener('mouseup', terminarDibujo);
canvas.addEventListener('mouseout', terminarDibujo);

// Eventos touch
canvas.addEventListener('touchstart', empezarDibujo);
canvas.addEventListener('touchmove', dibujar);
canvas.addEventListener('touchend', terminarDibujo);
canvas.addEventListener('touchcancel', terminarDibujo);

// Al enviar el formulario, guarda la imagen de la firma en un campo oculto
document.getElementById('serviceReport').addEventListener('submit', function(e) {
  const firmaDataURL = canvas.toDataURL();
  document.getElementById('firmaData').value = firmaDataURL;
  // Aquí puedes enviar la imagen base64 al backend o hacer lo que necesites con ella
});
