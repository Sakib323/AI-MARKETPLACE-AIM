import {
  Book,
  Code2,
  SquareTerminal,
  SquareUser,
  BrainCog,
  Settings,
  Blocks,
} from "lucide-react";

import { Button, buttonVariants } from "../components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../components/ui/tooltip";
import Link from "next/link";
import { useRouter } from "next/router";

export function Sidebar() {
  const router = useRouter();
  return (
    <div className="grid h-screen pl-[56px]">
      <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
        <div className="border-b p-2">
          <Link href="/home">
            <Button variant="outline" size="icon" aria-label="Home">
              <BrainCog className="size-5" />
            </Button>
          </Link>
        </div>
        <nav className="grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/playground"
                  className={`${buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })} rounded-lg ${
                    router.pathname === "/playground" ? "bg-muted" : ""
                  }`}
                  aria-label="Playground"
                >
                  <SquareTerminal className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Playground
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/models"
                  className={`${buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })} rounded-lg ${
                    router.pathname === "/models" ? "bg-muted" : ""
                  }`}
                  aria-label="models"
                >
                  <Code2 className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Models
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/my-models"
                  className={`${buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })} rounded-lg ${
                    router.pathname === "/my-models" ? "bg-muted" : ""
                  }`}
                  aria-label="my-models"
                >
                  <Blocks className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                My Models
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/documentation"
                  className={`${buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })} rounded-lg ${
                    router.pathname === "/documentation" ? "bg-muted" : ""
                  }`}
                  aria-label="Documentation"
                >
                  <Book className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Documentation
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
        <nav className="mt-auto grid gap-1 p-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/settings"
                  className={`${buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })} rounded-lg ${
                    router.pathname === "/settings" ? "bg-muted" : ""
                  }`}
                  aria-label="Settings"
                >
                  <Settings className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Settings
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/account"
                  className={`${buttonVariants({
                    variant: "ghost",
                    size: "icon",
                  })} mt-auto rounded-lg ${
                    router.pathname === "/account" ? "bg-muted" : ""
                  }`}
                  aria-label="Account"
                >
                  <SquareUser className="size-5" />
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right" sideOffset={5}>
                Account
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
    </div>
  );
}
