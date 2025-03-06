export const hotelTypes = [
  {
    name: "Vui lòng chọn",
    id: 0,
  },
  {
    name: "5 sao",
    id: 1,
  },
  {
    name: "4 sao",
    id: 2,
  },
  {
    name: "3 sao",
    id: 3,
  },
];

export const hotels = [
  {
    name: "Vui lòng chọn",
    id: 0,
    price: 0,
  },
  {
    name: "Khách sạn mariot",
    id: 1,
    price: 1000000,
    hotelType: 1,
  },
  {
    name: "Khách sạn hilton",
    id: 2,
    price: 2000000,
    hotelType: 1,
  },
  {
    name: "Khách sạn melia",
    id: 3,
    price: 3000000,
    hotelType: 3,
  },
  {
    name: "Khách sạn apec",
    id: 4,
    price: 4000000,
    hotelType: 2,
  },
];

export const roomTypes = [
  {
    name: "Vui lòng chọn",
    price: 0,
    id: 0,
  },
  {
    name: "Phòng đơn",
    price: 100000,
    id: 1,
  },
  {
    name: "Phòng đôi",
    price: 200000,
    id: 2,
  },
  {
    name: "Phòng ba",
    price: 300000,
    id: 3,
  },
];

export const numberOfRooms = [
  {
    name: "Vui lòng chọn",
    id: 0,
    price: 0,
    quantity: 0,
  },
  {
    name: "1 phòng",
    id: 1,
    price: 100000,
    quantity: 1,
  },
  {
    name: "2 phòng",
    id: 2,
    price: 200000,
    quantity: 2,
  },
  {
    name: "3 phòng",
    id: 3,
    price: 300000,
    quantity: 3,
  },
];

export const additionalBeds = [
  {
    name: "Vui lòng chọn",
    id: 0,
    price: 0,
    quantity: 0,
  },
  {
    name: "1 giường",
    id: 1,
    price: 1000,
    quantity: 1,
  },
  {
    name: "2 giường",
    id: 2,
    price: 2000,
    quantity: 2,
  },
  {
    name: "3 giường",
    id: 3,
    price: 3000,
    quantity: 3,
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
  },
  quantityRoom: {
    id: "",
    name: "",
    price: 0,
    quantity: 0,
  },
  additionalBeds: {
    id: "",
    name: "",
    price: 0,
    quantity: 0,
  },
  timeAvailable: "",
  price: 0,
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
