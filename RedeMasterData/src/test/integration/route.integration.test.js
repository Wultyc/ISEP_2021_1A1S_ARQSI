const {expect} = require('chai')
const {expect_json} = require('chai-json')
const testServer = require('../test-helpers/test-server')
const testDb = require('../test-helpers/test-db')

describe('GET /routes and GET /routes/id', function() {
    testServer.useInTest()
    testDb.useInTest()
    
    it('responds with 200 { routes }', async function() {
        const api = this.api
        
        // Create three todos
        await api.post('/nodes', { shortName: 'Node 1',longitude: '40' , latitude: '20', collectionNode: false, surrenderNode: false })
        await api.post('/nodes', { shortName: 'Node 2',longitude: '90' , latitude: '30', collectionNode: false, surrenderNode: false  })
        await api.post('/nodes', { shortName: 'Node 3',longitude: '140' , latitude: '60', collectionNode: false, surrenderNode: false })
        
        const response_nodes = await api.get('/nodes')
    

        const node1 = response_nodes.data[0]._id
        const node2 = response_nodes.data[1]._id
        const node3 = response_nodes.data[2]._id

        await api.post('/routes', { isReinforcementRoute: false, isEmptyRoute : false, 
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
        

        const response_post = await api.post('/routes', { isReinforcementRoute: false, isEmptyRoute : false, 
        routeNodes: 
            [ 
                { 
                 nodeId: node3
                },
                { nodeId: node2,
                distance: 43,
                duration: 5
                },
                { nodeId: node1,
                distance: 10,
                duration: 25
              }
            ]
        })  

        // Make the actual request to GET /nodes
        const response = await api.get('/routes')
        
        // Assert status code 200
        expect(response).to.have.property('status', 200)
        
        // Assert that all three todos are included
        expect(response)
            .to.have.nested.property('data')
            .that.is.an('array')
            .with.lengthOf(2)
        const routes = response.data
        // Assert that every todo contains all desired fields
        routes.forEach(route => {
            expect(route)
                .to.have.property('isReinforcementRoute', false)
            expect(route)
            .to.have.property('isEmptyRoute', false)
            expect(route).to.have.property('duration')
            .that.is.an('number')
            expect(route).to.have.property('distance')
            .that.is.an('number')
            expect(route)
            .to.have.property('routeNodes')
            .that.is.an('array')
            .with.lengthOf(3)
            })

        //asserts the value of the route duration and distance
        const id = response.data[0]._id
        const response_id = await api.get(`/routes/${id}`)
        expect(response_id.data.duration).to.deep.equals(32)
        expect(response_id.data.distance).to.deep.equals(93)


    })
})