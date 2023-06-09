import {io} from 'socket.io-client';

let URL = "http://localhost:8000";

let Socket = io(URL, {autoConnect: false});

export function addIdToSocket(idUser){
    socket = io(`${URL}?idUser=${idUser}`, {autoConnect : false})
    return socket;
}

export var socket = Socket;
