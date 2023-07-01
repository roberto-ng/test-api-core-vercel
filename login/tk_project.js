import supertest from "supertest";
import dotenv from 'dotenv'
import { describe, it } from 'mocha'; // Importe a biblioteca Mocha
dotenv.config()

const request = supertest('https://api.norwaydigital.com.br/prod/v1');

export const runTest = async () => {
    describe('Users', () => {

        it('POST /TK-PROJECT', (done) => { // Use a função 'done' para indicar quando o teste foi concluído

            let data = {
                "secretKey": process.env.SECRET_KEY,
                "boundId": process.env.BOUND_ID
            }

            request.post(`/oauth/projects`).send(data).end((err, res) => {
                if (err) {
                    done(err); // Chame a função 'done' com o erro, se houver
                } else {
                    const token = res.body.data.token;
                    done(); // Chame a função 'done' para indicar que o teste foi concluído com sucesso
                }
            })
        })

    })
}
