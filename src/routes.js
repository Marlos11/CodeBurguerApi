
// aqui importamos de dentro do express o Router que é uma classe que nos auxiliara na criação das rotas. 

import { Router, response } from 'express'
import UserContoller from './app/controllers/UserContoller'
import SessionsController from './app/controllers/SessionsController'
import ProductsController from './app/controllers/ProductsController'
import CategoryController from './app/controllers/CategoryController'
import OrderController from './app/controllers/OrderController'

import authMiddleware from './app/middlewares/auth'

import multer from 'multer'
import multerConfig from '../src/config/multer'


// aqui é nossa variavel que guardara nossa class Router instanciada para que possamos criar nossas rotas.
const routes = new Router() 

routes.get('/',(request,response)=>{
    return response.json({message:'hello'})
})


const upload = multer(multerConfig)
// criamos a primeira rota com o methodo get que apenas nos retorna um hello word. 

//routes users
routes.post('/users', UserContoller.store)
routes.post('/sessions', SessionsController.store)
//end routes users

//routes middleware auth
routes.use(authMiddleware) // somente as rotas abaixo usaram esse middlewares
//end routes middleware auth 

//routes products 
routes.post('/products', upload.single('file'), ProductsController.store)
routes.get('/products', ProductsController.index)
routes.put('/products/:id', upload.single('file'), ProductsController.update)

//end routes products 

//routes categorys
routes.post('/categorys', upload.single('file'), CategoryController.store)
routes.get('/categorys', CategoryController.index)
routes.put('/categorys/:id', upload.single('file'), CategoryController.update)

//end routes categorys

//routes orders
routes.post('/orders', OrderController.store)
routes.get('/orders', OrderController.index)
routes.put('/orders/:id', OrderController.update)
// end routes orders 


export default routes


