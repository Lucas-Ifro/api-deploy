import {prisma} from '../configs/prismaClient.js';

class LoginRepository {
  static async login(filtro){
    return await prisma.usuario.findUnique(filtro)
  }

  static async permissoes(filtro){
    return await prisma.rota.findMany(filtro)
  }
}

export default LoginRepository;
