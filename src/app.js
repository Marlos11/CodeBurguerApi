/* 
import express from 'express'
import cors from 'cors'
import routes from './routes.js'
import { resolve } from 'path'
import './database/index.js'

// aqui temos nossa classe que executa tudo que esta dentro do nosso contructor,
// informamos que iremos usaro express = this.app = express()
// depois chamaos nosso middlwares que esta informando para nossa aplicação que iremos usar o json = this.app.use(express.json())
// e temos nossas rotas que estão vindo do nosso arquivo de rotas e aqui estamos informando que assim que iniciar chamaremos nossas rotas = this.routes(), this.app.use(routes)
class App {
    constructor() {
        this.app = express()
        this.app.use(cors())

        this.middlwares()
        this.routes()
    }

    middlwares() {
        this.app.use(express.json())
        this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')))
        this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads')))
    }


    routes() {
        this.app.use(routes)
    }
}

export default new App().app */

import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import './database/index.js';

// Simulando __dirname para ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Classe que configura a aplicação
class App {
    constructor() {
        this.app = express();
        this.app.use(cors());

        this.middlwares();
        this.routes();
    }

    middlwares() {
        this.app.use(express.json());

        // Usando __dirname simulado
        this.app.use('/product-file', express.static(resolve(__dirname, '..', 'uploads')));
        this.app.use('/category-file', express.static(resolve(__dirname, '..', 'uploads')));
    }

    routes() {
        this.app.use(routes);
    }
}

export default new App().app;
