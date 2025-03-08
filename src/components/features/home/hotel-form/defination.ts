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
  // 5 sao (hotelType: 1)
  {
    name: "Khách sạn Mariot",
    id: 1,
    price: 1000000,
    hotelType: 1,
  },
  {
    name: "Khách sạn Hilton",
    id: 2,
    price: 2000000,
    hotelType: 1,
  },
  {
    name: "Khách sạn Sheraton",
    id: 5,
    price: 2500000,
    hotelType: 1,
  },
  {
    name: "Khách sạn Intercontinental",
    id: 6,
    price: 3500000,
    hotelType: 1,
  },
  {
    name: "Khách sạn Sofitel",
    id: 9,
    price: 2800000,
    hotelType: 1,
  },
  {
    name: "Khách sạn Renaissance",
    id: 11,
    price: 2600000,
    hotelType: 1,
  },
  {
    name: "Khách sạn Imperial",
    id: 16,
    price: 2400000,
    hotelType: 1,
  },
  {
    name: "Khách sạn Crown",
    id: 18,
    price: 2700000,
    hotelType: 1,
  },
  {
    name: "Khách sạn Sapphire",
    id: 21,
    price: 2900000,
    hotelType: 1,
  },
  {
    name: "Khách sạn Diamond",
    id: 23,
    price: 3200000,
    hotelType: 1,
  },
  {
    name: "Khách sạn Crystal",
    id: 27,
    price: 2800000,
    hotelType: 1,
  },
  {
    name: "Khách sạn Platinum",
    id: 30,
    price: 3100000,
    hotelType: 1,
  },

  // 4 sao (hotelType: 2)
  {
    name: "Khách sạn Apec",
    id: 4,
    price: 4000000,
    hotelType: 2,
  },
  {
    name: "Khách sạn Novotel",
    id: 7,
    price: 1800000,
    hotelType: 2,
  },
  {
    name: "Khách sạn Pullman",
    id: 8,
    price: 2200000,
    hotelType: 2,
  },
  {
    name: "Khách sạn Majestic",
    id: 12,
    price: 1900000,
    hotelType: 2,
  },
  {
    name: "Khách sạn Palace",
    id: 14,
    price: 2300000,
    hotelType: 2,
  },
  {
    name: "Khách sạn Grand",
    id: 15,
    price: 2100000,
    hotelType: 2,
  },
  {
    name: "Khách sạn Dynasty",
    id: 19,
    price: 2000000,
    hotelType: 2,
  },
  {
    name: "Khách sạn Pearl",
    id: 24,
    price: 2100000,
    hotelType: 2,
  },
  {
    name: "Khách sạn Opal",
    id: 26,
    price: 2400000,
    hotelType: 2,
  },
  {
    name: "Khách sạn Golden",
    id: 28,
    price: 2200000,
    hotelType: 2,
  },

  // 3 sao (hotelType: 3)
  {
    name: "Khách sạn Melia",
    id: 3,
    price: 3000000,
    hotelType: 3,
  },
  {
    name: "Khách sạn Rex",
    id: 10,
    price: 1500000,
    hotelType: 3,
  },
  {
    name: "Khách sạn Continental",
    id: 13,
    price: 1700000,
    hotelType: 3,
  },
  {
    name: "Khách sạn Royal",
    id: 17,
    price: 1600000,
    hotelType: 3,
  },
  {
    name: "Khách sạn Emerald",
    id: 20,
    price: 1800000,
    hotelType: 3,
  },
  {
    name: "Khách sạn Ruby",
    id: 22,
    price: 1700000,
    hotelType: 3,
  },
  {
    name: "Khách sạn Jade",
    id: 25,
    price: 1900000,
    hotelType: 3,
  },
  {
    name: "Khách sạn Silver",
    id: 29,
    price: 1600000,
    hotelType: 3,
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
