import request from "supertest";
import { describe, expect, it} from '@jest/globals';
import app from '../../app.js'


describe('Teste de Autenticação', () => {

    it("1-Deve chamar a rota de autenticação e pegar o token", async () => {
        const res = await request(app)
        .post('/login')
        .set("Accept", "aplication/json")
        .send({
            matricula:"12345",
            senha:"senhatest"
        })
        expect(res.status).toBe(200)
    })

    it("1-Deve retornar um erro quando o usuario não existir", async () => {
        const req = await request(app)
        .post('/login')
        .set("Accept", "aplication/json")
        .send({
            matricula:"12343453453535",
            senha:"senhatest"
        })
        expect(req.status).toBe(401)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Cliente sem credenciais para acessar o recurso solicitado.")
        expect(req.body.errors[0].message).toEqual("Usuario não exite na base de dados verifique se a matricula esta correto!")
    })

    it("1-Deve deve retornar um erro quando a senha estiver errada", async () => {
        const req = await request(app)
        .post('/login')
        .set("Accept", "aplication/json")
        .send({
            matricula:"12345",
            senha:"senhaerrada"
        })
        expect(req.status).toBe(401)
        expect(req.body.error).toEqual(true)
        expect(req.body.message).toEqual("Cliente sem credenciais para acessar o recurso solicitado.")
        expect(req.body.errors[0].message).toEqual("Senha informada esta incorreta!")
    })
});
