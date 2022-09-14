import { isValidObjectId } from 'mongoose';
import { IModel } from '../interfaces/IModel';
import { IMotorcycle, motorcycleZodSchema } from '../interfaces/IMotorcycle';
import { Errors } from '../errors/errors';
import { IService } from '../interfaces/IService';

class MotorcycleService implements IService<IMotorcycle> {
  private _motorcycle: IModel<IMotorcycle>;

  constructor(model: IModel<IMotorcycle>) {
    this._motorcycle = model;
  }

  public async create(obj: unknown): Promise<IMotorcycle> {
    const parsed = motorcycleZodSchema.safeParse(obj);

    if (!parsed.success) throw (parsed.error);
    
    return this._motorcycle.create(parsed.data);
  }

  public async read(): Promise<IMotorcycle[]> {
    return this._motorcycle.read();
  }

  public async readOne(_id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId) throw new Error(Errors.InvalidId);
    
    const motorcycle = await this._motorcycle.readOne(_id);

    if (!motorcycle) throw new Error(Errors.ObjectNotFound);
    
    return motorcycle;
  }

  public async update(_id: string, obj: unknown): Promise<IMotorcycle | null> {
    if (!isValidObjectId) throw new Error(Errors.InvalidId);

    const parsed = motorcycleZodSchema.safeParse(obj);

    if (!parsed.success) throw (parsed.error);

    const motorcycle = await this._motorcycle.update(_id, parsed.data);

    if (!motorcycle) throw new Error(Errors.ObjectNotFound);
    
    return motorcycle;
  }

  public async delete(_id: string): Promise<IMotorcycle | null> {
    if (!isValidObjectId) throw new Error(Errors.InvalidId);

    const motorcycle = await this._motorcycle.delete(_id);

    if (!motorcycle) throw new Error(Errors.ObjectNotFound);
    
    return motorcycle;
  }
}

export default MotorcycleService;