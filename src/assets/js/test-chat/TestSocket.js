import {io} from "socket.io-client";


const testSocket = io("http://localhost:8253/testChat");

export default testSocket;