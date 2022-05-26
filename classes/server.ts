import express from 'express'
import { SERVER_PORT } from '../global/enviroment';
import socketIO from 'socket.io';
import http from 'http';
import { configurarUsuario } from '../sokects/sokect';


import * as Socket from'../sokects/sokect';

export default class Server{

    public app:express.Application;
    public port:number;
    public io:socketIO.Server;
    private httpServer:http.Server;
    private static _instance:Server;


    private  constructor(){
    
        this.app = express();
        this.port = SERVER_PORT;
        this.httpServer = new http.Server(this.app);
        this.io =  new socketIO.Server(this.httpServer,{
            cors: {
				origin: true,
				credentials: true
			}
        });
        this.escucharSockets();
    }

    public static get instance(){

        return this._instance || (this._instance = new this());

    }

    private escucharSockets(){
    
        console.log('Escuchando conecxiones -sokests');
        this.io.on('connection',cliente =>{
          
            Socket.conectarCliente(cliente,this.io);
        //conectar cliente 
        
            
            Socket.desconectar(cliente,this.io);

            //mensajes
            Socket.mensaje(cliente, this.io);

            //configurar usuario
            Socket.configurarUsuario(cliente, this.io);

            //escuchar usuarios activos
            Socket.obtenerUsuarios(cliente,this.io);

        });
    }

    start(callback:VoidFunction){

        this.httpServer.listen(this.port, callback);
    }

}

