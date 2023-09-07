"use client";

import { Crisp } from "crisp-sdk-web";
import { useEffect } from "react";

export const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("3a0037c7-e6bc-44be-88db-2a82a81d9ba0");
  }, []);

  return null;
}