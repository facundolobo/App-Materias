const Materia = require('./materia');
require('colors');

class Materias{

    _listado = {};
 
    //constructor
    constructor() {
        this._listado= {}
    }

    crearTarea(desc = ''){
        const materia = new Materia(desc);
        this._listado[materia.id] = materia;
        //console.log(this._listado);
    }

    //es para devolver un arreglo y no un objeto
    get listadoArr(){
        const listado= []; //creamos un listado
        
        //obtine todas las id de las listas

        Object.keys(this._listado /* devuleve un arreglo con las claves */).forEach(key =>{
            const materia= this._listado[key];
            
            listado.push(materia); //llenamos el listado
        }) 
        
        return listado; //devolvemos el listado
    }

    cargarMateriasFromArray (materias = [] ){
        materias.forEach(materia=>{ //recorre todo el vector de materias recivido 
            this._listado[materia.id] = materia; //asigna cada materia al listado local con el id de la materia

        })
    }

    //lsitar todas las materias
    listadoCompleto(){
        console.log();

        this.listadoArr.forEach((materia,i)=>{
            const idx = `${i + 1}`.green ;
            const {desc, fecha} = materia;
            const estado = (fecha) //para msotrar si esta completada o no
                        ? 'Completada'.green
                        : 'Pendiente'.red;

            console.log(`${idx} . ${desc} :: ${estado}`); //esto mostrara en consola
        });

    }

    listarPendientesCompletadas(completadas = true){
        console.log();
        let contador = 0;

        this.listadoArr.forEach((materia,i)=>{
            
            const {desc, fecha} = materia;
            

            const estado = (fecha)
                        ? 'Completado'.green
                        : 'Pendiente'.red;

                        
            if (completadas){

                //mostrar comletadas
                if(fecha){
                    contador += 1;
                    console.log(`${contador + '.'.green} . ${desc} :: ${fecha.green}`);
                }
            }else {
                //mostrar pendientes
                if(!fecha){
                    contador += 1;
                    console.log(`${contador + '.'.green} . ${desc} :: ${estado.red}`);
                }
            }
        });

    }


    toogleCompletadas(ids = []){
        ids.forEach ( id =>{
            const materia = this._listado[id];

            //si no tiene fecha la agrega
            if(!materia.fecha){
                materia.fecha = new Date().toDateString()
            }
        });
        this.listadoArr.forEach(materia => {
            //todas las id que no estan en el ids recibido cambiaran su fecha a Null

            if(!ids.includes(materia.id) ){
                this._listado[materia.id].fecha=null;
                
            }
        })

    }
    
    borrarMateria(id= ''){
        if( this._listado[id] ){
            delete this._listado[id];
        }
    }

    cambiarNombreMateria(id='', nuevoNombre){

        // console.log(nuevoNombre)
        // console.log(id)
        this._listado[id].desc = nuevoNombre;
    }

}

module.exports = Materias;