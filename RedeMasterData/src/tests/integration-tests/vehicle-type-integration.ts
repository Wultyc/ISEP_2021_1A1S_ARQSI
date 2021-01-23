import chai from 'chai';
import { describe } from 'mocha';
import { app } from '../../app';
import chaiHttp from 'chai-http';
import 'mocha';
import VehicleType from '../../models/mongo/VehicleType'
process.env.APP_PORT = "3000"
chai.use(chaiHttp)
const expect = chai.expect;


let result: any;
describe('Get /vehicle-types', () => {
    before( () => {
        return VehicleType.collection.drop()
       });
    it('verfiies corret create', async () => {

        result = await chai.request(app)
            .post('/api/vehicle-types')
            .send({
                description: 'Tipo de veiculo',
                autonomy: 50,
                costPerKilometer: 50,
                averageCost: 50,
                averageSpeed: 50,
                fuelType: 'Gasoleo'
            })
        expect(result).to.have.status(200);
        expect(result.body).to.have.property('description', 'Tipo de veiculo')
        expect(result.body).to.have.property('autonomy', 50)
        expect(result.body).to.have.property('costPerKilometer', 50)
        expect(result.body).to.have.property('averageCost', 50)
        expect(result.body).to.have.property('averageSpeed', 50)
        expect(result.body).to.have.property('fuelType', 'Gasoleo')
    });
    it('verfiies error create', async () => {

        result = await chai.request(app)
            .post('/api/vehicle-types')
            .send({
                description: 'Tipo de veiculo error',
                autonomy: 50,
                costPerKilometer: 50,
                averageCost: 50,
                averageSpeed: 50,
                fuelType: 'Azeite'
            })
        expect(result).to.have.status(400);
        expect(result.body[0]).to.equal('Fuel type Azeite is not allowed')
    });
    it('verfiies error create with nulls', async () => {

        result = await chai.request(app)
            .post('/api/vehicle-types')
            .send({
                description: 'Tipo de veiculo error',
                autonomy: 50
            })
        expect(result).to.have.status(400);
        expect(result.body.message).to.equal('some fields are missing or have invalid values')
    });
    it('verifies correct get', async function () {
        result = await chai.request(app)
            .get('/api/vehicle-types')
        expect(result).to.have.status(200);
    })
})