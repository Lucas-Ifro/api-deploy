import { prisma } from "../configs/prismaClient.js";

class ModuloRepository {
  static async listar(filtros) {
    return await prisma.modulo.findMany(filtros);
};


  static async listarPorId(filtros) {
    return await prisma.modulo.findUnique(filtros);
  }

  static async inserir(data_criar) {
    return await prisma.modulo.create({
      data: data_criar,
      select: {
        id: true,          
        turma_id: true,   
        titulo: true,      
        descricao: true,  
        image: true
    }
    });
  }

  static async atualizar( data) {
    return await prisma.modulo.update( data );
  }

  static async deletar(id) {
    return await prisma.modulo.delete({
       where: { 
        id: id 
      } 
    });
  }

  static constructFilters(parametros) {
    let filtro = {
        where: {
            ...(parametros.id != undefined && { id: parametros.id }),
            ...(parametros.turma_id != undefined && { turma_id: parametros.turma_id }), // Filtro para turma_id
            ...(parametros.titulo && { titulo: { contains: parametros.titulo } }),     // Filtro para título do módulo
            ...(parametros.descricao && { descricao: { contains: parametros.descricao } }) // Filtro para descrição do módulo
        },
        select: {
            id: true,          // Incluir o ID do módulo na consulta
            turma_id: true,    // Incluir o ID da turma na consulta
            titulo: true,      // Incluir o título do módulo na consulta
            descricao: true,   // Incluir a descrição do módulo na consulta
            image: true
        }
    };
    return filtro;
}
  static async turma_exist(id_turma){
    return await prisma.turma.findFirst({
      where:{
        id: id_turma
      },
      select:{
        id:true
      }
    })
  }

}

export default ModuloRepository;
