export const services = [
  {
    value: 1,
    name: "Dịch vụ 1",
  },
  {
    value: 2,
    name: "Dịch vụ 2",
  },
  {
    value: 3,
    name: "Dịch vụ 3",
  },
];

export interface IServicesRowData {
  [key: number]: {
    serviceType: string;
    serviceQuantity: string;
  }[];
}
