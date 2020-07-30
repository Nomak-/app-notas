const app = require('./server')
require('./database')
//inicializaciones
app.listen(app.get('port'), () => {
    console.log('Server on http://localhost:3000')
})