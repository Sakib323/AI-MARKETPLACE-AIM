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

interface ToolData {
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

export default function FeaturedTools() {
  const tool_data: ToolData[] = [
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

  return (
    <div className="flex-1 mx-10 my-5">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold">Top Tools</h2>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {tool_data.map((tool) => (
          <Link href={tool.href} key={tool.id}>
            <Card className="p-3 hover:cursor-pointer hover:scale-105">
              <div className="flex items-start gap-2 drag-handle">
                {/* <model.icon className="size-5" /> */}
                <Image
                  alt={tool.name}
                  src={tool.logo}
                  width={100}
                  height={100}
                  className="rounded-md mx-2"
                />
                <div>
                  <CardTitle className="text-lg">{tool.name}</CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
