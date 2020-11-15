const { expect } = require('chai')
const { _expect } = require('chai').use(require('chai-as-promised'))
const util = require('util')

const testServer = require('../test-helpers/test-server')
const testDb = require('../test-helpers/test-db')
describe('POST /todos', function() {
    testServer.useInTest()
    testDb.useInTest()

    it('responds with 400 ValidationError if fields are missing', async function() {
        const api = this.api
        const response = await expect(api.post('/nodes/create', { })).to.eventually.be.rejected
        
        expect(response.response).to.have.property('status', 400)
        const errors = response.response.data.errors

        expect(errors.longitude).to.have.property('message').to.deep.equals('Insert a longitude.')
        expect(errors.latitude).to.have.property('message').to.deep.equals('Insert a latitude.')
        expect(errors.collectionNode).to.have.property('message').to.deep.equals('Insert if it is a Collection Node.')
        expect(errors.surrenderNode).to.have.property('message').to.deep.equals('Insert if it is a Surrender Node.')
        expect(errors.shortName).to.have.property('message').to.deep.equals('Insert a shortName.')

    })

    it('surrender Node must always be a collection Node', async function() {
        const api = this.api
        const response = await expect(api.post('/nodes/create', {shortName: 'Node 10',longitude: '40' , latitude: '20', collectionNode: false, surrenderNode: true })).to.eventually.be.rejected
        
        expect(response.response).to.have.property('status', 400)        
        expect(response.response.data).to.deep.equals('A Surrender Node must always be a Collection Node.')


    })

    it('verifies correct create', async function() {
        const api = this.api
        const response = await api.post('/nodes/create', { shortName: 'Node 10',longitude: '40' , latitude: '20', collectionNode: false, surrenderNode: false })
        expect(response).to.have.property('status', 201)
        expect(response.data).to.have.property('shortName', 'Node 10')
        expect(response.data).to.have.property('longitude', 40) 
        expect(response.data).to.have.property('latitude', 20) 
        expect(response.data).to.have.property('collectionNode', false)
        expect(response.data).to.have.property('surrenderNode', false)
    })

    

})