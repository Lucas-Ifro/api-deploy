import request from "supertest";
import { describe, expect, it } from '@jest/globals';
import app from '../../app.js';
import faker from "faker-br"
import Faker from "faker-br/lib/index.js";


describe.skip('GET /turma', () => {
    
    it('1 - Deve retornar uma lista com todas as turmas', async () => {
        const req = await request(app)
            .get('/turma') 
        
        expect(req.status).toBe(200); 
        expect(req.body.error).toBe(false); 
        expect(req.body.message).toEqual({"message": "Turmas encontrado(a)."});
    });

    it('2 - Deve retornar um erro quando nenhuma turma for encontrada', async () => {
        
        const req = await request(app)
            .get('/turma')
            .query({ titulo: null }); 
        
        expect(req.status).toBe(200);
        expect(req.body.error).toBe(false); 
        expect(req.body.message).toEqual({"message": "Turmas encontrado(a)."}); 
    });
});

  describe.skip('get turma por id', () => {
  it("1-deve retornar uma turma.", async () => {
      const req = await request(app)
      .get('/turma/1')
      expect(req.body.error).toEqual(false)
      expect(req.status).toBe(200)
      expect(req.body.message).toEqual("Requisição bem sucedida.")
      expect(req.body.data).toBeInstanceOf(Object)
      expect(req.body.data.id).toBeDefined()
      expect(req.body.data.titulo).toBeDefined()
      expect(req.body.data.usuario_has_turma).toBeDefined()
  })

  it("2-deve retornar um erro quando nem uma turma for encontrada.", async () => {
      const req = await request(app)
      .get('/turma/89898981')
      expect(req.body.error).toEqual(true)
      expect(req.status).toBe(400)
      expect(req.body.message).toEqual( {"message": "Turma não encontrado(a)."})
  })
});

describe.skip('create turma', () => {
  it("1-deve retornar uma turma.", async () => {
      const req = await request(app)
      .post('/turma')
      .send({
          id:23,
          titulo: faker.name.findName(),
      })

      expect(req.body.error).toEqual(false)
      expect(req.status).toBe(201)
      expect(req.body.message).toEqual( {"message": "Turma criado(a) com sucesso."})
      expect(req.body.data).toBeInstanceOf(Object)
      expect(req.body.data.id).toBeDefined()
      expect(req.body.data.titulo).toBeDefined()
  })

  it("2-deve retornar um erro quando turma já existir.", async () => {
      const req = await request(app)
      .post('/turma')
      .send({
          id:22,
          titulo: faker.name.findName(),
      })
      expect(req.body.error).toEqual(true)
      expect(req.status).toBe(500)
      expect(req.body.message).toEqual(undefined)
  });
});

describe.skip('patch turma', () => {
  it("1-deve atualizar os dados de uma turma.", async () => {
      const req = await request(app)
      .patch(`/turma/90`)
      .send({
          titulo: faker.name.findName()
      })
      
      expect(req.body.error).toEqual(false)
      expect(req.status).toBe(201)
      expect(req.body.message).toEqual("Requisição bem sucedida, recurso foi criado")
      expect(req.body.data).toBeInstanceOf(Object)
      expect(req.body.data.id).toBeDefined()
      expect(req.body.data.titulo).toBeDefined()
  })

  it("2-deve retornar um erro casa a turma não exista.", async () => {
      const req = await request(app)
      .patch('/turma/20909090')
      .send({
          titulo: faker.name.findName(),
      })
      expect(req.body.error).toEqual(true)
      expect(req.status).toBe(500)
      expect(req.body.message).toEqual("Servidor encontrou um erro interno.")
  })
})