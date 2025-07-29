let contadorFilas = 0;

const innerFilaHTMLOption1 = `
    <td rowspan="2">${contadorFilas}</td>
    <td><input type="date" name="dia${contadorFilas}_fecha" ></td>
    <td><input type="time" name="dia${contadorFilas}_entrada" ></td>
    <td><input type="time" name="dia${contadorFilas}_salida" ></td>
    <td rowspan="2" style="text-align:center; vertical-align: middle;">
      <button type="button" class="boton-glossy boton-rojo boton-pequeño" onclick="eliminarFila(this)">Eliminar</button>
    </td>
  `;

const innerFilaHTMLOption2 = `
   <!-- Fila 1: Número + Fecha + Botón -->
    <tr>
      <td rowspan="4" style="vertical-align: middle; text-align: center; width: 30px;">{{Fila}}</td>
      
      <th style="padding: 8px; width: 80px;">Fecha</th>
      
      <td><input type="date" style="width: 100%; padding: 5px;" name="dia{{Fila}}_fecha"></td>
      
      <td rowspan="4" style="text-align: center; vertical-align: middle; width: 120px; padding: 5px;">
        <button class="boton-glossy boton-rojo" style="white-space: nowrap; padding: 5px 8px;" onclick="eliminarFila(this)">Eliminar día</button>
      </td>
    </tr>
    
    <!-- Fila 2: Entrada -->
    <tr>
      <th style="padding: 8px;">Entrada</th>
      <td><input type="time" style="width: 100%; padding: 5px;" name="dia{{Fila}}_entrada"></td>
    </tr>
    
    <!-- Fila 3: Salida -->
    <tr>
      <th style="padding: 8px;">Salida</th>
      <td><input type="time" style="width: 100%; padding: 5px;" name="dia{{Fila}}_salida"></td>
    </tr>
    
    <!-- Fila 4: Descripción -->
    <tr>
      <td colspan="2" style="padding: 8px;">
        <textarea style="width: 100%; padding: 5px; box-sizing: border-box;" name="dia{{Fila}}_descripcion" rows="2" placeholder="Descripción de actividades..."></textarea>
      </td>
    </tr>
  `;


  const innerfilaDescripcionHTMLOption1 = `
    <td colspan="3">
      <textarea name="dia${contadorFilas}_descripcion" rows="2" placeholder="Descripción de actividades..." style="width: 100%;"></textarea>
    </td>
  `;

  const innerfilaDescripcionHTMLOption2 = `
  <tr>
    <td colspan="3">
      <textarea name="dia${contadorFilas}_descripcion" rows="2" placeholder="Descripción de actividades..." style="width: 100%;"></textarea>
    </td>
    </tr>
  `;

  const tablaHTML = `
    <table>
      <thead>
        <tr>
          <th>#</th>
          <th>Fecha</th>
          <th>Entrada</th>
          <th>Salida</th>
          <th>Acción</th>
        </tr>
      </thead>
      <tbody id="tablaHoras">
        <!-- Las filas se insertan dinámicamente -->
      </tbody>
    </table>
  `;

    const tablaHTML2 = `
   <table border="1" style="border-collapse: collapse; width: 100%;">
  <tbody id="tablaHoras">
    
  </tbody>
</table>
  `;

  
function IncludeTableDates() {
  // Crear el código HTML de la tabla
  const contenedor = document.getElementById('TableDates');
  if (contenedor) {
    contenedor.innerHTML = tablaHTML2;
  }
  agregarFila();
}

function agregarFila() {
  contadorFilas++;

  const tbody = document.getElementById('tablaHoras');


  const formatoSeleccionado = innerFilaHTMLOption2.replace(/{{Fila}}/g, contadorFilas);



  // Agregar fila al cuerpo de la tabla
  tbody.insertAdjacentHTML('beforeend', formatoSeleccionado);
}

function eliminarFila(boton) {
  // Encontrar la fila principal (la que contiene el botón)
  const filaPrincipal = boton.closest('tr');
  const tbody = filaPrincipal.parentNode;
  
  // Obtener todas las filas del tbody
  const todasLasFilas = Array.from(tbody.querySelectorAll('tr'));
  
  // Encontrar el índice de la fila principal
  const indicePrincipal = todasLasFilas.indexOf(filaPrincipal);
  
  // Eliminar las 4 filas relacionadas (fecha, entrada, salida, descripción)
  for (let i = 0; i < 4; i++) {
    if (todasLasFilas[indicePrincipal + i]) {
      todasLasFilas[indicePrincipal + i].remove();
    }
  }
  
  // Renumerar las filas restantes
  renumerarFilas();
  contadorFilas--;
}

function renumerarFilas() {
  const todasLasFilas = document.querySelectorAll('#tablaHoras tr');
  let numeroFila = 1;
  let indice = 0;
  
  while (indice < todasLasFilas.length) {
    const filaActual = todasLasFilas[indice];
    
    // Actualizar el número en la celda con rowspan="4"
    const celdaNumero = filaActual.querySelector('td[rowspan="4"]');
    if (celdaNumero) {
      celdaNumero.textContent = numeroFila++;
      
      // Saltar las siguientes 3 filas (entrada, salida, descripción)
      indice += 4;
    } else {
      indice++;
    }
  }
}

  // Agrega la primera fila al cargar la página
  window.onload = IncludeTableDates();
  
  