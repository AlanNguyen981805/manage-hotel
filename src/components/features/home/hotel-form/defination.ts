import { Hotel, HotelType } from "@/types/route";

export const hotelTypes = [
  {
    name: "Vui lòng chọn",
    id: 0,
  },
  {
    name: "1 sao",
    id: 1,
  },
  {
    name: "2 sao",
    id: 2,
  },
  {
    name: "3 sao",
    id: 3,
  },
  {
    name: "4 sao",
    id: 4,
  },
  {
    name: "5 sao",
    id: 5,
  },
];

export const initialHotelRowData = {
  hotelType: {
    id: "",
    name: "",
  },
  hotelName: {
    id: "",
    name: "",
  },
  roomType: {
    id: "",
    name: "",
    price: 0,
    price_hotels: [],
  },
  quantityRoom: 0,
  additionalBeds: 0,
  timeAvailable: "",
  price: 0,
};

export const resetHotelData = {
  additionalBeds: 0,
  price: 0,
  quantityRoom: 0,
  timeAvailable: "",
};

export interface IHotelRowData {
  [key: number]: {
    hotelType: string;
    hotel: string;
    quantity: string;
    additionalBeds: string;
    price: number;
  }[];
}

export interface ICityRowData {
  [key: number]: {
    city: string;
  };
}

export interface HotelRowState {
  hotelsByRank: { [key: number]: Hotel[] };
  hotelTypesOptions: { [key: number]: HotelType[] };
}

export interface IOptionHotel {
  id: number;
  name: string;
}
