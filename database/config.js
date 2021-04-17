
const mongoose = require('mongoose');

const connectionDB = async () => {
    try {
        await mongoose.connect(process.env.DB_CNN,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log("DB conectada");
    } catch (error) {
        console.log(error);
        throw new Error("Error al conectar la app a la DB, echar un vistaso al log");
    }
}

module.exports = {
    connectionDB
}