import { describe, expect, test } from '@jest/globals';
import { z } from "zod";

const listarSchema = z.object({
  id: z.preprocess(
    (val) => Number(val), 
    z.number({
      invalid_type_error: "Id informado não é do tipo number.",
    }).int({
      message: "Id informado não é um número inteiro."
    }).positive({
      message: "Id informado não é positivo."
    })
  ).optional(),
  nome: z.string({
    invalid_type_error: 'O nome informado não é do tipo string.'
  }).optional(),
});

const listar = async () => {
  return {
    id: 1,
    nome: "Teste"
  };
};

describe("Teste GET com listarSchema", () => {
  test("Deve validar os dados retornados pelo listar", async () => {
    const data = await listar();

    const resultado = listarSchema.safeParse(data);

    expect(resultado.success).toBe(true);
    if (!resultado.success) {
      console.error(resultado.error.errors);
    }
  });

  test("Deve falhar se o ID não for um número positivo", async () => {
    const data = { id: -1, nome: "Teste" };

    const resultado = listarSchema.safeParse(data);

    expect(resultado.success).toBe(false);
    expect(resultado.error.errors[0].message).toBe("Id informado não é positivo.");
  });

  test("Deve falhar se o nome não for uma string", async () => {
    const data = { id: 1, nome: 123 };

    const resultado = listarSchema.safeParse(data);

    expect(resultado.success).toBe(false);
    expect(resultado.error.errors[0].message).toBe("O nome informado não é do tipo string.");
  });

const listarPoIdSchema = z.object({
  id: z.preprocess(
    (val) => Number(val), 
    z.number({
      invalid_type_error: "Id informado não é do tipo number.",
    }).int({
      message: "Id informado não é um número inteiro."
    }).positive({
      message: "Id informado não é positivo."
    })
  ),
});

const getById = async (id) => {
  return { id };
};

describe("Teste GET para getById com listarPoIdSchema", () => {
  test("Deve validar um ID positivo corretamente", async () => {
    const data = await getById(1);
    const resultado = listarPoIdSchema.safeParse(data);
    expect(resultado.success).toBe(true);
    if (!resultado.success) {
      console.error(resultado.error.errors);
    }
  });

  test("Deve falhar se o ID não for um número", async () => {
    const data = { id: "abc" };
    const resultado = listarPoIdSchema.safeParse(data);
    expect(resultado.success).toBe(false);
    expect(resultado.error.errors[0].message).toBe("Id informado não é do tipo number.");
  });

  test("Deve falhar se o ID não for um número inteiro", async () => {
    const data = { id: 1.5 };
    const resultado = listarPoIdSchema.safeParse(data);
    expect(resultado.success).toBe(false);
    expect(resultado.error.errors[0].message).toBe("Id informado não é um número inteiro.");
  });

  test("Deve falhar se o ID não for positivo", async () => {
    const data = { id: -1 };
    const resultado = listarPoIdSchema.safeParse(data);
    expect(resultado.success).toBe(false);
    expect(resultado.error.errors[0].message).toBe("Id informado não é positivo.");
  });
});

const atualizarSchema = z.object({
  id: z.preprocess(
    (val) => Number(val),
    z.number({
      invalid_type_error: "Id informado não é do tipo number.",
    }).int({
      message: "Id informado não é um número inteiro."
    }).positive({
      message: "Id informado não é positivo."
    })
  ).optional(),
  nome: z.string({
    invalid_type_error: 'O nome informado não é do tipo string.'
  }).optional(),
});

describe("Teste PATCH para atualizar com atualizarSchema", () => {
  test("Deve validar dados válidos de atualização", async () => {
    const data = { id: 1, nome: "Novo Nome" };
    const resultado = atualizarSchema.safeParse(data);

    expect(resultado.success).toBe(true);
    if (!resultado.success) {
      console.error(resultado.error.errors);
    }
  });

  test("Deve validar com sucesso apenas com o nome", async () => {
    const data = { nome: "Outro Nome" };
    const resultado = atualizarSchema.safeParse(data);

    expect(resultado.success).toBe(true);
    if (!resultado.success) {
      console.error(resultado.error.errors);
    }
  });

  test("Deve falhar se o ID não for um número", async () => {
    const data = { id: "abc", nome: "Nome Válido" };
    const resultado = atualizarSchema.safeParse(data);

    expect(resultado.success).toBe(false);
    expect(resultado.error.errors[0].message).toBe("Id informado não é do tipo number.");
  });

  test("Deve falhar se o ID não for um número inteiro", async () => {
    const data = { id: 1.5, nome: "Nome Válido" };
    const resultado = atualizarSchema.safeParse(data);

    expect(resultado.success).toBe(false);
    expect(resultado.error.errors[0].message).toBe("Id informado não é um número inteiro.");
  });

  test("Deve falhar se o ID não for positivo", async () => {
    const data = { id: -1, nome: "Nome Válido" };
    const resultado = atualizarSchema.safeParse(data);

    expect(resultado.success).toBe(false);
    expect(resultado.error.errors[0].message).toBe("Id informado não é positivo.");
  });

  test("Deve falhar se o nome não for uma string", async () => {
    const data = { id: 1, nome: 123 };
    const resultado = atualizarSchema.safeParse(data);

    expect(resultado.success).toBe(false);
    expect(resultado.error.errors[0].message).toBe("O nome informado não é do tipo string.");
  });
});


});
