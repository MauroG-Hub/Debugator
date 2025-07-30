 const API_BASE_URL = 'https://reporter-4k2k.onrender.com'

function ReadDatabase(SelectedCustomer) {
    let DataRead = {
        SolicitadoPor: "Juan Dominguez",
        Codigo: "1234",
        Equipo: "Llenadora",
        Ubicacion: "Fraccionamiento 4",
        Ciudad: "El salto",
        Cliente: "Integrated Macro Mobility",
        Seccion: "B",
        PersonaContacto: "Juan Perez",
        Cargo: "Ingeniero",
        Direccion: "Calle Norte 123",
        Telefono: "666 29 6",
    };

    return DataRead;
}

function ReadListOfcustomer() {
    let SelectedCustomer = 0;
    return SelectedCustomer;
}


async function enviarConsulta(token) {
    const sql = `
        SELECT SCHEMA_NAME 
        FROM INFORMATION_SCHEMA.SCHEMATA 
        WHERE SCHEMA_NAME NOT IN ('information_schema', 'mysql', 'performance_schema', 'sys');
    `;

    // IMPORTANTE: Verifica estas dos cosas:
    const ENDPOINT_PATH = '/ejecutar_query_prueba'; // 2. ¿Está seguro que es este el path?
    
    // Construye la URL de manera más confiable
    const url = `${API_BASE_URL}/sql${ENDPOINT_PATH}?sql=${encodeURIComponent(sql.trim())}`;

    try {
        
        console.log('Token a usar:', token.slice(0, 10) + '...'); // Muestra solo un fragmento
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // ¡Formato correcto!
                'Content-Type': 'application/json'
            }
        });

        console.log('Status de respuesta:', response.status); // Depuración
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP ${response.status}: ${errorText}`);
        }

        const data = await response.json();
        console.log('Datos recibidos:', JSON.stringify(data, null, 2));
        return data;
    } catch (err) {
        console.error("Error completo:", err);
        throw err; // Propaga el error para manejo superior
    }
}


async function loginYGuardarToken() {
    try {

        // 1. Credenciales exactas (asegúrate que coincidan con tu array USUARIOS)
        const credenciales = {
            username: 'dbu5454213',
            password: 'I,D.E{B}Go2024' // Incluye las comillas y caracteres especiales
        };

        // 2. Petición al endpoint correcto (verifica que sea /sql/login)
        const response = await fetch(`${API_BASE_URL}/sql/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(credenciales)
        });

        // 3. Manejo de errores específicos
        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || 'Credenciales incorrectas');
        }

        // 4. Almacenar token (verifica que la respuesta sea { token: "..." })
        const { token } = await response.json();
        if (!token) throw new Error('No se recibió el token');
      
        localStorage.setItem('token', token);
        return token;

    } catch (error) {
        console.error('Error en login:', error.message);
        localStorage.removeItem('token'); // Limpia token inválido
        alert(`Error de autenticación:\n${error.message}`);
        throw error; // Propaga el error para manejo adicional
    }
}

// Función para verificar token
function tokenExpirado(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.exp < Date.now() / 1000;
  } catch {
    return true; // Si hay error, asumir expirado
  }
}

// Función principal mejorada
async function enviarConsultaConAutenticacion() {
  let token = localStorage.getItem('token');
  // Si no hay token o está expirado, renueva
  if (!token || tokenExpirado(token)) {
    token = await loginYGuardarToken(); // Obliga a nuevo login
  }
  
  return enviarConsulta(token); // Usa el token fresco
}