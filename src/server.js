// arquivo responsavel por subir o servidor da aplicação. assim que ele sobre ele chama o app que estancia a class App

import app from './app'

const port = process.env.PORT || 300
app.listen(port,'0.0.0.0')