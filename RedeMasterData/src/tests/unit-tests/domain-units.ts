import { describe }  from 'mocha';
import { expect } from 'chai';
import NodeMapper from "../../mappers/NodeMapper"
import NodeDTO from '../../dto/NodeDTO';
import Node from '../../domain/Nodes/Node'
import VehicleTypeDTO from '../../dto/VehicleTypeDTO';
import VehicleTypeMapper from '../../mappers/VehicleTypeMapper'
import VehicleType from '../../domain/VehicleType/VehicleType'
import TripulantTypeDTO from '../../dto/TripulantTypeDTO'
import TripulantType from '../../domain/TripulantTypes/TripulantType'
import TripulantTypeMapper from '../../mappers/TripulantTypeMapper'
import { Result } from '../../core/logic/Result'
import { domain } from 'process';
import { domainToASCII } from 'url';
import RouteDTO from '../../dto/RouteDTO';
import Route from '../../domain/Routes/Route'

describe('Domain for node', () =>
{
  describe('test fail', () =>
  {
    it('should fail the null validation', () =>
    {
      let dto: NodeDTO = {
        id: 'idExemplo',
        shortName: 'GND',
        name: 'Nome',
        longitude: 'Longitude',
        latitude: 'Latitude',
        collectionNode: false,
        surrenderNode: true    
    };
    const domainNode = Node.create(dto)
    expect(domainNode.isFailure)
    .to
    .be
    .equal(true);
    expect(domainNode.errorValue()[0])
    .to
    .be
    .equal('A Surrender Node must always be a Collection Node.')
    })
    });
    describe('test pass', () =>
    {
    it('should create the node', () =>
     {
      let dto: NodeDTO = {
        id: 'idExemplo',
        shortName: 'GND',
        name: 'Nome',
        longitude: 'Longitude',
        latitude: 'Latitude',
        collectionNode: true,
        surrenderNode: true    
    };
    const domainNode = Node.create(dto)
    expect(domainNode.isSuccess)
    .to
    .be
    .equal(true);
    expect(domainNode.getValue().props)
    .to
    .include({
        shortName: 'GND',
        name: 'Nome',
        collectionNode: true,
        surrenderNode: true  
    })
     });
  });
});

describe('Domain for Vehicle type', () =>
{
  describe('test fail', () =>
  {
    it('should fail the null validation', () =>
    {
      let dto: VehicleTypeDTO = {
        id: 'TipoID',
        description: 'Tipo de veiculo',
        autonomy: 50,
        costPerKilometer: 50,
        averageCost: 50,
        averageSpeed: 50,
        fuelType: 'Azeite'
      }
    const newDomainVehicleType = VehicleType.create(dto)
    expect(newDomainVehicleType.isFailure)
    .to
    .be
    .equal(true);
    expect(newDomainVehicleType.errorValue()[0])
    .to
    .be
    .equal(`Fuel type ${dto.fuelType} is not allowed`)
    })
  })
  describe('test pass', () =>
  {
  it('should create the node', () =>
   {
    let dto: VehicleTypeDTO = {
      id: 'TipoID',
      description: 'Tipo de veiculo',
      autonomy: 50,
      costPerKilometer: 50,
      averageCost: 50,
      averageSpeed: 50,
      fuelType: 'Gasoleo'
    }
  const newDomainVehicleType = VehicleType.create(dto)
  expect(newDomainVehicleType.isSuccess)
  .to
  .be
  .equal(true);
  expect(newDomainVehicleType.getValue().props)
    .to
    .include({
        description: 'Tipo de veiculo',
        autonomy: 50,
        costPerKilometer: 50,
        averageCost: 50,
        averageSpeed: 50,
        fuelType: 'Gasoleo'
    })
   });
  });
});

describe('Domain for Route', () =>
{
  describe('test fail for 2 equal nodes', () =>
  {
    it('should fail the validation for 2 equal nodes', () =>
    { 
      let dto: RouteDTO = {
        id: 'ID1',
        distance: 50,
        duration: 50,
        isReinforcementRoute: false,
        isEmptyRoute: false,
        routeNodes: [
          {
            nodeId: 'NODE1' ,
            distance: 25 ,
            duration: 25
          },
          {
            nodeId: 'NODE1' ,
            distance: 25 ,
            duration: 25
          }
        ]
      }
      const domainRoute = Route.create(dto);
      
      expect(domainRoute.isFailure)
      .to
      .be
      .equal(true);
      expect(domainRoute.errorValue())
      .to
      .be
      .equal('When route only has 2 node, they must be different');
    })
  })
  describe('test fail', () =>
  {
    it('should fail the validation for only 1 nodes', () =>
    { 
      let dto: RouteDTO = {
        id: 'ID1',
        distance: 50,
        duration: 50,
        isReinforcementRoute: false,
        isEmptyRoute: false,
        routeNodes: [
          {
            nodeId: 'NODE1' ,
            distance: 25 ,
            duration: 25
          }
        ]
      }
      const domainRoute = Route.create(dto);
      expect(domainRoute.isFailure)
      .to
      .be
      .equal(true);
      expect(domainRoute.errorValue())
      .to
      .be
      .equal('Route must have at least 2 nodes.');
    })
  })
  describe('test pass', () =>
  {
    it('should pass', () =>
    { 
      let dto: RouteDTO = {
        id: 'ID1',
        distance: 50,
        duration: 50,
        isReinforcementRoute: false,
        isEmptyRoute: false,
        routeNodes: [
          {
            nodeId: 'NODE1' ,
            distance: 25 ,
            duration: 25
          },
          {
            nodeId: 'NODE2' ,
            distance: 25 ,
            duration: 25
          }
        ]
      }
      const domainRoute = Route.create(dto);
      
      expect(domainRoute.isSuccess)
      .to
      .be
      .equal(true);
      expect(domainRoute.getValue().props)
      .to
      .deep
      .include( {
        distance: 50,
        duration: 50,
        isReinforcementRoute: false,
        isEmptyRoute: false,
        routeNodes: [
          {
            nodeId : {
              props: {
                value: 'NODE1'
              }
            },
            distance: 25 ,
            duration: 25
          },
          {
            nodeId : {
              props: {
                value: 'NODE2'
              }
            },
            distance: 25 ,
            duration: 25
          }]
      });
    })
  })    
});
