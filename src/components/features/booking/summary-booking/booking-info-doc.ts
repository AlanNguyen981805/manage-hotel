import { formatCurrency } from "@/helpers/currency-helper";
import { formatDate } from "@/helpers/date-helper";
import {
  AlignmentType,
  Document,
  ExternalHyperlink,
  Footer,
  Header,
  ImageRun,
  Packer,
  Paragraph,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";
import { convertHtmlToDocx, convertImageToDocx } from "./data-mock";

export const generateWordDocument = async (
  vendor,
  dateCheckIn,
  dateCheckOut,
  resultSearchBooking,
  numberOfPeople,
  totals,
  numberOfDays,
  lastestHistory
) => {
  const images = [
    {
      path: "/logo.png",
      name: "header",
    },
    {
      path: "/vietnam-best-places-to-visit-ho-chi-minh-city.jpg",
      name: "header2",
    },
    {
      path: "/vietnam-halong-bay.jpg",
      name: "header3",
    },
    {
      path: "/vietnam-hue-imperial-palace-gate.jpg",
      name: "header4",
    },
  ];

  const imageBuffers = await Promise.all(
    images.map(async (image) => {
      const response = await fetch(image.path);
      const blob = await response.blob();
      const buffer = await blob.arrayBuffer();
      return { name: image.name, buffer };
    })
  );

  const [
    { buffer: imageBufferHeader },
    { buffer: imageBufferHeader2 },
    { buffer: imageBufferHeader3 },
    { buffer: imageBufferHeader4 },
  ] = imageBuffers;

  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: "Verdana",
          },
        },
      },
    },
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 1000,
              right: 1000,
              bottom: 1000,
              left: 1000,
            },
            size: {
              width: 12240, // Increased width (8.5 inches * 1440 twips per inch)
              height: 15840, // 11 inches * 1440 twips per inch
            },
          },
        },
        headers: {
          default: new Header({
            children: [
              new Paragraph({
                alignment: AlignmentType.CENTER,
                spacing: {
                  line: 12,
                },
                children: [
                  new ImageRun({
                    data: imageBufferHeader,
                    transformation: {
                      width: 80,
                      height: 80,
                    },
                  }),
                  new TextRun({
                    text: " ".repeat(2),
                  }),
                  new ImageRun({
                    data: imageBufferHeader2,
                    transformation: {
                      width: 80,
                      height: 80,
                    },
                  }),
                  new TextRun({
                    text: " ".repeat(2),
                  }),
                  new ImageRun({
                    data: imageBufferHeader3,
                    transformation: {
                      width: 80,
                      height: 80,
                    },
                  }),
                  new TextRun({
                    text: " ".repeat(2),
                  }),
                  new ImageRun({
                    data: imageBufferHeader4,
                    transformation: {
                      width: 80,
                      height: 80,
                    },
                  }),
                ],
              }),
            ],
          }),
        },
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: "Request code",
                font: "Verdana",
                bold: true,
              }),
              new TextRun({
                text: `: ${lastestHistory?.code}`,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Proposal to",
                font: "Verdana",
                bold: true,
              }),
              new TextRun({
                text: `: ${vendor?.name ?? ""} - ${vendor?.phone ?? ""} - ${
                  vendor?.email ?? ""
                } - ${vendor?.company ?? ""}`,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Travel period",
                font: "Verdana",
                bold: true,
              }),
              new TextRun({
                text: `: ${formatDate(dateCheckIn)} - ${formatDate(
                  dateCheckOut
                )}`,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
              after: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Number of pax",
                font: "Verdana",
                bold: true,
              }),
              new TextRun({
                text: `: ${numberOfPeople} people`,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
              after: 200,
            },
          }),

          ...(
            await Promise.all(
              Object.entries(resultSearchBooking)
                .filter(([key]) => key !== "city")
                .map(async ([dayKey, dayData], index) => {
                  // Calculate the date for this day by adding index days to check-in date
                  const currentDate = new Date(dateCheckIn);
                  currentDate.setDate(currentDate.getDate() + index);
                  const formattedDate = new Intl.DateTimeFormat("en-GB", {
                    day: "2-digit",
                    month: "short",
                  }).format(currentDate);

                  const content: Paragraph[] = await convertHtmlToDocx(
                    dayData?.city?.desc
                  );

                  const images = await convertImageToDocx(
                    dayData?.city?.images
                  );

                  return [
                    ...images,

                    new Paragraph({
                      heading: "Heading2",
                      spacing: {
                        before: index > 0 ? 400 : 0, // Add space before each day except the first one
                      },
                      children: [
                        new TextRun({
                          text: `DAY ${index + 1} (${formattedDate}) : ${
                            dayData?.city?.name || ""
                          }`,
                          font: "Verdana",
                          size: 24,
                          bold: true,
                          color: "0070C0",
                        }),
                      ],
                      spacing: {
                        before: 200,
                        after: 100,
                      },
                    }),
                    // Day description - handle HTML content with formatting from CKEditor
                    ...(dayData?.city?.desc
                      ? content
                      : [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "",
                                font: "Verdana",
                              }),
                            ],
                          }),
                        ]),
                    // Services section
                    ...((dayData?.hotels && dayData.hotels.length > 0) ||
                    dayData?.services?.some(
                      (service) => service?.serviceType?.type === "company"
                    ) ||
                    dayData?.transportation?.length > 0
                      ? [
                          new Paragraph({
                            spacing: {
                              before: 100,
                            },
                            children: [
                              new TextRun({
                                text: "Services include:",
                                font: "Verdana",
                                bold: true,
                              }),
                            ],
                          }),
                          // Accommodation
                          ...(dayData?.hotels && dayData.hotels.length > 0
                            ? [
                                new Paragraph({
                                  spacing: {
                                    before: 100,
                                  },
                                  bullet: {
                                    level: 0,
                                  },
                                  children: [
                                    new TextRun({
                                      text: `Accommodation: ${(() => {
                                        const uniqueHotels = (
                                          dayData?.hotels || []
                                        ).reduce((unique: any[], hotel) => {
                                          const hotelName =
                                            hotel?.hotelName?.hotel_name || "";
                                          if (
                                            hotelName &&
                                            !unique.some(
                                              (h) =>
                                                h?.hotelName?.hotel_name ===
                                                hotelName
                                            )
                                          ) {
                                            unique.push(hotel);
                                          }
                                          return unique;
                                        }, []);

                                        return uniqueHotels
                                          .map(
                                            (hotel) =>
                                              hotel?.hotelName?.hotel_name || ""
                                          )
                                          .join(" / ");
                                      })()}`,
                                      font: "Verdana",
                                    }),
                                  ],
                                }),
                              ]
                            : []),
                          // Transportation
                          ...(dayData?.transportation?.length > 0
                            ? [
                                new Paragraph({
                                  spacing: {
                                    before: 100,
                                  },
                                  bullet: {
                                    level: 0,
                                  },
                                  children: [
                                    new TextRun({
                                      text: `Transportation: ${dayData.transportation
                                        .map((t) => t.transportationType.name)
                                        .join(" / ")}`,
                                      font: "Verdana",
                                    }),
                                  ],
                                }),
                              ]
                            : []),
                          // Services
                          ...(dayData?.services?.length > 0
                            ? [
                                new Paragraph({
                                  spacing: {
                                    before: 100,
                                  },
                                  bullet: {
                                    level: 0,
                                  },
                                  children: [
                                    new TextRun({
                                      text: `Services: ${dayData.services
                                        .map((s) => s.serviceType.name)
                                        .join(" / ")}`,
                                      font: "Verdana",
                                    }),
                                  ],
                                }),
                              ]
                            : []),
                        ]
                      : []),
                  ];
                })
            )
          ).flat(),

          new Paragraph({
            children: [
              new TextRun({
                text: `THE PROPOSAL IN US DOLLAR PER PERSON VALID WITHIN 7 DAYS`,
                color: "FF0000",
                bold: true,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "─────────────────────────────────────────────────────────────────────",
                font: "Verdana",
              }),
            ],
            alignment: AlignmentType.LEFT,
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `TOUR COST: ${formatCurrency(
                  totals.total / numberOfPeople
                )} VNĐ PER PERSON (GROUP OF ${numberOfPeople} PAX)`,
                color: "FF0000",
                bold: true,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Services excluded",
                bold: true,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "All domestic and international flights, other meals, tips, drinks, international airport tax, single room supplements, peak season surcharges, personal expenses, travel insurance, visas, any optional additional tours or activities during free time, early check in/late check-out at your hotel, Covid test and anything related to covid",
                font: "Verdana",
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "SURCHARGE UPON REQUEST",
                size: 20,
                bold: true,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "─────────────────────────────────────────────────────────────────────",
                font: "Verdana",
              }),
            ],
            spacing: {
              after: 0,
            },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "Visa letter to Vietnam: US$10/pax (Take 5 days working)",
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Visa stamp on arrival US$25/pax pay in cash on arrival",
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            text: "Any extra meal upon request: US$ 15/pax/meal (Minimum booking of 02 people – maximum dinner time 2 hours – only driver drop off/pick up)",
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "CONDITION FOR ASIAN MARKET",
                bold: true,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "❖ ",
                font: "Verdana",
              }),
              new TextRun({
                text: "Compulsory tips: US$ 4 per person per day to tour guide and driver (Group from 2 - 4 pax up)",
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "❖ ",
                font: "Verdana",
              }),
              new TextRun({
                text: "Compulsory tips: US$ 3 per person per day to tour guide and driver (Group from 5 – 15 pax)",
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "❖ ",
                font: "Verdana",
              }),
              new TextRun({
                text: "Compulsory tips: US$ 2 per person per day to tour guide and driver (Group from 16 - 20 pax)",
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "❖ ",
                font: "Verdana",
              }),
              new TextRun({
                text: "Payment by bank transfer charge: US$ 25 bank fees (Apply for any group less than 10 pax)",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                italics: true,
                text: "*Our guide will collect tips upon arrival in cash",
                font: "Verdana",
              }),
            ],
          }),

          new Paragraph({
            alignment: AlignmentType.LEFT,
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: "HOW TO MAKE PAYMENT",
                bold: true,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "─────────────────────────────────────────────────────────────────────",
                font: "Verdana",
              }),
            ],
            spacing: {
              after: 0,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "❖ ",
                font: "Verdana",
              }),
              new TextRun({
                text: "Bank transfer to Jewel Tours, the bank fee charge $25 to the total invoice",
                font: "Verdana",
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "❖ ",
                font: "Verdana",
              }),
              new TextRun({
                text: "Pay 15% by bank transfer and balance on arrival, the bank fee charge $25 to the total invoice",
                font: "Verdana",
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "❖ ",
                font: "Verdana",
              }),
              new TextRun({
                text: "Online credit card payment - 3.5% fee will apply (Arrival Payment amount Refund upon receive full payment) - ",
              }),

              new ExternalHyperlink({
                child: new TextRun({
                  text: "https://portal.vietcombank.com.vn/en-Us/Personal/TG/Pages/exchange-rate.aspx",
                  color: "0000FF",
                  underline: {},
                  style: "Hyperlink",
                }),
                link: "https://portal.vietcombank.com.vn/en-Us/Personal/TG/Pages/exchange-rate.aspx",
              }),

              new TextRun({
                text: " UAZMRMSHSATN4ATNA - Payment must be in VND apply at rate from this link: ",
              }),
              new ExternalHyperlink({
                child: new TextRun({
                  text: "https://portal.vietcombank.com.vn/en-Us/Corporate/TG/Pages/exchange-rate.aspx",
                  color: "0000FF",
                  underline: {},
                  style: "Hyperlink",
                }),
                link: "https://portal.vietcombank.com.vn/en-Us/Corporate/TG/Pages/exchange-rate.aspx",
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: "GENERAL BOOKING CONDITION",
                bold: true,
                size: 28,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "1. TRAVELING WITH CHILDREN",
                bold: true,
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "If you are traveling with children, it is your responsibility to ensure that they are fit and healthy to ensure they can participate in your chosen itinerary and that they are supervised at all times during the tour. Jewel Tours is not responsible for any failure to participate in any activity due to your child's health or for the supervision of children on the tour.",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "1.1 Rates for Children (applicable for ONE child only per booking)",
                bold: true,
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Children under 2 years of age free of charge (shared bed with parents)",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Children from 3 - 5 years of age charge 25% tour cost (without extra bed) & 50% of tour cost (with extra bed)",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Children from 6 - 11 years of age 50% of tour cost (without extra bed) & 75% of tour cost (with extra bed)",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Children from 12 years of age 100% of tour cost (with extra bed)",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Single room supplement: 30% of tour cost (single traveler or odd number of travelers in single room subject charge)",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "2. HOW TO PAY",
                bold: true,
                font: "Verdana",
                size: 18,
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Upon agreement with the tour program and costs, we will provide you with a deposit invoice before we process the booking.",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Pay for package tours: There are 2 options",
                bold: true,
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "❖ ",
                font: "Verdana",
              }),
              new TextRun({
                text: "Option 1",
                bold: true,
                font: "Verdana",
                size: 18,
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Pay deposit 30% by the time of booking is confirmed",
                font: "Verdana",
                size: 18,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Balance pay 14 days prior to arrival date",
                font: "Verdana",
                size: 18,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "❖ ",
                font: "Verdana",
              }),
              new TextRun({
                text: "Option 2",
                bold: true,
                font: "Verdana",
                size: 18,
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "No deposit required",
                font: "Verdana",
                size: 18,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Full payment made 30 days prior to arrival date",
                font: "Verdana",
                size: 18,
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 300,
            },
            children: [
              new TextRun({
                text: "If a booking is made within the 30 days prior to departure you are required to make the full payment at the time of the booking confirmation.",
                font: "Verdana",
                size: 18,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "*Any group with more than 8 persons is subject to special conditions.",
                font: "Verdana",
                size: 18,
                italics: true,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Pay for other services",
                bold: true,
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 300,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "❖ ",
                font: "Verdana",
              }),
              new TextRun({
                text: "Pay for accommodation, payment term is attached to the booking",
                font: "Verdana",
                size: 18,
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Pay for transfer and sightseeing, full payment 7 days prior to arrival date",
                font: "Verdana",
                size: 18,
              }),
            ],
            bullet: {
              level: 0,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "❖ ",
                font: "Verdana",
              }),
              new TextRun({
                text: "2.1 Payment by money transfer",
                bold: true,
                font: "Verdana",
                size: 18,
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "We accept payment by different currencies as below bank account.",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "ASIA COMMERCIAL BANK - HANOI BRANCH",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Address:          No. 442 Doi Can, Ba Dinh, Ha Ba Trung, Hanoi, Vietnam",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Account name: EVIS TOUR JSC",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Bank accounts: VND: 15453439 | USD: 15453459 | EUR: 60466249",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "                       AUD: 113606059 | SGD: 113605319 | GBP: 113739979",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Swift code:       ASCBVNVX | ACBV VIETNAM",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "* International transaction bank fees are paid by the payer",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "2.2 Payment by credit card or debit card",
                size: 18,
                bold: true,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Online credit card guarantee + 4%, pay all in cash on arrival (The deposited amount refund upon receive full payment)",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Payment must be in VND, apply at selling rate from the ",
                size: 18,
                font: "Verdana",
              }),
              new TextRun({
                text: "Vietcombank",
                size: 18,
                color: "0000FF",
                underline: {
                  type: "single",
                },
                font: "Verdana",
              }),
              new ExternalHyperlink({
                children: [
                  new TextRun({
                    text: " (https://portal.vietcombank.com.vn/en-Us/Corporate/TG/Pages/exchange-rate.aspx)",
                    size: 18,
                    color: "0000FF",
                    underline: {},
                    font: "Verdana",
                  }),
                ],
                link: "https://portal.vietcombank.com.vn/en-Us/Corporate/TG/Pages/exchange-rate.aspx",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "2.2.1 Payment by Third party",
                size: 18,
                bold: true,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Payment can be made by a third party by credit card. The payer is required to have a confirmation letter for the payment.",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "3. BOOKING AMENDMENT",
                bold: true,
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Amendment requests must be received in writing at our office. We will make the changes subject to availability and have the right to charge an amendment fee of US$20 per person to cover our administration costs. In addition to this fee we charge, any alteration, whether a change to an existing booking or a change to another tour, departure date or any other item, may also be subject to any of the costs imposed by any of the suppliers providing the component parts of the tour. If the trip to which you change to is more expensive than the one you originally booked, a further deposit will also have to be paid.",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            spacing: {
              before: 50,
            },
            children: [
              new TextRun({
                text: "4. CANCELLATION AND REFUND",
                size: 18,
                bold: true,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "4.1 Cancellation by you",
                size: 18,
                bold: true,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 50,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "You, or any member of your party, may cancel your tour at any time providing that the cancellation is made in writing. Notice of cancellation will only be effective upon receipt of your written communication. You must ensure we notice that Jewel Tours has already received your cancellation request. We recommend that you use recorded delivery as we start to incur costs from the time the trip is confirmed, we will retain your deposit and in addition may apply cancellation charges up to the maximum amounts listed below based on your prior to arrival date:",
                size: 18,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "A group from 1 person up to 8 persons (FIT)",
                underline: {},
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "45 days: loss of deposit",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "15 - 44 days: charge 25% of the total tour cost",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "7 - 14 days: charge 50% of the total tour cost",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Less than 7 days: charge 100% total tour cost",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "A group from 8 persons and more (GIT)",
                underline: {},
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 300,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "60 days: loss of deposit",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "45 - 59 days: charge of 25% of the total tour cost",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "30 - 44 days: charge 50% of the total tour cost",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Less than 30 days: charge 100% total tour cost",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "*This cancellation policy is subject to change if there is any special note on the booking confirmation that has been approved and confirmed.",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 300,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "*If cancellation is part of the group and not the total group size, we have the right to change the quote based on the amended group size.",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "4.2 Cancellation by us",
                bold: true,
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "We reserve the right to cancel the agreement between us for any reason prior to your holiday, whereupon we will refund any payment that you have paid us in full. However, after a full payment has been made, we will only cancel the agreement if circumstances beyond our control make it necessary.",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "In the unlikely event that such circumstances should arise, we will contact you immediately and offer you the choice of an alternative holiday or tour of equivalent quality, or a full refund of all payments. No additional compensation will be paid over and above the total sum received from you.",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "If we are forced to cancel your holiday after departure, we will, wherever possible, make suitable alternative arrangements. If we are unable to make alternative arrangements, or you reject these for a good reason then we will return you to your point of departure and refund you for any unused services, if appropriate.",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "4.3 Refund",
                bold: true,
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: "If your trip or your services are booked, confirmed and you already made payment to us, then we will process the refund to you only if there is full document/information at the time you make the cancellation. We will process the refund within 30 days from the date of cancellation. Please note that if you fail to provide us with any of the required documents, Jewel Tours have the right to reject your refund request.",
            spacing: {
              before: 100,
            },
          }),
          // new Paragraph({
          //   children: [
          //     new TextRun({
          //       text: "5. FORCE MAJEURE ",
          //       bold: true,
          //       size: 18,
          //       font: "Verdana",
          //     }),
          //   ],
          //   spacing: {
          //     before: 200,
          //   },
          // }),
          // new Paragraph({
          //   children: [
          //     new TextRun({
          //       text: "If you cancel your booking, cancellation fees will apply. The amount of the cancellation fee depends on when we receive your written cancellation notification:",
          //       size: 18,
          //       font: "Verdana",
          //     }),
          //   ],
          //   spacing: {
          //     before: 100,
          //   },
          // }),
          // new Paragraph({
          //   text: "More than 30 days before departure: 10% of total tour cost",
          //   indent: {
          //     left: 620,
          //   },
          //   spacing: {
          //     before: 100,
          //   },
          // }),
          // new Paragraph({
          //   text: "15-29 days before departure: 30% of total tour cost",
          //   indent: {
          //     left: 620,
          //   },
          //   spacing: {
          //     before: 100,
          //   },
          // }),
          // new Paragraph({
          //   text: "7-14 days before departure: 50% of total tour cost",
          //   indent: {
          //     left: 620,
          //   },
          //   spacing: {
          //     before: 100,
          //   },
          // }),
          // new Paragraph({
          //   text: "Less than 7 days before departure: 100% of total tour cost",
          //   indent: {
          //     left: 620,
          //   },
          //   spacing: {
          //     before: 100,
          //   },
          // }),
          new Paragraph({
            children: [
              new TextRun({
                text: "5. FORCE MAJEURE ",
                bold: true,
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Compensation however will not be payable if we are forced to cancel for reasons of force majeure. Circumstances amounting to "force majeure" include any event which we or the supplier of the service(s) in question could not even with all due care, foresee or forestall such as (by way of example and not by way of limitation) war, threat of war, riot, civil strife, industrial dispute, terrorist activity, natural or nuclear disaster, fire, acts of God, adverse weather conditions, and all similar events mentioned in clause 8.1. If as a consequence of force majeure, Jewel Tours is obliged to curtail, alter, extend or cancel the tour, you shall not be at liberty to maintain a claim for compensation or otherwise for any loss arising as a consequence of said curtailment, alteration, extension or cancellation of the tour.',
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "5.1 Happenings beyond our control",
                bold: true,
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: '"Happenings beyond our control" refer to everything that we cannot possibly prevent or control ourselves, such as (by way of example and not by way of limitation) natural disasters, adverse weather conditions, fire or other destruction of any vehicle, vessel or accommodation to be used in connection with a tour, riots, acts of war, civil commotion, exercise of legislative or government action, industrial or military action, industrial dispute, terrorist action, prevention of equipment, mechanical breakdown, shortage of fuel, insolvency or default of any carrier or service connected with the tour.',
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "6. JURISDICTION AND LAW",
                bold: true,
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "These Booking Terms and Conditions and any agreement to which they apply are governed in all respects by Vietnamese Law. We both agree that any booking made is not a dispute, claim or other matter which arises between us will be exclusively be dealt with by the jurisdiction of the courts of Vietnam.",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "7. COMPLAINT PROCESS",
                bold: true,
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "If you have any reason to make a complaint during your holiday or tour, you must inform our local representative or your tour guide, and the relevant supplier of the service immediately. If you are not happy with their action or response at the time of complaint, please inform our office in writing, within 35 days of your return home. We will acknowledge your written notification within 24 hours and aim to provide a full response within 7 working days. Our aim is to resolve any complaints you may have, but we cannot enforce the matter will be solved by the third party.",
                size: 18,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
        ],
        // footers: {
        //   default: new Footer({
        //     children: [
        //       new Paragraph({
        //         border: {
        //           top: {
        //             color: "38bdf8",
        //             size: 1,
        //             space: 10,
        //             style: "dashed",
        //           },
        //         },
        //         alignment: AlignmentType.CENTER,
        //         children: [
        //           new TextRun({
        //             text: "Add: 18th floor, VTC Online building, 18 Tam Trinh, Hai Ba Trung, Viet Nam",
        //           }),
        //         ],
        //       }),
        //       new Paragraph({
        //         alignment: AlignmentType.CENTER,
        //         children: [
        //           new TextRun({
        //             text: "Trading license: 0103007908 | Internatinal license: 01 -043/2014/TCDL-GPLHQT",
        //           }),
        //         ],
        //       }),
        //       new Paragraph({
        //         alignment: AlignmentType.CENTER,
        //         children: [
        //           new TextRun({
        //             text: "Phone: +84 243 3974 6373 | Email: ",
        //           }),
        //           new TextRun({
        //             text: "info@jeweltours.com",
        //             color: "38bdf8",
        //           }),
        //           new TextRun({
        //             text: " | Website: ",
        //           }),
        //           new TextRun({
        //             text: "www.jeweltours.com",
        //             color: "38bdf8",
        //           }),
        //         ],
        //       }),
        //     ],
        //   }),
        // },

        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                children: [
                  new TextRun({
                    text: "", // Đường kẻ ngang
                    border: {
                      top: {
                        color: "000000",
                        size: 6,
                        style: "single",
                      },
                    },
                  }),
                ],
              }),
              new Paragraph({
                children: [
                  new ImageRun({
                    data: imageBufferHeader,
                    transformation: {
                      width: 50,
                      height: 50,
                    },
                  }),
                  new TextRun({
                    text: "   Add: 18th floor, VTC Online building, 18 Tam Trinh, Hai Ba Trung, Hanoi, Vietnam",
                  }),
                ],
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                text: "Trading license: 0103009708 | International license: 01-043/2014/TCDL-GPLHQT",
                alignment: AlignmentType.LEFT,
              }),
              new Paragraph({
                children: [
                  new TextRun("Phone: +84 243 3974 6373 | Email: "),
                  new TextRun({
                    text: "info@jeweltours.com",
                    color: "0000FF",
                  }),
                  new TextRun(" | Website: "),
                  new TextRun({
                    text: "www.jeweltours.com",
                    color: "0000FF",
                  }),
                ],
                alignment: AlignmentType.LEFT,
              }),
            ],
          }),
        },
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, `${lastestHistory?.code}.docx`);
  });
};
