import express from 'express';
import supertest from 'supertest';
import dotenv from 'dotenv';
import { runTest } from '../login/tk_project.js'
import supertest from "supertest";
import dotenv from 'dotenv'
import { describe, it } from 'mocha'; // Importe a biblioteca Mocha
dotenv.config()

const request = supertest('https://api.norwaydigital.com.br/prod/v1');


const app = express();


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
