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
        const toInsertNode = transformNode.ToInsert(reqNode);
        expect(JSON.stringify(toInsertNode)).equal(JSON.stringify(wantedNode()));
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
        const toInsertRoute = transformRoute.ToInsert(reqRoute);
        expect(JSON.stringify(toInsertRoute)).equal(JSON.stringify(wantedRoute()));
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
        const toInsertLine = transformLine.ToInsert(reqLine);
        expect(JSON.stringify(toInsertLine)).equal(JSON.stringify(wantedLine()));
    });

    it('VehicleType', () => {
        const reqVehicleType = {
            body: {
                description: "autocarro",
                autonomy: 10,
                costPerKilometer: 25,
                avarageCost: 10,
                averageSpeed: 50,
                fuelType: "Gasoleo"
            }
        };
        const toInsertVehicleType = transformVehicleType.ToInsert(reqVehicleType);
        expect(JSON.stringify(toInsertVehicleType)).equal(JSON.stringify(wantedVehicleType()));
    });

    it('TripulantType', () => {
        const reqTripulantType = {
            body: {
                description: "latino"
            }
        };
        const toInsertTripulantType = transformTripulantType.ToInsert(reqTripulantType);
        expect(JSON.stringify(toInsertTripulantType)).equal(JSON.stringify(wantedTripulantType()));
    });
});

const wantedNode = jest.fn(function () {
    return {
        shortName: "node",
        longitude: 1,
        latitude: 2,
        collectionNode: false,
        surrenderNode: false
    };
});

const wantedRoute = jest.fn(function () {
    return {
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
});

const wantedLine = jest.fn(function () {
    return {
        code: "1",
        name: "lineName",
        beginNode: "1",
        finalNode: "2",
        route: ["1", "2"],
        tripulantType: "10",
        vehicleType: "20"
    };
});

const wantedVehicleType = jest.fn(function () {
    return {
        description: "autocarro",
        autonomy: 10,
        costPerKilometer: 25,
        avarageCost: 10,
        averageSpeed: 50,
        fuelType: "Gasoleo"
    };
});

const wantedTripulantType = jest.fn(function () {
    return {
        description: "latino"
    };
});