const {Router} = require('express')
const router = Router()

const {renderRegister, register, renderLogin, login, logout} = require('../controllers/users.controller')

router.get('/users/register', renderRegister)
router.post('/users/register', register)
router.get('/users/login', renderLogin)
router.post('/users/login', login)
router.get('/users/logout', logout)

module.exports = router