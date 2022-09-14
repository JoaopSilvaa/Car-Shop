import { Router } from 'express';
import MotorCycleController from '../controllers/Motorcycle';
import MotorcycleService from '../services/Motorcycle';
import Motorcycle from '../models/Motorcycle';

const route = Router();
const motorcycleModel = new Motorcycle();
const motorcycleService = new MotorcycleService(motorcycleModel);
const motorcycleController = new MotorCycleController(motorcycleService);

route.post('/motorcycles', (req, res) => motorcycleController.create(req, res));
route.get('/motorcycles', (req, res) => motorcycleController.read(req, res));
route.get('/motorcycles/:id', (req, res) => motorcycleController.readOne(req, res));

export default route;