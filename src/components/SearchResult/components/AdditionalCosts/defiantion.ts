export const additionalCosts = [
  {
    value: 1,
    name: "Chi phí phát sinh 1",
  },
  {
    value: 2,
    name: "Chi phí phát sinh 2",
  },
  {
    value: 3,
    name: "Chi phí phát sinh 3",
  },
];
export interface IAdditionalCostsRowData {
  [key: number]: {
    additionalCostType: string;
    additionalCostQuantity: string;
  }[];
}
