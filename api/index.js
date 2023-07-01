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

app.get('/test', async (req, res) => {
  describe('Users', () => {

    it('POST /TK-PROJECT', (done) => {
      let data = {
        "secretKey": process.env.SECRET_KEY,
        "boundId": process.env.BOUND_ID
      }

      request.post(`/oauth/projects`).send(data).end((err, response) => {
        if (err) {
          done(err);
        } else {
          const token = response.body.data.token;
          done();
        }
      });
    });
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
