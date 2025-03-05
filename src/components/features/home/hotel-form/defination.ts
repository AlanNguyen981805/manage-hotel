export const hotelTypes = [
  {
    name: "5 sao",
    value: 1,
  },
  {
    name: "4 sao",
    value: 2,
  },
  {
    name: "3 sao",
    value: 3,
  },
];

export const hotels = [
  {
    name: "Hotel 1",
    value: 1,
  },
  {
    name: "Hotel 2",
    value: 2,
  },
  {
    name: "Hotel 3",
    value: 3,
  },
];

export const quantities = [
  {
    name: "1 phòng",
    value: 1,
  },
  {
    name: "2 phòng",
    value: 2,
  },
  {
    name: "3 phòng",
    value: 3,
  },
];

export const additionalBeds = [
  {
    name: "1 giường",
    value: 1,
  },
  {
    name: "2 giường",
    value: 2,
  },
  {
    name: "3 giường",
    value: 3,
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
  },
  quantityRoom: {
    id: "",
    name: "",
  },
  additionalBeds: {
    id: "",
    name: "",
  },
  timeAvailable: "",
  price: "",
};

export interface IHotelRowData {
  [key: number]: {
    hotelType: string;
    hotel: string;
    quantity: string;
    additionalBeds: string;
  }[];
}

export interface ICityRowData {
  [key: number]: {
    city: string;
  };
}
