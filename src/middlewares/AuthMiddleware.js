import { sendError } from '../utils/messages.js';
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import 'dotenv/config'

dotenv.config();

const AuthMiddleware = (req,res,next) => {
  
  try {
    const header = req.headers['authorization'];
    if(header) {
        const JWT = process.env.PRIVATE_KEY;
        const bearer = header.split(' ');
        const token = bearer[1];
        const payload = jwt.verify(token, JWT);
        if(payload){
          return next();
        }
      }

    return sendError(res,401,{mensage: "Impossível continuar usuário sem credenciais"}); 

  } catch(error) {
    return sendError(res,500,{mensage: "Erro interno do servidor, tente novamente mais tarde!"}); 
 
  }
}

export default AuthMiddleware;