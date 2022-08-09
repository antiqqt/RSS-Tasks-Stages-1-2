type GetAllDataResponse<T> = {
  items: T[];
  count: string;
};

export type CarsData = GetAllDataResponse<CarData>;

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

export type WinnersData = GetAllDataResponse<WinnerData>;

export type WinnerData = {
  id: number;
  wins: number;
  time: number;
};

export type NewWinnerData = Omit<WinnerData, 'id'>;

export type CreateCarCallback = (data: NewCarData) => void;

export type GetCarsCallback = (data: CarsData) => void;

export type SelectCarCallback = (id: number) => void;

export type UpdateCarCallback = (id: number, body: NewCarData) => void;

export type DeleteCarCallback = (id: number) => void;

export type SwitchPageCallback = (direction: SwitchPageDirections) => Promise<number>;

export type GenerateCarsCallback = (numberOfNewCars?: number) => void;

export type DriveCarCallback = (id: number, name: string) => Promise<RaceWinnerData>;

export type StopCarCallback = (id: number) => void;

export type RaceCallback = () => void;

export type RaceWinnerData = {
  id: number;
  name: string;
  duration: number;
};

export type GetCarCallback = (id: number) => Promise<CarData>;

export enum SwitchPageDirections {
  PREV = 'prev',
  NEXT = 'next',
}

export type SortCallback = (order?: [SortTypes, OrderTypes]) => void;

export type SortOrder = [SortTypes, OrderTypes] | undefined;

export enum SortTypes {
  WINS = 'wins',
  TIME = 'time',
}

export enum OrderTypes {
  DESC = 'DESC',
  ASC = 'ASC',
}

export enum SortButtonStates {
  DEFAULT = 'default',
  ASC = 'ASC',
  DESC = 'DESC',
}
