"use client";

import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { useModal } from "@/hooks/use-pro-model";

import { cn } from "@/lib/utils";
import { Check, Code, ImageIcon, MessageSquare, Zap } from "lucide-react";
import { Button } from "./ui/button";
import { Card } from "./ui/card";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgColor: "bg-violet-500/10",
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgColor: "bg-pink-700/10",
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgColor: "bg-green-700/10",
  },
]

export const ProModal = () => {
  const proModal = useModal();

  return (
    <Dialog 
      open={proModal.isOpen}
      onOpenChange={proModal.onClose}
    >
      <DialogContent className="bg-[#fdfdfd]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-center
          flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold py-1">
              Upgrade for Genius
              <Badge 
                className="uppercase text-sm py-1"
                variant="premium"    
              >
                Pro        
              </Badge>
            </div>
            <DialogDescription className="text-center pt-4 space-y-2
            text-zinc-900 font-medium w-full">
              {tools.map((tool) => (
                <Card
                  key={tool.label}
                  className="p-3 border-black/5 flex items-center
                  justify-between"
                >
                  <div className="flex items-center gap-x-4">
                    <div className={cn("p-2 w-fit rounded-md", tool.bgColor)}>
                      <tool.icon className={cn("h-6 w-6", tool.color)} />
                    </div>
                    <div className="font-semibold text-sm">
                      {tool.label}
                    </div>
                  </div>
                  <Check className="h-4 w-4 text-primary" />
                </Card>
              ))}
            </DialogDescription>
          </DialogTitle>
        </DialogHeader>
        <DialogFooter>
          <Button
            size="lg"
            variant="premium"
            className="w-full"
          >
            Upgrade
            <Zap className="ml-2 w-4 h-4 fill-white" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}