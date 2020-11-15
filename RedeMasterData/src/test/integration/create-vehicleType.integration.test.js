const { expect } = require('chai')
const { _expect } = require('chai').use(require('chai-as-promised'))
const util = require('util')

const testServer = require('../test-helpers/test-server')
const testDb = require('../test-helpers/test-db')

describe('POST /vehicle-types', function() {
    testServer.useInTest()
    testDb.useInTest()

    it('responds with 400 ValidationError if fields are missing', async function() {
        const api = this.api
        const response = await expect(api.post('/vehicle-types/create', { })).to.eventually.be.rejected        
        expect(response.response).to.have.property('status', 400)
        const errors = response.response.data.errors

        expect(errors.description).to.have.property('message').to.deep.equals('Insert a description.')
        expect(errors.autonomy).to.have.property('message').to.deep.equals('Insert the autonomy.')
        expect(errors.costPerKilometer).to.have.property('message').to.deep.equals('Insert the cost per kilometer.')
        expect(errors.averageCost).to.have.property('message').to.deep.equals('Insert the average cost.')
        expect(errors.averageSpeed).to.have.property('message').to.deep.equals('Insert a average speed.')
        expect(errors.fuelType).to.have.property('message').to.deep.equals('Insert the fuel type.')

    })

    // it('surrender Node must always be a collection Node', async function() {
    //     const api = this.api
    //     const response = await expect(api.post('/nodes/create', {shortName: 'Node 10',longitude: '40' , latitude: '20', collectionNode: false, surrenderNode: true })).to.eventually.be.rejected
        
    //     expect(response.response).to.have.property('status', 400)        
    //     expect(response.response.data).to.deep.equals('A Surrender Node must always be a Collection Node.')


    // })

    it('verifies correct create', async function() {
        const api = this.api
        const response = (await api.post('/vehicle-types/create', { description: 'Vehicle Type eletrico', autonomy: 100 , costPerKilometer: 2, averageCost: 12, averageSpeed: 60, fuelType: 'Eletrico' }))
        expect(response).to.have.property('status', 201)
        expect(response.data).to.have.property('description', 'Vehicle Type eletrico')
        expect(response.data).to.have.property('autonomy', 100) 
        expect(response.data).to.have.property('costPerKilometer', 2) 
        expect(response.data).to.have.property('averageCost', 12)
        expect(response.data).to.have.property('averageSpeed', 60)
        expect(response.data).to.have.property('fuelType', 'Eletrico')
    })    

    

})