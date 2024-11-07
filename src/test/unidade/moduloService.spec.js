import { describe, expect, test } from '@jest/globals';
import { z } from "zod";

jest.mock('../../repositories/AulaRepository.js', () => ({
    modulo_exist: jest.fn(),
    create: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe("listarSchema validação", () => {
const { z } = require('zod');
const listarSchema = z.object({
    turma_id: z.preprocess((val) => Number(val), z.number({
        invalid_type_error: "Id informado não é do tipo number."
    }).int({
        message: "Id informado não é um número inteiro."
    }).positive({
        message: "Id informado não é positivo."
    })).optional(),
    titulo: z.string({
        invalid_type_error:'O titulo informado não é do tipo string.'
    }).optional(),
    descricao: z.string({
        invalid_type_error: "A descrição informada deve ser do tipo string."
    }).optional(),
    image: z.string({
        invalid_type_error: "A imagem informada deve ser do tipo string."
    }).optional()
});


    test("Deve validar com dados válidos", () => {
        const validData = {
            turma_id: 1,
            titulo: "Título do Módulo",
            descricao: "Descrição do Módulo",
            image: "https://exemplo.com/imagem.jpg"
        };

        const result = listarSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });

    test("Deve retornar erro se turma_id não for número", () => {
        const invalidData = {
            turma_id: "texto",
        };

        const result = listarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("Id informado não é do tipo number.");
    });

    test("Deve retornar erro se turma_id não for um número inteiro", () => {
        const invalidData = {
            turma_id: 1.5, 
        };

        const result = listarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("Id informado não é um número inteiro.");
    });

    test("Deve retornar erro se turma_id não for positivo", () => {
        const invalidData = {
            turma_id: -5, 
        };

        const result = listarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("Id informado não é positivo.");
    });

    test("Deve retornar erro se titulo não for string", () => {
        const invalidData = {
            titulo: 123 
        };

        const result = listarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("O titulo informado não é do tipo string.");
    });

    test("Deve retornar erro se descricao não for string", () => {
        const invalidData = {
            descricao: true 
        };

        const result = listarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("A descrição informada deve ser do tipo string.");
    });

    test("Deve retornar erro se image não for string", () => {
        const invalidData = {
            image: 12345 
        };

        const result = listarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("A imagem informada deve ser do tipo string.");
    });

    test("Deve validar com dados opcionais ausentes", () => {
        const validData = {}; 

        const result = listarSchema.safeParse(validData);
        expect(result.success).toBe(true);
    });
});
describe("listarPoIdSchema - getId validação", () => {
const { z } = require('zod');
const listarPoIdSchema = z.object({
    id: z.preprocess(
        (val) => Number(val),
        z.number({
            invalid_type_error: "Id informado não é do tipo number.",
        })
        .int({ message: "Id informado não é um número inteiro." })
        .positive({ message: "Id informado não é positivo." })
    )
});


    test("Deve passar quando id é um número inteiro positivo", () => {
        const result = listarPoIdSchema.safeParse({ id: 5 });
        expect(result.success).toBe(true);
    });

    test("Deve falhar quando id não é um número", () => {
        const result = listarPoIdSchema.safeParse({ id: "texto" });
        expect(result.success).toBe(false);
        expect(result.error.errors[0].message).toBe("Id informado não é do tipo number.");
    });

    test("Deve falhar quando id é um número decimal", () => {
        const result = listarPoIdSchema.safeParse({ id: 5.5 });
        expect(result.success).toBe(false);
        expect(result.error.errors[0].message).toBe("Id informado não é um número inteiro.");
    });

    test("Deve falhar quando id é um número negativo", () => {
        const result = listarPoIdSchema.safeParse({ id: -3 });
        expect(result.success).toBe(false);
        expect(result.error.errors[0].message).toBe("Id informado não é positivo.");
    });

    test("Deve converter string numérica para número e validar como positivo inteiro", () => {
        const result = listarPoIdSchema.safeParse({ id: "10" });
        expect(result.success).toBe(true);
    });

    test("Deve falhar quando id é zero", () => {
        const result = listarPoIdSchema.safeParse({ id: 0 });
        expect(result.success).toBe(false);
        expect(result.error.errors[0].message).toBe("Id informado não é positivo.");
    });
});

describe("inserirSchema - POST validation", () => {
const inserirSchema = z.object({
    turma_id: z.preprocess(
        (val) => Number(val),
        z.number({
            invalid_type_error: "Id informado não é do tipo number.",
        })
        .int({ message: "Id informado não é um número inteiro." })
        .positive({ message: "Id informado não é positivo." })
    ),
    titulo: z.string({
        invalid_type_error: 'O titulo informado não é do tipo string.'
    }),
    descricao: z.string({
        invalid_type_error: "A descrição informada deve ser do tipo string."
    }),
    image: z.string({
        invalid_type_error: "A imagem informada deve ser do tipo string."
    })
});

    test("Deve passar com dados válidos", () => {
        const result = inserirSchema.safeParse({
            turma_id: 10,
            titulo: "Título de Teste",
            descricao: "Descrição de Teste",
            image: "http://exemplo.com/imagem.jpg"
        });
        expect(result.success).toBe(true);
    });

    test("Deve falhar se turma_id não for um número inteiro positivo", () => {
        const result = inserirSchema.safeParse({
            turma_id: -5,
            titulo: "Título de Teste",
            descricao: "Descrição de Teste",
            image: "http://exemplo.com/imagem.jpg"
        });
        expect(result.success).toBe(false);
        expect(result.error.errors[0].message).toBe("Id informado não é positivo.");
    });

    test("Deve converter string numérica para número e validar como positivo inteiro", () => {
        const result = inserirSchema.safeParse({
            turma_id: "10",
            titulo: "Título de Teste",
            descricao: "Descrição de Teste",
            image: "http://exemplo.com/imagem.jpg"
        });
        expect(result.success).toBe(true);
    });

    test("Deve falhar se titulo não for string", () => {
        const result = inserirSchema.safeParse({
            turma_id: 10,
            titulo: 123,
            descricao: "Descrição de Teste",
            image: "http://exemplo.com/imagem.jpg"
        });
        expect(result.success).toBe(false);
        expect(result.error.errors[0].message).toBe("O titulo informado não é do tipo string.");
    });

    test("Deve falhar se descricao não for string", () => {
        const result = inserirSchema.safeParse({
            turma_id: 10,
            titulo: "Título de Teste",
            descricao: 456,
            image: "http://exemplo.com/imagem.jpg"
        });
        expect(result.success).toBe(false);
        expect(result.error.errors[0].message).toBe("A descrição informada deve ser do tipo string.");
    });

    test("Deve falhar se image não for string", () => {
        const result = inserirSchema.safeParse({
            turma_id: 10,
            titulo: "Título de Teste",
            descricao: "Descrição de Teste",
            image: 789
        });
        expect(result.success).toBe(false);
        expect(result.error.errors[0].message).toBe("A imagem informada deve ser do tipo string.");
    });

    test("Deve falhar se turma_id for um número decimal", () => {
        const result = inserirSchema.safeParse({
            turma_id: 10.5,
            titulo: "Título de Teste",
            descricao: "Descrição de Teste",
            image: "http://exemplo.com/imagem.jpg"
        });
        expect(result.success).toBe(false);
        expect(result.error.errors[0].message).toBe("Id informado não é um número inteiro.");
    });

    test("Deve falhar se turma_id for zero", () => {
        const result = inserirSchema.safeParse({
            turma_id: 0,
            titulo: "Título de Teste",
            descricao: "Descrição de Teste",
            image: "http://exemplo.com/imagem.jpg"
        });
        expect(result.success).toBe(false);
        expect(result.error.errors[0].message).toBe("Id informado não é positivo.");
    });
});

describe("atualizarSchema", () => {
const atualizarSchema = z.object({
    turma_id: z.preprocess((val) => Number(val), z.number({
        invalid_type_error: "Id informado não é do tipo number.",
    }).int({
        message: "Id informado não é um número inteiro."
    }).positive({
        message: "Id informado não é positivo."
    })).optional(),
    titulo: z.string({
        invalid_type_error: 'O titulo informado não é do tipo string.'
    }).optional(),
    descricao: z.string({
        invalid_type_error: "A descrição informada deve ser do tipo string."
    }).optional(),
    image: z.string({
        invalid_type_error: "A imagem informada deve ser do tipo string."
    }).optional()
});


    test("deve passar com todos os campos válidos", () => {
        const validData = {
            turma_id: 1,
            titulo: "Título válido",
            descricao: "Descrição válida",
            image: "Imagem válida"
        };
        expect(atualizarSchema.safeParse(validData).success).toBe(true);
    });

    test("deve passar com campos opcionais ausentes", () => {
        const dataWithMissingFields = {};
        expect(atualizarSchema.safeParse(dataWithMissingFields).success).toBe(true);
    });

    test("deve falhar se turma_id não for um número", () => {
        const invalidData = { turma_id: "abc" };
        const result = atualizarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("Id informado não é do tipo number.");
    });

    test("deve falhar se turma_id não for um número inteiro positivo", () => {
        const invalidData = { turma_id: -1 };
        const result = atualizarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("Id informado não é positivo.");
    });

    test("deve falhar se titulo não for uma string", () => {
        const invalidData = { titulo: 123 };
        const result = atualizarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("O titulo informado não é do tipo string.");
    });

    test("deve falhar se descricao não for uma string", () => {
        const invalidData = { descricao: 123 };
        const result = atualizarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("A descrição informada deve ser do tipo string.");
    });

    test("deve falhar se image não for uma string", () => {
        const invalidData = { image: 123 };
        const result = atualizarSchema.safeParse(invalidData);
        expect(result.success).toBe(false);
        expect(result.error.issues[0].message).toBe("A imagem informada deve ser do tipo string.");
    });
});

describe("deletarSchema", () => {
const deletarSchema = z.object({
  id: z.preprocess(
    (val) => Number(val),
    z.number({
      invalid_type_error: "Id informado não é do tipo number.",
    })
      .int({ message: "Id informado não é um número inteiro." })
      .positive({ message: "Id informado não é positivo." })
  ),
});

  test("Deve passar com um número inteiro positivo", () => {
    const resultado = deletarSchema.safeParse({ id: 5 });
    expect(resultado.success).toBe(true);
  });

  test("Deve falhar se o id não for um número", () => {
    const resultado = deletarSchema.safeParse({ id: "abc" });
    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      expect(resultado.error.issues[0].message).toBe("Id informado não é do tipo number.");
    }
  });

  test("Deve falhar se o id não for um número inteiro", () => {
    const resultado = deletarSchema.safeParse({ id: 5.5 });
    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      expect(resultado.error.issues[0].message).toBe("Id informado não é um número inteiro.");
    }
  });

  test("Deve falhar se o id for um número negativo", () => {
    const resultado = deletarSchema.safeParse({ id: -5 });
    expect(resultado.success).toBe(false);
    if (!resultado.success) {
      expect(resultado.error.issues[0].message).toBe("Id informado não é positivo.");
    }
  });

  test("Deve converter string numérica para número e validar com sucesso", () => {
    const resultado = deletarSchema.safeParse({ id: "10" });
    expect(resultado.success).toBe(true);
  });
});