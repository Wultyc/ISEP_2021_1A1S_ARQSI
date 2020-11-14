var chai = require('chai');
const expect = chai.expect;

const nodeDTO = require('../../dto/node.dto');
const routeDTO = require('../../dto/route.dto');
const lineDTO = require('../../dto/line.dto');
const tripulantTypeDTO = require('../../dto/tripulantType.dto');
const vehicleTypeDTO = require('../../dto/vehicleType.dto');

var transformNode = new nodeDTO();
var transformRoute = new routeDTO();
var transformLine = new lineDTO();
var transformTripulantType = new tripulantTypeDTO();
var transformVehicleType = new vehicleTypeDTO();

describe('Convert Request Json body to Object', () => {

    it('Node', () => {
        const reqNode = { 
            body: {
                shortName: "node",
                longitude: 1,
                latitude: 2,
                collectionNode: false,
                surrenderNode: false
            }
         };
        const wantedNode = {
            shortName: "node",
            longitude: 1,
            latitude: 2,
            collectionNode: false,
            surrenderNode: false
        };
        expect(JSON.stringify(transformNode.ToInsert(reqNode)))
            .equal(JSON.stringify(wantedNode));
    });

    it('Route', () => {
        const reqRoute = { 
            body: {
                distance: 10,
                duration: 15,
                orientation: "GoingRoute",
                isReinforcementRoute: false,
                isEmptyRoute: false,
                routeNodes: [
                    {
                        nodeId: "1",
                        distance: 2,
                        duration: 5
                    },
                    {
                        nodeId: "2",
                        distance: 8,
                        duration: 10
                    }
                ]
            }
         };
        const wantedRoute = {
            distance: 10,
            duration: 15,
            orientation: "GoingRoute",
            isReinforcementRoute: false,
            isEmptyRoute: false,
            routeNodes: [
                {
                    nodeId: "1",
                    distance: 2,
                    duration: 5
                },
                {
                    nodeId: "2",
                    distance: 8,
                    duration: 10
                }
            ]
        };
        expect(JSON.stringify(transformRoute.ToInsert(reqRoute)))
            .equal(JSON.stringify(wantedRoute));
    });

    it('Line', () => {
        const reqLine = { 
            body: {
                code: "1",
                name: "lineName",
                beginNode: "1",
                finalNode: "2",
                route: ["1", "2"],
                tripulantType: "10",
                vehicleType: "20"
            }
        };
        const wantedLine = {
            code: "1",
            name: "lineName",
            beginNode: "1",
            finalNode: "2",
            route: ["1", "2"],
            tripulantType: "10",
            vehicleType: "20"
        };
        expect(JSON.stringify(transformLine.ToInsert(reqLine)))
            .equal(JSON.stringify(wantedLine));
    });

    it('VehicleType', () => {
        const reqVehicleType = { 
            body: {
                description : "autocarro",
                autonomy : 10,
                costPerKilometer : 25,
                avarageCost : 10,
                averageSpeed : 50,
                fuelType : "Gasoleo"
            }
         };
        const wantedVehicleType = {
            description : "autocarro",
            autonomy : 10,
            costPerKilometer : 25,
            avarageCost : 10,
            averageSpeed : 50,
            fuelType : "Gasoleo"
        };
        expect(JSON.stringify(transformVehicleType.ToInsert(reqVehicleType)))
            .equal(JSON.stringify(wantedVehicleType));
    });

    it('TripulantType', () => {
        const reqTripulantType = { 
            body: {
                description: "latino"
            }
         };
        const wantedTripulantType = {
            description: "latino"
        };
        expect(JSON.stringify(transformTripulantType.ToInsert(reqTripulantType)))
            .equal(JSON.stringify(wantedTripulantType));
    });
});
