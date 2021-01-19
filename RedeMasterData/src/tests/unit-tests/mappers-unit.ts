import { describe }  from 'mocha';
import { expect } from 'chai';
import NodeMapper from "../../mappers/NodeMapper"
import NodeDTO from '../../dto/NodeDTO';
import Node from '../../domain/Nodes/Node'
import VehicleTypeDTO from '../../dto/VehicleTypeDTO';
import VehicleTypeMapper from '../../mappers/VehicleTypeMapper'
import VehicleType from '../../domain/VehicleType/VehicleType'
describe('Mapper for node', () =>
{
  describe('test mapFromRequest(req: any, dto: NodeDTO)', () =>
  {
    it('should map correctly request to dto object', () =>
    {
        let body: any = {
            body: {
            id: 'idExemplo',
            shortName:'GND',
            name: 'Gondomar',
            longitude: 'Longitude',
            latitude: 'Latitude',
            collectionNode: true,
            surrenderNode: true
            }
        }
      let dto: NodeDTO = {
          id: 'idExemplo',
          shortName: 'GND',
          name: 'Gondomar',
          longitude: 'Longitude',
          latitude: 'Latitude',
          collectionNode: true,
          surrenderNode: true
      };
      let mapper: NodeMapper = new NodeMapper();
      expect(mapper.mapFromRequest(body, new NodeDTO))
      .to
      .eql(dto);
    });
  });
  describe('test mapFromMongo(req: any, dto: NodeDTO)', () =>
  {
    it('should map correctly request to dto object from mongo', () =>
    {
        let mongo: any = {
            _id: 'idExemplo',
            shortName:'GND',
            name: 'Gondomar',
            longitude: 'Longitude',
            latitude: 'Latitude',
            collectionNode: true,
            surrenderNode: true
        }
      let dto: NodeDTO = {
          id: 'idExemplo',
          shortName: 'GND',
          name: 'Gondomar',
          longitude: 'Longitude',
          latitude: 'Latitude',
          collectionNode: true,
          surrenderNode: true
      };
      let mapper: NodeMapper = new NodeMapper();
      expect(mapper.mapFromMongo(mongo, new NodeDTO))
      .to
      .eql(dto);
    });
  });
  describe('test mapFromMongo(req: any, dto: NodeDTO)', () =>
  {
    it('should map correctly domain to dto', () =>
    {

      let dto: NodeDTO = {
          id: 'idExemplo',
          shortName: 'GND',
          name: 'Gondomar',
          longitude: 'Longitude',
          latitude: 'Latitude',
          collectionNode: true,
          surrenderNode: true
      };
      const domainNode = Node.create(dto)

      let mapper: NodeMapper = new NodeMapper();
      expect(mapper.mapFromDomain(domainNode.getValue(), new NodeDTO))
      .to
      .include( {
        shortName: dto.shortName,
        name: dto.name,
        longitude: dto.longitude,
        latitude: dto.latitude,
        collectionNode: dto.collectionNode,
        surrenderNode: dto.surrenderNode
      })
    });
  });
});
describe('Mapper for vehicle type', () =>
{
  describe('test mapFromRequest(req: any, dto: VehicleTypeDTO)', () =>
  {
    it('should map correctly request to dto object', () =>
    { 
      let vehicleTypeDTO: VehicleTypeDTO = {
        id: 'TipoID',
        description: 'Tipo de veiculo',
        autonomy: 50,
        costPerKilometer: 50,
        averageCost: 50,
        averageSpeed: 50,
        fuelType: 'Azeite'
      }
      let body: any = {
        body: {
          id: 'TipoID',
          description: 'Tipo de veiculo',
          autonomy: 50,
          costPerKilometer: 50,
          averageCost: 50,
          averageSpeed: 50,
          fuelType: 'Azeite'
        }
    }
    let mapper: VehicleTypeMapper = new VehicleTypeMapper()
    expect(mapper.mapFromRequest(body, new VehicleTypeDTO))
    .to
    .eql(vehicleTypeDTO);
    });
  });
  describe('test map(req: any, dto: VehicleTypeDTO)', () =>
  {
    it('should map correctly request to dto object from mongo', () =>
    {
        let mongo: any = {
          _id: 'TipoID',
          description: 'Tipo de veiculo',
          autonomy: 50,
          costPerKilometer: 50,
          averageCost: 50,
          averageSpeed: 50,
          fuelType: 'Azeite'
        }
        let dto: VehicleTypeDTO = {
          id: 'TipoID',
          description: 'Tipo de veiculo',
          autonomy: 50,
          costPerKilometer: 50,
          averageCost: 50,
          averageSpeed: 50,
          fuelType: 'Azeite'
        }
      let mapper: VehicleTypeMapper = new VehicleTypeMapper();
      expect(mapper.mapFromMongo(mongo, new VehicleTypeDTO))
      .to
      .eql(dto);
    });
  });
  describe('test mapFromDomain(req: any, dto: VehicleTypeDTO)', () =>
  {
    it('should map correctly request to dto object from mongo', () =>
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
      let mapper: VehicleTypeMapper = new VehicleTypeMapper();
      const newDomainVehicleType = VehicleType.create(dto)

      expect(mapper.mapFromDomain(newDomainVehicleType.getValue(), new VehicleTypeDTO))
      .to
      .include( {
        description: dto.description,
        autonomy: dto.autonomy,
        costPerKilometer: dto.costPerKilometer,
        averageCost: dto.averageCost,
        averageSpeed: dto.averageSpeed,
        fuelType: dto.fuelType
      })
    });
  });
});