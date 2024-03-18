
import * as Yup from 'yup'
import Products from "../models/Products";
import Category from "../models/Category";
import Order from '../schemas/Order'
import User from '../models/User';

class OrderController {

    async store(request, response) {
        const schema = Yup.object().shape({
            products: Yup.array()
                .required()
                .of(
                    Yup.object().shape({
                        id: Yup.number().required(),
                        quantity: Yup.number().required()
                    })
                )
        })

        console.log(request)
        try {
            await schema.isValid(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.error })
        }

        const productId = request.body.products.map(product => product.id)

        const updateProducts = await Products.findAll({
            where: {
                id: productId
            },
            include: [{
                model: Category,
                as: 'category',
                attributes: ['name']

            }]
        })

        const edidtProducts = updateProducts.map(product => {

            const productsIndex = request.body.products.
                findIndex(requestProduct => requestProduct.id === product.id)





            const newProduct = {
                id: product.id,
                name: product.name,
                price: product.price,
                category: product.name,
                url: product.url,
                quantity: request.body.products[productsIndex].quantity

            }
            console.log(product)
            return newProduct
        })

        const order = {
            user: {
                id: request.userId,
                name: request.userName
            },
            products: edidtProducts,
            status: 'Pedido realizado'
        }

        const orderResponse = await Order.create(order)


        return response.status(200).json(orderResponse)
    }
    async index(reuqest, response) {
        const orders = await Order.find()

        return response.json(orders)
    }

    async update(request, response) {
        const schema = Yup.object().shape({
            status: Yup.string().required()
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (error) {
            return response.status(400).json({ error: error.message })
        } 

        const { admin: isAdmin } = await User.findByPk(request.userId)

        if (!isAdmin) {
            return response.status(401).json()
        }

        const { id } = request.params
        const { status } = request.body
        try {

            await Order.updateOne({ _id: id }, { status })
        } catch (error) {
            return response.status(400).json({ error: error.message })
        }

        return response.json({ message: 'status was update' })
    }
}

export default new OrderController()
