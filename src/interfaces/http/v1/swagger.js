import path from 'path';
import swaggerUi from 'swagger-ui-express'; // Importar swagger-ui-express
import { fileURLToPath } from 'url';
import YAML from 'yamljs'; // Importar yamljs
import { config } from '../../../config/config.js';

// Cargar el archivo YAML que contiene la definición de la API
// Esto es para obtener __dirname con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ruta absoluta al archivo YAML
const swaggerPath = path.resolve(__dirname, './docs/api.docs.yaml');
const swaggerDocument = YAML.load(swaggerPath);
// console.log(swaggerDocument);
// Función para configurar la documentación de Swagger
const swaggerDocs = (app, port) => {
  app.use(
    '/api/v1/docs',
    swaggerUi.serve,
    swaggerUi.setup(swaggerDocument, {
      swaggerOptions: {
        persistAuthorization: true, // 🔐 Importante para que Swagger recuerde el token
      },
    })
  );

  // Endpoint para obtener la documentación en formato JSON
  app.get('/api/v1/docs.json', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerDocument);
  });

  // Log de la URL de la documentación
  console.log(
    `✅ Documentación disponible en: http://${config.domain}/api/v1/docs`
  );
};

// Exportar la función swaggerDocs
export { swaggerDocs };

