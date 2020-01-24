const socketio = require("socket.io");
const parseStringAsArray = require("./utils/parseStringAsArray");
const calculateDistance = require("./utils/calculateDistance");
let io;
const connections = [];
exports.setupWebsocket = server => {
  io = socketio(server);
  io.on("connection", socket => {
    console.log(socket.id);
    // PARAMETROS DO SOCKET
    const { latitude, longitude, techs } = socket.handshake.query;
    // setTimeout(() => {
    //   socket.emit("message", "hello-omnistack");
    // }, 3000);
    connections.push({
      id: socket.id,
      coordinates: {
        lat: Number(latitude),
        long: Number(longitude)
      },
      techs: parseStringAsArray(techs)
    });
    console.log(connections);
  });
};

exports.findConnections = (coords, techs) => {
  return connections.filter(connection => {
    // console.log(coords, connection.coordinates);
    console.log(calculateDistance(coords, connection.coordinates));
    return (
      calculateDistance(coords, connection.coordinates) < 10 &&
      connection.techs.some(item => techs.includes(item))
    );
  });
};

exports.sendMessage = (to, message, data) => {
  to.forEach(connection => {
    io.to(connection.id).emit(message, data);
  });
};
