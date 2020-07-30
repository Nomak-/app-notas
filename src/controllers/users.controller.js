const Users = require('../models/Users')
const passport = require('passport')
const usersController = {}

usersController.renderRegister = (req, res) => {
    res.render('users/register')
}

usersController.register = async (req, res) => {
    const errors = []
    const {name, email, password, confirm_password} = req.body
    if (password != confirm_password) {
        errors.push({text: 'Las contraseñas no coinciden'})
    }
    if (password.length < 4) {
        errors.push({text: 'Las contraseñas deben tener al menos 4 caracteres'})
    }
    if (errors.length > 0) {
        res.render('users/register', {
            errors, name, email, password
})
    } else {
        const emailUser = await Users.findOne({email})
        if (emailUser) {
            req.flash('error_msg', 'El correo se encuentra en uso')
            res.redirect('/users/register')
        } else {
            const newUser = new Users({name, email, password})
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save()
            req.flash('success_msg', '¡Completaste tu registro exitosamente!')
            res.redirect('/users/login')
        }
    }
}

usersController.renderLogin = (req, res) => {
    res.render('users/login')
}

usersController.login = passport.authenticate('local', {
    failureRedirect: '/users/login',
    successRedirect: '/notes',
    failureFlash: '¡Usuario o contraseña inválidos!'
})

usersController.logout = (req, res) => {
    req.logout() //funcion
    req.flash('success_msg', '¡Vuelve pronto!')
    res.redirect('/users/login')
}

module.exports = usersController