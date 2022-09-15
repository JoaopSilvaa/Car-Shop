import * as sinon from 'sinon';
import chai from 'chai';
const { expect } = chai;
import { ZodError } from 'zod';
import { Errors } from '../../../errors/errors';
import Car from '../../../models/Car';
import CarService from '../../../services/Car';
import { 
  carMock,
  carMockWithId,
  carForChange,
  carForChangeWithId,
} from '../mocks/carMock';


describe('Car Service Tests', () => {
  const carModel = new Car();
  const carService = new CarService(carModel);

  before(async () => {
    sinon
      .stub(carModel, 'create')
      .resolves(carMockWithId);
    sinon
      .stub(carModel, 'read')
      .resolves([carMockWithId]);
    sinon
      .stub(carModel, 'readOne')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(null);
    sinon
      .stub(carModel, 'update')
      .onCall(0).resolves(carForChangeWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(null);
    sinon
      .stub(carModel, 'delete')
      .onCall(0).resolves(carMockWithId)
      .onCall(1).resolves(null)
      .onCall(2).resolves(null);
  });

  after(()=>{
    sinon.restore();
  })

  describe('When you\'ll create a car', () => {
    it('Successfully', async () => {
      const car = await carService.create(carMock);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('Empty object error ', async () => {
      let error;
      try {
        await carService.create({});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });
  });

  describe('When you\'ll search all cars', () => {
    it('Successfully', async () => {
      const car = await carService.read();
      expect(car).to.be.deep.equal([carMockWithId]);
    });
  });

  describe('When you\'ll search a car', () => {
    it('Successfully', async () => {
      const car = await carService.readOne(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('Invalid Id error ', async () => {
      let error;
      try {
        await carService.readOne('invalidIdOhNo');
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.deep.equal(Errors.InvalidId);
    });

    it('Not Found Object error ', async () => {
      let error;
      try {
        await carService.readOne(carMockWithId._id);
      } catch (err: any) {
        error = err;
      }
      
      expect(error.message).to.be.deep.equal(Errors.ObjectNotFound);
    });
  });

  describe('When you\'ll update a car', () => {
    it('Successfully', async () => {
      const car = await carService.update(carForChangeWithId._id, carForChange);
      expect(car).to.be.deep.equal(carForChangeWithId);
    });

    it('Empty object error ', async () => {
      let error;
      try {
        await carService.update(carMockWithId._id, {});
      } catch (err) {
        error = err;
      }

      expect(error).to.be.instanceOf(ZodError);
    });

    it('Invalid Id error ', async () => {
      let error;
      try {
        await carService.update('invalidIdOhNo', carForChange);
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.deep.equal(Errors.InvalidId);
    });

    it('Not Found Object error ', async () => {
      let error;
      try {
        await carService.update(carMockWithId._id, carForChange);
      } catch (err: any) {
        error = err;
      }
      
      expect(error.message).to.be.deep.equal(Errors.ObjectNotFound);
    });
  });

  describe('When you\'ll delete a car', () => {
    it('Successfully', async () => {
      const car = await carService.delete(carMockWithId._id);
      expect(car).to.be.deep.equal(carMockWithId);
    });

    it('Invalid Id error ', async () => {
      let error;
      try {
        await carService.delete('invalidIdOhNo');
      } catch (err: any) {
        error = err;
      }

      expect(error.message).to.be.deep.equal(Errors.InvalidId);
    });

    it('Not Found Object error ', async () => {
      let error;
      try {
        await carService.delete(carMockWithId._id);
      } catch (err: any) {
        error = err;
      }
      
      expect(error.message).to.be.deep.equal(Errors.ObjectNotFound);
    });
  });
});
