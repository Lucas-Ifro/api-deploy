//*import jwt from 'jsonwebtoken';
import loginService from '../services/loginService.js';
import { z, ZodError } from "zod";
import { sendError, sendResponse } from '../utils/messages.js';

class loginController {
  static logar = async (req, res) => {
    try{
      const usuario =  await loginService.login(req.body);

      return sendResponse(res,200, {...usuario});
  }catch(err){
    console.error(err)
      if(err instanceof ZodError) {
        const customError = err.issues.find(issue => issue.code === z.ZodIssueCode.custom);
        if (customError) {
          let errors = err.errors[0];
          return sendError(res,parseInt(errors.params?.status),errors.message);
        }              
      }      
      return sendError(res,500,"Ocorreu um erro interno no servidor!");
  }  
  }
}

export default loginController;
