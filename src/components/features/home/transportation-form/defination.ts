export const transportationTypes = [
  {
    name: "Vui lòng chọn",
    id: 0,
  },
  {
    name: "Xe 4 chỗ",
    id: "xe_4_cho",
    price: 1000000,
  },
  {
    name: "Xe 7 chỗ",
    id: "xe_7_cho",
    price: 1500000,
  },
  {
    name: "Xe 20 chỗ",
    id: "xe_20_cho",
    price: 2000000,
  },
  {
    name: "Xe 45 chỗ",
    id: "xe_45_cho",
    price: 3000000,
  },
  {
    name: "Xe 50 chỗ",
    id: "xe_50_cho",
    price: 3500000,
  },
];

export const transportationQuantities = [
  {
    name: "1 phương tiện",
    id: 1,
    quantity: 1,
  },
  {
    name: "2 phương tiện",
    id: 2,
    quantity: 2,
  },
  {
    name: "3 phương tiện",
    id: 3,
    quantity: 3,
  },
];

export const initialTransportationRowData = {
  transportationType: {
    id: "",
    name: "",
    price: 0,
  },
  quantity: "",
  price: 0,
  isOneWay: false,
};
