const {v4: uuidv4} = require('uuid');

class Materia{
    id = '';
    desc = '';
    fecha = null;

    constructor( desc ) {
        this.desc= desc;
        this.id= uuidv4();
        console.log(desc);
    }

}

module.exports = Materia;