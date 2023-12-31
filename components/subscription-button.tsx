"use client";

import { Button } from "@/components/ui/button";
import axios from "axios";
import { Zap } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";

export const SubscriptionButton = (
  { isPro = false }
: { isPro: boolean }) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.get("/api/stripe");

      window.location.href = response.data.url;
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Button 
      onClick={handleClick}
      disabled={loading} 
      variant={isPro ? "default" : "premium"} 
    >
      {isPro ? "Manage Subscription" : "Upgrade"}
      {!isPro && <Zap className="ml-2 h-4 w-4 fill-white" />}
    </Button>
  )
}