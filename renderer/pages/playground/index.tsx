import React, { useState, useCallback, useRef } from "react";
import {
  DragDropContext,
  Droppable,
  DropResult,
  resetServerContext,
} from "react-beautiful-dnd";

import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  addEdge,
  Node,
  Edge,
  Connection,
  BackgroundVariant,
  reconnectEdge,
  MarkerType,
  Position,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import { Bird, Rabbit, Turtle, LucideIcon, Save } from "lucide-react";
import { Button } from "../../components/ui/button";
import ModelCard from "../../components/playground/ModelCard";
import { useToast } from "../../components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";

interface ModelData {
  id: string;
  name: string;
  description: string;
  icon?: LucideIcon;
  input: string;
  logo: any;
  href: any;
  cover: any;
  output: string;
  model_endpoint?: string;
}

interface ToolData {
  id: string;
  name: string;
  description: string;
  icon?: LucideIcon;
  input: string;
  logo: any;
  href: any;
  cover: any;
  output: string;
  model_endpoint?: string;
}

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

const model_data: ModelData[] = [
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

export default function Playground() {
  // for some dnd error
  resetServerContext();

  const { toast } = useToast();
  const [models] = useState<ModelData[]>(model_data);
  const [tools] = useState<ToolData[]>(tool_data);
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const edgeReconnectSuccessful = useRef(true);
  const [isSaveDialogOpen, setIsSaveDialogOpen] = useState(false);
  const [savedModelName, setSavedModelName] = useState("");
  const [savedModelDescription, setSavedModelDescription] = useState("");

  const onConnect = useCallback(
    (params: Connection | Edge) => {
      const sourceNode = nodes.find((node) => node.id === params.source);
      const targetNode = nodes.find((node) => node.id === params.target);

      const sourceModel = models.find((model) => model.id === sourceNode?.id);
      const targetModel = models.find((model) => model.id === targetNode?.id);

      if (sourceModel && targetModel) {
        if (sourceModel.output !== targetModel.input) {
          toast({
            variant: "destructive",
            title: "Not compatible",
            description: "Check input and output of the models",
          });
          return;
        }
      }

      setEdges((eds) =>
        addEdge(
          {
            ...params,
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      );
    },
    [models, nodes, setEdges]
  );

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    if (result.destination.droppableId === "selected-models") {
      const newModel = models.find((model) => model.id === result.draggableId);
      if (newModel && !nodes.some((node: Node) => node.id === newModel.id)) {
        const newNode: Node = {
          id: newModel.id,
          type: "default",
          position: { x: Math.random() * 200, y: Math.random() * 200 },
          data: { label: newModel.name },
          sourcePosition: Position.Bottom,
        };
        setNodes((nds) => [...nds, newNode]);
      }
    }
  };

  const handleSaveModel = () => {
    const connectedModelIds = new Set([
      ...edges.map((edge: Edge) => edge.source),
      ...edges.map((edge: Edge) => edge.target),
    ]);

    const connectedModels: ConnectedModel[] = nodes
      .filter((node: Node) => connectedModelIds.has(node.id))
      .map((node: Node) => {
        const model = models.find((m) => m.id === node.id);
        return {
          id: model?.id || "",
          name: model?.name || "",
          description: model?.description || "",
          model_endpoint: model?.model_endpoint || "",
        };
      });

    if (connectedModels.length > 0) {
      setIsSaveDialogOpen(true);
    } else {
      toast({
        title: "No Connected Models",
        description:
          "There are no connected models to save. Please connect at least two models and try again.",
        variant: "destructive",
      });
    }

    const unconnectedModels = nodes.filter(
      (node: Node) => !connectedModelIds.has(node.id)
    );
    if (unconnectedModels.length > 0) {
      toast({
        title: "Unconnected Models",
        description: `${unconnectedModels.length} model(s) are not connected, please connect all the models to save.`,
        variant: "destructive",
      });
    }
  };

  const handleSaveConfirm = () => {
    const connectedModelIds = new Set([
      ...edges.map((edge: Edge) => edge.source),
      ...edges.map((edge: Edge) => edge.target),
    ]);

    const connectedModels: ConnectedModel[] = nodes
      .filter((node: Node) => connectedModelIds.has(node.id))
      .map((node: Node) => {
        const model = models.find((m) => m.id === node.id);
        return {
          id: model?.id || "",
          name: model?.name || "",
          description: model?.description || "",
          model_endpoint: model?.model_endpoint || "",
        };
      });

    const modelConnections: ModelConnection = {
      name: savedModelName,
      description: savedModelDescription,
      models: connectedModels,
      connections: edges.map((edge: Edge) => ({
        source: edge.source,
        target: edge.target,
      })),
    };

    localStorage.setItem("modelConnections", JSON.stringify(modelConnections));
    console.log("Connected models:", modelConnections);

    toast({
      title: "Models Saved",
      description: `${connectedModels.length} connected model(s) have been saved successfully as "${savedModelName}".`,
    });

    setIsSaveDialogOpen(false);
    setSavedModelName("");
    setSavedModelDescription("");
  };

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeReconnectSuccessful.current = true;
      setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
    },
    []
  );

  const onReconnectEnd = useCallback((_, edge: Edge) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeReconnectSuccessful.current = true;
  }, []);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div>
        <div className="sticky top-0 z-10 h-[53px] flex justify-between border-b">
          <div className="content-center px-4">
            <h1 className="text-xl font-semibold">Playground</h1>
          </div>
        </div>

        <div className="grid flex-1 gap-4 overflow-auto p-4 md:grid-cols-3 lg:grid-cols-3">
          <div className="flex flex-col">
            <div className="relative flex-col items-start gap-8 md:flex">
              <div className="grid w-full items-start gap-6">
                <fieldset className="rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-lg">Models</legend>
                  <Droppable droppableId="models">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="grid gap-4 max-h-[400px] overflow-y-auto"
                      >
                        {models.map((model, index) => (
                          <ModelCard
                            key={model.id}
                            model={model}
                            index={index}
                          />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </fieldset>
              </div>
            </div>

            {/* <div className="mt-5 relative flex-col items-start gap-8 md:flex">
              <div className="grid w-full items-start gap-6">
                <fieldset className="rounded-lg border p-4">
                  <legend className="-ml-1 px-1 text-lg">Tools</legend>
                  <Droppable droppableId="models">
                    {(provided) => (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        className="grid gap-4 max-h-[400px] overflow-y-auto"
                      >
                        {tools.map((tool, index) => (
                          <ModelCard key={tool.id} model={tool} index={index} />
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </fieldset>
              </div>
            </div> */}
          </div>

          <div className="col-span-2">
            <Droppable droppableId="selected-models">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="h-[600px] m-3 border rounded-lg p-4"
                >
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    colorMode="dark"
                    onReconnect={onReconnect}
                    onReconnectStart={onReconnectStart}
                    onReconnectEnd={onReconnectEnd}
                    fitView
                    proOptions={{ hideAttribution: true }}
                    deleteKeyCode={["Delete", "Backspace"]}
                  >
                    <Background variant={BackgroundVariant.Dots} />
                    <Controls />
                    <MiniMap />
                  </ReactFlow>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            <div className="w-full flex justify-end p-4">
              <Button onClick={handleSaveModel}>
                <Save className="mr-2 h-4 w-4" /> Save Model
              </Button>
            </div>
            <Dialog open={isSaveDialogOpen} onOpenChange={setIsSaveDialogOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Save Connected Models</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={savedModelName}
                      onChange={(e) => setSavedModelName(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="description" className="text-right">
                      Description
                    </Label>
                    <Textarea
                      id="description"
                      value={savedModelDescription}
                      onChange={(e) => setSavedModelDescription(e.target.value)}
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" onClick={handleSaveConfirm}>
                    Save
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
}
