"use client";

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { EmailBuilderTemplate } from "@/pattern/templates/email-builder-template"

export default function Home() {
  return (
    <main className="min-h-screen">
      <DndProvider backend={HTML5Backend}>
        <EmailBuilderTemplate />
      </DndProvider>
    </main>
  )
}
