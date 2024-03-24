// Create web server    

var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);  // Socket.io for real-time communication with clients

// Set up port number - default is 3000, but you can change it here if needed.
var PORT = process.env.PORT || 3000;

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));

// Start listening on specified port (default is 3000)
server.listen(PORT, function() {
  console.log('Listening on port'+ PORT + '...');
});

/******************************************************************************************************/
/*                            SOCKET.IO SER VIEWS                                                        */
/******************************************************************************************************/

// When a client connects to our    server, we log that a connection has been made.
io.on('connection', function(socket ) {
  console.log('A client has connected');    // Log message to console when user connects to server
  
  socket.on('new_                          ', function(data) {
    console.log(data);
  });   // Log message to console when user sends a message to the server

  /************************* SENDING    MESSAGE TO CLIENT *************************/

  // Send any messages that are broadcast   from the server to the client
  socket.broadcast.emit('   new_    ', 'Hello from the server');

  /************************ RECEIVING   MESSAGE FROM CLIENT *************************/

  // Listen for the "message    from client" event and log the message to the console
  socket.on('send_message', function(data) {
    console.log(data);
  });   // Log message to console when user sends a message to the server

  // Emit the "message to   client" event when a client sends a message to the server
  socket.on('disconnect', function() {
    console.log('A client has disconnected');    // Log message to console when user disconnects from server
  });
}); // End of socket.io.on('connection') function