import { describe }  from 'mocha';
import { expect } from 'chai';
import NodeMapper from "../../mappers/NodeMapper"
import NodeDTO from '../../dto/NodeDTO';
import Node from '../../domain/Nodes/Node'
describe('mapFromRequest', () =>
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
    it('should map correctly request to dto object from mongo', () =>
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
      .eql(dto);
    });
  });
});