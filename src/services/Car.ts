import { isValidObjectId } from 'mongoose';
import { IService } from '../interfaces/IService';
import { ICar, carZodSchema } from '../interfaces/ICar';
import { IModel } from '../interfaces/IModel';
import { Errors } from '../errors/errors';

class CarService implements IService<ICar> {
  private _frame: IModel<ICar>;
  
  constructor(model: IModel<ICar>) {
    this._frame = model;
  }

  public async create(obj: unknown): Promise<ICar> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;

    return this._frame.create(parsed.data);
  }

  public async read(): Promise<ICar[]> {
    return this._frame.read();
  }

  public async readOne(_id: string): Promise<ICar | null> {
    if (!isValidObjectId(_id)) throw new Error(Errors.InvalidId);  
    
    const car = await this._frame.readOne(_id);

    if (!car) throw new Error(Errors.ObjectNotFound);

    return car;
  }

  public async update(_id: string, obj: unknown): Promise<ICar | null> {
    const parsed = carZodSchema.safeParse(obj);

    if (!parsed.success) throw parsed.error;
    
    return this._frame.update(_id, parsed.data);
  }

  public async delete(_id: string): Promise<ICar | null> {
    const car = await this._frame.delete(_id);

    if (!car) throw new Error('Not Found');

    return car;
  }
}

export default CarService;