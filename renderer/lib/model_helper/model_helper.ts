import axios from "axios";

export async function getNewToken(): Promise<string> {
  const tokenUrl = "https://iam.cloud.ibm.com/identity/token";
  const tokenData = new URLSearchParams({
    grant_type: "urn:ibm:params:oauth:grant-type:apikey",
    apikey: "f8jVh-LD5dx0HShw28a0hKC6b2G8sqbiWWyWhAIJb9Z2",
  });

  try {
    const tokenResponse = await axios.post(tokenUrl, tokenData.toString(), {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
    });

    if (tokenResponse.status === 200) {
      return tokenResponse.data.access_token;
    } else {
      throw new Error(
        `Failed to get new token: ${tokenResponse.status} ${tokenResponse.statusText}`
      );
    }
  } catch (error) {
    throw new Error(`Error fetching token: ${error}`);
  }
}

export async function codeGeneration(token: string, prompt: string) {
  const url =
    "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
  const body = {
    input: `Using the directions below, generate Python code for the given task.
    Input: 
    Output: def print_n_times(n):
        for i in range(n):
            print("Hello World!")
    <end of code>
    Input: ${prompt}
    Output:`,
    parameters: {
      decoding_method: "greedy",
      max_new_tokens: 1000,
      min_new_tokens: 1,
      stop_sequences: ["<end of code>"],
      repetition_penalty: 1,
    },
    model_id: "codellama/codellama-34b-instruct-hf",
    project_id: "ba3f3452-84da-4ef8-b10d-6be226050193",
  };

  try {
    const response = await axios.post(url, body, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return response;
  } catch (error) {
    throw new Error(`Error making request: ${error}`);
  }
}

export async function textSummarizer(token: string, prompt: string) {
  const url =
    "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
  const body = {
    input: `Write a short summary for the meeting transcripts.
    
Transcript: 00:00   [John]   I wanted to share an update on project X today.
00:15   [John]   Project X will be completed at the end of the week.
00:30   [Jane]  That's great!
00:35   [Jane]  I heard from customer Y today, and they agreed to buy our product.
00:45   [Joe]  Customer Z said they will too.
01:05   [John]   Great news, all around.
Summary: John shared an update that project X will be completed end of the week and will be purchased by customers Y and Z.

Transcript: ${prompt}
Summary:`,
    parameters: {
      decoding_method: "greedy",
      max_new_tokens: 200,
      min_new_tokens: 50,
      repetition_penalty: 1,
    },
    model_id: "ibm/granite-34b-code-instruct",
    project_id: "ba3f3452-84da-4ef8-b10d-6be226050193",
  };

  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(url, body, { headers });
    return response;
  } catch (error) {
    throw new Error(`Error making request: ${error}`);
  }
}

export async function questionAnswer(
  token: string,
  prompt: string,
  article: string
) {
  const url =
    "https://us-south.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29";
  const body = {
    input: `Answer the following question using only information from the article. If there is no good answer in the article, say "I don\'t know".

Article: ${article}

Question: Is growing tomatoes easy?
Answer: Yes, if you select varieties that are resistant to disease and pests.

Question: What varieties of tomatoes are there?
Answer: There are endless heirloom and specialty varieties.

Question: ${prompt}
Answer:`,
    parameters: {
      decoding_method: "greedy",
      max_new_tokens: 200,
      min_new_tokens: 50,
      repetition_penalty: 1,
    },
    model_id: "ibm/granite-34b-code-instruct",
    project_id: "ba3f3452-84da-4ef8-b10d-6be226050193",
  };
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };

  try {
    const response = await axios.post(url, body, { headers });
    return response;
  } catch (error) {
    throw new Error(`Error making request: ${error}`);
  }
}
