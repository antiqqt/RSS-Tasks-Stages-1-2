export type CarsData = {
  items: CarData[];
  count: string;
};

export type CarData = {
  name: string;
  color: string;
  id: number;
};

export type NewCarData = Omit<CarData, 'id'>;

export type CarPositionInfo = {
  velocity: number;
  distance: number;
};

export type SwitchEngineResponse = {
  success: boolean;
};

export type CreateCarCallback = (data: NewCarData) => void;

export type GetCarsCallback = (data: CarsData) => void;

export type SelectCarCallback = (id: number) => void;

export type UpdateCarCallback = (id: number, body: NewCarData) => void;

export type DeleteCarCallback = (id: number) => void;

export type SwitchPageCallback = (direction: SwitchPageDirections) => Promise<number>;

export enum SwitchPageDirections {
  PREV = 'prev',
  NEXT = 'next',
}
