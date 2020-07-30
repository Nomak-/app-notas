const helpers = {}

helpers.isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next()
    }
    req.flash('error_msg', 'acceso no autorizado')
    res.redirect('/users/login')
}

module.exports = helpers