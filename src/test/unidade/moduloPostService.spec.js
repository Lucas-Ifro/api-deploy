import { describe, expect, test } from '@jest/globals';
import AulaRepository from '../../repositories/AulaRepository.js';
import AulaService from '../../services/AulaService.js';
import faker from 'faker-br';

jest.mock('../../repositories/AulaRepository.js', () => ({
    modulo_exist: jest.fn(),
    create: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Testando a rota de post aula.!', () => {
    
    test('Deve criar uma nova aula sem erros.', async () => {
        const mockDeInventarios = [
            {   titulo: faker.commerce.productName(), 
                video: faker.internet.url(), 
                descricao: faker.commerce.productMaterial(), 
                pdf_questoes: "questoes1.pdf", 
                pdf_resolucao:"gabarito1.pdf" }
            ]

        AulaRepository.modulo_exist.mockResolvedValue({id:1});

        AulaRepository.create.mockResolvedValue(mockDeInventarios);

        const data = await AulaService.create({
            titulo: faker.commerce.productName(), 
            modulo_id:1,
            video: faker.internet.url(), 
            descricao: faker.commerce.productMaterial(), 
            pdf_questoes: "questoes1.pdf", 
            pdf_resolucao:"gabarito1.pdf"
        });

        expect(data).toBeInstanceOf(Array);
        expect(data).toHaveLength(1);
        expect(data).toEqual(mockDeInventarios);

    });

    test('Deve retornar um erro quando o modulo não existir.', async () => {
        const mockDeInventarios = 
            {   titulo: faker.commerce.productName(), 
                video: faker.internet.url(), 
                descricao: faker.commerce.productMaterial(), 
                pdf_questoes: "questoes1.pdf", 
                pdf_resolucao:"gabarito1.pdf" }
        ;

        const paramentros = {
            titulo: faker.commerce.productName(), 
            modulo_id:1,
            video: faker.internet.url(), 
            descricao: faker.commerce.productMaterial(), 
            pdf_questoes: "questoes1.pdf", 
            pdf_resolucao:"gabarito1.pdf"
        }

        AulaRepository.modulo_exist.mockResolvedValue(null);
        AulaRepository.create.mockResolvedValue(mockDeInventarios);

        await expect(AulaService.create(paramentros)).rejects.toThrow("O modulo informado não existe.");

        expect(AulaRepository.modulo_exist).toHaveBeenCalledWith(paramentros.modulo_id);

    });

    
});
