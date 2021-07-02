const inquirer = require ('inquirer');
const Materias = require('../models/materias');
require('colors');

const preguntas =[
    {
        type: 'list',
        name: 'opcion',
        message:'¿Que desea hacer? ',
        choices: [
            {
                value:'1',
                name: `${'1.'.green} Crear Materia`
            },
            {
                value:'2',
                name: `${'2.'.green} Editar Materia`
            },
            {
                value:'3',
                name: `${'3.'.green} Listar Materias`
            },
            {
                value:'4',
                name: `${'4.'.green} Listar Materias completadas`
            },
            {
                value:'5',
                name: `${'5.'.green} Listar Materias pendientes`
            },
            {
                value:'6',
                name: `${'6.'.green} Completar Materia(s)`
            },
            {
                value:'7',
                name: `${'7.'.green} Borrar Materia`
            },
            {
                value:'0',
                name: `${'0.'.green} Salir`
            }

        ]
    }
];

const pausa = ()=>{
    return new Promise (resolve => {
        
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
        
        readline.question(`\nPresione ${'Enter'.red} para continuar\n`,(opt)=>{
            
            readline.close();
            resolve();
        })
    });
}

const inquirerMenuPrincipal = async()=>{
    console.clear(); //borra la consola

    console.log('==========================='.green);
    console.log('   Selecciones una opción'.red);
    console.log('===========================\n'.green);

    const {opcion} = await inquirer.prompt(preguntas)
    return opcion;
}

//leer lo que ingresa 

const leerInput = async(message) => { //message es lo q mostrara en la pantalla
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){ //valor q se engresa
                if(value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question)
    return desc;

}

const mostrarListadoChecklist = async(materias = []) =>{
    
    const choices = materias.map((materia,i)=>{
    
        const idx = `${i + 1}.`.green;

        return{
            value: materia.id,
            name: `${idx} ${materia.desc}`,
            checked:  (materia.fecha) ? true : false 
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Selecciones las Materias competadas',
            choices
        }
    ]
    const {ids} = await inquirer.prompt(pregunta);
    return ids; //devolvemos el id de las que cambiaron 

}

const listaMateriaBorrar = async(materias = []) =>{
    const choices = materias.map((materia,i)=>{
        const idx = `${i + 1}.`.green;

        return{
            value: materia.id,
            name: `${idx} ${materia.desc}`
        }
    });

    choices.unshift({ //agregamos la funcion de cancelar 0
        value: '0',
        name: '0. '.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id; //retornamos el id de la materia que queremos borrar

}

const confirmar = async(message) =>{
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ];

    const {ok} = await inquirer.prompt(question);
    return ok;
}

const listaMateriaCambiarNombre = async(materias = []) =>{
    const choices = materias.map((materia,i)=>{
        const idx = `${i + 1}.`.green;

        return{
            value: materia.id,
            name: `${idx} ${materia.desc}`
        }
    });

    choices.unshift({ //agregamos la funcion de cancelar 0
        value: '0',
        name: '0. '.green + 'Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Cambiar nombre',
            choices
        }
    ]
    const {id} = await inquirer.prompt(preguntas);
    return id; //retornamos el id de la materia que queremos borrar

}


const cambiarNombrePantalla = async(message) => { //message es lo q mostrara en la pantalla
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value){ //valor q se engresa
                if(value.length === 0){
                    return 'Por favor ingrese un valor'
                }
                return true;
            }
        }
    ];
    const { desc } = await inquirer.prompt(question)
    return desc;

}

module.exports={
    pausa,
    inquirerMenuPrincipal,
    leerInput,
    mostrarListadoChecklist,
    confirmar,
    listaMateriaBorrar,
    listaMateriaCambiarNombre,
    cambiarNombrePantalla
}