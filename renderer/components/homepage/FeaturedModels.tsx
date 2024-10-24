"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Bird, LucideIcon, Rabbit, Turtle } from "lucide-react";
import Image from "next/image";

interface ModelData {
  id: string;
  name: string;
  description: string;
  // icon: LucideIcon;
  logo: any;
  cover: any;
  href: string;
  input: string;
  output: string;
}

export default function FeaturedModels() {
  const model_data: ModelData[] = [
    {
      id: "1",
      name: "Code Generator",
      description: "Generates code snippet from the given prompt",
      // icon: Bird,
      logo: "/model_data/code_generator_logo.jpg",
      cover: "",
      href: "/my-models/code-generator",
      input: "mp3",
      output: "mp4",
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
      output: "mp4",
    },
    {
      id: "3",
      name: "Text Summarizer",
      description: "Summarize text from a given prompt",
      logo: "/model_data/text_summarizer_logo.jpg",
      cover: "",
      // icon: Turtle,
      href: "/my-models/text-summarizer",
      input: "mp4",
      output: "text",
    },
  ];

  return (
    <div className="flex-1 mx-10 my-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Top Models</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {model_data.map((model) => (
          <Link href={model.href} key={model.id}>
            <Card className="p-3 hover:cursor-pointer hover:scale-105">
              <div className="flex items-start gap-2 drag-handle">
                {/* <model.icon className="size-5" /> */}
                <Image
                  alt={model.name}
                  src={model.logo}
                  width={100}
                  height={100}
                  className="rounded-md mx-2"
                />
                <div>
                  <CardTitle className="text-lg">{model.name}</CardTitle>
                  <CardDescription>{model.description}</CardDescription>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
