// src/routes/index.js
export default (app) => {
    app.get('/', (req, res) => {
      res.send('Olá, mundo!');
    });
  
    // Defina outras rotas aqui, por exemplo:
    app.get('/users', (req, res) => {
      res.json({ users: [] });
    });
  };
  