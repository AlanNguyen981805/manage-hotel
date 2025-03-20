import {
  Document,
  Packer,
  Paragraph,
  Header,
  Footer,
  WidthType,
  Table,
  TableRow,
  TableCell,
  AlignmentType,
  ImageRun,
  TextRun,
} from "docx";
import { saveAs } from "file-saver";
import { dataTableOne } from "./data-mock";

export const generateWordDocument = async () => {
  const imageResponse = await fetch("/test.png");
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
                    type: "png",
                    transformation: { width: 150, height: 150 },
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

        children: [
          new Table({
            width: {
              size: 100,
              type: WidthType.PERCENTAGE,
            },
            rows: [
              ...dataTableOne.map((data, index) => {
                return new TableRow({
                  children: data.map(
                    (cell, indexChild) =>
                      new TableCell({
                        children: [
                          new Paragraph({
                            children: [
                              new TextRun({
                                text: cell.toString(),
                                font: 'Tahoma',
                                bold:
                                  index === 0 && indexChild === 1
                                    ? true
                                    : false,
                              }),
                            ],
                          }),
                        ],
                      })
                  ),
                });
              }),
            ],
          }),
        ],
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => {
    saveAs(blob, "document.docx");
  });
};
