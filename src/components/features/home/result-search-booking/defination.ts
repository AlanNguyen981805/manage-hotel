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
  { value: "Hà Nội", name: "Hà Nội" },
  { value: "Hồ Chí Minh", name: "Hồ Chí Minh" },
  { value: "Đà Nẵng", name: "Đà Nẵng" },
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
  };
  quantityRoom: {
    id: string; 
    name: string;
  };
  additionalBeds: {
    id: string;
    name: string;
  };
  timeAvailable: string;
  price: string;
}

export interface ITransportation {
  transportationType: {
    id: string;
    name: string;
  };
  quantity: string;
  price: string;
}

export interface IService {
  serviceType: {
    id: string;
    name: string;
  },
  serviceQuantity: string,
  servicePrice: string,
}

export interface IAdditionalCosts {
  additionalCostType: {
    id: string;
    name: string;
  },
  quantity: string;
  price: string;
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


