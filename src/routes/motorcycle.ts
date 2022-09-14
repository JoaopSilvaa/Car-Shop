import { Router } from 'express';
import MotorCycleController from '../controllers/Motorcycle';
import MotorcycleService from '../services/Motorcycle';
import Motorcycle from '../models/Motorcycle';

const route = Router();
const motorcycleModel = new Motorcycle();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorCycleController = new MotorCycleController(motorcycleService);

route.post('/motorcycles', (req, res) => motorCycleController.create(req, res));
route.get('/motorCycles', (req, res) => motorCycleController.read(req, res));

export default route;