import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Card, CardContent } from "../../../components/ui/card";
import { Mic, MicOff, Loader2 } from "lucide-react";

export default function SpeechToText() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [isListening, setIsListening] = useState<boolean>(false);
  const [recognition, setRecognition] = useState<any | null>(null);

  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (SpeechRecognition) {
      const recognitionInstance = new SpeechRecognition();
      recognitionInstance.continuous = true;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = "en-US";

      recognitionInstance.onresult = (event: any) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " ";
          } else {
            interimTranscript += transcript;
          }
        }

        setText(finalTranscript); // Update text with only final transcript
      };

      recognitionInstance.onerror = (event: any) => {
        console.error("Speech Recognition Error", event.error);
        setIsListening(false);
      };

      recognitionInstance.onend = () => setIsListening(false);
      setRecognition(recognitionInstance);
    } else {
      console.warn("Speech Recognition API is not supported in this browser.");
    }
  }, []);

  const handleStartListening = () => {
    if (recognition && !isListening) {
      recognition.start();
      setIsListening(true);
    }
  };

  const handleStopListening = () => {
    if (recognition && isListening) {
      recognition.stop();
      setIsListening(false);
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
            <h2 className="text-lg font-semibold mb-2">Speech to Text</h2>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Your transcribed speech will appear here..."
              rows={6}
            />
            <div className="my-4">
              <Button
                onClick={handleStartListening}
                disabled={isListening}
                className="mr-2"
              >
                <Mic className="mr-2 h-4 w-4" />
                {isListening && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isListening ? "Speaking..." : "Start Speaking"}
              </Button>

              <Button
                onClick={handleStopListening}
                disabled={!isListening}
                className="ml-2"
              >
                <MicOff className="mr-2 h-4 w-4" />
                Stop
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
