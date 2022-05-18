import Server from "./classes/server";
import { SERVER_PORT } from "./global/enviroment";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from 'cors'




const server  = Server.instance;
//bodyparser

server.app.use(bodyParser.urlencoded({extended:true}));
server.app.use(bodyParser.json());

//cors
server.app.use(cors({origin:true, credentials:true}));

//rutas de servicios
server.app.use('/',router);

server.start(()=>{
 console.log(`puerto servidor ${server.port}`);

});