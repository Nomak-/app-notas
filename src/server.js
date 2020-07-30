const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const morgan = require('morgan')
const methodOverride = require('method-override') //permite usar los metodos DELETE,PUT en los form
const flash = require('connect-flash') //permite manejar estados entre vistas (ej: mensajes o alertas entre vistas)
const session = require('express-session')
const passport = require('passport')

// inicializaciones
const app = express()
require('./config/passport')

//settings
app.set('port', process.env.PORT || 3000)
app.set('views', path.join(__dirname, 'views'))  //utiliza el path join por la contra barra en windows y se concatena la carpeta views
app.engine('.hbs', exphbs ({
    defaultLayout: 'main',
    layoutDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs'
}))

app.set('view engine', '.hbs') // indica que el motor de plantillas a utilizar es el .hbs que lo configure en el objeto de ENGINE

//middlewares
app.use(express.urlencoded({extended: false}))
app.use(morgan('dev'))
app.use(methodOverride('_method'))
app.use(session({
    secret: 'palabraSecreta',
    resave: true,
    saveUninitialized: true
}))
//passport se utiliza debajo de las sesiones
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
//global variables
app.use( (req, res, next) => {
    //res.locals es una variable del servidor y le agrego la variable success_msg
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error') //passport le agrega este nombre ERROR de forma predeterminada
    res.locals.user = req.user || undefined
    next()
})


//routes
app.use(require('./routes/index.routes'))
app.use(require('./routes/notes.routes'))
app.use(require('./routes/users.routes'))

//static filess
app.use(express.static(path.join(__dirname, 'public')))

module.exports = app