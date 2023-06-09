import {io} from 'socket.io-client';

let URL = "http://localhost:8000";

let Socket = io(URL, {autoConnect: false});

export function addIdToSocket(idUser){
    Socket = io(`${URL}?idUser=${idUser}`, {autoConnect : false})
    return Socket;
}

export const socket = Socket;
