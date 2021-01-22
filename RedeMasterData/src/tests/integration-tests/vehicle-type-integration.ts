import chai from 'chai';
import { describe }  from 'mocha';
import { app } from '../../app';
import chaiHttp from 'chai-http';
import 'mocha';
import { types } from 'joi';
process.env.APP_PORT = "3000"
chai.use(chaiHttp)
const expect = chai.expect;
let result: any;
describe('Get /vehicle-types', function() {
    it('verifies correct create', async function() {
      result = await chai.request(app)
      .get('/api/vehicle-types')
   
    expect(result).to.have.status(200);
})
})