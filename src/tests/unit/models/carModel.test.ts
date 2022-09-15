import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import Car from '../../../models/Car';
import { Model } from 'mongoose';
import { 
  carMock,
  carMockWithId,
  carForChange,
  carForChangeWithId,
} from '../mocks/carMock';


describe('Car Model Tests', () => {
  const carModel = new Car();

  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(carMockWithId);
    sinon
      .stub(Model, 'find')
      .resolves([carMockWithId]);
    sinon
      .stub(Model, 'findOne')
      .resolves(carMockWithId);
    sinon
      .stub(Model, 'findByIdAndUpdate')
      .resolves(carForChangeWithId);
    sinon
      .stub(Model, 'findByIdAndDelete')
      .resolves(carMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('When you\'ll create a car', () => {
    it('Successfully', async () => {
      const car = await carModel.create(carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });
  });

  describe('When you\'ll search all cars', () => {
    it('Successfully', async () => {
      const car = await carModel.read();
      expect(car).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('When you\'ll search a car', () => {
    it('Successfully', async () => {
      const car = await carModel.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });
  });

  describe('When you\'ll update a car', () => {
    it('Successfully', async () => {
      const car = await carModel.update(carForChangeWithId._id, carForChange);
      expect(car).to.be.deep.equal(carForChangeWithId);
    });
  });

  describe('When you\'ll delete a car', () => {
    it('Successfully', async () => {
      const car = await carModel.delete(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });
  });
});