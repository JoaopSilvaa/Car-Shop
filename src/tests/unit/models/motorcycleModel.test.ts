import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import Motorcycle from '../../../models/Motorcycle';
import { Model } from 'mongoose';
import { 
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleForChange,
  motorcycleForChangeWithId,
} from '../mocks/motorcycleMock';


describe('Motorcycle Model Tests', () => {
  const motorcycleModel = new Motorcycle();

  before(async () => {
    sinon
      .stub(Model, 'create')
      .resolves(motorcycleMockWithId);
    sinon
      .stub(Model, 'find')
      .resolves([motorcycleMockWithId]);
    sinon
      .stub(Model, 'findOne')
      .resolves(motorcycleMockWithId);
    sinon
      .stub(Model, 'findByIdAndUpdate')
      .resolves(motorcycleForChangeWithId);
    sinon
      .stub(Model, 'findByIdAndDelete')
      .resolves(motorcycleMockWithId);
  });

  after(()=>{
    sinon.restore();
  })

  describe('When you\'ll create a Motorcycle', () => {
    it('Successfully', async () => {
      const motorcycle = await motorcycleModel.create(motorcycleMock);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });

  describe('When you\'ll search all Motorcycles', () => {
    it('Successfully', async () => {
      const motorcycle = await motorcycleModel.read();
      expect(motorcycle).to.be.deep.equal([motorcycleMockWithId]);
    });
  });

  describe('When you\'ll search a Motorcycle', () => {
    it('Successfully', async () => {
      const motorcycle = await motorcycleModel.readOne(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });

  describe('When you\'ll update a Motorcycle', () => {
    it('Successfully', async () => {
      const motorcycle = await motorcycleModel.update(motorcycleForChangeWithId._id, motorcycleForChange);
      expect(motorcycle).to.be.deep.equal(motorcycleForChangeWithId);
    });
  });

  describe('When you\'ll delete a Motorcycle', () => {
    it('Successfully', async () => {
      const motorcycle = await motorcycleModel.delete(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });
  });
});