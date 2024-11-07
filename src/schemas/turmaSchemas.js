import { z } from 'zod';

class TurmaSchema{

  static listarPoIdSchema = z.object({
    id: z.preprocess((val) => Number(val), z.number({
        invalid_type_error: "Id informado não é do tipo number.",
    }).int({
        message: "Id informado não é um número inteiro."
    }).positive({
        message: "Id informado não é positivo."
    }))
});

static listarSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number({
      invalid_type_error: "Id informado não é do tipo number.",
  }).int({
      message: "Id informado não é um número inteiro."
  }).positive({
      message: "Id informado não é positivo."
  })).optional(),
  nome: z.string({
      invalid_type_error:'O nome informado não é do tipo string.'
  }).optional(),

});

static atualizarSchema = z.object({
  id: z.preprocess((val) => Number(val), z.number({
      invalid_type_error: "Id informado não é do tipo number.",
  }).int({
      message: "Id informado não é um número inteiro."
  }).positive({
      message: "Id informado não é positivo."
  })).optional(),
  nome: z.string({
      invalid_type_error:'O nome informado não é do tipo string.'
  }).optional(),

});

}

export default TurmaSchema;
