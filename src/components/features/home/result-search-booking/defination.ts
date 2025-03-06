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
import { initialHotelRowData } from "../hotel-form/defination";

export const cities = [
  { id: "Hà Nội", name: "Hà Nội" },
  { id: "Hồ Chí Minh", name: "Hồ Chí Minh" },
  { id: "Đà Nẵng", name: "Đà Nẵng" },
];

export const initialRowData = (numberOfDays: number) => {
  const rowData: IFormSearchResult = {};
  for (let i = 0; i < numberOfDays; i++) {
    rowData[`day${i + 1}`] = {
      city: {
        id: "",
        name: "",
      },
      hotels: [initialHotelRowData],
      transportation: [],
      services: [],
      additionalCosts: [],
    };
  }
  return rowData;
};

export interface IHotel {
  hotelType: {
    id: string;
    name: string;
  };
  hotelName: {
    id: string;
    name: string;
  };
  roomType: {
    id: string;
    name: string;
    price: number;
  };
  quantityRoom: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
  additionalBeds: {
    id: string;
    name: string;
    price: number;
    quantity: number;
  };
  timeAvailable: string;
  price: number;
}

export interface ITransportation {
  transportationType: {
    id: string;
    name: string;
  };
  quantity: string;
  price: number;
}

export interface IService {
  serviceType: {
    id: string;
    name: string;
  };
  serviceQuantity: string;
  servicePrice: number;
}

export interface IAdditionalCosts {
  additionalCostType: {
    id: string;
    name: string;
  };
  quantity: string;
  price: number;
}
export interface IFormSearchResult {
  [key: string]: {
    city: {
      id: string;
      name: string;
    };
    hotels?: IHotel[];
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
