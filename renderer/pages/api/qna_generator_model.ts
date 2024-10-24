import type { NextApiRequest, NextApiResponse } from "next";
import {
  getNewToken,
  questionAnswer,
} from "../../lib/model_helper/model_helper";

type Data = {
  initialAnswer?: string;
  qaList?: Array<{ question: string; answer: string }>;
  error?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { prompt, article } = req.body;

    try {
      let accessToken = await getNewToken();
      let response = await questionAnswer(accessToken, prompt, article);

      if (response.status === 401) {
        console.log("Token expired. Fetching a new token...");
        accessToken = await getNewToken();
        response = await questionAnswer(accessToken, prompt, article);
      }

      if (response.status === 200) {
        const data = response.data;
        const generatedText = data.results[0].generated_text;

        // Parse the generated text into initial answer and Q&A pairs
        const { initialAnswer, qaList } = parseGeneratedText(generatedText);

        res.status(200).json({ initialAnswer, qaList });
      } else {
        res.status(response.status).json({ error: response.statusText });
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: "Error generating Q&A. Please try again." });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

function parseGeneratedText(text: string): {
  initialAnswer: string;
  qaList: Array<{ question: string; answer: string }>;
} {
  const lines = text.split("\n");
  let initialAnswer = "";
  const qaList: Array<{ question: string; answer: string }> = [];
  let currentQuestion = "";
  let currentAnswer = "";
  let isInitialAnswer = true;

  for (const line of lines) {
    if (line.startsWith("Question:")) {
      if (isInitialAnswer) {
        isInitialAnswer = false;
      } else if (currentQuestion) {
        qaList.push({
          question: currentQuestion,
          answer: currentAnswer.trim(),
        });
      }
      currentQuestion = line.substring("Question:".length).trim();
      currentAnswer = "";
    } else if (line.startsWith("Answer:")) {
      currentAnswer = line.substring("Answer:".length).trim();
    } else if (isInitialAnswer) {
      initialAnswer += (initialAnswer ? " " : "") + line.trim();
    } else {
      currentAnswer += (currentAnswer ? " " : "") + line.trim();
    }
  }

  // Add the last Q&A pair if it exists
  if (currentQuestion) {
    qaList.push({ question: currentQuestion, answer: currentAnswer.trim() });
  }

  return { initialAnswer: initialAnswer.trim(), qaList };
}
