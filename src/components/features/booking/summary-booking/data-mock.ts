import { HeadingLevel, ImageRun, Paragraph, TextRun } from "docx";
import { decode } from "html-entities";
import { marked } from "marked";

const getHeadingLevel = (tag: string): HeadingLevel | undefined => {
  const level = parseInt(tag.replace("h", ""));
  return level >= 1 && level <= 6
    ? (`HEADING_${level}` as HeadingLevel)
    : undefined;
};

export const convertHtmlToDocx = async (
  htmlString: string
): Promise<Paragraph[]> => {
  if (!htmlString) return [];

  const html = await marked(htmlString);
  const decoded = decode(html);

  console.log("html :>> ", decoded);

  const parser = new DOMParser();
  const doc = parser.parseFromString(decoded, "text/html");
  const body = doc.body;

  const paragraphs: Paragraph[] = [];

  const processNode = async (node: ChildNode): Promise<void> => {
    if (node.nodeType === Node.TEXT_NODE) return;

    const el = node as HTMLElement;

    if (el.tagName.startsWith("H")) {
      paragraphs.push(
        new Paragraph({
          children: [
            new TextRun({
              text: el.textContent || "",
              bold: true,
              size: 24,
            }),
          ],
          heading: getHeadingLevel(el.tagName),
        })
      );
    } else if (el.tagName === "P") {
      const runs: TextRun[] = [];

      el.childNodes.forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const text = child.textContent || "";
          // Split text by newlines and create separate TextRun for each line
          const lines = text.split("\n");

          lines.forEach((line, index) => {
            runs.push(new TextRun({ text: line }));
            // Add a line break after each line except the last one
            if (index < lines.length - 1) {
              runs.push(new TextRun({ break: 1 }));
            }
          });
        } else {
          const sub = child as HTMLElement;
          const text = sub.textContent || "";
          const lines = text.split("\n");

          lines.forEach((line, index) => {
            runs.push(
              new TextRun({
                text: line,
                bold: sub.tagName === "STRONG",
                italics: sub.tagName === "EM",
                underline: sub.tagName === "U" ? {} : undefined,
              })
            );

            if (index < lines.length - 1) {
              runs.push(new TextRun({ break: 1 }));
            }
          });
        }
      });

      paragraphs.push(new Paragraph({ children: runs }));
    } else if (el.tagName === "IMG") {
      const src = el.getAttribute("src");
      if (src) {
        try {
          const response = await fetch(src);
          const contentType = response.headers.get("Content-Type") || "";
          const imageBuffer = await response.arrayBuffer();

          console.log("Image content type:", contentType);

          const getImageType = (
            mime: string
          ): "png" | "jpeg" | "gif" | undefined => {
            if (mime.includes("png")) return "png";
            if (mime.includes("jpeg") || mime.includes("jpg")) return "jpeg";
            if (mime.includes("gif")) return "gif";
            return undefined;
          };

          const imageType = getImageType(contentType);
          if (!imageType) {
            console.warn(
              "Unsupported image type or wrong content type:",
              contentType
            );
            return;
          }

          const image = new ImageRun({
            data: imageBuffer,
            transformation: {
              width: 680,
              height: 360,
            },
          });

          paragraphs.push(new Paragraph({ children: [image] }));
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    }

    if (el.children.length > 0) {
      for (const child of Array.from(el.children)) {
        await processNode(child);
      }
    }
  };

  for (const child of Array.from(body.children)) {
    await processNode(child);
  }

  return paragraphs;
};

export const convertImageToDocx = async (
  imageUrls: string[]
): Promise<Paragraph[]> => {
  const imageRuns: (ImageRun | TextRun)[] = [];

  for (let i = 0; i < imageUrls?.length; i++) {
    const imageUrl = imageUrls[i];

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_STRAPI_URL}${imageUrl.url}`
    );
    const contentType = response.headers.get("Content-Type") || "";
    const imageBuffer = await response.arrayBuffer();

    const getImageType = (mime: string): "png" | "jpeg" | "gif" | undefined => {
      if (mime.includes("png")) return "png";
      if (mime.includes("jpeg") || mime.includes("jpg")) return "jpeg";
      if (mime.includes("gif")) return "gif";
      return undefined;
    };

    const imageType = getImageType(contentType);
    if (!imageType) {
      console.warn(
        "Unsupported image type or wrong content type:",
        contentType
      );
      return [];
    }

    const image = new ImageRun({
      data: imageBuffer,
      transformation: {
        width: 340,
        height: 200,
      },
    });

    imageRuns.push(image);

    // Thêm khoảng cách sau mỗi ảnh, trừ ảnh cuối
    if (i < imageUrls.length - 1) {
      imageRuns.push(
        new TextRun({
          text: "         ", // khoảng trắng
          size: 1, // rất nhỏ, chỉ tạo space
        })
      );
    }
  }

  return [
    new Paragraph({
      children: imageRuns,
      spacing: { after: 600, before: 300 },
    }),
  ];
};
