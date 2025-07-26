

// Función principal para enviar el PDF por correo
async function sendToMail(blob, emailDestinatario, asunto = '', mensaje = '') {
  const formData = new FormData();
  formData.append('file', blob, 'documento.pdf');
  formData.append('email', emailDestinatario);
  
  // Campos opcionales
  if (asunto) formData.append('asunto', asunto);
  if (mensaje) formData.append('mensaje', mensaje);

  const response = await fetch('https://reporter-4k2k.onrender.com/send-email', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Error al enviar correo');
  }

  return await response.json();
}



