export const transportationTypes = [
  {
    name: "Xe khách",
    id: "xe_khach",
    price: 1000000,
  },
  {
    name: "Xe tải",
    id: "xe_tai",
    price: 2000000,
  },
];

export const quantities = [
  {
    name: "1 phương tiện",
    id: 1,
  },
  {
    name: "2 phương tiện",
    id: 2,
  },
  {
    name: "3 phương tiện",
    id: 3,
  },
];

export const initialTransportationRowData = {
  transportationType: {
    id: "",
    name: "",
  },
  quantity: "",
  price: 0,
};
