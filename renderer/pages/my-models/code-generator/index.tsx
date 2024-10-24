import React, { useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Card, CardContent } from "../../../components/ui/card";
import { Loader2 } from "lucide-react";
import CodeBlock from "../../../components/CodeBlock";

export default function CodeGenerator() {
  const router = useRouter();
  const [prompt, setPrompt] = useState<string>("");
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(`/api/code_generator_model`, {
        prompt,
      });

      if (response.status === 200) {
        setGeneratedCode(response.data.generatedCode);
      } else {
        throw new Error(
          `Non-200 response: ${response.status} ${response.statusText}`
        );
      }
    } catch (error: any) {
      console.error(`Error: ${error.message || error}`);
      setGeneratedCode("Error generating code. Please try again.");
    } finally {
      setIsLoading(false);
    }
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
            <h2 className="text-lg font-semibold mb-2">Prompt</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter your prompt here"
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? "Generating..." : "Generate Code"}
              </Button>
            </form>
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
