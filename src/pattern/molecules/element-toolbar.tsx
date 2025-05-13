"use client"

import type React from "react"
import { IconButton } from "@/pattern/molecules/icon-button"
import { ArrowUp, ArrowDown, Trash2, Copy } from "lucide-react"
import { useAppDispatch } from "@/redux/hooks"
import { removeElement, reorderElements } from "@/redux/features/templateSlice"

interface ElementToolbarProps {
  elementId: string
  index: number
  totalElements: number
}

export const ElementToolbar: React.FC<ElementToolbarProps> = ({ elementId, index, totalElements }) => {
  const dispatch = useAppDispatch()

  const handleMoveUp = () => {
    if (index > 0) {
      dispatch(reorderElements({ sourceIndex: index, destinationIndex: index - 1 }))
    }
  }

  const handleMoveDown = () => {
    if (index < totalElements - 1) {
      dispatch(reorderElements({ sourceIndex: index, destinationIndex: index + 1 }))
    }
  }

  const handleDelete = () => {
    dispatch(removeElement(elementId))
  }

  const handleDuplicate = () => {
    // This will be implemented in a future version
    console.log("Duplicate element", elementId)
  }

  return (
    <div className="flex space-x-1 absolute right-2 top-2 bg-background/90 backdrop-blur-sm border border-border/60 rounded-md shadow-sm p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
      <IconButton
        icon={<ArrowUp size={14} />}
        variant="ghost"
        size="sm"
        onClick={handleMoveUp}
        disabled={index === 0}
        label="Move up"
        className="h-7 w-7 rounded-sm"
      />
      <IconButton
        icon={<ArrowDown size={14} />}
        variant="ghost"
        size="sm"
        onClick={handleMoveDown}
        disabled={index === totalElements - 1}
        label="Move down"
        className="h-7 w-7 rounded-sm"
      />
      <IconButton
        icon={<Copy size={14} />}
        variant="ghost"
        size="sm"
        onClick={handleDuplicate}
        label="Duplicate"
        className="h-7 w-7 rounded-sm"
      />
      <IconButton
        icon={<Trash2 size={14} />}
        variant="ghost"
        size="sm"
        onClick={handleDelete}
        label="Delete"
        className="h-7 w-7 rounded-sm text-destructive hover:bg-destructive/10"
      />
    </div>
  )
}
