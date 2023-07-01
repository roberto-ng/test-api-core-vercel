import supertest from "supertest";
import dotenv from 'dotenv'
import { z } from 'zod';

dotenv.config()

const request = supertest('https://api.norwaydigital.com.br/prod/v1');

// gere um schema usando o https://transform.tools/json-to-zod

// schema usado para validar a resposta
const schema = z.object({
  data: z.object({
    logIn: z.boolean(),
    type: z.string(),
    token: z.string(),
    expire: z.string()
  }),
  message: z.string(),
  erro: z.object({})
})

export const runTest = async () => {
  let data = {
    "secretKey": process.env.SECRET_KEY,
    "boundId": process.env.BOUND_ID
  };

  const res = await request.post(`/oauth/projects`).send(data).expect(201);
  // validar dados (isso dá lança um erro se a resposta estiver foda do padrão definido no schema)
  const dadosValidados = schema.parse(res.body);
  return dadosValidados;
}
