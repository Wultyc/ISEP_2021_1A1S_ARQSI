const {expect} = require('chai')
const {expect_json} = require('chai-json')
const testServer = require('../test-helpers/test-server')
const testDb = require('../test-helpers/test-db')

describe('GET /nodes and GET /nodes/id', function() {
    testServer.useInTest()
    testDb.useInTest()
    
    it('responds with 200 { nodes }', async function() {
        const api = this.api
        
        // Create three todos
        await api.post('/nodes/', { shortName: 'Node 1',name: 'Node Name 1', longitude: '40' , latitude: '20', collectionNode: false, surrenderNode: false })
        await api.post('/nodes/', { shortName: 'Node 2',name: 'Node Name 2', longitude: '90' , latitude: '30', collectionNode: false, surrenderNode: false  })
        await api.post('/nodes/', { shortName: 'Node 3',name: 'Node Name 2', longitude: '140' , latitude: '60', collectionNode: false, surrenderNode: false })

        // Make the actual request to GET /nodes
        const response = await api.get('/nodes')
        
        // Assert status code 200
        expect(response).to.have.property('status', 200)
        
        // Assert that all three todos are included
        expect(response).to.have.nested.property('data').that.is.an('array').with.lengthOf(3)
        const nodes = response.data
        // Assert that every todo contains all desired fields
        nodes.forEach(node => {
            expect(node)
                .to.have.property('shortName')
                .that.is.a('string')
            expect(node)
            .to.have.property('longitude')
            .that.is.a('number')
            expect(node)
            .to.have.property('latitude')
            .that.is.a('number')
            expect(node)
                .to.have.property('collectionNode', false)
            expect(node)
                .to.have.property('surrenderNode', false)
        })
        // Assert that todos are listed in order of creation
        expect(nodes.map(node => node.shortName)).to.deep.equal([
            'Node 1',
            'Node 2',
            'Node 3'
        ])
        
        const id = response.data[0]._id
        const response_id = await api.get(`/nodes/${id}`)
        expect(response_id.data.shortName).to.deep.equals('Node 1')
    })
})