const { expect } = require('chai')
const { expect_json } = require('chai-json')
const testServer = require('../test-helpers/test-server')
const testDb = require('../test-helpers/test-db')

describe('GET /lines and GET lines/id', function () {
    testServer.useInTest()
    testDb.useInTest()

    it('responds with 200 { lines }', async function () {
        const api = this.api

        // Create three todos
        await api.post('/nodes', { shortName: 'Node 1', name: 'Node name 1', longitude: '40', latitude: '20', collectionNode: false, surrenderNode: false })
        await api.post('/nodes', { shortName: 'Node 2', name: 'Node name 2', longitude: '90', latitude: '30', collectionNode: false, surrenderNode: false })
        await api.post('/nodes', { shortName: 'Node 3', name: 'Node name 3', longitude: '140', latitude: '60', collectionNode: false, surrenderNode: false })

        const response_nodes = await api.get('/nodes')


        const node1 = response_nodes.data[0]._id
        const node2 = response_nodes.data[1]._id
        const node3 = response_nodes.data[2]._id

        await api.post('/routes', {
            isReinforcementRoute: false, isEmptyRoute: false,
            routeNodes:
                [
                    {
                        nodeId: node1,
                    },
                    {
                        nodeId: node2,
                        distance: 43,
                        duration: 2
                    },
                    {
                        nodeId: node3,
                        distance: 50,
                        duration: 30
                    }
                ]
        });


        await api.post('/routes', {
            isReinforcementRoute: false, isEmptyRoute: false,
            routeNodes:
                [
                    {
                        nodeId: node3
                    },
                    {
                        nodeId: node2,
                        distance: 43,
                        duration: 5
                    },
                    {
                        nodeId: node1,
                        distance: 10,
                        duration: 25
                    }
                ]
        })

        // Make the actual request to GET /nodes
        const response = await api.get('/routes')

        const route1 = response.data[0]._id
        const route2 = response.data[1]._id



        api.post('/lines', {
            code: 'Par_Ag', name: 'Paredes_Aguiar', color: 'RGB(38,91,11)', beginNode: node1, finalNode: node3, lineRoutes: [

                {
                    routeId: route1,
                    orientation: "Return"
                },
                {
                    routeId: route2,
                    orientation: "Go"
                }

            ]
        })

        const response_get = await api.get('/lines')
        
        expect(response_get).to.have.property('status', 200)

    })
})
