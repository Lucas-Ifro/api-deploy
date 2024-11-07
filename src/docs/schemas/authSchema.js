const authSchemas = {
    RespostaLogin: {
        type: "object",
        properties: {
            token: {
                type: "string",
                description: "Token JWT para autenticação",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0YTYzMjIwOTg4NWQ4ZTgzNzhlZTU5MCIsIm5vbWUiOiJKb8OjbyBkYSBTaWx2YSIsImVtYWlsIjoiam9hb0BlbWFpbC5jb20iLCJpYXQiOjE2ODg3NzQwMjMsImV4cCI6MTY4ODc4MTIyM30.iZvQN6NiGQ9GE1W2UpdUTv5YbDHH8ULsOyLtEockkqc"
            },
            usuario: {
                $ref: "#/components/schemas/UsuarioDetalhes"
            }
        }
    }
};

export default authSchemas;
