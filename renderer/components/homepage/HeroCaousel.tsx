import Autoplay from "embla-carousel-autoplay";

import { Card, CardContent } from "../../components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import { useRef } from "react";
import Image from "next/image";

const model_data = [
  {
    id: "1",
    name: "Code Generator",
    description: "Generates code snippet from the given prompt",
    // icon: Bird,
    logo: "/model_data/code_generator_cover.jpg",
    cover: "",
    input: "mp3",
    output: "mp4",
  },
  {
    id: "2",
    name: "Q&A",
    description: "Ask question from a given document",
    // icon: Rabbit,
    logo: "/model_data/qna_cover.jpg",
    cover: "",
    input: "text",
    output: "mp4",
  },
  {
    id: "3",
    name: "Text Summarizer",
    description: "Summarize text from a given prompt",
    logo: "/model_data/text_summarizer_cover.jpg",
    cover: "",
    // icon: Turtle,
    input: "mp4",
    output: "text",
  },
];

export default function HeroCarousel() {
  const plugin = useRef(Autoplay({ delay: 2000, stopOnInteraction: true }));

  return (
    <Carousel
      plugins={[plugin.current]}
      className="mx-10 my-5"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        {model_data.map((model, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <Image
                    className="rounded-lg"
                    alt={model.name}
                    src={model.logo}
                    sizes="100vw"
                    width={700}
                    height={0}
                    /* style={{
                      width: "100%",
                      height: "auto",
                      objectFit: "contain",
                    }} */
                  />
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious /> */}
      {/* <CarouselNext /> */}
    </Carousel>
  );
}
