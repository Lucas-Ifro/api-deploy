import request from "supertest";
import { describe, expect, it} from '@jest/globals';
import app from '../../app.js'
import path from "path";
import fs from "fs";
import faker from 'faker-br';

let token = null

describe('Autenticação', () => {
    it("1-Deve chamar a rota de autenticação e pegar o token", async () => {
        const req = await request(app)
        .post('/login')
        .set("Accept", "aplication/json")
        .send({
            matricula:"12345",
            senha:"senhatest"
        })
        token = req.body.data.token
    })
});

describe('GET /aula - Listar todas as aulas.', () => {
    it('1- Deve retornar todas as aulas.', async () => {

        const res = await request(app)
            .get('/aula')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`);

        expect(res.status).toBe(200);
        expect(res.body.code).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.message).toBe("Requisição bem sucedida.");
        expect(res.body.data.length).toBeGreaterThan(0);
    });
    it('2- Deve retornar as aulas filtradas utilizando o titulo ou id do modulo.', async () => {

        const res = await request(app)
            .get('/aula')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .query({ titulo: 'Aula 1.1' });

        expect(res.status).toBe(200);
        expect(res.body.code).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data[0].titulo).toBe('Aula 1.1')
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.message).toBe("Requisição bem sucedida.");
        expect(res.body.data.length).toBeGreaterThan(0);
    });
    it('3- Deve retornar as aulas filtradas utilizando o id do aluno .', async () => {

        const res = await request(app)
            .get('/aula')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .query({ aluno_id: 1 });

        expect(res.status).toBe(200);
        expect(res.body.code).toBe(200);
        expect(res.body).toHaveProperty('data');
        expect(res.body.data[0].aluno_id).toBe(1)
        expect(Array.isArray(res.body.data)).toBe(true);
        expect(res.body.message).toBe("Requisição bem sucedida.");
        expect(res.body.data.length).toBeGreaterThan(0);
    });
    it('4- Deve retornar erro 404 quando não encontrar uma aula utilizando os filtros', async () => {
        const res = await request(app)
            .get('/aula')
            .query({ titulo: 'Aula test' }) 
        expect(res.body.error).toBe(true);
        expect(res.status).toBe(404);
        expect(res.body.message).toBe("O recurso solicitado não foi encontrado no servidor.");
        expect(res.body.errors[0]).toBe("Nenhuma aula encontrada.");
    });
    it('5- Deve retornar erro 400 quando houver um bad request', async () => {
        const res = await request(app)
            .get('/aula')
            .query({ aluno_id: "asd" }) 

        expect(res.body.error).toBe(true);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Requisição com sintaxe incorreta ou outros problemas.");
        expect(res.body.errors[0].message).toBe("ID do aluno deve ser um número");
    });
})

describe('GET /aula/:id - Listar todas as aulas pelo ID.', () => {
    it('1- Deve retornar as aulas utilizando o ID.', async () => {

        const res = await request(app)
            .get('/aula/1')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)

        expect(res.status).toBe(200);
        expect(res.body.code).toBe(200);
        expect(res.body.error).toBe(false);
        expect(res.body).toHaveProperty('data');
        expect(res.body.message).toBe("Requisição bem sucedida.");
    });
    it('2- Deve retornar erro 404 quando não encontrar uma aula', async () => {

        const res = await request(app)
            .get('/aula/999')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)

        expect(res.status).toBe(404);
        expect(res.body.code).toBe(404);
        expect(res.body.message).toBe("O recurso solicitado não foi encontrado no servidor.");
        expect(res.body.errors[0]).toBe("Nenhuma aula encontrada.");
    });
    
    it('3- Deve retornar erro 400 quando houver um bad request', async () => {
        const res = await request(app)
            .get('/aula/ASduasidg')
        expect(res.body.error).toBe(true);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Requisição com sintaxe incorreta ou outros problemas.");
        expect(res.body.errors[0].message).toBe("ID informado não é do tipo number");
    });
});

describe('PATCH /aula/:id - Atualizar uma aula.', () => {
    it('1- Aula deve ser atualizada e deverá retornar uma respota positiva.', async () => {
        const updatedData = {
            titulo: faker.commerce.productName(), 
            modulo_id: 2,
            video: faker.internet.url(), 
            descricao: faker.commerce.productMaterial(), 
            pdf_questoes: "questoes1.pdf", 
            pdf_resolucao: "gabarito1.pdf"
        }
        const res = await request(app)
            .patch('/aula/1')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send(updatedData)

        expect(res.status).toBe(200);
        expect(res.body.code).toBe(200);
        expect(res.body.error).toBe(false);
        expect(res.body).toHaveProperty('data');
        expect(res.body.message).toBe("Requisição bem sucedida.");
    });
    it('2- Deve retornar erro 404 quando não encontrar uma aula', async () => {

        const res = await request(app)
            .get('/aula/999')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)

        expect(res.status).toBe(404);
        expect(res.body.code).toBe(404);
        expect(res.body.message).toBe("O recurso solicitado não foi encontrado no servidor.");
        expect(res.body.errors[0]).toBe("Nenhuma aula encontrada.");
    });
    
    it('3- Deve retornar erro 400 quando houver um bad request', async () => {
        const updatedData = {
            titulo: faker.commerce.productName(), 
            modulo_id: "teste",
            video: faker.internet.url(), 
            descricao: faker.commerce.productMaterial(), 
            pdf_questoes: "questoes1.pdf", 
            pdf_resolucao: "gabarito1.pdf"
        }
        const res = await request(app)
            .patch('/aula/1')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send(updatedData)

        expect(res.body.error).toBe(true);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Requisição com sintaxe incorreta ou outros problemas.");
        expect(res.body.errors[0].message).toBe("ID informado não é do tipo number");
    });
});

describe.skip('POST /aula - Cria aulas e salva arquivos pdf.', () => {
    const filePath = path.resolve(process.cwd(), './src/test/arquivos/pdf.pdf');
    const filePathTypeErrado = path.resolve(process.cwd(), './src/test/arquivos/image.png');


    it('1- Cria uma nova aula, e salva os arquivos pdf.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/aula')
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .field('modulo_id', 1)
                .field('titulo', faker.commerce.productName())
                .field('video', faker.internet.url())
                .field('descricao', faker.commerce.productMaterial())
                .attach('pdf_questoes', filePath)
                .attach('pdf_resolucao', filePath)
        
        expect(res.body.error).toEqual(false)
        expect(res.status).toBe(201)
        expect(res.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
        expect(res.body.data).toBeInstanceOf(Object)
        expect(res.body.data.id).toBeDefined()

    })

    it('2- Gera erro se o tipo do arquivo não for o correto.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
            .post('/aula')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .field('modulo_id', 1)
            .field('titulo', faker.commerce.productName())
            .field('video', faker.internet.url())
            .field('descricao', faker.commerce.productMaterial())
            .attach('pdf_questoes', filePath)
            .attach('pdf_resolucao', filePathTypeErrado)
        
            expect(res.body.error).toEqual(true)
            expect(res.status).toBe(400)
            expect(res.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it('3- Gera erro se o moduo_id não existir.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
            .post('/aula')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .field('modulo_id', 1222)
            .field('titulo', faker.commerce.productName())
            .field('video', faker.internet.url())
            .field('descricao', faker.commerce.productMaterial())
            .attach('pdf_questoes', filePath)
            .attach('pdf_resolucao', filePath)
        
        expect(res.body.error).toEqual(true)
        expect(res.status).toBe(404)
        expect(res.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")


    })
})

describe('POST /aula/status - Coloca o status de feito para uma tarefa de um certo aluno.', () => {
    
    it.skip('1- Deve atualizar o status do aluno, para fazer com que certa aula tenha sido feita por ele.', async () => {
        const status = {
            aluno_id: 2, 
            aula_id: 3,
            feito: true, 
        }
        const res = await request(app)
            .post('/aula/status')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send(status)
        
        expect(res.body.error).toEqual(false)
        expect(res.status).toBe(201)
        expect(res.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
        expect(res.body.data).toBeInstanceOf(Object)
        expect(res.body.data.id).toBeDefined()

    })

    it('2- Gera erro se for uma bad request.', async () => {

        const status = {
            aluno_id: "abs", 
            aula_id: 1,
            feito: true, 
        }
        const res = await request(app)
            .post('/aula/status')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send(status)
        
        expect(res.body.error).toBe(true);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Requisição com sintaxe incorreta ou outros problemas.");
        expect(res.body.errors[0].message).toBe("ID informado não é do tipo number");
    })

    it('3-  Deve retornar erro 404 quando não encontrar um aluno.', async () => {

        const status = {
            aluno_id: 1, 
            aula_id: 1,
            feito: true, 
        }
            const res = await request(app)
            .post('/aula/status')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
            .send(status)
        
            expect(res.status).toBe(404);
            expect(res.body.code).toBe(404);
            expect(res.body.message).toBe("O recurso solicitado não foi encontrado no servidor.");
            expect(res.body.errors[0]).toBe("A aula já foi assistida.");
    })
})

describe('GET /aula/arquivo/ - busca arquivos.', () => {
    const filePath = path.resolve(process.cwd(), './src/test/arquivos/pdf.pdf');
    const filePathTypeErrado = path.resolve(process.cwd(), './src/test/arquivos/image.png');


    it('1- Deve retornar o pdf informado na requisição.', async () => {

        const res = await request(app)
            .get('/aula/arquivo/teste.pdf')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)

        expect(res.status).toBe(200);
        expect(res.headers['content-type']).toBe('application/pdf');
        expect(Buffer.isBuffer(res.body)).toBe(true);
        expect(res.body.length).toBeGreaterThan(0);

    })

    it('2- Gera erro se o pdf não existir.', async () => {

        const res = await request(app)
            .get('/aula/arquivo/naoexiste.pdf')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)
        
        expect(res.body.error).toEqual(true)
        expect(res.status).toBe(404)
        expect(res.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })
})

describe('DELETE /aula/:id - Dele uma aula através do id dela.', () => {
    it.skip('1- Deve deletar uma aula utilizando o ID.', async () => {

        const res = await request(app)
            .delete('/aula/12')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)

        expect(res.status).toBe(200);
        expect(res.body.code).toBe(200);
        expect(res.body.error).toBe(false);
        expect(res.body).toHaveProperty('data');
        expect(res.body.message).toBe("Requisição bem sucedida.");
    });
    it('2- Deve retornar erro 404 quando não encontrar uma aula', async () => {

        const res = await request(app)
            .delete('/aula/999')
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${token}`)

        expect(res.status).toBe(404);
        expect(res.body.code).toBe(404);
        expect(res.body.message).toBe("O recurso solicitado não foi encontrado no servidor.");
        expect(res.body.errors[0]).toBe("Nenhuma aula encontrada.");
    });
    
    it('3- Deve retornar erro 400 quando houver um bad request', async () => {
        const res = await request(app)
            .delete('/aula/ASduasidg')
        expect(res.body.error).toBe(true);
        expect(res.status).toBe(400);
        expect(res.body.message).toBe("Requisição com sintaxe incorreta ou outros problemas.");
        expect(res.body.errors[0].message).toBe("ID informado não é do tipo number");
    });
});