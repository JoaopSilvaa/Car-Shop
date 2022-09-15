import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Request, Response } from 'express';
import MotorcycleController from '../../../controllers/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import Motorcycle from '../../../models/Motorcycle';
import { 
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleForChange,
  motorcycleForChangeWithId,
} from '../mocks/motorcycleMock';


describe('Motorcycle Controller Tests', () => {
  const motorcycleModel = new Motorcycle();
  const motorcycleService = new MotorcycleService(motorcycleModel);
  const motorcycleController = new MotorcycleController(motorcycleService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon
      .stub(motorcycleService, 'create')
      .resolves(motorcycleMockWithId);
    sinon
      .stub(motorcycleService, 'read')
      .resolves([motorcycleMockWithId]);
    sinon
      .stub(motorcycleService, 'readOne')
      .resolves(motorcycleMockWithId);
    sinon
      .stub(motorcycleService, 'update')
      .resolves(motorcycleForChangeWithId);
    sinon
      .stub(motorcycleService, 'delete')
      .resolves();

    res.status = sinon
      .stub()
      .returns(res);
    res.json = sinon
      .stub()
      .returns(res);
  });

  after(()=>{
    sinon.restore();
  })

  describe('When you\'ll create a Motorcycle', () => {
    it('Successfully', async () => {
      req.body = motorcycleMock;
      await motorcycleController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });

  describe('When you\'ll search all Motorcycles', () => {
    it('Successfully', async () => {
      await motorcycleController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([motorcycleMockWithId])).to.be.true;
    });
  });

  describe('When you\'ll search a Motorcycle', () => {
    it('Successfully', async () => {
      req.params = { id: motorcycleMockWithId._id };
      await motorcycleController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleMockWithId)).to.be.true;
    });
  });

  describe('When you\'ll update a Motorcycle', () => {
    it('Successfully', async () => {
      req.params = { id: motorcycleMockWithId._id };
      req.body = motorcycleForChange;
      await motorcycleController.update(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(motorcycleForChangeWithId)).to.be.true;
    });
  });

  describe('When you\'ll delete a Motorcycle', () => {
    it('Successfully', async () => {
      req.params = { id: motorcycleMockWithId._id };
      
      await motorcycleController.delete(req, res);
      expect((res.status as sinon.SinonStub). calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  });
});