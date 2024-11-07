import { prisma } from "../configs/prismaClient.js"
import jwt from 'jsonwebtoken';
import { sendError } from "../utils/messages.js";
import dotenv from 'dotenv';
import 'dotenv/config'

dotenv.config();

const PermissaoMiddleware = async (req, res, next) => {
  try {

    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        sendError(res, 404, { message: 'Token não fornecido' })
      return sendError(res, 401, { message: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.PRIVATE_KEY);
    const id = decoded.data._id;


    const usuario = await prisma.usuario.findUnique( {       
        where: {
            id: id,
        }
    })
      
    const rotaAtual = req.route.path.replace('/','').replace('/:',':'); 
    const metodoAtual = req.method.toLowerCase();

    const permissoes = await prisma.rota.findMany({
        where: {
          permissoes: {
            some: {
              grupo_id: usuario.grupo_id,
            },
          },
        },
      })

    permissoes.find(p => {
        const rotaMatch = p.rota == rotaAtual;
        const metodoPermitido = p[metodoAtual];
        if(rotaMatch && metodoPermitido){
            next()
        }
    })

    if (!usuario) {
      return sendError(res, 404, { message: 'Usuário não encontrado' });
    }

    if (!usuario.active) {
      return sendError(res, 403, { message: 'Usuário Inativo' });
    }

    return sendError(res, 403, { message: 'Acesso negado' });

  } catch (err) {
    console.error(err)
    return sendError(res, 500, ["OCORREU UM ERRO INTERNO"])
  }
};

export default PermissaoMiddleware;