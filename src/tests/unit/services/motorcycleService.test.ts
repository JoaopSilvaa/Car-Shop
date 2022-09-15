import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { ZodError } from 'zod';
import { Errors } from '../../../errors/errors';
import Motorcycle from '../../../models/Motorcycle';
import MotorcycleService from '../../../services/Motorcycle';
import { 
  motorcycleMock,
  motorcycleMockWithId,
  motorcycleForChange,
  motorcycleForChangeWithId,
} from '../mocks/motorcycleMock';


describe('Motorcycle Service Tests', () => {
  const motorcycleModel = new Motorcycle();
  const motorcycleService = new MotorcycleService(motorcycleModel);

  before(async () => {
    sinon
      .stub(motorcycleModel, 'create')
      .resolves(motorcycleMockWithId);
    sinon
      .stub(motorcycleModel, 'read')
      .resolves([motorcycleMockWithId]);
    sinon
      .stub(motorcycleModel, 'readOne')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(null);
    sinon
      .stub(motorcycleModel, 'update')
      .onCall(0).resolves(motorcycleForChangeWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(null);
    sinon
      .stub(motorcycleModel, 'delete')
      .onCall(0).resolves(motorcycleMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('When you\'ll create a Motorcycle', () => {
    it('Successfully', async () => {
      const motorcycle = await motorcycleService.create(motorcycleMock);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('Empty object error ', async () => {
      let error;
      try {
        await motorcycleService.create({});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('When you\'ll search all Motorcycles', () => {
    it('Successfully', async () => {
      const motorcycle = await motorcycleService.read();
      expect(motorcycle).to.be.deep.equal([motorcycleMockWithId]);
    });
  });

  describe('When you\'ll search a Motorcycle', () => {
    it('Successfully', async () => {
      const motorcycle = await motorcycleService.readOne(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('Invalid Id error ', async () => {
      let error;
      try {
        await motorcycleService.readOne('invalidIdOhNo');
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.deep.equal(Errors.InvalidId);
    });

    it('Not Found Object error ', async () => {
      let error;
      try {
        await motorcycleService.readOne(motorcycleMockWithId._id);
      } catch (err: any) {
        error = err;
      }
      
      expect(error.message).to.be.deep.equal(Errors.ObjectNotFound);
    });
  });

  describe('When you\'ll update a Motorcycle', () => {
    it('Successfully', async () => {
      const motorcycle = await motorcycleService.update(motorcycleForChangeWithId._id, motorcycleForChange);
      expect(motorcycle).to.be.deep.equal(motorcycleForChangeWithId);
    });

    it('Empty object error ', async () => {
      let error;
      try {
        await motorcycleService.update(motorcycleMockWithId._id, {});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });

    it('Invalid Id error ', async () => {
      let error;
      try {
        await motorcycleService.update('invalidIdOhNo', motorcycleForChange);
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.deep.equal(Errors.InvalidId);
    });

    it('Not Found Object error ', async () => {
      let error;
      try {
        await motorcycleService.update(motorcycleMockWithId._id, motorcycleForChange);
      } catch (err: any) {
        error = err;
      }
      
      expect(error.message).to.be.deep.equal(Errors.ObjectNotFound);
    });
  });

  describe('When you\'ll delete a Motorcycle', () => {
    it('Successfully', async () => {
      const motorcycle = await motorcycleService.delete(motorcycleMockWithId._id);
      expect(motorcycle).to.be.deep.equal(motorcycleMockWithId);
    });

    it('Invalid Id error ', async () => {
      let error;
      try {
        await motorcycleService.delete('invalidIdOhNo');
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.deep.equal(Errors.InvalidId);
    });

    it('Not Found Object error ', async () => {
      let error;
      try {
        await motorcycleService.delete(motorcycleMockWithId._id);
      } catch (err: any) {
        error = err;
      }
      
      expect(error.message).to.be.deep.equal(Errors.ObjectNotFound);
    });
  });
});
