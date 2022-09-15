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

  public async read(_req: Request, res: Response<IMotorcycle[]>) {
    const results = await this._service.read();
    return res.status(200).json(results);
  }

  public async readOne(req: Request, res: Response<IMotorcycle | null>) {
    const result = await this._service.readOne(req.params.id);
    return res.status(200).json(result);
  }

  public async update(req: Request, res: Response<IMotorcycle | null>) {
    const result = await this._service.update(req.params.id, req.body);
    return res.status(200).json(result);
  }

  public async delete(req: Request, res: Response<IMotorcycle | null>) {
    await this._service.delete(req.params.id);
    return res.status(204).json();
  }
}

export default MotorCycleController;