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
        await api.post('/nodes', { shortName: 'Node 1',longitude: '40' , latitude: '20', collectionNode: false, surrenderNode: false })
        await api.post('/nodes', { shortName: 'Node 2',longitude: '90' , latitude: '30', collectionNode: false, surrenderNode: false  })
        await api.post('/nodes', { shortName: 'Node 3',longitude: '140' , latitude: '60', collectionNode: false, surrenderNode: false })
        
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
        
        // expect(response.data).to.have.property('description', 'Vehicle Type eletrico')
        // expect(response.data).to.have.property('autonomy', 100) 
        // expect(response.data).to.have.property('costPerKilometer', 2) 
        // expect(response.data).to.have.property('averageCost', 12)
        // expect(response.data).to.have.property('averageSpeed', 60)
        // expect(response.data).to.have.property('fuelType', 'Eletrico')
    })

    it('responds with 400 ValidationError if fields are missing', async function() {
        const api = this.api
        const response = await expect(api.post('/routes', { routeNodes: [ ]})).to.eventually.be.rejected        
        expect(response.response).to.have.property('status', 400)
        const errors = response.response.data.errors

        // expect(errors.description).to.have.property('message').to.deep.equals('Insert a description.')
        // expect(errors.autonomy).to.have.property('message').to.deep.equals('Insert the autonomy.')
        // expect(errors.costPerKilometer).to.have.property('message').to.deep.equals('Insert the cost per kilometer.')
        // expect(errors.averageCost).to.have.property('message').to.deep.equals('Insert the average cost.')
        // expect(errors.averageSpeed).to.have.property('message').to.deep.equals('Insert a average speed.')
        // expect(errors.fuelType).to.have.property('message').to.deep.equals('Insert the fuel type.')
    })

    it('surrender Node must always be a collection Node', async function() {
    })


})