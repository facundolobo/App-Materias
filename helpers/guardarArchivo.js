const fs = require('fs');
const archivo = './db/data.json';

//para guardar en la base de datos
const guardarDB = (data) => {
    
    fs.writeFileSync( archivo,JSON.stringify(data) );
}

const leerDB = ()=>{
    if(!fs.existsSync(archivo)){ //verificamos si el archivo existe
        return null
    }

    const info = fs.readFileSync(archivo, {encoding:'utf-8'});
    const data = JSON.parse(info); //decodificar lo q tengo 
    
    return data
}


module.exports = {
    guardarDB,
    leerDB

}