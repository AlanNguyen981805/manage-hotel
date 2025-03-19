export const caculatePriceByRow = (
  roomTypePrice: number = 0,
  numberOfRooms: number = 1,
  additionalBedsPrice: number = 0,
  additionalBedsQuantity: number = 1
) => {
  const bedsPrice = additionalBedsPrice * additionalBedsQuantity;

  const price = roomTypePrice * numberOfRooms + bedsPrice;
  return price;
};

