// const data = {
//   day1: {
//     city: "Hà Nội",
//     hotel: [
//       {
//         name: "Hotel 1",
//         quantity: "1",
//         additionalBeds: "1",
//       },
//       {
//         name: "Hotel 2",
//         quantity: "1",
//         additionalBeds: "1",
//       },
//     ],
//     transportation: [
//       {
//         name: "Transportation 1",
//         quantity: "1",
//         additionalBeds: "1",
//       },
//     ],
//     services: [
//       {
//         name: "Service 1",
//         quantity: "1",
//         additionalBeds: "1",
//       },
//       {
//         name: "Service 2",
//         quantity: "1",
//         additionalBeds: "1",
//       },
//     ],
//     additionalCosts: [
//       {
//         name: "Additional Cost 1",
//         quantity: "1",
//         additionalBeds: "1",
//       },
//       {
//         name: "Additional Cost 2",
//         quantity: "1",
//         additionalBeds: "1",
//       },
//     ],
//   },
//   day2: {
//     city: "Hồ Chí Minh",
//     hotel: [],
//     transportation: [],
//     services: [],
//     additionalCosts: [],
//   },
// };

import { Dispatch, SetStateAction } from "react";

export const cities = [
  { value: "Hà Nội", name: "Hà Nội" },
  { value: "Hồ Chí Minh", name: "Hồ Chí Minh" },
  { value: "Đà Nẵng", name: "Đà Nẵng" },
]; 

export interface IHotel {
  hotelType: string;
  hotel: string;
  quantity: string;
  additionalBeds: string;
}

export interface ITransportation {
  transportationType: string;
  quantity: string;
}

export interface IService {
  serviceType: string,
  serviceQuantity: string,
}

export interface IAdditionalCosts {
  additionalCostType: string;
  quantity: string;
}
export interface IFormSearchResult {
  [key: string]: {
    city: string;
    hotel?: IHotel[];
    transportation?: ITransportation[];
    services?: IService[];
    additionalCosts?: IAdditionalCosts[];
  };
}

export interface IPropRowSearch {
  dayIndex: string;
  setForm: Dispatch<SetStateAction<IFormSearchResult>>;
  formSearchResult: IFormSearchResult;
}


