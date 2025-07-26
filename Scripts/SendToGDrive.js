
let authInProgress = false;

// Función para enviar el PDF Blob a Google Drive vía backend
async function SendtoGdrive(blob) {
  console.log("SendtoGdrive");
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
  console.log("tryUpload");
  const formData = new FormData();
  formData.append('file', blob, 'reporte-servicio.pdf');

  const authToken = localStorage.getItem('drive_token');

  const response = await fetch('https://reporter-4k2k.onrender.com/upload-drive', {
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
  console.log("startAuth");
  return new Promise((resolve, reject) => {
    console.log("NewPromise");
    if (authInProgress) return reject(new Error('Autenticación ya en progreso'));
    authInProgress = true;
    console.log("Auth in progress");
    const frontendOrigin = window.location.origin;

    // 👇 1. Declara authWindow como variable local en el Promise
    const authWindow = window.open(
      `https://reporter-4k2k.onrender.com/auth?state=${encodeURIComponent(frontendOrigin)}`,
      'authPopup',
      'width=500,height=600'
    );
    console.log("antes de recibir mensaje");

    // 👇 2. Asegúrate de que receiveMessage pueda acceder a authWindow
    const receiveMessage = (event) => {
      console.log("🔔 Mensaje recibido:", event.origin, event.data);

      const allowedOrigins = [
        'https://reporter-4k2k.onrender.com',
        'https://debugator.netlify.app',
        'http://localhost'
      ];

      if (!allowedOrigins.includes(event.origin)) {
        console.warn("⚠ Origen no permitido:", event.origin);
        return;
      }

      if (event.data?.type === 'oauth2' && event.data.tokens?.access_token) {
        console.log("✅ Token válido recibido");
        localStorage.setItem('drive_token', event.data.tokens.access_token);
        window.removeEventListener('message', receiveMessage);
        authWindow?.close(); // 👈 Ahora authWindow está definido
        authInProgress = false;
        resolve();
      }
    };

    window.addEventListener('message', receiveMessage);
  });
}