import { describe, expect, jest, test } from '@jest/globals';
import AulaRepository from '../../repositories/AulaRepository.js';
import AulaService from '../../services/AulaService.js';
import AulaSchemas from '../../schemas/AulaSchemas.js';
import faker from 'faker-br';

jest.mock('../../repositories/AulaRepository.js', () => ({
    findAllFeitos: jest.fn(),
    findAllAulas: jest.fn(),
    filtrarPorId: jest.fn(),
    createFilterAula: jest.fn(),
    createFilterFeito: jest.fn(),
    modulo_exist: jest.fn(),
    create: jest.fn(),
    buscarPorId: jest.fn(),
    update: jest.fn(),
    buscarFeito: jest.fn(),
    feito: jest.fn(),
    delete: jest.fn(),
}));

jest.mock('../../schemas/AulaSchemas.js', () => ({
    listarSchema: {
        parse: jest.fn(),
    },
    schemaInsert: {
        parse: jest.fn(),
    },
    listarPorIdSchema: {
        parse: jest.fn(),
    },
    UpdateSchema: {
        parse: jest.fn(),
    },
    feito_status: {
        parse: jest.fn(),
    },
    Delet: {
        parse: jest.fn(),
    },
    
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('1 - (GET) Fazendo teste do método que lista aulas. -> LINHA 48', () => {
    test('1 - Deve listar aulas filtradas por título e módulo. -> LINHA 49', async () => {
        const mockDeAulas = [
            { titulo: faker.commerce.productName(), modulo_id: 1 },
            { titulo: faker.commerce.productName(), modulo_id: 2 }
        ];

        const parametros = { titulo: "Aula 1", modulo_id: 1 };
        
        AulaSchemas.listarSchema.parse.mockReturnValue(parametros);
        AulaRepository.createFilterAula.mockReturnValue(parametros);
        AulaRepository.findAllAulas.mockResolvedValue(mockDeAulas);

        const data = await AulaService.listar(parametros);

        expect(data).toEqual(mockDeAulas);
    });

    test('2 - Deve listar aulas feitas filtradas por aluno_id. -> LINHA 66', async () => {
        const mockDeAulasFeitas = [
            { titulo: faker.commerce.productName(), aluno_id: 1 }
        ];

        const parametros = { aluno_id: 1 };
        
        AulaSchemas.listarSchema.parse.mockReturnValue(parametros);
        AulaRepository.createFilterFeito.mockReturnValue(parametros);
        AulaRepository.findAllFeitos.mockResolvedValue(mockDeAulasFeitas);

        const data = await AulaService.listar(parametros);

        expect(data).toEqual(mockDeAulasFeitas);
    });

    test('3 - Deve retornar todas as aulas quando nenhum filtro for aplicado. -> LINHA 82', async () => {
        const mockDeTodasAsAulas = [
            { titulo: faker.commerce.productName() },
            { titulo: faker.commerce.productName() }
        ];

        const parametros = {}; 
        
        AulaSchemas.listarSchema.parse.mockReturnValue(parametros);
        AulaRepository.findAllAulas.mockResolvedValue(mockDeTodasAsAulas);

        const data = await AulaService.listar(parametros);

        expect(data).toEqual(mockDeTodasAsAulas);
    });

    test('4 - Deve lançar erro quando nenhum registro for encontrado na busca de aulas. -> LINHA 98', async () => {
        const parametros = {}; 
        
        AulaSchemas.listarSchema.parse.mockReturnValue(parametros);
        AulaRepository.findAllAulas.mockResolvedValue([]);

        await expect(AulaService.listar(parametros)).rejects.toThrow("Nenhuma aula encontrada.");
    });

    test('5 - Deve lançar erro quando nenhuma aula for encontrada com filtro de título e módulo. -> LINHA 107', async () => {
        const parametros = { titulo: "Aula 1", modulo_id: 1 };
        
        AulaSchemas.listarSchema.parse.mockReturnValue(parametros);
        AulaRepository.createFilterAula.mockReturnValue(parametros);
        AulaRepository.findAllAulas.mockResolvedValue([]); 
        await expect(AulaService.listar(parametros)).rejects.toThrow("Nenhuma aula encontrada.");
    });

    test('6 - Deve lançar erro quando nenhuma aula for encontrada com filtro de aluno_id. -> LINHA 106', async () => {
        const parametros = { aluno_id: 1 };

        AulaSchemas.listarSchema.parse.mockReturnValue(parametros);
        AulaRepository.createFilterFeito.mockReturnValue(parametros);
        AulaRepository.findAllFeitos.mockResolvedValue([]);

        await expect(AulaService.listar(parametros)).rejects.toThrow("Nenhuma aula encontrada.");
    });
});

describe('2 - (GET) Testando o método listarPorID. -> LINHA 100', () => {
    test('1 - Deve retornar a aula correspondente ao ID fornecido. -> LINHA 128', async () => {
        const idDoParam = 1;
        const aulaMock = { id: 1, titulo: "Aula de Teste" };
        
        AulaSchemas.listarPorIdSchema.parse.mockReturnValue({ id: idDoParam });
        AulaRepository.createFilterAula.mockReturnValue({ id: idDoParam });
        AulaRepository.filtrarPorId.mockResolvedValue(aulaMock);
        
        const data = await AulaService.listarPorID(idDoParam);

        expect(data).toEqual(aulaMock);
        expect(AulaSchemas.listarPorIdSchema.parse).toHaveBeenCalledWith(idDoParam);
    });

    test('2 - Deve lançar erro se nenhuma aula for encontrada. -> LINHA 142', async () => {
        const idDoParam = 2;

        AulaSchemas.listarPorIdSchema.parse.mockReturnValue({ id: idDoParam });
        AulaRepository.createFilterAula.mockReturnValue({ id: idDoParam });
        AulaRepository.filtrarPorId.mockResolvedValue(null);
        
        await expect(AulaService.listarPorID(idDoParam)).rejects.toThrow("Nenhuma aula encontrada.");
    });
});

describe('3 - (PATCH) Testando o método que atualiza aulas.', () => {
    
    test('1 - Deve atualizar uma aula existente e retornar os dados atualizados. -> LINHA 155', async () => {
        const parametros = {
            id: 1,
            titulo: faker.commerce.productName(), 
            modulo_id: 12,
            video: faker.internet.url(), 
            descricao: faker.commerce.productMaterial(), 
            pdf_questoes: "questoes1.pdf", 
            pdf_resolucao: "gabarito1.pdf"
        };

        const aulaExistente = {
            id: 1,
            titulo: faker.commerce.productName(), 
            modulo_id: 1,
            video: faker.internet.url(), 
            descricao: faker.commerce.productMaterial(), 
            pdf_questoes: "questoes1.pdf", 
            pdf_resolucao: "gabarito1.pdf"
        };

        const aulaAtualizada = { ...parametros };

        AulaSchemas.UpdateSchema.parse.mockReturnValue(parametros);
        AulaRepository.buscarPorId.mockResolvedValue(aulaExistente);
        AulaRepository.update.mockResolvedValue(aulaAtualizada);

        const data = await AulaService.atualizar(parametros);

        expect(data).toEqual(aulaAtualizada);
    });

    test('2 - Deve lançar um erro se a aula não existir. -> LINHA 187', async () => {
        const parametros = {
            id: 1,
            modulo_id: 1,
            titulo: faker.commerce.productName()
        };

        AulaSchemas.UpdateSchema.parse.mockReturnValue(parametros);
        AulaRepository.buscarPorId.mockResolvedValue(null);

        await expect(AulaService.atualizar(parametros)).rejects.toThrow("Nenhuma aula encontrada.");
    });
});

describe('4 - (POST) Testando a criação de uma nova aula. -> LINHA 201', () => {
    test('1 - Deve criar uma nova aula sem erros.', async () => {
        const mockDeInventarios = [
            {   
                titulo: faker.commerce.productName(), 
                video: faker.internet.url(), 
                descricao: faker.commerce.productMaterial(), 
                pdf_questoes: "questoes1.pdf", 
                pdf_resolucao: "gabarito1.pdf" 
            }
        ];
    
        const parametros = {
            titulo: faker.commerce.productName(), 
            modulo_id: 1,
            video: faker.internet.url(), 
            descricao: faker.commerce.productMaterial(), 
            pdf_questoes: "questoes1.pdf", 
            pdf_resolucao: "gabarito1.pdf"
        };
    
        AulaSchemas.schemaInsert.parse.mockReturnValue(parametros);
        AulaRepository.modulo_exist.mockResolvedValue({ id: 1 });
        AulaRepository.create.mockResolvedValue(mockDeInventarios);
    
        const data = await AulaService.create(parametros);
    
        expect(data).toEqual(mockDeInventarios);
    });
    
    test('2 - Deve retornar um erro quando o modulo não existir. -> LINHA 231', async () => {
        const parametros = {
            titulo: faker.commerce.productName(), 
            modulo_id: 1,
            video: faker.internet.url(), 
            descricao: faker.commerce.productMaterial(), 
            pdf_questoes: "questoes1.pdf", 
            pdf_resolucao: "gabarito1.pdf"
        };
    
        AulaSchemas.schemaInsert.parse.mockReturnValue(parametros);
        AulaRepository.modulo_exist.mockResolvedValue(null);
    
        await expect(AulaService.create(parametros)).rejects.toThrow("O modulo informado não existe.");
        expect(AulaRepository.modulo_exist).toHaveBeenCalledWith(parametros.modulo_id);
        
    });
});

describe('5 - (POST) Testando o método que registra o status de aula assistida. -> LINHA 250', () => {
    test('1 - Deve registrar uma aula como assistida e retornar os dados criados. -> LINHA 251', async () => {
        const parametros = {
            aluno_id: 1,
            aula_id: 1,
            feito:true
        };

        const aulaAssistida = {
            id: 1,
            aluno_id: parametros.aluno_id,
            aula_id: parametros.aula_id,
            feito: parametros.feito
        };

        AulaSchemas.feito_status.parse.mockReturnValue(parametros);
        AulaRepository.buscarFeito.mockResolvedValue(null);
        AulaRepository.feito.mockResolvedValue(aulaAssistida);

        const data = await AulaService.feito_status(parametros);

        expect(data).toEqual(aulaAssistida);
        expect(AulaSchemas.feito_status.parse).toHaveBeenCalledWith(parametros);
    });

    test('2 - Deve lançar um erro se a aula já foi assistida. -> LINHA 275', async () => {
        const parametros = {
            aula_id: 1,
            aluno_id: 1 
        };

        const aulaExistente = {
            aula_id: parametros.aula_id,
            aluno_id: parametros.aluno_id,
            feito: true 
        };

        AulaSchemas.feito_status.parse.mockReturnValue(parametros);
        AulaRepository.buscarFeito.mockResolvedValue(aulaExistente); 

        await expect(AulaService.feito_status(parametros)).rejects.toThrow("A aula já foi assistida.");
    });
});

describe('6 - (DELETE) Testando o método que deleta uma aula. -> LINHA 294', () => {
    
    test('1 - Deve deletar uma aula existente e retornar os dados da aula deletada. -> LINHA 296', async () => {
        const idDoParam = { id: 1 };

        const aulaExistente = {
            id: idDoParam.id,
            titulo: "Aula de Teste",
        };

        const aulaDeletada = { 
            id: aulaExistente.id,
        };

        AulaSchemas.Delet.parse.mockReturnValue(idDoParam);
        AulaRepository.createFilterAula.mockReturnValue({ id: idDoParam.id });
        AulaRepository.filtrarPorId.mockResolvedValue(aulaExistente);
        AulaRepository.delete.mockResolvedValue(aulaDeletada);

        const data = await AulaService.deletar(idDoParam);

        expect(data).toEqual(aulaDeletada);
        expect(AulaRepository.delete).toHaveBeenCalledWith(aulaExistente.id);
    });

    test('2 - Deve lançar um erro se a aula não existir. -> LINHA 319', async () => {
        const idDoParam = { id: 1 };

        AulaSchemas.Delet.parse.mockReturnValue(idDoParam);
        AulaRepository.createFilterAula.mockReturnValue({ id: idDoParam.id });
        AulaRepository.filtrarPorId.mockResolvedValue(null); 

        await expect(AulaService.deletar(idDoParam)).rejects.toThrow("Nenhuma aula encontrada.");
    });
});
