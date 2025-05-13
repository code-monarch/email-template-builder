"use client"

import type React from "react"
import { useDrop } from "react-dnd"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { addElement, selectElement } from "@/redux/features/templateSlice"
import type { ElementType } from "@/types/template"
import { cn } from "@/lib/utils"
import { Inbox } from "lucide-react"
import { ElementRenderer } from "./element-renderer"

export const Canvas: React.FC = () => {
  const dispatch = useAppDispatch()
  const { elements } = useAppSelector((state) => state.template.currentTemplate)
  const { previewMode } = useAppSelector((state) => state.ui)
  const selectedElementId = useAppSelector((state) => state.template.selectedElementId)

  const [{ isOver }, dropRef] = useDrop<{ type: ElementType }, unknown, { isOver: boolean }>(() => ({
    accept: "ELEMENT",
    drop: (item: { type: ElementType }, monitor) => {
      const didDrop = monitor.didDrop()
      if (didDrop) {
        return
      }

      dispatch(addElement({ type: item.type }))
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver({ shallow: true }),
    }),
  }))

  // Create a ref callback to properly handle the drop ref
  const ref = (element: HTMLDivElement | null) => {
    dropRef(element)
  }

  const handleCanvasClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      dispatch(selectElement(null))
    }
  }

  const handleCanvasKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      dispatch(selectElement(null))
    }
  }

  return (
    <div
      className="flex-1 overflow-auto bg-accent/30 p-2 sm:p-4 md:p-8 dark:bg-gray-900/50"
      role="region"
      aria-label="Email template canvas"
    >
      <div
        ref={ref}
        className={cn(
          "max-w-2xl mx-auto bg-background text-foreground shadow-soft rounded-lg min-h-[600px] transition-all duration-300",
          isOver && !previewMode && "border-2 border-dashed border-primary/60",
          previewMode && "shadow-soft-lg",
          "dark:shadow-gray-900/30",
        )}
        onClick={handleCanvasClick}
        onKeyDown={handleCanvasKeyDown}
        tabIndex={0}
        role="application"
        aria-label={previewMode ? "Email preview" : "Email editor canvas"}
        aria-describedby={elements.length === 0 && !previewMode ? "empty-canvas-message" : undefined}
      >
        {elements.length === 0 && !previewMode ? (
          <div
            className="flex flex-col items-center justify-center h-full text-muted-foreground text-center p-4 sm:p-8"
            id="empty-canvas-message"
          >
            <div className="slide-in">
              <Inbox size={48} className="mx-auto mb-4 opacity-40" aria-hidden="true" />
              <p className="mb-2 font-medium">Drag and drop elements here to build your email template</p>
              <p className="text-sm">or click on an element in the sidebar to add it</p>
            </div>
          </div>
        ) : (
          <div className="p-3 sm:p-6" role="list" aria-label="Email template elements">
            {elements.map((element, index) => (
              <div key={element.id} role="listitem">
                <ElementRenderer
                  element={element}
                  index={index}
                  isSelected={element.id === selectedElementId}
                  isPreview={previewMode}
                  totalElements={elements.length}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
