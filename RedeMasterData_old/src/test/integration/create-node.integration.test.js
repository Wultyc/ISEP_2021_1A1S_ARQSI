const { expect } = require('chai')
const { _expect } = require('chai').use(require('chai-as-promised'))
const util = require('util')

const testServer = require('../test-helpers/test-server')
const testDb = require('../test-helpers/test-db')
describe('POST /nodes', function() {
    testServer.useInTest()
    testDb.useInTest()

    it('responds with 400 ValidationError if fields are missing', async function() {
        const api = this.api
        const response = await expect(api.post('/nodes/', { })).to.eventually.be.rejected
        
        expect(response.response).to.have.property('status', 400)
        const errors = response.response.data.errors

        expect(errors.longitude).to.have.property('message').to.deep.equals('Insert a longitude.')
        expect(errors.latitude).to.have.property('message').to.deep.equals('Insert a latitude.')
        expect(errors.collectionNode).to.have.property('message').to.deep.equals('Insert if it is a Collection Node.')
        expect(errors.surrenderNode).to.have.property('message').to.deep.equals('Insert if it is a Surrender Node.')
        expect(errors.name).to.have.property('message').to.deep.equals('Insert a name.')
        expect(errors.shortName).to.have.property('message').to.deep.equals('Insert a shortName.')

    })

    it('surrender Node must always be a collection Node', async function() {
        const api = this.api
        const response = await expect(api.post('/nodes/', {shortName: 'Node 10', name: 'Node ten', longitude: '40' , latitude: '20', collectionNode: false, surrenderNode: true })).to.eventually.be.rejected
        
        expect(response.response).to.have.property('status', 400)        
        expect(response.response.data).to.deep.equals('A Surrender Node must always be a Collection Node.')
    })

    it('responds with 201 for creating node', async function() {
        const api = this.api
        const response = await api.post('/nodes/', { shortName: 'Node 10',name: 'Node ten', longitude: '40' , latitude: '20', collectionNode: false, surrenderNode: false })
        expect(response).to.have.property('status', 201)
        expect(response.data).to.have.property('shortName', 'Node 10')
        expect(response.data).to.have.property('name', 'Node ten')
        expect(response.data).to.have.property('longitude', 40) 
        expect(response.data).to.have.property('latitude', 20) 
        expect(response.data).to.have.property('collectionNode', false)
        expect(response.data).to.have.property('surrenderNode', false)
    })
})