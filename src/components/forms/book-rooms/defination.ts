import { formatDateNoUtc } from "@/helpers/date-helper";

export const queryParams = (dateCheckIn: Date, dateCheckOut: Date) => {
  const dateFilter = `filters][$or][0][end_date][$gte]=${formatDateNoUtc(
    dateCheckIn
  )}&filters][$or][0][start_date][$lte]=${formatDateNoUtc(
    dateCheckOut
  )}&filters][$or][1][end_date][$gte]=${formatDateNoUtc(
    dateCheckIn
  )}&filters][$or][1][start_date][$lte]=${formatDateNoUtc(dateCheckOut)}`;
  const hotelPopulate = `populate[location][populate][hotels][populate][hotel_types][populate][price_hotels][${dateFilter}`;
  const serviceRoutesFields = `fields]=id,documentId,service_code,service_desc,service_price,createdAt,updatedAt,publishedAt`;
  const carsFields = `fields]=id,type_car,car_price,car_code`;
  const serviceCompaniesFields = `fields]=service_code,service_price`;

  const query = `?${hotelPopulate}&populate[location][populate][service_routes][${serviceRoutesFields}&populate[location][populate][cars][${carsFields}&populate[location][populate][companies][populate][service_companies][${serviceCompaniesFields}`;

  return query;
};
