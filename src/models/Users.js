const {Schema, model} = require('mongoose')
const bcrypt = require('bcryptjs')

const UserSchema = new Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
},
{timestamps: true})

// se crea el metodo encryptPassword y se toma la variable password que ingresa por la funcion creada, se le agrega el salt para cifrarla y se la retorna
UserSchema.methods.encryptPassword = async password => {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt)
}

// se crea el metodo matchPassword y se utiliza la funcion clasica (no flecha) para tener el alcance con el THIS a la propiedad password de la clase UserSchema
UserSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password )
}

module.exports = model('User', UserSchema)