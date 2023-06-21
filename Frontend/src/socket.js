import { io } from 'socket.io-client';

// URL of the Socket.io server
let URL = "http://localhost:8000";

// Creating a Socket object with autoConnect set to false
let Socket = io(URL, { autoConnect: false });

// Function to add an ID to the Socket object
export function addIdToSocket(idUser) {
  // Creating a new Socket object with the URL and the user ID as a query parameter
  socket = io(`${URL}?idUser=${idUser}`, { autoConnect: false });
  
  // Returning the new Socket object
  return socket;
}

// Exporting the Socket object
export var socket = Socket;
