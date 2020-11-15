const {expect} = require('chai')
const {expect_json} = require('chai-json')
const testServer = require('../test-helpers/test-server')
const testDb = require('../test-helpers/test-db')

describe('GET /vehicleTypes and GET /vehicle-types/id', function() {
    testServer.useInTest()
    testDb.useInTest()
    
    it('responds with 200 { vehicle-types }', async function() {
        const api = this.api
        
        // Create three todos
        await api.post('/vehicle-types/create', { description: 'Vehicle Type eletrico', autonomy: 100 , costPerKilometer: 2, averageCost: 12, averageSpeed: 60, fuelType: 'Eletrico' })
        await api.post('/vehicle-types/create', { description: 'Vehicle Type gasoleo', autonomy: 60 , costPerKilometer: 20, averageCost: 40, averageSpeed: 60, fuelType: 'Gasoleo' })
        await api.post('/vehicle-types/create', { description: 'Vehicle Type gasolina', autonomy: 50 , costPerKilometer: 30, averageCost: 60, averageSpeed: 60, fuelType: 'Gasolina' })

        // Make the actual request to GET /todos
        const response = await api.get('/vehicle-types')
        
       
        // Assert status code 200
        expect(response).to.have.property('status', 200)
        
        // Assert that all three todos are included
        expect(response)
            .to.have.nested.property('data')
            .that.is.an('array')
            .with.lengthOf(3)
        const types = response.data
        // Assert that every todo contains all desired fields
        types.forEach(types => {
            expect(types)
                .to.have.property('description')
                .that.is.a('string')
            expect(types)
            .to.have.property('autonomy')
            .that.is.a('number')
            expect(types)
            .to.have.property('costPerKilometer')
            .that.is.a('number')
            expect(types)
                .to.have.property('averageCost')
                .that.is.a('number')
            expect(types)
                .to.have.property('fuelType')
        })
        // Assert that todos are listed in order of creation
        expect(types.map(types => types.description)).to.deep.equal([
            'Vehicle Type eletrico',
            'Vehicle Type gasoleo',
            'Vehicle Type gasolina'
        ])
        
        const id = response.data[0]._id
        const response_id = await api.get(`/vehicle-types/${id}`)
        expect(response_id.data.description).to.deep.equals('Vehicle Type eletrico')
    })
})

