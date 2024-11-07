import { z } from 'zod';

export const user_turma_Schema = z.object({
    turma_id: z.number().int().min(1), 
    usuario_id: z.number().int(),
});

// Esquema para atualizações, permitindo campos parciais
export const inserirTurmaSchema = user_turma_Schema.partial();