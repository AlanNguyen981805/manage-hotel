export const services = [
  {
    id: 1,
    name: "Dịch vụ 1",
    price: 1000000,
  },
  {
    id: 2,
    name: "Dịch vụ 2",
    price: 2000000,
  },
  {
    id: 3,
    name: "Dịch vụ 3",
    price: 3000000,
  },
];

export interface IServicesRowData {
  [key: number]: {
    serviceType: string;
    serviceQuantity: string;
  }[];
}
