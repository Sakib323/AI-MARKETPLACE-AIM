import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Card, CardContent } from "../../../components/ui/card";
import { Loader2, Upload } from "lucide-react";

export default function TextSummarizer() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let textToSummarize = text;

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
          textToSummarize = extractResponse.data.extractedText;
        } else {
          throw new Error(
            `Error extracting text from PDF: ${extractResponse.status} ${extractResponse.statusText}`
          );
        }
      }

      const response = await axios.post(`/api/text_summarizer_model`, {
        text: textToSummarize,
      });

      if (response.status === 200) {
        setSummary(response.data.summarizedText);
      } else {
        throw new Error(
          `Non-200 response: ${response.status} ${response.statusText}`
        );
      }
    } catch (error: any) {
      console.error(`Error: ${error.message || error}`);
      setSummary("Error generating summary. Please try again.");
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
            <h2 className="text-lg font-semibold mb-2">Text to Summarize</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your text here or upload a PDF"
                rows={6}
              />
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
                  {isLoading ? "Summarizing..." : "Summarize Text"}
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
            {summary && (
              <div className="mt-6">
                <h2 className="text-lg font-semibold mb-2">Summary:</h2>
                <p className="p-4 rounded-md">{summary}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
