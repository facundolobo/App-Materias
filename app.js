const { guardarDB, leerDB } = require('./helpers/guardarArchivo');
const { pausa, inquirerMenuPrincipal, leerInput, mostrarListadoChecklist, confirmar, listaMateriaBorrar, listaMateriaCambiarNombre, cambiarNombrePantalla } = require('./helpers/inquirer');
const Materias = require('./models/materias');


require('colors');

let opt='';


//crear una materia
const materias= new Materias(); // usamos para obtener los metodos de "materias"

const materiasDB = leerDB(); //para obtener los datos del archivo

if (materiasDB){ //vemos si existe archivo
    //establecer las tareas
    materias.cargarMateriasFromArray(materiasDB);
    //TODO cargar tareas 
}


const main = async ()=>{
    console.clear();
    

    do{

        opt = await inquirerMenuPrincipal();  //menu principal y elegir una opcion

        

        switch (opt) {
            case '1':
                const desc = await leerInput('Nombre de la Materia: ');
                materias.crearTarea(desc);
            break;

            case '2':
                const idNombre = await listaMateriaCambiarNombre(materias.listadoArr); //obtenemos el id de la materia a borrar
                
               
                if(idNombre !== '0'){

                    //mensaje de que nombre ingresar 

                    const nuevoNombre =  await cambiarNombrePantalla('Ingrese nuevo Nombre de la materia :');

                    const ok = await confirmar('¿Está seguro de ingresar nuevo nombre? ');
                    
                    // Todo preguntar si esta seguro
                    if(ok){
                        materias.cambiarNombreMateria(idNombre, nuevoNombre); // enviamos a borrar la materia
                        console.log('Nombre de Materia Actualizado \n');
                    }                    
                }
            break;

            case '3':
                materias.listadoCompleto(); 
            break;
            case '4':
                materias.listarPendientesCompletadas(true);
            break;
            case '5':
                materias.listarPendientesCompletadas(false);
            break;

            case '6':
                const ids = await mostrarListadoChecklist(materias.listadoArr);
                materias.toogleCompletadas(ids);
            break;

            case '7':
                const id = await listaMateriaBorrar(materias.listadoArr); //obtenemos el id de la materia a borrar
                
                if(id !== '0'){
                    const ok = await confirmar('¿Está seguro')
                    // Todo preguntar si esta seguro
                    if(ok){
                        materias.borrarMateria(id); // enviamos a borrar la materia
                        console.log('Materia Borrada') 
                    }                    
                }
            break;

            


        }
        
        guardarDB(materias.listadoArr); //guardar los cambios en la base de datos

        await pausa();

    }while(opt !== '0');

}


main();