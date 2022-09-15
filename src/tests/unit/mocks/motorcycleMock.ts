import { IMotorcycle } from "../../../interfaces/IMotorcycle";

const motorcycleMock: IMotorcycle = {
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 2500
};

const motorcycleMockWithId: IMotorcycle & { _id:string } = {
  _id: "6323658b467cda0e7432ca62",
  model: "Honda CG Titan 125",
  year: 1963,
  color: "red",
  buyValue: 3500,
  category: "Street",
  engineCapacity: 2500
};

const motorcycleForChange: IMotorcycle = {
  model: "Pop 100",
  year: 2010,
  color: "black",
  buyValue: 1500,
  category: "Street",
  engineCapacity: 1000
};

const motorcycleForChangeWithId: IMotorcycle & { _id: string } = {
  _id: "6323658b467cda0e7432ca62",
  model: "Pop 100",
  year: 2010,
  color: "black",
  buyValue: 1500,
  category: "Street",
  engineCapacity: 1000
};

export { motorcycleMock, motorcycleMockWithId, motorcycleForChange, motorcycleForChangeWithId };
