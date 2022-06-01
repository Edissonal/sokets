import { Router,Request, Response } from "express";
import Server from '../classes/server';
import { usuariosConectados } from '../sokects/sokect';
import { GraficaData } from '../classes/grafica';

 const  router = Router();
 const grafica = new GraficaData();

router.get('/grafica',(req:Request,res:Response)=>{

       const server = Server.instance;
       server.io.emit('mensaje-nuevo',);

 res.json(grafica.getDataGrafica() );

});



router.post('/grafica',(req:Request,res:Response)=>{

       const mes = req.body.mes;
       const unidades = Number(req.body.unidades);
       
       const server = Server.instance;
       server.io.emit('cambio-grafica',grafica.getDataGrafica());
       grafica.incrementarValor(mes,unidades);
       res.json(grafica.getDataGrafica());

});

router.post('/mensajes/:id',(req:Request,res:Response)=>{

       const cuerpo = req.body.cuerpo;
       const de = req.body.de;
       const id = req.params.id;

       const payload ={cuerpo,de}


       const server = Server.instance;
       server.io.in(id).emit('mensaje-privado',payload)

    res.json({
           ok:true,
           cuerpo,
           de,
           id
    });
   
   });
   

   //obtener usuarios por nombres

   router.get('/usuarios/detalle',(req:Request,res:Response)=>{

        
       

       res.json({
              ok:true,
              clientes:usuariosConectados.getLista()
       });


   });

export default router;