export interface PriceHotel {
  id: number;
  documentId: string;
  start_date: string;
  end_date: string;
  price: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  desc_relation: string | null;
}

export interface HotelType {
  id: number;
  documentId: string;
  name: string;
  price_default: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  desc_relation: string;
  price_hotels: PriceHotel[];
}

export interface Hotel {
  id: number;
  documentId: string;
  hotel_code: string;
  room_price: number;
  extra_price: number;
  hotel_name: string;
  expire_date: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  rank: number;
  desc_relation: string;
  hotel_types: HotelType[];
}

export interface TransportationPrice {
  id: number;
  documentId: string;
  seats: string;
  price: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  desc: string;
  desc_relation: string;
}

export interface Cars {
  id: number;
  documentId: string;
  type_car: string;
  car_price: number;
  car_code: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  id_car: string;
  name: string | null;
  km: string | null;
  desc_relation: string;
  transportation_prices: TransportationPrice[];
}

export interface ServiceCompany {
  id: number;
  documentId: string;
  service_code: string;
  service_desc: string;
  service_price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  desc_relation: string;
}

export interface ServiceRoute {
  id: number;
  documentId: string;
  service_code: string;
  service_desc: string;
  service_price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  desc_relation: string;
}

export interface Company {
  id: number;
  documentId: string;
  company_code: string;
  mark_up: number;
  company_desc: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  mark_hotel: number;
  mark_tranfer: number;
  mark_service_com: number;
  desc_relation: string;
  locations: Location[];
  service_companies: ServiceCompany[];
}

export interface Route {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  code: string;
  name: string;
  desc: string;
  description: string;
  desc_relation: string;
  priority?: number;
}

export interface Location {
  id: number;
  documentId: string;
  location_name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  desc_relation: string;
  hotels: Hotel[];
  routes: Route[];
  cars: Cars[];
  service_routes: ServiceRoute[];
  priority?: number;
}

export interface User {
  id: number;
  documentId: string;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  company: Company;
}

export type LocationsResponse = User[];
