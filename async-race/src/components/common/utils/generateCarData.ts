import { NewCarData } from '../../types';

const CAR_BRANDS = [
  'Acura',
  'Alfa Romeo',
  'Alpine',
  'Apollo',
  'Apple',
  'Aston Martin',
  'Audi',
  'Automobili Pininfarina',
  'Bentley',
  'BMW',
  'Bollinger',
  'Brilliance',
  'Bugatti',
  'Buick',
  'BYD',
  'Cadillac',
  'Chana',
  'Chery',
  'Chevrolet',
  'Chrysler',
  'Citroen',
  'Continental',
  'CUPRA',
  'Dacia',
  'Daewoo',
  'Daihatsu',
  'Datsun',
  'Detroit Electric',
  'Dodge',
  'DS Automobiles',
  'FAW',
  'Ferrari',
  'Fiat',
  'Fisker',
  'Ford',
  'Foxtron',
  'Geely',
  'Genesis',
  'GMC',
  'Great Wall',
  'Haval',
  'Honda',
  'Hummer',
  'Hyundai',
  'Ineos',
  'Infiniti',
  'Iran Khodro',
  'JAC',
  'Jaguar',
  'Jeep',
  'JETOUR',
  'KIA',
  'Koenigsegg',
  'Lada',
  'Lamborghini',
  'Lancia',
  'Land Rover',
  'Lexus',
  'Lifan',
  'Lincoln',
  'Lordstown',
  'Lotus',
  'Lucid',
  'LvChi',
  'Lynk & Co',
  'Maserati',
  'Maybach',
  'Mazda',
  'MCLaren',
  'Mercedes-Benz',
  'MG',
  'MINI',
  'Mitsubishi',
  'Nikola',
  'NIO',
  'Nissan',
  'Opel',
  'Pagani',
  'Peugeot',
  'Polestar',
  'Porsche',
  'Qoros',
  'Range Rover',
  'Ravon',
  'Renault',
  'Rimac',
  'Rivian',
  'Rolls-Royce',
  'Saab',
  'Saipa',
  'SEAT',
  'Skoda',
  'Smart',
  'SangYong',
  'SSC North America',
  'Stellantis',
  'Subaru',
  'Suzuki',
  'Tata',
  'Tesla',
  'Torsus',
  'Toyota',
  'VinFast',
  'Volkswagen',
  'Volvo',
  'Xpeng',
  'Zotye',
];

const CAR_MODELS = [
  'Durango',
  'Ram',
  'Challenger',
  'Charger',
  'Grand Caravan',
  'X7',
  'X5',
  'X3',
  'X6 M',
  'X6',
  'X1',
  'X4',
  'C3 Aircross',
  'C5 Aircross',
  'Duster',
  'CR-V',
  'Corolla',
  'IS 200t',
  'LS 500h',
  'RX',
  'ES 200/250/350',
  'Hatchback',
  'CX-5',
  'Sedan',
  'CX-30',
  'CX-9',
  'CX-3',
  'MX-5 Roadster',
  'Phantom',
  'Camry',
  'Polo',
  'Cullinan',
  'Ghost',
  'Dawn',
  'Duster',
  'Arkana',
  'Sandero',
  'Logan',
  'Trafic Fourgon',
  'Logan MCV',
  'Captur',
  'Kadjar',
  'RAV4',
  'Rio',
  'Creta',
  'Solaris',
];

const gerRandomNumber = (max: number): number => Math.floor(Math.random() * max);

const getRandomColor = (): string => Math.floor(Math.random() * 16777215).toString(16);

const getRandomName = (): string =>
  `${CAR_BRANDS[gerRandomNumber(CAR_BRANDS.length)]} ${CAR_MODELS[gerRandomNumber(CAR_MODELS.length)]}`;

export default function generateCarData(): NewCarData {
  return {
    name: getRandomName(),
    color: `#${getRandomColor()}`,
  };
}
