import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "../ui/card";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import Image from "next/image";

export function ModelInfoDialog({ model }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="mx-4 p-3 hover:cursor-pointer hover:scale-105 mb-2">
          <div className="flex items-start gap-3 drag-handle">
            <Image
              alt={model.name}
              src={model.logo}
              width={50}
              height={50}
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
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{model.name}</DialogTitle>
          <DialogDescription>{model.description}</DialogDescription>
        </DialogHeader>
        <div className="mt-4">
          <h4 className="font-semibold mb-2">Detailed Information:</h4>
          {/* <p>
            This is where you can add more detailed information about the model.
          </p> */}
          <ul className="list-disc list-inside mt-2">
            <li>
              <b>Input: </b>
              {model.input}
            </li>
            <li>
              <b>Output: </b>
              {model.output}
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function ModelCard({ model, index }) {
  return (
    <Draggable draggableId={model.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ModelInfoDialog model={model} />
        </div>
      )}
    </Draggable>
  );
}
