const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy

const Users = require('../models/Users')

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    //match email user
    const user = await Users.findOne({email})
    if (!user) {
        // retorna el primer parametro como NULL, el segundo false para indicar que no se encontro el usuario y el tercer parametro es la opción en la cual enviamos el mensaje
        return done(null, false, {message: 'no se encontro un usuario'})
    } else {
        //uso el metodo matchpassword para cifrar la contraseña que me da el usuario y la comparo con la que esta en la base de datos
        const passwordTrue = await user.matchPassword(password)
        if (passwordTrue) {
            //si la clave es correcta, guarda el usuario la retornar el primer parametro como NULL porque no hay error y en el seguno parametro, el usuario (que en realidad es el email)
            return done(null, user) //este usuario es el correcto, passport lo guarda en sesion
        } else {
            return done(null, false, {message: 'clave incorrecta'})
        }
    }
}))

// cuando el usuario es registrado lo guardamos en la sesion del servidor
passport.serializeUser((user, done) => {
    done(null, user.id)
})

//cuando navegamos verifica que el usuario tenga autorización
passport.deserializeUser((id, done) => {
    Users.findById(id, (err, user) => {
        done(err, user)
    })
})