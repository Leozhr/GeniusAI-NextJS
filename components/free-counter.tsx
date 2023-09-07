"use client";

import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { MAX_FREE_COUNTS } from "@/constants";
import { useModal } from "@/hooks/use-pro-model";

export const FreeCounter = ({
  userApiLimit = 0 
}: { userApiLimit: number }) => {
  const [count, setCount] = useState(false);
  const proModal = useModal();

  useEffect(() => {
    setCount(true);
  }, []);

  if (!count) {
    return null;
  }

  return (
    <div className="px-3 absolute bottom-5 w-full">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4
          space-y-2">
            <p>
              {userApiLimit} / {MAX_FREE_COUNTS} Free Generations
            </p>
            <Progress 
              className="h-3 rounded-none"
              value={(userApiLimit / MAX_FREE_COUNTS) * 100}
            />
            <Button 
              className="w-full"
              variant="premium"
              onClick={proModal.onOpen}  
            >
              Upgrade
              <Zap className="ml-2 w-4 h-4 fill-white" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div> 
  )
}