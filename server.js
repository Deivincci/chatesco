const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Ruta para servir la página principal
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Configuración de Socket.io
io.on('connection', (socket) => {
  console.log('Un usuario se ha conectado');

  // Manejar mensajes de chat
  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  // Manejar desconexiones
  socket.on('disconnect', () => {
    console.log('Un usuario se ha desconectado');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
