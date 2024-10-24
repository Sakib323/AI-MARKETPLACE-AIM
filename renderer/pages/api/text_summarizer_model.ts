import type { NextApiRequest, NextApiResponse } from "next";
import {
  getNewToken,
  textSummarizer,
} from "../../lib/model_helper/model_helper";

type Data = {
  summarizedText?: string;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { text } = req.body;

    try {
      let accessToken = await getNewToken();
      let response = await textSummarizer(accessToken, text);

      if (response.status === 401) {
        console.log("Token expired. Fetching a new token...");
        accessToken = await getNewToken();
        response = await textSummarizer(accessToken, text);
      }

      if (response.status === 200) {
        const data = response.data;
        const generatedText = data.results[0].generated_text;
        res.status(200).json({
          summarizedText: generatedText,
        });
      } else {
        res.status(response.status).json({ error: response.statusText });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error generating text. Please try again." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
