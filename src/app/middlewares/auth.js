

import jwt from 'jsonwebtoken'


import authConfig from '../../config/auth.js'


//  aqui estamos verificando se o token que o usuario esta nos enviando é valido
// para isso estamos utilizando um middlewares. 
// esta informações chegam atraves dos headers para nós. 
export default (request, response, next) => {
    const authToken = request.headers.authorization

    if (!authToken) {
        return response.status(401).json({ error: 'token not provided' })
    }

    // nesta variavel estamos fazendo um pequena divisão nas informações que estamos recebendo ,
    // estamos pegando somento a parte que nos interessa que é token. 
    const token = authToken.split(' ')[1]


    // apos tratarmos o token iremos verificar se o token que usuario nos envia é o mesmo que temos 
    // em nosso banco. Usamos o verify() do jwt para verificar se os token são iguais, 
    // três parametros = o token que recebemos, o token do banco e uma função que tratara o erro, e 
    // a decodificação para visualizarmos se é um usuario valido atraves do id. 
    try {
        jwt.verify(token, authConfig.secret, (err, decoded) => {
            if (err) {
                throw new Error()
            }

            // criamos uma propriedade dentro do nosso request que sera o id do usuario. 
            request.userId = decoded.id
            request.userName = decoded.name
        
            return next()
        })

    } catch (error) {
        return response.status(401).json({ error: 'token is invalid' })
    }

    

}