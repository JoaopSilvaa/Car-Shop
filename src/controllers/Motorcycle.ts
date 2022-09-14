import { Request, Response } from 'express';
import { IMotorcycle } from '../interfaces/IMotorcycle';
import { IService } from '../interfaces/IService';

class MotorCycleController {
  private _service: IService<IMotorcycle>;

  constructor(service: IService<IMotorcycle>) {
    this._service = service;
  }

  public async create(req: Request, res: Response<IMotorcycle>) {
    const result = await this._service.create(req.body);
    return res.status(201).json(result);
  }
}

export default MotorCycleController;