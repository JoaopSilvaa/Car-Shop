import { ICar } from "../../../interfaces/ICar";

const carMock: ICar = {
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carMockWithId: ICar & { _id:string } = {
  _id: "63236479467cda0e7432ca60",
  model: "Ferrari Maranello",
  year: 1963,
  color: "red",
  buyValue: 3500000,
  seatsQty: 2,
  doorsQty: 2
};

const carForChange: ICar = {
  model: "Gol Bolinha",
  year: 2002,
  color: "silver",
  buyValue: 20000,
  seatsQty: 4,
  doorsQty: 4
};

const carForChangeWithId: ICar & { _id: string } = {
  _id: "63236479467cda0e7432ca60",
  model: "Gol Bolinha",
  year: 2002,
  color: "silver",
  buyValue: 20000,
  seatsQty: 4,
  doorsQty: 4
};

export { carMock, carMockWithId, carForChange, carForChangeWithId };
