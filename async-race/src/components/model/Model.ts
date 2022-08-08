import {
  CarData,
  CarPositionInfo,
  CarsData,
  NewCarData,
  NewWinnerData,
  SortOrder,
  SwitchEngineResponse,
  SwitchPageDirections,
  WinnerData,
  WinnersData,
} from '../types';

const CARS_PER_PAGE = 7;
const WINNERS_PER_PAGE = 10;

export default class Model {
  private basePath: string;

  private garagePath: string;

  private enginePath: string;

  private winnersPath: string;

  private currentGaragePage = 1;

  private currentWinnersPage = 1;

  private currentSortOrder: SortOrder;

  constructor() {
    this.basePath = 'http://127.0.0.1:3000';
    this.garagePath = `${this.basePath}/garage`;
    this.enginePath = `${this.basePath}/engine`;
    this.winnersPath = `${this.basePath}/winners`;
  }

  async getCars(): Promise<CarsData> {
    try {
      const response = await fetch(`${this.garagePath}?_page=${this.currentGaragePage}&_limit=${CARS_PER_PAGE}`);
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

  async getWinnersCount(): Promise<number> {
    const winnersData = await this.getWinners();

    return Number(winnersData.count);
  }

  async getCar(id: number): Promise<CarData> {
    const response = await fetch(`${this.garagePath}/${id}`);

    return response.json();
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
    const response = await fetch(`${this.enginePath}?id=${id}&status=drive`, {
      method: 'PATCH',
    });

    return response.ok ? { ...(await response.json()) } : { success: false };
  }

  async switchCurrentGaragePage(direction: SwitchPageDirections): Promise<number> {
    const currCarsCount = await this.getCarsCount();
    const lastPageIndex = Math.ceil(currCarsCount / CARS_PER_PAGE);

    if (direction === SwitchPageDirections.NEXT) {
      this.currentGaragePage = this.currentGaragePage === lastPageIndex ? lastPageIndex : this.currentGaragePage + 1;
    }

    if (direction === SwitchPageDirections.PREV) {
      this.currentGaragePage = this.currentGaragePage === 1 ? 1 : this.currentGaragePage - 1;
    }

    return this.currentGaragePage;
  }

  async switchCurrentWinnersPage(direction: SwitchPageDirections): Promise<number> {
    const currWinnersCount = await this.getWinnersCount();
    const lastPageIndex = Math.ceil(currWinnersCount / WINNERS_PER_PAGE);

    if (direction === SwitchPageDirections.NEXT) {
      this.currentWinnersPage = this.currentWinnersPage === lastPageIndex ? lastPageIndex : this.currentWinnersPage + 1;
    }

    if (direction === SwitchPageDirections.PREV) {
      this.currentWinnersPage = this.currentWinnersPage === 1 ? 1 : this.currentWinnersPage - 1;
    }

    return this.currentWinnersPage;
  }

  getCurrentGaragePage(): number {
    return this.currentGaragePage;
  }

  getCurrentWinnersPage(): number {
    return this.currentWinnersPage;
  }

  async getWinners(): Promise<WinnersData> {
    try {
      let response;

      if (this.currentSortOrder) {
        const [sort, order] = this.currentSortOrder;

        response = await fetch(
          `${this.winnersPath}?_page=${this.currentWinnersPage}&_limit=${WINNERS_PER_PAGE}&_sort=${sort}&_order=${order}`
        );
      } else {
        response = await fetch(`${this.winnersPath}?_page=${this.currentWinnersPage}&_limit=${WINNERS_PER_PAGE}`);
      }

      if (!response.ok) throw new Error('Fetch request failed');

      const count = response.headers.get('X-Total-Count');
      if (!count) throw new Error('Header is not set');

      return {
        items: (await response.json()) as WinnerData[],
        count,
      };
    } catch (error) {
      console.error(error);
      throw new Error('getCars request failed');
    }
  }

  async getWinner(id: number): Promise<WinnerData> {
    const response = await fetch(`${this.winnersPath}/${id}`);

    return response.json();
  }

  async createWinner(body: NewWinnerData): Promise<CarData> {
    const response = await fetch(this.winnersPath, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }

  async updateWinner(id: number, body: NewWinnerData): Promise<CarData> {
    const response = await fetch(`${this.winnersPath}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.json();
  }

  async getWinnerHTTPStatus(id: number): Promise<number> {
    return (await fetch(`${this.winnersPath}/${id}`)).status;
  }

  async saveWinner(id: number, body: WinnerData): Promise<void> {
    const status = await this.getWinnerHTTPStatus(id);

    if (status === 404) {
      this.createWinner(body);
    } else {
      const { wins, time: bestTime } = await this.getWinner(id);

      this.updateWinner(id, {
        wins: wins + 1,
        time: body.time < bestTime ? body.time : bestTime,
      });
    }
  }

  async deleteWinner(id: number): Promise<boolean> {
    const status = await this.getWinnerHTTPStatus(id);

    if (status === 200) {
      await fetch(`${this.winnersPath}/${id}`, { method: 'DELETE' });

      return true;
    }

    return false;
  }

  setSortOrder(order?: SortOrder): void {
    this.currentSortOrder = order;
  }
}
