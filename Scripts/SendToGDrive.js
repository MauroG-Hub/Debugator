
let authInProgress = false;

// Función para enviar el PDF Blob a Google Drive vía backend
async function SendtoGdrive(blob) {
  try {
    let result = await tryUpload(blob);

    // Si responde 401 (no autorizado), autenticamos y reintentamos
    if (result.error === 'needs_auth') {
      await startAuth();
      result = await tryUpload(blob);
    }

    console.log('✅ Archivo subido:', result.url);
    return result;
  } catch (error) {
    console.error('Error crítico:', error);
    throw error;
  }
}

// Intento de subida con el token guardado
async function tryUpload(blob) {
  const formData = new FormData();
  formData.append('file', blob, 'reporte-servicio.pdf');

  const authToken = localStorage.getItem('drive_token');

  const response = await fetch('https://reporter-4k2k.onrender.com/upload', {
    method: 'POST',
    headers: authToken ? { 'Authorization': `Bearer ${authToken}` } : {},
    body: formData
  });

  if (response.status === 401) {
    localStorage.removeItem('drive_token');
    throw new Error('Necesita reautenticación');
  }

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText);
  }

  return response.json();
}

// Abre ventana popup para autenticarse y recibir el token via postMessage
async function startAuth() {
  return new Promise((resolve, reject) => {
    if (authInProgress) return reject(new Error('Autenticación ya en progreso'));
    authInProgress = true;

    const authWindow = window.open(
      'https://reporter-4k2k.onrender.com/auth',
      'authPopup',
      'width=500,height=600'
    );

    function receiveMessage(event) {
      //if (event.origin !== 'https://reporter-4k2k.onrender.com') return; // seguridad
      if (event.data.tokens && event.data.tokens.access_token) {
        localStorage.setItem('drive_token', event.data.tokens.access_token);
        window.removeEventListener('message', receiveMessage);
        authWindow.close();
        authInProgress = false;
        resolve();
      }
    }

    window.addEventListener('message', receiveMessage);
  });
}