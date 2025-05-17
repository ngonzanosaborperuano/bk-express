/**
 * @openapi
 * /api/users:
 *   post:
 *     summary: Crea un nuevo usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fullname
 *               - email
 *               - contrasena
 *               - rol_id
 *             properties:
 *               fullname:
 *                 type: string
 *                 example: Juan Pérez
 *               email:
 *                 type: string
 *                 example: juan.perez@example.com
 *               contrasena:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *               foto:
 *                 type: string
 *                 nullable: true
 *                 example: "https://example.com/fotos/juan.jpg"
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 42
 *       400:
 *         description: Datos inválidos o incompletos
 *       500:
 *         description: Error del servidor
 */
/**
 * @openapi
 * /api/users/login:
 *   post:
 *     summary: Inicia sesión un usuario
 *     tags:
 *       - Usuarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - dato
 *               - password
 *             properties:
 *               dato:
 *                 type: string
 *                 description: Correo electrónico del usuario
 *               password:
 *                 type: string
 *                 format: password
 *           example:
 *             {
 *               "dato": "juan.perez@example.com",
 *               "password": "123456"
 *             }
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 usuario:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 42
 *                     fullname:
 *                       type: string
 *                       example: Juan Pérez
 *                     email:
 *                       type: string
 *                       example: juan.perez@example.com
 *                     rol_id:
 *                       type: integer
 *                       example: 1
 *       400:
 *         description: Credenciales inválidas o faltantes
 *       500:
 *         description: Error del servidor
 */
