import { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface ConnectedModel {
  id: string;
  name: string;
  description: string;
  model_endpoint: string;
}

interface ModelConnection {
  name: string;
  description: string;
  models: ConnectedModel[];
  connections: { source: string; target: string }[];
}

const model_data = [
  {
    id: "1",
    name: "Code Generator",
    description: "Generates code snippet from the given prompt",
    // icon: Bird,
    logo: "/model_data/code_generator_logo.jpg",
    cover: "",
    href: "/my-models/code-generator",
    input: "text",
    output: "text",
  },
  {
    id: "2",
    name: "Q&A",
    description: "Ask question from a given document",
    // icon: Rabbit,
    logo: "/model_data/qna_logo.jpg",
    cover: "",
    href: "/my-models/question-answer",
    input: "text",
    output: "text",
  },
  {
    id: "3",
    name: "Text Summarizer",
    description: "Summarize text from a given prompt",
    logo: "/model_data/text_summarizer_logo.jpg",
    cover: "",
    // icon: Turtle,
    href: "/my-models/text-summarizer",
    input: "text",
    output: "text",
  },
];

const tool_data = [
  {
    id: "1",
    name: "Text To Speech",
    description: "Generates audio from a text prompt",
    // icon: Bird,
    logo: "/model_data/text_to_speech_logo.jpg",
    cover: "",
    href: "/my-models/text-to-speech",
    input: "text",
    output: "mp3",
  },
  {
    id: "2",
    name: "Speech To Text",
    description: "Generates Text from given audio",
    // icon: Rabbit,
    logo: "/model_data/speech_to_text_logo.jpg",
    cover: "",
    href: "/my-models/speech-to-text",
    input: "mp3",
    output: "text",
  },
];

export default function MyModels() {
  const [savedModels, setSavedModels] = useState<ModelConnection[] | []>([]);

  useEffect(() => {
    const storedModels = localStorage.getItem("modelConnections");
    if (storedModels) {
      setSavedModels([JSON.parse(storedModels)]);
    }
  }, []);

  /* 
  if (!savedModels) {
    return <p>No saved models found.</p>;
  } */
  return (
    <div>
      <div className="sticky top-0 z-10 h-[53px] flex justify-between border-b">
        <div className="content-center px-4">
          <h1 className="text-xl font-semibold">My Models</h1>
        </div>
      </div>

      <div className="m-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Model and Tools</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {/* here */}
          {model_data.map((model) => (
            <Link href={model.href} key={model.id}>
              <Card className="p-3 hover:cursor-pointer hover:scale-105">
                <div className="flex items-start gap-2 drag-handle">
                  <Image
                    alt={model.name}
                    src={model.logo}
                    width={100}
                    height={100}
                    className="rounded-md mx-2"
                  />
                  <div className="grid gap-0.5 text-left">
                    <p>{model.name}</p>
                    <p className="text-xs" data-description>
                      {model.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
          {tool_data.map((tool) => (
            <Link href={tool.href} key={tool.id}>
              <Card
                key={tool.id}
                className="p-3 hover:cursor-pointer hover:scale-105"
              >
                <div className="flex items-start gap-2 drag-handle">
                  <Image
                    alt={tool.name}
                    src={tool.logo}
                    width={100}
                    height={100}
                    className="rounded-md mx-2"
                  />
                  <div className="grid gap-0.5 text-left">
                    <p>{tool.name}</p>
                    <p className="text-xs" data-description>
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <div className="m-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-bold">Custom Models</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {savedModels.map((model) => (
            <Link href={`my-models/` + model.name}>
              <Card className="p-3 hover:cursor-pointer hover:scale-105">
                <div className="flex items-start gap-2 drag-handle">
                  {/* <model.icon className="size-5" /> */}
                  <div className="grid gap-0.5 text-left">
                    <p>{model.name}</p>
                    <p className="text-xs" data-description>
                      {model.description}
                    </p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

//         <Link href="/my-models/code-generator">
//           <Card className="p-3 hover:cursor-pointer hover:scale-105">
//             <div className="flex items-start gap-2 drag-handle">
//               {/* <model.icon className="size-5" /> */}
//               <Image
//                 alt="code-generator"
//                 src="/model_data/code_generator_logo.jpg"
//                 width={100}
//                 height={100}
//                 className="rounded-md mx-2"
//               />
//               <div className="grid gap-0.5 text-left">
//                 <p>Code Generator</p>
//                 <p className="text-xs" data-description>
//                   Generates Code
//                 </p>
//               </div>
//             </div>
//           </Card>
//         </Link>
//         <Link href="/my-models/text-summarizer">
//           <Card className="p-3 hover:cursor-pointer hover:scale-105">
//             <div className="flex items-start gap-2 drag-handle">
//               {/* <model.icon className="size-5" /> */}
//               <div className="grid gap-0.5 text-left">
//                 <p>Text Summarizer</p>
//                 <p className="text-xs" data-description>
//                   Summarizes the given text
//                 </p>
//               </div>
//             </div>
//           </Card>
//         </Link>
//         <Link href="/my-models/question-answer">
//           <Card className="p-3 hover:cursor-pointer hover:scale-105">
//             <div className="flex items-start gap-2 drag-handle">
//               {/* <model.icon className="size-5" /> */}
//               <div className="grid gap-0.5 text-left">
//                 <p>Q&A</p>
//                 <p className="text-xs" data-description>
//                   Ask question and provide answer from given text
//                 </p>
//               </div>
//             </div>
//           </Card>
//         </Link>
//         <Link href="/my-models/text-to-speech">
//           <Card className="p-3 hover:cursor-pointer hover:scale-105">
//             <div className="flex items-start gap-2 drag-handle">
//               {/* <model.icon className="size-5" /> */}
//               <div className="grid gap-0.5 text-left">
//                 <p>Text To Speech</p>
//                 <p className="text-xs" data-description>
//                   Converts text to speech
//                 </p>
//               </div>
//             </div>
//           </Card>
//         </Link>
//         <Link href="/my-models/speech-to-text">
//           <Card className="p-3 hover:cursor-pointer hover:scale-105">
//             <div className="flex items-start gap-2 drag-handle">
//               {/* <model.icon className="size-5" /> */}
//               <div className="grid gap-0.5 text-left">
//                 <p>Speech To Text</p>
//                 <p className="text-xs" data-description>
//                   Converts speech to text
//                 </p>
//               </div>
//             </div>
//           </Card>
//         </Link>
