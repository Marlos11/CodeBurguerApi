import * as Yup from 'yup'
import jwt from 'jsonwebtoken'
import User from '../models/User'
import configAuth from '../../config/auth'


class SessionsController {
    async store(request, response) {

        const schema = Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required()
        })

        const checkPasswordOrEmail = () => {
            return response.status(400).json({ error: 'Make sure your password or email are correct' })
        }

        if (!(await schema.isValid(request.body))) checkPasswordOrEmail()
        const { email, password } = request.body

        const user = await User.findOne({
            where: { email }
        })

        if (!user) checkPasswordOrEmail()


        if (!(await user.checkPassword(password))) checkPasswordOrEmail()

        /*      return response.json(user) */

        return response.json({
            id: user.id,
            email,
            name: user.name,
            admin: user.admin,
            token: jwt.sign({ id: user.id, name: user.name }, configAuth.secret, { expiresIn: configAuth.expiresIn })
        })
    }
}

export default new SessionsController()