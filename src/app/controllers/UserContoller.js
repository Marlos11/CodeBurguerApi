
// OS CONTOLLERS SÃO OS RESPONSAVEIS PELA REGRA DE NEGOCIO, VALIDAÇÕES E DEPOIS CHAMAR O MODEL PRA GRAVAR OS 
// DADOS NO BANCO. 

/* 
store()=> cadastrar/adicionar
index()=> listar varios
show() => listar apenas um
update() => atualizar  
delete() => deletar 
 
 
*/



import { v4 } from "uuid";
import * as Yup from 'yup'
import User from "../models/User";

class UserController {
    async store(request, response) {
        // estamos utilizando lib yup para validar se os dados do usarios são validos 
        // e atendem os padrões da nossa api. 
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().required().email(),
            password: Yup.string().required().min(6),
            admin: Yup.boolean(),
        })

        try {
            await schema.validateSync(request.body, { abortEarly: false })
        } catch (err) {
            return response.status(400).json({ error: err.errors })
        }

        const { name, email, password, admin } = request.body
        
        // estraves do metodo findOnde estamos fazendo a verificação se o email 
        // foi cadastrado no banco, fazemos isso atraves de uma query. 
        const findEmailUser = await User.findOne({
            where:{email}
        })

        if(findEmailUser){
            return response.status(409).json({message:"E-mail already registered"})
        }
        
        const user = await User.create(
            {
                id: v4(),
                name,
                email,
                password,
                admin
            })


        return response.status(201).json({ id: user.id, name, email, admin })

    } 

  
}

export default new UserController()