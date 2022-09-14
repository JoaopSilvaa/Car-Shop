import { Router } from 'express';
import CarController from '../controllers/Car';
import CarService from '../services/Car';
import Car from '../models/Car';

const route = Router();

const carModel = new Car();
const carService = new CarService(carModel);
const carController = new CarController(carService);

route.post('/cars', (req, res) => carController.create(req, res));
route.get('/cars', (req, res) => carController.read(req, res));
route.get('/cars/:id', (req, res) => carController.readOne(req, res));
route.put('/cars/:id', (req, res) => carController.update(req, res));
route.delete('/cars/:id', (req, res) => carController.delete(req, res));

export default route;