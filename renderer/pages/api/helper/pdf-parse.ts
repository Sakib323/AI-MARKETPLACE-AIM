import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import fs from "fs/promises";
import pdf from "pdf-parse";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const form = formidable();

    try {
      const [fields, files] = await form.parse(req);
      const file = files.pdf?.[0];

      if (!file) {
        return res.status(400).json({ error: "No PDF file uploaded" });
      }

      const dataBuffer = await fs.readFile(file.filepath);
      const pdfData = await pdf(dataBuffer);

      res.status(200).json({ extractedText: pdfData.text });
    } catch (error) {
      console.error("Error processing PDF:", error);
      res.status(500).json({ error: "Error processing PDF" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
