import {io} from 'socket.io-client';

let URL = "http://localhost:8000";

export function addIdToSocket(idUser){
    socket = io(`${URL}?idUser=${idUser}`, {autoConnect : false})
}

export let socket = io(URL, {autoConnect: false});