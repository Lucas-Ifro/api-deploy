import { z } from 'zod'

class AulaSchema{
    static listarSchema = z.object({
            titulo: z.string({
                message: "Precisa ser uma String"
            }).optional(),

            aluno_id: z.number({
                invalid_type_error: "ID do aluno deve ser um número",
            }).positive({
                message: "ID do aluno deve ser um número positivo"
            }).optional().nullable(),

            modulo_id: z.number({
                invalid_type_error: "ID do módulo deve ser um número",
            }).positive({
                message: "ID do módulo deve ser um número positivo"
            }).optional().nullable(),
            page: z.number().min(1),  
            perPage: z.number().min(1)
        });
    
    static listarPorIdSchema = z.object({
            id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro"
            }).positive({
                message: "ID informado não é positivo"
            }))
        })

    static feito_status= z.object({
            //ALUNO_ID
            aluno_id: z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro",
            }).positive({
                message: "ID informado não é positivo",
            }),
            //AULA_ID
            aula_id:z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro",
            }).positive({
                message: "ID informado não é positivo",
            }),
            //FEITO
            feito:z.boolean({
                invalid_type_error: "O campo 'ativo' deve ser um booleano", 
              })
            });

    static schemaInsert = z.object({
        modulo_id: z.coerce.number().int(),
        titulo: z.string().max(100).nullish(),
        video: z.string().url().max(240),
        pdf_questoes: z.string().max(200).optional(),
        pdf_resolucao: z.string().max(200).optional(),
        descricao: z.string()
      })

     static UpdateSchema = z.object({
            //ID
            id: z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro",
            }).positive({
                message: "ID informado não é positivo",
            }),
            // MODULO_ID
            modulo_id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro"
            }).positive({
                message: "ID informado não é positivo"
            })),
            // TITULO
            titulo: z.string({
                invalid_type_error: "Título precisa ser uma String",
            }).min(1).max(100).optional(),
            // VIDEO
            video: z.string({
                invalid_type_error: "Video precisa ser uma String",
            }).url({
                message: "URL inválida",
            }).max(240).optional(),
            // PDF_QUESTÕES
            pdf_questoes: z.string({
                invalid_type_error: "PDF de questões precisa ser uma String",
            }).max(200).optional(),
            // PDF_RESOLUCAO
            pdf_resolucao: z.string({
                invalid_type_error: "PDF de resolução precisa ser uma String",
            }).max(200).optional(),
            // DESCRICAO
            descricao: z.string({
                invalid_type_error: "Descrição precisa ser uma String",
            }).optional(),
        });
        static Delet = z.object({
            id: z.preprocess((val) => Number(val), z.number({
                invalid_type_error: "ID informado não é do tipo number",
            }).int({
                message: "ID informado não é um número inteiro"
            }).positive({
                message: "ID informado não é positivo"
            }))
        })
}

export default AulaSchema;