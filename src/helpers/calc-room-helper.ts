export const caculatePriceByRow = (
  roomTypePrice: number = 0,
  numberOfRooms: number = 1,
  additionalBedsPrice: number = 0,
  additionalBedsQuantity: number = 0,
  mark_hotel: number
) => {
  const bedsPrice = additionalBedsPrice * additionalBedsQuantity;

  const price = roomTypePrice * numberOfRooms + bedsPrice;

  return price * mark_hotel;
};
