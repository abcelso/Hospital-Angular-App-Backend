
const { Schema, model} = require('mongoose');

const HospitalSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    img: {
        type: String
    }
});

HospitalSchema.method('toJSON', function(){
    const {_v, ...object } = this.toObject();
    return object;
});

module.exports = model('Hospital', HospitalSchema, 'Hospitales');
