const { expect } = require('chai')
const { _expect } = require('chai').use(require('chai-as-promised'))
const util = require('util')

const testServer = require('../test-helpers/test-server')
const testDb = require('../test-helpers/test-db')

describe('POST /routes', function() {
    testServer.useInTest()
    testDb.useInTest()

    it('verifies correct create', async function() {
        const api = this.api         
        // Create three todos
        await api.post('/nodes', { shortName: 'Node 1', name: 'Node 1 name', longitude: '40' , latitude: '20', collectionNode: false, surrenderNode: false })
        await api.post('/nodes', { shortName: 'Node 2', name: 'Node 2 name', longitude: '90' , latitude: '30', collectionNode: false, surrenderNode: false  })
        await api.post('/nodes', { shortName: 'Node 3', name: 'Node 2 name', longitude: '140' , latitude: '60', collectionNode: false, surrenderNode: false })
        
        const response_nodes = await api.get('/nodes')
    
        const node1 = response_nodes.data[0]._id
        const node2 = response_nodes.data[1]._id
        const node3 = response_nodes.data[2]._id

        const response = await api.post('/routes', { isReinforcementRoute: false, isEmptyRoute : false, 
        routeNodes: 
            [ 
                { 
                    nodeId: node1,
                },
                { nodeId: node2,
                distance: 43,
                duration: 2
                },
                { nodeId: node3,
                distance: 50,
                duration: 30
              }
            ]
        });
        expect(response).to.have.property('status', 201)
        console.log(response)
        expect(response.data).to.have.property('distance', 93)
        expect(response.data).to.have.property('duration', 32) 
        expect(response.data).to.have.property('isReinforcementRoute', false) 
        expect(response.data).to.have.property('isEmptyRoute', false)
        expect(response.data).to.have.property('routeNodes').that.is.an('array')
        .with.lengthOf(3)
    })

    it('responds with 400 ValidationError if fields are missing', async function() {
        const api = this.api
        const response = await expect(api.post('/routes', { })).to.eventually.be.rejected        
        expect(response.response).to.have.property('status', 400)
        
        const errors = response.response
        expect(errors.data).to.deep.equals(['Route must have at least 2 nodes.'])
    })

   


})