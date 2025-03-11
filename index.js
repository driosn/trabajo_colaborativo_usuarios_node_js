// 1.IMPLEMENTAR INICIA REPOSITORIO RESTO EQUIPO CLONAR
// 2.PROBAR CADA RUTA CON DIFERENTES EJEMPLOS
// SCREENSHOTS DE CADA PRUEBA 
// POSTMAN CREANDO COLECCIONES Y DISTINTOS REQUESTS
// 3.COMENTAR CODIGO
//4. SUBIR EL PROYECTO A UN REPOSITORIO GIT 
// Importar Express
const express = require('express');
const app = express();

// Hacer que Express sepa que vamos a recibir y enviar JSON
app.use(express.json());

// Datos de prueba: un arreglo de objetos
let usuarios = [
  { id: 1, nombre: 'Juan', edad: 28 },
  { id: 2, nombre: 'Ana', edad: 22 },
  { id: 3, nombre: 'Luis', edad: 35 }
];
// Endpoint Inicial

app.get('/', (req, res) => {
    res.send('Bienvenido a la API REST con Express.js');
  });

// Endpoint: Obtener todos los usuarios

app.get('/api/usuarios', (req, res) => {
  res.status(200).json(usuarios);
});

// Endpoint: Obtener un usuario por ID

app.get('/api/usuarios/:id', (req, res) => {
    const usuarioId = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === usuarioId);
  if (!usuario) return res.status(404).send('Usuario no encontrado');
  res.status(200).json(usuario);
});

// Endpoint: Crear un nuevo usuario
/**
 * @route POST /api/usuarios
 * @description Crea un nuevo usuario
 * @param {string} nombre - Nombre de usuario
 * @param {number} edad - Edad de usuario
 * @returns {Object} Retorna el usuario creado
 */
app.post('/api/usuarios', (req, res) => {
    //Parameters nombre y edad
    const { nombre, edad } = req.body;
    // Nuevo usuario con los parametros recibidos y un id nuevo
    const nuevoUsuario = {
        id: usuarios.length + 1,
        nombre,
        edad
    };
    // Agregar el nuevo usuario al arreglo de usuarios
    usuarios.push(nuevoUsuario);
    // Enviar el nuevo usuario como respuesta con un status 201 (Created)
    res.status(201).json(nuevoUsuario);
});

// Endpoint: Actualizar un usuario
/**
 * @route PUT /api/usuarios/:id
 * @description Actualizar un usuario por ID
 * @param {number} id - ID del usuario
 * @param {string} [nombre] - Nombre del usuario
 * @param {number} [edad] - Edad del usuario
 * @returns {Object} Objeto de usuario actualizado o 404 si no se encuentra
 */
app.put('/api/usuarios/:id', (req, res) => {
    // Buscar el usuario por ID en el arreglo de usuarios
    const usuario = usuarios.find(u => u.id === parseInt(req.params.id));
    // Si no se encuentra el usuario, enviar un status 404 (Not Found)
    if (!usuario) return res.status(404).send('Usuario no encontrado');

    // Actualizar el usuario con los nuevos datos enviados en el body
    const { nombre, edad } = req.body;
    usuario.nombre = nombre || usuario.nombre;
    usuario.edad = edad || usuario.edad;
    // Enviar el usuario actualizado como respuesta
    res.status(200).json(usuario);
});

// Endpoint: Eliminar un usuario
/**
 * @route DELETE /api/usuarios/:id
 * @description Eliminar un usuario por ID
 * @param {number} id - ID del usuario
 * @returns {string} Mensaje de confirmación o 404 si no se encuentra
 */
app.delete('/api/usuarios/:id', (req, res) => {
    // Buscar el usuario por ID en el arreglo de usuarios
    const usuarioIndex = usuarios.findIndex(u => u.id === parseInt(req.params.id));
    // Si no se encuentra el usuario, enviar un status 404
    if (usuarioIndex === -1) return res.status(404).send('Usuario no encontrado');

    // Eliminar el usuario del arreglo de usuarios
    const usuarioEliminado = usuarios.splice(usuarioIndex, 1);
    // Enviar un mensaje de confirmación
    res.status(200).json('usuarioEliminado');
});

// Configurar el puerto y levantar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});
