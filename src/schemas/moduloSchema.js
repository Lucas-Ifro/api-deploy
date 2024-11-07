import {z} from 'zod'

class moduloSchema {
  static inserirSchema = z.object({
    turma_id: z.preprocess((val) => Number(val), z.number({
        invalid_type_error: "Id informado não é do tipo number.",
    }).int({
        message: "Id informado não é um número inteiro."
    }).positive({
        message: "Id informado não é positivo."
    })),
    titulo: z.string({
        invalid_type_error:'O titulo informado não é do tipo string.'
    }),
    descricao: z.string({
        invalid_type_error: "A descrição informada deve ser do tipo string."
    }),
    image: z.string({
        invalid_type_error: "A imagem informada deve ser do tipo string."
    })
    });

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
        turma_id: z.preprocess((val) => Number(val), z.number({
            invalid_type_error: "Id informado não é do tipo number.",
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

        static atualizarSchema = z.object({
            turma_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "Id informado não é do tipo number.",
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

            static deletarSchema = z.object({
                id: z.preprocess((val) => Number(val), z.number({
                    invalid_type_error: "Id informado não é do tipo number.",
                }).int({
                    message: "Id informado não é um número inteiro."
                }).positive({
                    message: "Id informado não é positivo."
                }))
            });

}
export default moduloSchema;
