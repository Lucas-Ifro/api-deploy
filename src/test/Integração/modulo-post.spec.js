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


describe.skip('POST modulo - Criando modulos.', () => {
    const filePath = path.resolve(process.cwd(), './src/test/arquivos/image.png');
    const filePathTypeErrado = path.resolve(process.cwd(), './src/test/arquivos/pdf.pdf');


    it('1-Cria um novo modulo e envia a imagem do modulo.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/modulo')
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .field('turma_id', 1)
                .field('titulo', faker.commerce.productName())
                .field('descricao', faker.commerce.productMaterial())
                .attach('imagem', filePath)
        
        expect(res.body.error).toEqual(false)
        expect(res.status).toBe(201)
        expect(res.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
        expect(res.body.data).toBeInstanceOf(Object)
        expect(res.body.data.id).toBeDefined()
    })

    it('2-Gera erro quando o arquivo enviado não for uma imagem.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/modulo')
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .field('turma_id', 1)
                .field('titulo', faker.commerce.productName())
                .field('descricao', faker.commerce.productMaterial())
                .attach('imagem', filePathTypeErrado)
        
            expect(res.body.error).toEqual(true)
            expect(res.status).toBe(400)
            expect(res.body.message).toEqual("Requisição com sintaxe incorreta ou outros problemas.")
    })

    it('3-Gera erro quando o turma_id não existir.', async () => {

        fs.promises.access(filePath)
            const res = await request(app)
                .post('/modulo')
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${token}`)
                .field('turma_id', 1000000)
                .field('titulo', faker.commerce.productName())
                .field('descricao', faker.commerce.productMaterial())
                .attach('imagem', filePath)
        
        expect(res.body.error).toEqual(true)
        expect(res.status).toBe(404)
        expect(res.body.message).toEqual("O recurso solicitado não foi encontrado no servidor.")
    })
})