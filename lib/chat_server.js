/**
 * Created by jiayanguo on 8/7/16.
 */

const socketio =require('socket.io');
let io;
let guestNumber = 1;
const nickNames = {};
const namesUsed = [];
const currentRoom = {};

exports.listen = (server) => {
    io = socketio.listen(server);
    io.set('log level', 1);
    io.sockets.on('connection', (socket) => {
        guestNumber = assignGuestName (socket, guestNumber, nickNames, namesUsed);
        joinRoom(socket, 'Lobby');
        handleMessageBroadcasting(socket, nickNames);
        handleNameChangeAttempts(socket, nickNames, namesUsed);
        handleRoomJoining(socket);
        socket.on('rooms', () => {
           socket.emit('rooms', io.sockets.manager.rooms)
        });
        handleClientDisconnection(socket, nickNames, namesUsed);
    });
};

const assignGuestName = (socket, guestNumber, nickNames, namesUsed) => {
    let name = 'Guest' + guestNumber;
    nickNames[socket.id] = name;
    socket.emit('nameResult', {
        success: true,
        name: name
    });
    namesUsed.push(name);
    return guestNumber + 1;

}

