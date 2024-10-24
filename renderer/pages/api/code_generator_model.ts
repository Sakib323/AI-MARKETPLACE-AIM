import type { NextApiRequest, NextApiResponse } from "next";
import {
  getNewToken,
  codeGeneration,
} from "../../lib/model_helper/model_helper";

type Data = {
  generatedCode?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { prompt } = req.body;

    try {
      let accessToken = await getNewToken();
      let response = await codeGeneration(accessToken, prompt);

      if (response.status === 401) {
        console.log("Token expired. Fetching a new token...");
        accessToken = await getNewToken();
        response = await codeGeneration(accessToken, prompt);
      }

      if (response.status === 200) {
        const data = response.data;
        const generatedText = data.results[0].generated_text;
        res.status(200).json({
          generatedCode: generatedText.replace("<end of code>", "").trim(),
        });
      } else {
        res.status(response.status).json({ error: response.statusText });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error generating code. Please try again." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
