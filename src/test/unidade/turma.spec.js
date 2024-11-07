import {describe, expect, test} from '@jest/globals';
import turmaService from '../../services/turmaService.js';
import turmaRepository from '../../repositories/turmaRepository.js';
import messages from '../../utils/messages.js';


jest.mock('../../repositories/turmaRepository.js', () => ({
    findAll: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    findByTitulo: jest.fn(),
    atualizar:jest.fn(),
    findByTituloExceptId:jest.fn(),
    userExist: jest.fn(),
    turmaMatricular: jest.fn(),
    removerUsuarioDaTurma: jest.fn(),
    delete: jest.fn(),
    constructFilters: jest.fn(),
}));

describe.skip('turmaService', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    
    describe.skip('Método listar', () => {

        const mockTurma = [
            { titulo: '1ª Série A', usuario_has_turma: ['João', 'Maria', 'José'] },
            { titulo: '1ª Série B', usuario_has_turma: ['João'] },
        ];

        beforeEach(() => {
            jest.clearAllMocks();
        });
    
        test('1 - Deve retornar todas as turmas com pelo menos um aluno', async () => {

            turmaRepository.findAll.mockResolvedValue({ turmas: mockTurma })

            const mockResult = await turmaService.listar();
        
            expect(mockResult).toEqual({ turmas: mockTurma });
        });

        test('2 - Deve lançar um erro quando ocorrer turma(s) sem aluno(s)', async () => {

            const mockTurmasVazias = []; 
    
            turmaRepository.findAll.mockResolvedValue(mockTurmasVazias);
    
            await expect(turmaService.listar()).rejects.toThrow(new Error("Turmas não encontradas."));
        });
    });

    describe.skip('Método listarPorID', () => {
        test('1 - Deve retornar uma certa turma através do ID dela', async () => {
            const mockTurma = { 
                id: 1, 
                titulo: '2º Série A',
                usuario_has_turma: ['João', 'Maria', 'Rosilda'], 
            };
            turmaRepository.findById.mockResolvedValue(mockTurma);

            const turma = await turmaService.listarPorID(1);

            expect(turma).toEqual(mockTurma);
            expect(turmaRepository.findById).toHaveBeenCalledWith(1);
        });
        test('2 - Deve retornar um erro quando o ID não for um número', async () => {

                const invalidID = 'abc'; 
                await expect(turmaService.listarPorID(invalidID)).rejects.toThrow(new Error("ID deve ser um número inteiro"));
            
                expect(turmaRepository.findById).not.toHaveBeenCalled();
            
        });        
    });

    describe.skip('Método createTurma', () => {
        test('1 - Deve criar uma turma', async () => {
            const mockTurma = { 
                titulo: '2º Série A',
                usuario_has_turma: 3
            };

            const mockTurmaCriada = { 
                id: 1, 
                titulo: '2º Série A',
                usuario_has_turma: 3 
            };

            turmaRepository.findByTitulo.mockResolvedValue(null);
            turmaRepository.create.mockResolvedValue(mockTurmaCriada);

            const turmaCriada = await turmaService.create(mockTurma);

            expect(turmaCriada).toEqual(mockTurmaCriada);
            expect(turmaRepository.findByTitulo).toHaveBeenCalledWith(mockTurma.titulo);
            expect(turmaRepository.create).toHaveBeenCalledWith(mockTurma);
        });

        test('2 - Deve lançar um erro quando o título já existir', async () => {
            const mockTurma = { 
                titulo: '2º Série A',
                usuario_has_turma: 3
            };
            turmaRepository.findByTitulo.mockResolvedValue(true);
        
            await expect(turmaService.create(mockTurma)).rejects.toThrow(
                new Error('O campo Titulo já existe.') 
            );
            
            expect(turmaRepository.findByTitulo).toHaveBeenCalledWith(mockTurma.titulo);
        });
        
    });

    describe.skip('Método atualizarTurma', () => {
        beforeEach(() => {
            jest.clearAllMocks(); 
        });
    
        test('1 - Deve atualizar uma turma', async () => {
            const id = 1; 
            const mockTurma = { 
                titulo: '2º Série A',
            };
            const existingTurma = { 
                id: id,
                titulo: '1ª Série B',
            };
            const mockTurmaAtualizada = { 
                id: id,
                titulo: '2º Série A',
            };
    
            turmaRepository.findById.mockResolvedValue(existingTurma);
            turmaRepository.findByTituloExceptId.mockResolvedValue(null);
            turmaRepository.atualizar.mockResolvedValue(mockTurmaAtualizada);
    
            const turmaAtualizada = await turmaService.atualizarTurma(id, mockTurma);
    
            expect(turmaAtualizada).toEqual(mockTurmaAtualizada);
            expect(turmaRepository.findById).toHaveBeenCalledWith(id);
            expect(turmaRepository.findByTituloExceptId).toHaveBeenCalledWith(mockTurma.titulo, id);
            expect(turmaRepository.atualizar).toHaveBeenCalledWith(id, mockTurma);
        });
    
        test('2 - Deve lançar um erro se a turma não for encontrada', async () => {
            const id = 1; 
            const mockTurma = { 
                titulo: '2º Série A',
            };
    
            turmaRepository.findById.mockResolvedValue(null);
    
            await expect(turmaService.atualizarTurma(id, mockTurma)).rejects.toThrow('Título não existe.');
            expect(turmaRepository.findById).toHaveBeenCalledWith(id);
            expect(turmaRepository.findByTituloExceptId).not.toHaveBeenCalled();
            expect(turmaRepository.atualizar).not.toHaveBeenCalled();
        });
    
        test('3 - Deve lançar um erro se o título já estiver cadastrado', async () => {
            const id = 1; 
            const mockTurma = { 
                titulo: '2º Série A',
            };
            const existingTurma = { 
                id: id,
                titulo: '1ª Série B',
            };
            const tituloExistente = { 
                id: 2,
                titulo: '2º Série A',
            };
    
            turmaRepository.findById.mockResolvedValue(existingTurma);
            turmaRepository.findByTituloExceptId.mockResolvedValue(tituloExistente);
    
            await expect(turmaService.atualizarTurma(id, mockTurma)).rejects.toThrow('Titulo já cadastrado');
            expect(turmaRepository.findById).toHaveBeenCalledWith(id);
            expect(turmaRepository.findByTituloExceptId).toHaveBeenCalledWith(mockTurma.titulo, id);
            expect(turmaRepository.atualizar).not.toHaveBeenCalled();
        });
    });
    describe.skip('Método inserirUsuario', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
    
        test('1 - Deve inserir um usuário em uma turma com sucesso', async () => {
            const req = {
                body: {
                    usuario_id: 1,
                    turma_id: 2
                }
            };
    
            const mockUsuarioCadastrado = {
                usuario_id: 1,
                turma_id: 2
            };
    
            turmaRepository.userExist.mockResolvedValue(null);
            turmaRepository.turmaMatricular.mockResolvedValue(mockUsuarioCadastrado);
    
            const result = await turmaService.inserirUsuario(req);
    
            expect(result).toEqual(mockUsuarioCadastrado);
            expect(turmaRepository.userExist).toHaveBeenCalledWith(req.body);
            expect(turmaRepository.turmaMatricular).toHaveBeenCalledWith(req.body);
        });
    
        test('2 - Deve lançar um erro se o usuário já estiver matriculado na turma', async () => {
            const req = {
                body: {
                    usuario_id: 1,
                    turma_id: 2
                }
            };
        
            turmaRepository.userExist.mockResolvedValue(true);
            const mockResult = 'Usuário já existe.';  
        
            await expect(turmaService.inserirUsuario(req)).rejects.toThrow(mockResult);
        
            expect(turmaRepository.userExist).toHaveBeenCalledWith(req.body);
            expect(turmaRepository.turmaMatricular).not.toHaveBeenCalled();
        });
                 
        
        test('3 - Deve lançar um erro de validação se os dados forem inválidos', async () => {

            const req = {
                body: {
                    usuario_id: 'invalid', 
                    turma_id: 2
                }
            };
    
            await expect(turmaService.inserirUsuario(req))
                .rejects
                .toThrow();
            expect(turmaRepository.userExist).not.toHaveBeenCalled();
            expect(turmaRepository.turmaMatricular).not.toHaveBeenCalled();
        });
    });

    describe.skip('Método removerUsuario', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });
    
        test('1 - Deve remover um usuário de uma turma com sucesso', async () => {
            const req = {
                body: {
                    usuario_id: 1,
                    turma_id: 2
                }
            };
    
            const mockUsuarioRemovido = {
                count: 1
            };
    
            turmaRepository.userExist.mockResolvedValue(true);
            turmaRepository.removerUsuarioDaTurma.mockResolvedValue(mockUsuarioRemovido);
    
            const result = await turmaService.removerUsuario(req);
    
            expect(result).toEqual(mockUsuarioRemovido);
            expect(turmaRepository.userExist).toHaveBeenCalledWith(req.body);
            expect(turmaRepository.removerUsuarioDaTurma).toHaveBeenCalledWith(req.body);
        });

        test('2 - Deve lançar um erro se o usuário não estiver matriculado na turma', async () => {
            const req = {
                body: {
                    usuario_id: 1,
                    turma_id: 2
                }
            };
    
            turmaRepository.userExist.mockResolvedValue(null);
            const mockResult = (messages.validationGeneric.resourceNotFound('Usuário'));
    
            await expect(turmaService.removerUsuario(req)).rejects.toThrow(mockResult);
    
            expect(turmaRepository.userExist).toHaveBeenCalledWith(req.body);
            expect(turmaRepository.removerUsuarioDaTurma).not.toHaveBeenCalled();
        });
    });
    describe.skip('Método excluirTurma', () => {
    
        test('1 - Deve excluir uma turma com sucesso', async () => {
            const id = 1;
            const mockTurma = { id: 1, titulo: '1ª série A' };
            const mockResult = { id: 1 };
    
            turmaRepository.findById.mockResolvedValue(mockTurma);
            turmaRepository.delete.mockResolvedValue(mockResult);
    
            const result = await turmaService.excluirTurma(id);
    
            expect(result).toEqual(mockResult);
            expect(turmaRepository.findById).toHaveBeenCalledWith(id);
            expect(turmaRepository.delete).toHaveBeenCalledWith(id);
        });
    
        test('2 - Deve lançar um erro se a turma não for encontrada', async () => {
            const id = 1;
            const mockResult = new Error('Turma não encontrada');
    
            turmaRepository.findById.mockResolvedValue(null);
    
            await expect(turmaService.excluirTurma(id)).rejects.toEqual(mockResult);
    
            expect(turmaRepository.findById).toHaveBeenCalledWith(id);

        });
    });
});