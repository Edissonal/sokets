import { Usuario } from '../classes/usuario';

export class UsuariosLista{

    private lista:Usuario[]=[];

    constructor(){}

    public agregar(usuario:Usuario){


    //Agregar un usuario;
        this.lista.push(usuario);
        console.log(this.lista);
        return usuario;
    }

    public actualizarnombre(id:string,nombre:string){

        for(let usuario of this.lista){

            if(usuario.id === id){
              usuario.nombre = nombre; 
              break; 
            }
        }
        console.log('=== Actualizando Usuario ==');
        console.log(this.lista);

    }

    
        //Obtener lista de usuarios

        public getLista(){
          
            return this.lista.filter(usuario => usuario.nombre !== 'sin-nombre');

        }

    
    
    public getUsuario(id:string){
        return this.lista.find(usuario =>{
            return usuario.id === id;
        });
    }
   
    //obtener usuario en una sala en particular

    public getUsuariosEnsala(sala:string){
        return this.lista.filter(usuario =>{ usuario.sala === sala;});
    }

    //borrar usuario
    public borrarUsuario(id:string){
        const tempUsuario = this.getUsuario(id);
        this.lista = this.lista.filter(usuario =>{
            return usuario.id !=id;
        })
        console.log(this.lista);

        return tempUsuario;
    }

}