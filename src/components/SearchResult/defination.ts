const data = {
  day1: {
    city: "Hà Nội",
    hotel: [
      {
        name: "Hotel 1",
        quantity: "1",
        additionalBeds: "1",
      },
      {
        name: "Hotel 2",
        quantity: "1",
        additionalBeds: "1",
      },
    ],
    transportation: [
      {
        name: "Transportation 1",
        quantity: "1",
        additionalBeds: "1",
      },
    ],
    services: [
      {
        name: "Service 1",
        quantity: "1",
        additionalBeds: "1",
      },
      {
        name: "Service 2",
        quantity: "1",
        additionalBeds: "1",
      },
    ],
    additionalCosts: [
      {
        name: "Additional Cost 1",
        quantity: "1",
        additionalBeds: "1",
      },
      {
        name: "Additional Cost 2",
        quantity: "1",
        additionalBeds: "1",
      },
    ],
  },
  day2: {
    city: "Hồ Chí Minh",
    hotel: [],
    transportation: [],
    services: [],
    additionalCosts: [],
  },
};

export interface IFormSearchResult {
  [key: string]: {
    city: string;
    hotel: {
      hotelType: string;
      hotel: string;
      quantity: string;
      additionalBeds: string;
    }[];
    transportation: {
      name: string;
      quantity: string;
      additionalBeds: string;
    }[];
    services: {
      name: string;
      quantity: string;
      additionalBeds: string;
    }[];
    additionalCosts: {
      name: string;
      quantity: string;
      additionalBeds: string;
    }[];
  };
}
