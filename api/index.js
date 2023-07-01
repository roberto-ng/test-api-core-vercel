import express from 'express';
import supertest from 'supertest';
import dotenv from 'dotenv';
import { runTest } from '../login/tk_project.js'

const app = express();
const request = supertest(app);

dotenv.config();

app.get('/executar-teste', async (req, res) => {
  try {
    const token = await runTest();
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao executar o teste.' });
  }
});

app.get('/', async (req, res) => {
    return res.json({
      success:true,
      message:"Sucesso."
    })
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
