export interface PriceHotel {
  id: number;
  documentId: string;
  start_date: string;
  end_date: string;
  price: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface HotelType {
  id: number;
  documentId?: string;
  name: string;
  price_default: number;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  price_hotels: PriceHotel[];
}

export interface Hotel {
  id: number;
  documentId: string;
  hotel_code: string;
  room_price: number;
  extra_price: number | null;
  hotel_name: string;
  expire_date: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  rank: number;
  hotel_types: HotelType[];
}

export interface Cars {
  car_code?: string;
  car_price: number;
  documentId?: string;
  id: string;
  type_car: string;
}

export interface ServiceRoute {
  id: number;
  documentId: string;
  service_code: string;
  service_desc: string;
  service_price: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface Company {
  id: number;
  documentId: string;
  mark_up: number;
  service_companies: {
    id: number;
    documentId: string;
    service_code: string;
    service_price: number;
  }[];
}

export interface Location {
  id: number;
  documentId: string;
  location_name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  hotels: Hotel[];
  company: Company;
  service_routes: ServiceRoute[];
  cars: Cars[];
}

export interface Route {
  id: number;
  documentId: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  code: string;
  name: string;
  desc: string;
  description: string | null;
}

export interface Location {
  id: number;
  documentId: string;
  location_name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  routes: Route[];
  hotels: Hotel[];
  company: Company;
  service_routes: ServiceRoute[];
  cars: Cars[];
}

export interface LocationsResponse {
  data: Location[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
