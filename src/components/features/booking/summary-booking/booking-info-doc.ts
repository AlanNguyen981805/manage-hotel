import { formatCurrency } from "@/helpers/currency-helper";
import { formatDate } from "@/helpers/date-helper";
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  Footer,
  Header,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
  WidthType,
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
  console.log("resultSearchBooking :>> ", resultSearchBooking);
  const images = [
    {
      path: "/logo.png",
      name: "header",
    },
    {
      path: "/_MG_6558.jpg",
      name: "header2",
    },
    {
      path: "/_MG_9963.jpg",
      name: "header3",
    },
    {
      path: "/_MG_8281.jpg",
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
                      width: 90,
                      height: 80,
                    },
                  }),
                  new TextRun({
                    text: " ".repeat(2),
                  }),
                  new ImageRun({
                    data: imageBufferHeader2,
                    transformation: {
                      width: 160,
                      height: 100,
                    },
                  }),
                  new TextRun({
                    text: " ".repeat(2),
                  }),
                  new ImageRun({
                    data: imageBufferHeader3,
                    transformation: {
                      width: 200,
                      height: 100,
                    },
                  }),
                  new TextRun({
                    text: " ".repeat(2),
                  }),
                  new ImageRun({
                    data: imageBufferHeader4,
                    transformation: {
                      width: 180,
                      height: 100,
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
                } ${vendor?.company ? "- " + vendor.company : ""}`,
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

                  const images = dayData?.city?.images
                    ? await convertImageToDocx(dayData.city.images)
                    : [];

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
                          color: "000000",
                        }),
                      ],
                      spacing: {
                        before: 300,
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

                    ...(dayData?.services && dayData.services.length > 0
                      ? dayData.services
                          .filter(
                            (service) => service?.serviceType?.type === "route"
                          )
                          .map(
                            (service) =>
                              new Paragraph({
                                spacing: {
                                  before: 300,
                                },
                                children: [
                                  new TextRun({
                                    text: "     - ",
                                    font: "Verdana",
                                  }),
                                  new TextRun({
                                    text: service.serviceType.desc,
                                    font: "Verdana",
                                  }),
                                ],
                              })
                          )
                      : []),

                    // Services
                    ...((dayData?.hotels && dayData.hotels.length >= 1) ||
                    (dayData?.services?.some(
                      (service) => service?.serviceType?.type === "company"
                    ) &&
                      dayData?.transportation?.length > 0)
                      ? [
                          new Paragraph({
                            spacing: {
                              before: 300,
                            },
                            children: [
                              new TextRun({
                                text: "Services include:",
                                font: "Verdana",
                                bold: true,
                              }),
                            ],
                          }),
                          // Accommodation - hiển thị nếu có hotels
                          ...(dayData?.hotels && dayData.hotels.length > 0
                            ? [
                                new Paragraph({
                                  spacing: {
                                    before: 100,
                                  },
                                  children: [
                                    new TextRun({
                                      text: "     ✔️ ",
                                      font: "Verdana",
                                      size: 16,
                                      bold: true,
                                    }),
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

                          // Transportation - hiển thị nếu có transportation
                          ...(dayData?.transportation &&
                          dayData.transportation.length > 0
                            ? [
                                new Paragraph({
                                  spacing: {
                                    before: 100,
                                  },
                                  children: [
                                    new TextRun({
                                      text: "     ✔️ ",
                                      font: "Verdana",
                                      size: 16,
                                      bold: true,
                                    }),
                                    new TextRun({
                                      text: `Transportation: ${dayData.transportation
                                        .map(
                                          (t) =>
                                            t.transportationType?.name &&
                                            `${
                                              t.transportationType?.name +
                                              " - " +
                                              (t?.transportationPrice?.desc ??
                                                "")
                                            }`
                                        )
                                        .join(", ")}`,
                                      font: "Verdana",
                                    }),
                                  ],
                                }),
                              ]
                            : []),

                          // Services - hiển thị tất cả services có type là company
                          ...(dayData?.services && dayData.services.length > 0
                            ? dayData.services
                                .filter(
                                  (service) =>
                                    service?.serviceType?.type === "company"
                                )
                                .map(
                                  (service) =>
                                    new Paragraph({
                                      spacing: {
                                        before: 100,
                                      },
                                      children: [
                                        new TextRun({
                                          text: "     ✔️ ",
                                          font: "Verdana",
                                          size: 16,
                                          bold: true,
                                        }),
                                        new TextRun({
                                          text: service.serviceType.desc,
                                          font: "Verdana",
                                        }),
                                      ],
                                    })
                                )
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
                color: "000000",
                bold: true,
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
                color: "000000",
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
                text: "US$ 4 per person per day to tour guide and driver (Group from 2 - 4 pax up)",
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
                text: "US$ 3 per person per day to tour guide and driver (Group from 5 – 15 pax)",
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
                text: "US$ 2 per person per day to tour guide and driver (Group from 16 - 20 pax)",
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
                  color: "000000",
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
                  color: "000000",
                  underline: {},
                  style: "Hyperlink",
                }),
                link: "https://portal.vietcombank.com.vn/en-Us/Corporate/TG/Pages/exchange-rate.aspx",
              }),
            ],
          }),
        ],

        footers: {
          default: new Footer({
            children: [
              new Table({
                width: {
                  size: 100,
                  type: WidthType.PERCENTAGE,
                },
                borders: {
                  top: { style: BorderStyle.NONE },
                  bottom: { style: BorderStyle.NONE },
                  left: { style: BorderStyle.NONE },
                  right: { style: BorderStyle.NONE },
                  insideHorizontal: { style: BorderStyle.NONE },
                  insideVertical: { style: BorderStyle.NONE },
                },
                rows: [
                  new TableRow({
                    children: [
                      new TableCell({
                        width: {
                          size: 50,
                          type: WidthType.DXA,
                        },
                        borders: {
                          top: { style: BorderStyle.NONE },
                          bottom: { style: BorderStyle.NONE },
                          left: { style: BorderStyle.NONE },
                          right: { style: BorderStyle.NONE },
                        },
                        children: [
                          new Paragraph({
                            children: [
                              new ImageRun({
                                data: imageBufferHeader,
                                transformation: {
                                  width: 60,
                                  height: 50,
                                },
                              }),
                            ],
                          }),
                        ],
                      }),
                      new TableCell({
                        borders: {
                          top: { style: BorderStyle.NONE },
                          bottom: { style: BorderStyle.NONE },
                          left: { style: BorderStyle.NONE },
                          right: { style: BorderStyle.NONE },
                        },
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: "Add: 18th floor, VTC Online building, 18 Tam Trinh, Hai Ba Trung, Hanoi, Vietnam",
                              }),
                            ],
                          }),
                          new Paragraph({
                            text: "Trading license: 0103009708 | International license: 01-043/2014/TCDL-GPLHQT",
                          }),
                          new Paragraph({
                            children: [
                              new TextRun("Phone: +84 243 3974 6373 | Email: "),
                              new TextRun({
                                text: "info@jeweltours.com",
                                color: "000000",
                              }),
                              new TextRun(" | Website: "),
                              new TextRun({
                                text: "www.jeweltours.com",
                                color: "000000",
                              }),
                            ],
                          }),
                        ],
                      }),
                    ],
                  }),
                ],
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
