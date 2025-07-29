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
