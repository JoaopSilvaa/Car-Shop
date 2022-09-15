import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { Request, Response } from 'express';
import CarController from '../../../controllers/Car';
import CarService from '../../../services/Car';
import Car from '../../../models/Car';
import { 
  carMock,
  carMockWithId,
  carForChange,
  carForChangeWithId,
} from '../mocks/carMock';


describe('Car Controller Tests', () => {
  const carModel = new Car();
  const carService = new CarService(carModel);
  const carController = new CarController(carService);

  const req = {} as Request;
  const res = {} as Response;

  before(async () => {
    sinon
      .stub(carService, 'create')
      .resolves(carMockWithId);
    sinon
      .stub(carService, 'read')
      .resolves([carMockWithId]);
    sinon
      .stub(carService, 'readOne')
      .resolves(carMockWithId);
    sinon
      .stub(carService, 'update')
      .resolves(carForChangeWithId);
    sinon
      .stub(carService, 'delete')
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

  describe('When you\'ll create a car', () => {
    it('Successfully', async () => {
      req.body = carMock;
      await carController.create(req, res);

      expect((res.status as sinon.SinonStub).calledWith(201)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('When you\'ll search all cars', () => {
    it('Successfully', async () => {
      await carController.read(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith([carMockWithId])).to.be.true;
    });
  });

  describe('When you\'ll search a car', () => {
    it('Successfully', async () => {
      req.params = { id: carMockWithId._id };
      await carController.readOne(req, res);

      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carMockWithId)).to.be.true;
    });
  });

  describe('When you\'ll update a car', () => {
    it('Successfully', async () => {
      req.params = { id: carMockWithId._id };
      req.body = carForChange;
      await carController.update(req, res);
      
      expect((res.status as sinon.SinonStub).calledWith(200)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith(carForChangeWithId)).to.be.true;
    });
  });

  describe('When you\'ll delete a car', () => {
    it('Successfully', async () => {
      req.params = { id: carMockWithId._id };
      
      await carController.delete(req, res);
      expect((res.status as sinon.SinonStub). calledWith(204)).to.be.true;
      expect((res.json as sinon.SinonStub).calledWith()).to.be.true;
    });
  });
});