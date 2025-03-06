export const additionalCosts = [
  {
    id: 1,
    name: "Chi phí phát sinh 1",
    price: 1000000,
  },
  {
    id: 2,
    name: "Chi phí phát sinh 2",
    price: 2000000,
  },
  {
    id: 3,
    name: "Chi phí phát sinh 3",
    price: 3000000,
  },
];
export interface IAdditionalCostsRowData {
  [key: number]: {
    additionalCostType: string;
    additionalCostQuantity: string;
  }[];
}
