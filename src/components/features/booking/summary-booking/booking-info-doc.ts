import { formatCurrency } from "@/helpers/currency-helper";
import { formatDate } from "@/helpers/date-helper";
import {
  AlignmentType,
  Document,
  Footer,
  Header,
  ImageRun,
  Packer,
  Paragraph,
  Table,
  TableCell,
  TableRow,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";

export const generateWordDocument = async (
  vendor,
  dateCheckIn,
  dateCheckOut,
  resultSearchBooking,
  numberOfPeople,
  totals,
  numberOfDays
) => {
  const imageResponse = await fetch("/logo.png").then((res) => res.blob());

  const imageBuffer = await imageResponse.arrayBuffer();

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
                    data: imageBuffer,
                    type: "jpg",
                    transformation: {
                      width: 150,
                      height: 150,
                    },
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "The Authentic Travel Company",
                    color: "38bdf8",
                    bold: true,
                    size: 28,
                    font: "Verdana",
                  }),
                ],
                border: {
                  bottom: {
                    color: "38bdf8",
                    size: 1,
                    space: 10,
                    style: "dashed",
                  },
                },
              }),
            ],
          }),
        },
        children: [
          new Table({
            width: {
              size: 100,
              type: "pct",
            },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Proposal to:",
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: "Proposal to:",
                            font: "Verdana",
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 30,
                      type: "pct",
                    },
                    margins: {
                      top: 2,
                      bottom: 2,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: vendor?.name || "",
                            bold: true,
                            font: "Verdana",
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 70,
                      type: "pct",
                    },
                    margins: {
                      top: 2,
                      bottom: 2,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                ],
                height: {
                  value: 400,
                  rule: "atLeast",
                },
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: "Travelling period:",
                            font: "Verdana",
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 30,
                      type: "pct",
                    },
                    margins: {
                      top: 2,
                      bottom: 2,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: formatDate(dateCheckIn),
                            font: "Verdana",
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 70,
                      type: "pct",
                    },
                    margins: {
                      top: 2,
                      bottom: 2,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                ],
                height: {
                  value: 400,
                  rule: "atLeast",
                },
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: "Destination(s):",
                            font: "Verdana",
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 30,
                      type: "pct",
                    },
                    margins: {
                      top: 2,
                      bottom: 2,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: "Vietnam",
                            font: "Verdana",
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 70,
                      type: "pct",
                    },
                    margins: {
                      top: 2,
                      bottom: 2,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                ],
                height: {
                  value: 400,
                  rule: "atLeast",
                },
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: "Number of pax",
                            font: "Verdana",
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 30,
                      type: "pct",
                    },
                    margins: {
                      top: 2,
                      bottom: 2,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: `${numberOfPeople} pax`,
                            font: "Verdana",
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 70,
                      type: "pct",
                    },
                    margins: {
                      top: 2,
                      bottom: 2,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                ],
                height: {
                  value: 400,
                  rule: "atLeast",
                },
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: "Nationality:",
                            font: "Verdana",
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 30,
                      type: "pct",
                    },
                    margins: {
                      top: 2,
                      bottom: 2,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        alignment: AlignmentType.LEFT,
                        children: [
                          new TextRun({
                            text: vendor?.address || "",
                            font: "Verdana",
                          }),
                        ],
                      }),
                    ],
                    width: {
                      size: 70,
                      type: "pct",
                    },
                    margins: {
                      top: 2,
                      bottom: 2,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                ],
                height: {
                  value: 400,
                  rule: "atLeast",
                },
              }),
            ],
          }),

          ...Object.entries(resultSearchBooking)
            .filter(([key]) => key !== "city")
            .map(([dayKey, dayData], index) => {
              // Calculate the date for this day by adding index days to check-in date
              const currentDate = new Date(dateCheckIn);
              currentDate.setDate(currentDate.getDate() + index);
              const formattedDate = new Intl.DateTimeFormat("en-GB", {
                day: "2-digit",
                month: "short",
              }).format(currentDate);

              return [
                // Day header with date
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
                    }),
                  ],
                }),
                // Day description
                new Paragraph({
                  children: [
                    new TextRun({
                      text: dayData?.city?.desc || "",
                      font: "Verdana",
                    }),
                  ],
                }),
                // Accommodation details for each day
                new Paragraph({
                  spacing: {
                    before: 200,
                  },
                  children: [
                    new TextRun({
                      text: "Accommodation:",
                      bold: true,
                      font: "Verdana",
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: {
                    before: 100,
                  },
                  children: [
                    new TextRun({
                      text: "Service included:",
                      font: "Verdana",
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: {
                    before: 100,
                  },
                  children: [
                    new TextRun({
                      text: "Transfer:",
                      font: "Verdana",
                    }),
                  ],
                }),
                // Attractions and places to visit
                new Paragraph({
                  spacing: {
                    before: 200,
                  },
                  children: [
                    new TextRun({
                      text: "Places of interest:",
                      bold: true,
                      font: "Verdana",
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: {
                    before: 100,
                  },
                  children: [
                    new TextRun({
                      text: "- The Ho Chi Minh Mausoleum - Ba Dinh Square (visit outside)",
                      font: "Verdana",
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: {
                    before: 100,
                  },
                  children: [
                    new TextRun({
                      text: "- One Pillar Pagoda - built between the years of 1028-1054 during the reign of Emperor Ly Thai Tong, now it is one of Vietnam's most iconic temples.",
                      font: "Verdana",
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: {
                    before: 100,
                  },
                  children: [
                    new TextRun({
                      text: "- Tran Quoc Pagoda - the oldest pagoda in Hanoi, built 6th century. There were many Kings and Masters have been visited this pagoda including President of India Rajendra Prasad 1959 and gave a Banhi tree in front of the main pagoda.",
                      font: "Verdana",
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: {
                    before: 100,
                  },
                  children: [
                    new TextRun({
                      text: "- Ceramic Mosaic in Hanoi, Long Bien historical bridge.",
                      font: "Verdana",
                    }),
                  ],
                }),
                new Paragraph({
                  spacing: {
                    before: 100,
                  },
                  children: [
                    new TextRun({
                      text: "- Dong Xuan market - one of the big local markets in Hanoi that sells many nice stuff and souvenirs, located in Old Quarter.",
                      font: "Verdana",
                    }),
                  ],
                }),
              ];
            })
            .flat(),

          new Paragraph({
            children: [
              new TextRun({
                text: `TOUR COST: ${formatCurrency(
                  totals.total / numberOfPeople
                )} VNĐ PER PERSON (GROUP OF ${numberOfPeople} PAX + 1 CHILD 10 YEARS)`,
                color: "FF0000",
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
                text: "Children from 6 - 11 years 50% of tour cost (without extra bed) & 75% of tour cost (with extra bed)",
                size: 20,
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
                text: "Surcharge upon request",
                size: 24,
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
                text: "Visa letter to Vietnam: US$10/pax (Take 5 days working)",
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
                text: "Visa stamp on arrival US$25/pax pay in cash on arrival",
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Any extra meal upon request: US$ 15/pax/meal (Minimum booking of 02 people – maximum dinner time 2 hours – only driver drop off/pick up)",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "CONDITION FOR ASIAN MARKET",
                bold: true,
                color: "FF0000",
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: "Compulsory tips: US$ 3 per person per day to tour guide and driver (Group from 5 – 15 pax)",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "Payment by bank transfer charge: US$ 25 bank fees (Apply for any group less than 10 pax)",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "*Our guide will collect tips upon arrival in cash",
                color: "FF0000",
                font: "Verdana",
              }),
            ],
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: "INCLUDED IN THE PRICE:",
                bold: true,
                color: "000000",
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: "Transportation in private vehicle with driver",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "Hotel at mentioned or similar in Double/ Twin room or triple",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "Meal as mentioned in the program (B=breakfast, L=lunch, D=dinner)",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "Entrance fee to indicated sights",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "English speaking guide",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "02 bottles of mineral water during tour",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "EXCLUSIVE:",
                bold: true,
                color: "000000",
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: "Domestic and international flights, other meals, tips, drinks, international airport tax, single room supplements, peak season surcharges, personal expenses, travel insurance, visas, any optional additional tours or activities during free time, check in/check out at your hotel, Covid tests and anything related to covid",
            indent: {
              left: 620,
            },
            spacing: {
              after: 200,
            },
          }),

          new Paragraph({
            heading: "Heading1",
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: "HOW TO MAKE PAYMENT",
                color: "FF0000",
                bold: true,
                size: 28,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            text: "Bank transfer to Jewel Tours, the bank fee charge $25 to the total invoice",
            indent: {
              left: 620,
            },
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Pay 15% by bank transfer and balance on arrival, the bank fee charge $25 to the total invoice",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "Online credit card payment - 3.5% fee will apply (Arrival Payment amount Refund upon receive full payment) - https://portal.vietcombank.com.vn/en-Us/Personal/TG/Pages/exchange-rate.aspx",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "UAZMRMSHSATN4ATNA - Payment must be in VND apply at rate from this link: https://portal.vietcombank.com.vn/en-Us/Corporate/TG/Pages/exchange-rate.aspx",
            indent: {
              left: 620,
            },
            spacing: {
              after: 200,
            },
          }),
          new Paragraph({
            heading: "Heading1",
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: "GENERAL BOOKING CONDITION",
                color: "FF0000",
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
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: "If you are traveling with children, it is your responsibility to ensure that they are fit and healthy to ensure they can participate in your chosen itinerary and that they are supervised at all times during the tour. Jewel Tours is not responsible for any failure to participate in any activity due to your child's health or for the supervision of children on the tour.",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "1.1 Rates for Children (applicable for ONE child only per booking)",
                bold: true,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: "Children under 2 years of age free of charge (shared bed with parents)",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Children from 3 - 5 years of age charge 25% tour cost (without extra bed) & 50% of tour cost (with extra bed)",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Children from 6 - 11 years of age 50% of tour cost (without extra bed) & 75% of tour cost (with extra bed)",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Children from 12 years of age 100% of tour cost (with extra bed)",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Single room supplement: 30% of tour cost (single traveler or odd number of travelers in single room subject charge)",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "2. HOW TO PAY",
                bold: true,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: "Upon agreement with the tour program and costs, we will provide you with a deposit invoice before we process the booking.",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Pay for package tours: There are 2 options",
                bold: true,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Option 1",
            spacing: {
              before: 100,
            },
            bullet: {
              level: 0,
            },
          }),
          new Paragraph({
            text: "Pay deposit 30% by the time of booking is confirmed",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "Balance pay 14 days prior to arrival date",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "Option 2",
            spacing: {
              before: 100,
            },
            bullet: {
              level: 0,
            },
          }),
          new Paragraph({
            text: "No deposit required",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "Full payment made 30 days prior to arrival date",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "If a booking is made within the 30 days prior to departure you are required to make the full payment at the time of the booking confirmation.",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "*Any group with more than 8 persons is subject to special conditions.",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Pay for other services",
                bold: true,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Pay for accommodation, payment term is attached to the booking",
            spacing: {
              before: 100,
            },
            bullet: {
              level: 0,
            },
          }),
          new Paragraph({
            text: "Pay for transfer and sightseeing, full payment 7 days prior to arrival date",
            spacing: {
              before: 100,
            },
            bullet: {
              level: 0,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "PAYMENT METHODS",
                bold: true,
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: "2.1 Payment by money transfer",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "We accept payment by different currencies as below bank account.",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "ASIA COMMERCIAL BANK - HANOI BRANCH",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Address: No. 442 Doi Can, Ba Dinh, Ha Ba Trung, Hanoi, Vietnam",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Beneficiary: EVIS TOUR JSC",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Bank accounts: VND: 15453439 | USD: 15453459 | EUR: 60466249",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "USD: 15453459 | EUR: 60466249",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Swift code: ASCBVNVX | ACBV VIETNAM",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "* International transaction bank fees are paid by the payer",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "2.2 Payment by credit card or debit card",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Online credit card guarantee + 4%, pay all in cash on arrival (The deposited amount refund upon receive full payment)",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: "Payment must be in VND, apply at selling rate from the ",
                font: "Verdana",
              }),
              new TextRun({
                text: "Vietcombank",
                color: "0000FF",
                underline: {
                  type: "single",
                },
                font: "Verdana",
              }),
              new TextRun({
                text: " (https://portal.vietcombank.com.vn/en-Us/Corporate/TG/Pages/exchange-rate.aspx)",
                font: "Verdana",
              }),
            ],
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "2.2.1 Payment by Third party",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Payment can be made by a third party by credit card. The payer is required to have a confirmation letter for the payment.",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            heading: "Heading2",
            spacing: {
              before: 200,
            },
            children: [
              new TextRun({
                text: "3. BOOKING AMENDMENT",
                bold: true,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            text: "Amendment requests must be received in writing at our office. We will make the changes subject to availability and have the right to charge an amendment fee of US$20 per person to cover our administration costs. In addition to this fee we charge, any alteration, whether a change to an existing booking or a change to another tour, departure date or any other item, may also be subject to any of the costs imposed by any of the suppliers providing the component parts of the tour. If the trip to which you change to is more expensive than the one you originally booked, a further deposit will also have to be paid.",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            heading: "Heading2",
            spacing: {
              before: 200,
            },
            children: [
              new TextRun({
                text: "4. CANCELLATION AND REFUND",
                bold: true,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            text: "4.1 Cancellation by you",
            bold: true,
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "You, or any member of your party, may cancel your tour at any time providing that the cancellation is made in writing. Notice of cancellation will only be effective upon receipt of your written communication. You must ensure we notice that Jewel Tours has already received your cancellation request. We recommend that you use recorded delivery as we start to incur costs from the time the trip is confirmed, we will retain your deposit and in addition may apply cancellation charges up to the maximum amounts listed below based on your prior to arrival date:",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "A group from 1 person up to 8 persons (FIT)",
            bold: true,
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "45 days: loss of deposit",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "15 - 44 days: charge 25% of the total tour cost",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "7 - 14 days: charge 50% of the total tour cost",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "Less than 7 days: charge 100% total tour cost",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "A group from 8 persons and more (GIT)",
            bold: true,
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "60 days: loss of deposit",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "45 - 59 days: charge of 25% of the total tour cost",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "30 - 44 days: charge 50% of the total tour cost",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "Less than 30 days: charge 100% total tour cost",
            indent: {
              left: 620,
            },
          }),
          new Paragraph({
            text: "*This cancellation policy is subject to change if there is any special note on the booking confirmation that has been approved and confirmed.",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "**If cancellation is part of the group and not the total group size, we have the right to change the quote based on the amended group size.",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            heading: "Heading1",
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: "CANCELLATION POLICY",
                color: "FF0000",
                bold: true,
                size: 28,
                font: "Verdana",
              }),
            ],
          }),
          new Paragraph({
            text: "Cancellation by us",
            bold: true,
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: "We reserve the right to cancel the agreement between us for any reason prior to your holiday, whereupon we will refund any payment that you have paid us in full. However, after a full payment has been made, we will only cancel the agreement if circumstances beyond our control make it necessary.",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "In the unlikely event that such circumstances should arise, we will contact you immediately and offer you the choice of an alternative holiday or tour of equivalent quality, or a full refund of all payments. No additional compensation will be paid over and above the total sum received from you.",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "If we are forced to cancel your holiday after departure, we will, wherever possible, make suitable alternative arrangements. If we are unable to make alternative arrangements, or you reject these for a good reason then we will return you to your point of departure and refund you for any unused services, if appropriate.",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Refund",
            bold: true,
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
          new Paragraph({
            text: "Cancellation by you",
            bold: true,
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: "If you cancel your booking, cancellation fees will apply. The amount of the cancellation fee depends on when we receive your written cancellation notification:",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "More than 30 days before departure: 10% of total tour cost",
            indent: {
              left: 620,
            },
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "15-29 days before departure: 30% of total tour cost",
            indent: {
              left: 620,
            },
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "7-14 days before departure: 50% of total tour cost",
            indent: {
              left: 620,
            },
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Less than 7 days before departure: 100% of total tour cost",
            indent: {
              left: 620,
            },
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "Force Majeure",
            bold: true,
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: 'Compensation however will not be payable if we are forced to cancel for reasons of force majeure. Circumstances amounting to "force majeure" include any event which we or the supplier of the service(s) in question could not even with all due care, foresee or forestall such as (by way of example and not by way of limitation) war, threat of war, riot, civil strife, industrial dispute, terrorist activity, natural or nuclear disaster, fire, acts of God, adverse weather conditions, and all similar events mentioned in clause 8.1. If as a consequence of force majeure, Jewel Tours is obliged to curtail, alter, extend or cancel the tour, you shall not be at liberty to maintain a claim for compensation or otherwise for any loss arising as a consequence of said curtailment, alteration, extension or cancellation of the tour.',
            spacing: {
              before: 100,
            },
          }),

          new Paragraph({
            text: "5.1 Happenings beyond our control",
            bold: true,
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: '"Happenings beyond our control" refer to everything that we cannot possibly prevent or control ourselves, such as (by way of example and not by way of limitation) natural disasters, adverse weather conditions, fire or other destruction of any vehicle, vessel or accommodation to be used in connection with a tour, riots, acts of war, civil commotion, exercise of legislative or government action, industrial or military action, industrial dispute, terrorist action, prevention of equipment, mechanical breakdown, shortage of fuel, insolvency or default of any carrier or service connected with the tour.',
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "6. JURISDICTION AND LAW",
            bold: true,
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: "These Booking Terms and Conditions and any agreement to which they apply are governed in all respects by Vietnamese Law. We both agree that any booking made is not a dispute, claim or other matter which arises between us will be exclusively be dealt with by the jurisdiction of the courts of Vietnam.",
            spacing: {
              before: 100,
            },
          }),
          new Paragraph({
            text: "7. COMPLAINT PROCESS",
            bold: true,
            spacing: {
              before: 200,
            },
          }),
          new Paragraph({
            text: "If you have any reason to make a complaint during your holiday or tour, you must inform our local representative or your tour guide, and the relevant supplier of the service immediately. If you are not happy with their action or response at the time of complaint, please inform our office in writing, within 35 days of your return home. We will acknowledge your written notification within 24 hours and aim to provide a full response within 7 working days. Our aim is to resolve any complaints you may have, but we cannot enforce the matter will be solved by the third party.",
            spacing: {
              before: 100,
            },
          }),
        ],
        footers: {
          default: new Footer({
            children: [
              new Paragraph({
                border: {
                  top: {
                    color: "38bdf8",
                    size: 1,
                    space: 10,
                    style: "dashed",
                  },
                },
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Add: 18th floor, VTC Online building, 18 Tam Trinh, Hai Ba Trung, Viet Nam",
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Trading license: 0103007908 | Internatinal license: 01 -043/2014/TCDL-GPLHQT",
                  }),
                ],
              }),
              new Paragraph({
                alignment: AlignmentType.CENTER,
                children: [
                  new TextRun({
                    text: "Phone: +84 243 3974 6373 | Email: ",
                  }),
                  new TextRun({
                    text: "info@jeweltours.com",
                    color: "38bdf8",
                  }),
                  new TextRun({
                    text: " | Website: ",
                  }),
                  new TextRun({
                    text: "www.jeweltours.com",
                    color: "38bdf8",
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
    saveAs(blob, "document.docx");
  });
};
