import React, { useRef, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { Loader2, Upload } from "lucide-react";
import CodeBlock from "../../../components/CodeBlock";
import { Textarea } from "../../../components/ui/textarea";

interface QA {
  question: string;
  answer: string;
}
export default function ModelPage() {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>("");
  const [article, setArticle] = useState<string>("");
  const [initialAnswer, setInitialAnswer] = useState<string>("");
  const [generatedQA, setGeneratedQA] = useState<QA[]>([]);
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isLoadingCoding, setIsLoadingCoding] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmitQA = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
    setInitialAnswer("");
    setGeneratedQA([]);

    try {
      let articleData = article;

      if (pdfFile) {
        const formData = new FormData();
        formData.append("pdf", pdfFile);

        const extractResponse = await axios.post(
          "/api/helper/pdf-parse",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (extractResponse.status === 200) {
          articleData = extractResponse.data.extractedText;
        } else {
          throw new Error(
            `Error extracting text from PDF: ${extractResponse.status} ${extractResponse.statusText}`
          );
        }
      }
      const response = await axios.post(`/api/qna_generator_model`, {
        prompt,
        article: articleData,
      });

      if (response.status === 200) {
        setInitialAnswer(response.data.initialAnswer);
        setGeneratedQA(response.data.qaList);

        generateCode(response.data.initialAnswer);
      } else {
        throw new Error(
          `Non-200 response: ${response.status} ${response.statusText}`
        );
      }
    } catch (error: any) {
      console.error(`Error: ${error.message || error}`);
      setInitialAnswer("Error generating Q&A. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setPdfFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const generateCode = async (answer: string) => {
    try {
      setIsLoadingCoding(true);
      const code_response = await axios.post(`/api/code_generator_model`, {
        prompt: answer,
      });

      if (code_response.status === 200) {
        setGeneratedCode(code_response.data.generatedCode);
      } else {
        throw new Error(
          `Non-200 response: ${code_response.status} ${code_response.statusText}`
        );
      }
    } catch (error: any) {
      console.error(`Error: ${error.message || error}`);
      setGeneratedCode("Error generating code. Please try again.");
    } finally {
      setIsLoadingCoding(false);
    }
  };

  /* const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);
  }; */

  return (
    <div>
      <div className="sticky top-0 z-10 h-[53px] flex justify-between border-b">
        <div className="content-center px-4">
          <h1 className="text-xl font-semibold">Model: {router.query.slug}</h1>
        </div>
      </div>

      <div className="container mx-auto p-4">
        <Card>
          <CardContent className="m-5">
            {/* <h2 className="text-lg font-semibold mb-2">Q&A Generator</h2> */}
            <form onSubmit={handleSubmitQA} className="space-y-4">
              <div>
                <label htmlFor="prompt" className="block text-sm font-medium ">
                  Question
                </label>
                <Input
                  id="prompt"
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask question about the given article"
                  className="mt-1"
                />
              </div>
              <div>
                <label htmlFor="article" className="block text-sm font-medium ">
                  Article
                </label>
                <Textarea
                  id="article"
                  value={article}
                  onChange={(e) => setArticle(e.target.value)}
                  placeholder="Paste your article here"
                  rows={6}
                  className="mt-1"
                />
              </div>
              <div className="flex justify-between">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf"
                  className="hidden"
                />
                <Button type="submit" disabled={isLoading}>
                  {isLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isLoading ? "Generating..." : "Generate Q&A"}
                </Button>
                <Button
                  type="button"
                  onClick={triggerFileInput}
                  variant="outline"
                >
                  <Upload className="mr-2 h-4 w-4" />
                  Upload PDF
                </Button>
              </div>
              {pdfFile && (
                <p className="text-sm text-gray-300">
                  <b>Selected file: </b>
                  {pdfFile.name}
                </p>
              )}
            </form>
            {initialAnswer && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Answer:</h2>
                <div className="p-4 rounded-md">
                  <p>{initialAnswer}</p>
                </div>
              </div>
            )}
            {/* {generatedQA.length > 0 && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Additional Q&A:</h2>
                {generatedQA.map((qa, index) => (
                  <div key={index} className="mb-4 p-4 rounded-md">
                    <p className="font-semibold">Q: {qa.question}</p>
                    <p>A: {qa.answer}</p>
                  </div>
                ))}
              </div>
            )} */}
          </CardContent>
        </Card>
      </div>

      <div className="container mx-auto p-4">
        {isLoadingCoding ? (
          <h2 className="text-lg font-semibold mb-2">
            <div className="flex items-center">
              Generating Code
              <Loader2 className="ml-2 h-5 w-5 animate-spin" />
            </div>
          </h2>
        ) : null}

        <Card>
          <CardContent className="m-5">
            {generatedCode && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Generated Code:</h2>
                <CodeBlock code={generatedCode} language="python" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
