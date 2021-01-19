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

describe('Domain for node', () =>
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