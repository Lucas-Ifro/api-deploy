import { prisma } from "../configs/prismaClient.js";

class AulaRepository {
 static async findAllFeitos(parametros) {
    return await prisma.feito.findMany(parametros);
  }
 static async findAllAulas(parametros) {
    return await prisma.aula.findMany(parametros);
  }
 static async filtrarPorId(parametro){
    return await prisma.aula.findUnique(parametro);
 }
  static async buscarPorId(id) {
  return await prisma.aula.findUnique({
      where: { id: id }
  });
  }
  static async update(filtro) {
    return await prisma.aula.update(filtro);

  }
  static async create(data_insert) {
    return await prisma.aula.create({
      data :data_insert,
      select: {
        id: true,                
        modulo_id: true,         
        titulo: true,            
        video: true,             
        pdf_questoes: true,       
        pdf_resolucao: true,      
        descricao: true           
      }
    })
  }
  static async delete(id) {
    return await prisma.aula.delete({ where: { id: id } });
  }; 
  
 static createFilterAula(parametros) {
    let filtro = {
        where: {
          id: parametros.id,
          ...(parametros.modulo_id != undefined && { modulo_id: parametros.modulo_id }), // Inclui filtro para modulo_id
          ...(parametros.titulo && { titulo: { contains: parametros.titulo } }),         
          // ...(parametros.aluno_id != NaN && {aluno_id: parametros.aluno_id})
        },
          select:{
            id: true,                // Incluir o ID na consulta
            modulo_id: true,         // Incluir o modulo_id na consulta
            titulo: true,            // Incluir o título na consulta
            video: true,             // Incluir o vídeo na consulta
            pdf_questoes: true,      // Incluir o PDF de questões na consulta
            pdf_resolucao: true,     // Incluir o PDF de resolução na consulta
            descricao: true,
          }
    }
      return filtro;
  }

 static createFilterFeito(parametros) {
    let filtro = {
        where: {         
          ...(parametros.aluno_id != NaN && {aluno_id: parametros.aluno_id})
        },
        select: {
          aluno_id:true,
          feito:true,
          aula:{
            select:{
              id: true,                // Incluir o ID na consulta
              modulo_id: true,         // Incluir o modulo_id na consulta
              titulo: true,            // Incluir o título na consulta
              video: true,             // Incluir o vídeo na consulta
              pdf_questoes: true,      // Incluir o PDF de questões na consulta
              pdf_resolucao: true,     // Incluir o PDF de resolução na consulta
              descricao: true,
            }
            }
        }
    }

    return filtro;
}
  static async modulo_exist(id_modulo){
    return await prisma.modulo.findFirst({
      where:{
        id: id_modulo
      },
      select:{
        id:true
      }
    })
  }

  static async buscarFeito(parametro){
    return await prisma.feito.findFirst({
      where:{
        aluno_id: parametro.aluno_id,
        aula_id:parametro.aula_id,
        feito:parametro.feito,
      },
      select:{
        id:true
      }
    })
  }
  static async feito(data) {
    return await prisma.feito.create({data});
  }

}
  

export default AulaRepository;
