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

export interface Location {
  id: number;
  documentId: string;
  location_name: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  hotels: Hotel[];
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
  desc: string;
  name: string;
  location: Location | null;
}

export interface RoutesResponse {
  data: Route[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
