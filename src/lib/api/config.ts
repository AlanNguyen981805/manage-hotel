// API configuration
export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://139.84.135.204:1337/api";

export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/local",
  REGISTER: "/auth/local/register",
  ME: "/users/me",

  // Hotels
  HOTELS: "/hotels",
  HOTEL_DETAIL: (id: string) => `/hotels/${id}`,

  // Bookings
  BOOKINGS: "/bookings",
  BOOKING_DETAIL: (id: string) => `/bookings/${id}`,

  // Services
  SERVICES: "/services",
  SERVICE_DETAIL: (id: string) => `/services/${id}`,

  // Transportation
  TRANSPORTATION: "/transportation",
  TRANSPORTATION_DETAIL: (id: string) => `/transportation/${id}`,

  ROUTES: "/routes",

  // Histories
  HISTORIES: "/histories",
  USER_HISTORY: (username: string) => `/user-history/${username}`,
  USER_HISTORIES: "/user-histories",
};
