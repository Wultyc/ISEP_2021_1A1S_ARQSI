import chai from 'chai';
import { describe } from 'mocha';
import { app } from '../../app';
import chaiHttp from 'chai-http';
import 'mocha';
import fs from 'fs';
import path from 'path';
import {config} from 'node-config-ts'
import TripulantType from '../../models/mongo/TripulantType';
process.env.APP_PORT = "3000"
chai.use(chaiHttp)
const expect = chai.expect;

let result: any;
describe('Get /vehicle-types', () => {    
    before(() => {
        const data = `DB_CONNECT=${config.app.defaultMongooseConnStringTst}`
        fs.writeFileSync(path.join(path.resolve('./'), ".env"), data);

        return TripulantType.collection.drop()
    });
    after(() => {
        fs.unlinkSync(path.join(path.resolve('./'), ".env"));
        return TripulantType.collection.drop()
    })
    it('verfiies corret create', async () => {

        result = await chai.request(app)
            .post('/api/tripulant-types')
            .send({
                description: 'Tipo de tripulante',
            })
        expect(result).to.have.status(200);
        expect(result.body).to.have.property('description', 'Tipo de tripulante')
    });
    it('verfiies error create with nulls', async () => {

        result = await chai.request(app)
            .post('/api/tripulant-types')
            .send({
            })
        expect(result).to.have.status(400);
        expect(result.body.message).to.equal('some fields are missing or have invalid values')
    });
    it('verifies correct get', async function () {
        result = await chai.request(app)
            .get('/api/tripulant-types')
        expect(result).to.have.status(200);
    })
})