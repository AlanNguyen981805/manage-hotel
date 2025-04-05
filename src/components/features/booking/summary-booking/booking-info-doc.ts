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
                    text: "The authentic travel company",
                    color: "38bdf8",
                    bold: true,
                    size: 28,
                    font: "Comic Sans MS",
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
                            text: vendor.name,
                            bold: true,
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
                        text: "Travelling period:",
                        alignment: AlignmentType.LEFT,
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
                        text: formatDate(dateCheckIn),
                        alignment: AlignmentType.LEFT,
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
                        text: "Destination(s):",
                        alignment: AlignmentType.LEFT,
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
                        text: "Vietnam",
                        alignment: AlignmentType.LEFT,
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
                        text: "Number of pax",
                        alignment: AlignmentType.LEFT,
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
                        text: `${numberOfPeople} pax`,
                        alignment: AlignmentType.LEFT,
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
                        text: "Nationality:",
                        alignment: AlignmentType.LEFT,
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
                        text: vendor.address,
                        alignment: AlignmentType.LEFT,
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
                        text: "Hotel category:",
                        alignment: AlignmentType.LEFT,
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
                        text: `${resultSearchBooking.day1?.hotels?.[0].hotelType.id}*`,
                        alignment: AlignmentType.LEFT,
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
                        text: "Meals plan",
                        alignment: AlignmentType.LEFT,
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
                        text: "B",
                        alignment: AlignmentType.LEFT,
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

          new Paragraph({
            heading: "Heading1",
            alignment: AlignmentType.CENTER,
            spacing: {
              before: 400,
            },
            children: [
              new TextRun({
                text: `${numberOfDays} DAYS | VIETNAM GROUP TOUR`,
                color: "FF0000",
                bold: true,
                size: 28,
                font: "Comic Sans MS",
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
                  text: `DAY ${index + 1} (${formattedDate}) : ${
                    dayData?.city?.name || ""
                  }`,
                  heading: "Heading2",
                  spacing: {
                    before: index > 0 ? 400 : 0, // Add space before each day except the first one
                  },
                }),
                // Day description
                new Paragraph({
                  text: dayData?.city?.desc || "",
                }),
              ];
            })
            .flat(),

          new Paragraph({
            spacing: {
              before: 800,
              after: 400,
            },
          }),

          new Table({
            width: {
              size: 100,
              type: "pct",
            },
            rows: [
              // Header row
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Net TOUR COST IN USD PER PERSON",
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    columnSpan: 2,
                    margins: {
                      top: 120,
                      bottom: 120,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                ],
              }),
              // Second row with two columns
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "TOUR OPTION",
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: {
                      size: 50,
                      type: "pct",
                    },
                    margins: {
                      top: 120,
                      bottom: 120,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "HOTEL AS REQUEST",
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: {
                      size: 50,
                      type: "pct",
                    },
                    margins: {
                      top: 120,
                      bottom: 120,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                ],
              }),
              // Third row with data
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: `${numberOfPeople} adult`,
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: {
                      size: 50,
                      type: "pct",
                    },
                    margins: {
                      top: 120,
                      bottom: 120,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: `${formatCurrency(
                          totals.total / numberOfPeople
                        )}`,
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    width: {
                      size: 50,
                      type: "pct",
                    },
                    margins: {
                      top: 120,
                      bottom: 120,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        text: "Children from 3 - 5 years of age charge 25% tour cost (without extra bed) & 50% of tour cost  (with extra bed) Children from 6 - 11 years 50% of tour cost  (without extra bed) & 75% of tour cost (with extra bed)",
                        alignment: AlignmentType.CENTER,
                      }),
                    ],
                    columnSpan: 2,
                    margins: {
                      top: 120,
                      bottom: 120,
                      left: 120,
                      right: 120,
                    },
                    verticalAlign: "center",
                  }),
                ],
              }),
            ],
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
