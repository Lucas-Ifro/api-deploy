import moduloRepository from "../repositories/moduloRepository.js";
import 'dotenv/config';
import sharp from "sharp";
import path from "path";
import moduloSchema from "../schemas/moduloSchema.js";
// import { fileURLToPath } from 'url';
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);


class ModuloService {
    static async listar(filtro) { 

        const filtroValidated = moduloSchema.listarSchema.parse(filtro)
        const consulta = moduloRepository.constructFilters(filtroValidated)
        const busca = await moduloRepository.listar(consulta)

        if (!busca) {
            throw new Error("nem um modulo foi encontrado.");
        }

        return busca
    };

        static  async listarPorId(id) {
            const parsedIdSchema = moduloSchema.listarPoIdSchema.parse({id:id});
            const consulta = moduloRepository.constructFilters(parsedIdSchema)
            const response = await moduloRepository.listarPorId(consulta);
            if (!response) {
                throw new Error("nem um modulo foi encontrado.");
            }
            return response
        };

        static async inserir(data, file, imageUrl) {

            const tipo = file.mimetype
            if (!tipo.includes('image')) {  
                throw new Error("Arquivo não é uma imagem.");
            }

            const filtroValidated = moduloSchema.inserirSchema.parse(data);
            const moduloResponse={         
                turma_id: filtroValidated.turma_id,   
                titulo: filtroValidated.titulo,      
                descricao: filtroValidated.descricao,   
                image: imageUrl
            }

            const turma = await moduloRepository.turma_exist(moduloResponse.turma_id)

            if (!turma) {
                throw new Error("A turma informada não existe.");
            }

            const outputPath = path.join(process.cwd(), `./uploads/imagens/${filtroValidated.image}`);
            const formato = filtroValidated.image.split('.')

            sharp(file.buffer)
            .resize(480, 280) 
            .toFormat(formato[formato.length - 1], { quality: 100 }) 
            .toFile(outputPath);

            const response = moduloRepository.inserir(moduloResponse)

            return response
        }

    static async atualizar(id, data) {
        const parametro = moduloSchema.atualizarSchema.parse(data);
    
        const {turma_id, titulo, descricao, image } = parametro;
    
        const parsedIdSchema = moduloSchema.listarPoIdSchema.parse({id:id});
        const consulta = moduloRepository.constructFilters(parsedIdSchema)
        const moduloExist = await moduloRepository.listarPorId(consulta);
    
        if (moduloExist== null) {
            throw new Error("O recurso solicitado não foi encontrado no servidor.");
        }
    
        let atualizacao = {
            where: { id: id },
            data: {
                turma_id: turma_id,    
                titulo: titulo,      
                descricao: descricao ,   
                image: image
            },
            select: {
            id: true,          
            turma_id: true,    
            titulo: true,      
            descricao: true,   
            image: true
            }
        };

        return await moduloRepository.atualizar(atualizacao);
    }

    static async deletar(id) {
        const deleteSchema = moduloSchema.deletarSchema.parse({id:id});
        const consulta = moduloRepository.constructFilters(deleteSchema)
        const modulo = await moduloRepository.listarPorId(consulta);
        if (!modulo) {
            throw new Error("O recurso solicitado não foi encontrado no servidor.");
        }
        const response = await moduloRepository.deletar(deleteSchema.id);
        return response
    }
}

export default ModuloService;