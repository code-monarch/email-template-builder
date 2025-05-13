"use client"

import type React from "react"
import { useDrag } from "react-dnd"
import { cn } from "@/lib/utils"
import type { ElementType } from "@/types/template"

interface ElementCardProps {
  type: ElementType
  icon: React.ReactNode
  label: string
  onClick?: () => void
}

export const ElementCard: React.FC<ElementCardProps> = ({ type, icon, label, onClick }) => {
  const [{ isDragging }, dragRef] = useDrag<{ type: ElementType }, unknown, { isDragging: boolean }>(() => ({
    type: "ELEMENT",
    item: { type },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }))

  // Create a ref callback that properly handles the drag ref
  const ref = (element: HTMLDivElement | null) => {
    dragRef(element)
  }

  return (
    <div
      ref={ref}
      className={cn(
        "flex items-center p-3 border border-border/60 rounded-md cursor-move hover:bg-accent/50 hover:border-border transition-all duration-200 group",
        "dark:border-gray-700/60 dark:hover:bg-gray-800/50 dark:hover:border-gray-600",
        "focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-1",
        "touch-manipulation", // Improves touch behavior on mobile
        isDragging && "opacity-50",
      )}
      role="button"
      tabIndex={0}
      aria-label={`Add ${label} element`}
      aria-grabbed={isDragging}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          onClick?.()
        }
      }}
    >
      <div
        className="mr-3 text-muted-foreground group-hover:text-primary transition-colors duration-200"
        aria-hidden="true"
      >
        {icon}
      </div>
      <span className="font-medium text-sm">{label}</span>
      <span className="sr-only">Drag to add to template or click to insert</span>
    </div>
  )
}
