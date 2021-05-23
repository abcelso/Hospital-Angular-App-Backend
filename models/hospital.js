
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
    image: {
        type: String
    }
});

HospitalSchema.method('toJSON', function(){
    const {_v, ...object } = this.toObject();
    return object;
});

module.exports = model('Hospital', HospitalSchema, 'Hospitales');
