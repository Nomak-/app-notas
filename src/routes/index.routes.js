const {Router} = require('express')
const router = Router()
const {examplePage} = require('../controllers/index.controller')

router.get('/', (req, res) => {
    res.render('index') // como el default layout es main.hbs cuando haga render en este caso index.hbs va a insertarse usando {{{body}}} y en caso de precisar modulos parciales mediante {{>nombredelarchivo}}
})

router.get('/example', examplePage)

module.exports = router