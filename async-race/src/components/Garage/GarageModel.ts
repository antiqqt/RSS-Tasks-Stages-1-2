import { CarData, CarPositionInfo, CarsData, NewCarData, SwitchEngineResponse, SwitchPageDirections } from './types';

export default class GarageModel {
  private basePath: string;

  private garagePath: string;

  private enginePath: string;

  private currentPage = 1;

  constructor() {
    this.basePath = 'http://127.0.0.1:3000';
    this.garagePath = `${this.basePath}/garage`;
    this.enginePath = `${this.basePath}/engine`;
  }

  async getCars(): Promise<CarsData> {
    try {
      const carsPerPage = 7;
      const response = await fetch(`${this.garagePath}?_page=${this.currentPage}&_limit=${carsPerPage}`);
      if (!response.ok) throw new Error('Fetch request failed');

      const count = response.headers.get('X-Total-Count');
      if (!count) throw new Error('Header is not set');

      return {
        items: (await response.json()) as CarData[],
        count,
      };
    } catch (error) {
      console.error(error);
      throw new Error('getCars request failed');
    }
  }

  async getCarsCount(): Promise<number> {
    const carsData = await this.getCars();

    return Number(carsData.count);
  }

  async getCar(id: number): Promise<CarData> {
    try {
      const response = await fetch(`${this.garagePath}/${id}`);
      if (!response.ok) throw new Error('Fetch request failed');

      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('getCar request failed');
    }
  }

  async createCar(body: NewCarData): Promise<CarData> {
    try {
      const response = await fetch(this.garagePath, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Fetch request failed');

      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('createCar request failed');
    }
  }

  async deleteCar(id: number): Promise<CarData> {
    try {
      const response = await fetch(`${this.garagePath}/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Fetch request failed');

      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('deleteCar request failed');
    }
  }

  async updateCar(id: number, body: NewCarData): Promise<CarData> {
    try {
      const response = await fetch(`${this.garagePath}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(body),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) throw new Error('Fetch request failed');

      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('updateCar request failed');
    }
  }

  async startEngine(id: number): Promise<CarPositionInfo> {
    try {
      const response = await fetch(`${this.enginePath}?id=${id}&status=started`, {
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Fetch request failed');

      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('startEngine request failed');
    }
  }

  async stopEngine(id: number): Promise<CarPositionInfo> {
    try {
      const response = await fetch(`${this.enginePath}?id=${id}&status=stopped`, {
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Fetch request failed');

      return await response.json();
    } catch (error) {
      console.error(error);
      throw new Error('startEngine request failed');
    }
  }

  async switchEngine(id: number): Promise<SwitchEngineResponse> {
    try {
      const response = await fetch(`${this.enginePath}?id=${id}&status=drive`, {
        method: 'PATCH',
      });
      if (!response.ok) throw new Error('Fetch request failed');

      return response.status !== 200 ? { success: false } : { ...(await response.json()) };
    } catch (error) {
      console.error(error);
      throw new Error('switchEngine request failed');
    }
  }

  async switchCurrentPage(direction: SwitchPageDirections): Promise<[number, number]> {
    const currCarsCount = await this.getCarsCount();
    const lastPageIndex = Math.ceil(currCarsCount / 7);
    const currPageIndex = this.currentPage;

    if (direction === SwitchPageDirections.NEXT) {
      this.currentPage = currPageIndex === lastPageIndex ? lastPageIndex : currPageIndex + 1;
      console.log('hey2', this.currentPage);
    }

    if (direction === SwitchPageDirections.PREV) {
      this.currentPage = currPageIndex === 1 ? 1 : currPageIndex - 1;
    }

    return [this.currentPage, lastPageIndex];
  }
}
