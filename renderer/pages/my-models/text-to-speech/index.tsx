import React, { useState } from "react";
import { useRouter } from "next/router";
import { Button } from "../../../components/ui/button";
import { Textarea } from "../../../components/ui/textarea";
import { Card, CardContent } from "../../../components/ui/card";
import { Loader2, StopCircle, VolumeIcon } from "lucide-react";

export default function TextToSpeech() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);

  const handleSpeak = () => {
    if (text.trim()) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.onstart = () => setIsSpeaking(true);
      utterance.onend = () => setIsSpeaking(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
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
            <h2 className="text-lg font-semibold mb-2">Text to Speech</h2>
            <Textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter your text here"
              rows={6}
            />
            <div className="my-4">
              <Button
                onClick={handleSpeak}
                disabled={isSpeaking}
                className="mr-2"
              >
                <VolumeIcon className="mr-2 h-4 w-4" />
                {isSpeaking && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                {isSpeaking ? "Speaking..." : "Convert to Speech"}
              </Button>

              <Button
                onClick={handleStop}
                disabled={!isSpeaking}
                className="ml-2"
              >
                <StopCircle className="mr-2 h-4 w-4" />
                Stop
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
