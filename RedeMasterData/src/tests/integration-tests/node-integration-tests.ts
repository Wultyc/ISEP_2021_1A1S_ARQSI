import chai from 'chai';
import { describe } from 'mocha';
import { app } from '../../app';
import chaiHttp from 'chai-http';
import 'mocha';
import fs from 'fs';
import path from 'path';
import {config} from 'node-config-ts'
import Node from '../../models/mongo/Node'
process.env.APP_PORT = "3000"
chai.use(chaiHttp)
const expect = chai.expect;
import { mongooseLoader } from '../../loaders/mongoose'

let result: any;
describe('Create /nodes', () => {
    before(() => {
        const data = `DB_CONNECT=${config.app.defaultMongooseConnStringTst}`
        fs.writeFileSync(path.join(path.resolve('./'), ".env"), data);

        return Node.collection.drop()
    });
    after(() => {
        fs.unlinkSync(path.join(path.resolve('./'), ".env"));
        return Node.collection.drop()
    })

    it('verfiies corret create', async () => {
        result = await chai.request(app)
            .post('/api/nodes')
            .send({
                shortName: 'GNDIntegration',
                name: 'name',
                longitude: '50',
                latitude: '50',
                collectionNode: false,
                surrenderNode: false
            })
        expect(result).to.have.status(200);
        expect(result.body).to.have.property('shortName', 'GNDIntegration')
        expect(result.body).to.have.property('name', 'name')
        expect(result.body).to.have.property('longitude', 50)
        expect(result.body).to.have.property('latitude', 50)
        expect(result.body).to.have.property('collectionNode', false)
        expect(result.body).to.have.property('surrenderNode', false)
    });
    it('verifies nulls in node', async () => {
        result = await chai.request(app)
            .post('/api/nodes')
            .send({
                shortName: 'GNDIntegration',
            })
        expect(result).to.have.status(400);

        expect(result.body.message).to.equal('some fields are missing or have invalid values')
    });
    it('verifies validation failed', async () => {
        result = await chai.request(app)
            .post('/api/nodes')
            .send({
                shortName: 'Validation Failed',
                name: 'name',
                longitude: '50',
                latitude: '50',
                collectionNode: false,
                surrenderNode: true
            })
        expect(result).to.have.status(400);

        expect(result.body[0]).to.equal('A Surrender Node must always be a Collection Node.')
    });
})