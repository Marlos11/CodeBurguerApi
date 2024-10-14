import * as Yup from 'yup'
import Category from '../models/Category.js'
import User from '../models/User.js'

class CategoryControler {
    async store(request, response) {

        try {
            const schema = Yup.object().shape({
                name: Yup.string().required()
            })
            try {
                schema.validateSync(request.body, { abortEarly: false })
            } catch (err) {
                return response.status(400).json({ error: err.erros })
            }

            const { admin: isAdmin } = await User.findByPk(request.userId)

            if (!isAdmin) {
                return response.status(401).json()
            }

            const { name } = request.body
            const { filename: path } = request.file

            const categoryExists = await Category.findOne({
                where: {
                    name,
                }
            })

            if (categoryExists) {
                return response.status(400).json({ error: 'category already exists' })
            }
            const { id } = await Category.create({
                name,
                path
            })

            return response.status(201).json({ id, name })
        } catch (err) {

        }
    }
    async index(request, response) {
        const category = await Category.findAll()

        return response.json(category)
    }

    async update(request, response) {

        try {
            const schema = Yup.object().shape({
                name: Yup.string()
            })
            try {
                 schema.validateSync(request.body, { abortEarly: false })
            } catch (err) {
                return response.status(400).json({ error: err.erros })
            }

            const { admin: isAdmin } = await User.findByPk(request.userId)

            if (!isAdmin) {
                return response.status(401).json()
            }

            const { name } = request.body

            const { id } = request.params



            const category = await Category.findByPk(id)

            if (!category) {
                return response.status(401).json({ error: 'category dose not exist ' })
            }

            let path
            if (request.file) {
                path = request.file.filename
            }

            await Category.update({ name, path },
                { where: { id } })

            return response.status(200).json()
        } catch (err) {

        }
    }
}

export default new CategoryControler()
