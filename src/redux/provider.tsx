"use client"

import type React from "react"

import { Provider } from "react-redux"
import { store } from "./store"
import { Toaster } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Provider store={store}>
        <Toaster position="top-center" richColors />
        <TooltipProvider>
        {children}
      </TooltipProvider>
      </Provider>
    </>
  )
}
