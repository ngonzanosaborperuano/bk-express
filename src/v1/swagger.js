import swaggerUi from 'swagger-ui-express'; // Importar swagger-ui-express
import YAML from 'yamljs'; // Importar yamljs

// Cargar el archivo YAML que contiene la definición de la API
const swaggerDocument = YAML.load('./src/v1/docs/user.docs.yaml');  // Asegúrate de que la ruta es correcta

// Función para configurar la documentación de Swagger
const swaggerDocs = (app, port) => {
  // Configurar el endpoint de Swagger UI
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
    // `Documentación disponible en: http://${process.env.DOMAIN}:${port}/api/v1/docs`
    `Documentación disponible en: https://${process.env.DOMAIN}/api/v1/docs`
  );
};

// Exportar la función swaggerDocs
export { swaggerDocs };
