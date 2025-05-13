"use client"

import type React from "react"
import { Input } from "@/pattern/molecules/input"

interface SpacerElementProps {
  content: {
    height: number
  }
  styles: any
  onChange: (content: any) => void
  isEditable: boolean
}

export const SpacerElement: React.FC<SpacerElementProps> = ({ content, styles, onChange, isEditable }) => {
  const handleHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const height = Number.parseInt(e.target.value)
    onChange({ ...content, height })
  }

  return (
    <div>
      <div style={{ height: `${content.height}px`, ...styles }}></div>
      {isEditable && (
        <div className="mt-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
          <Input
            label="Height (px)"
            type="number"
            value={content.height.toString()}
            onChange={handleHeightChange}
            min="1"
            max="200"
          />
        </div>
      )}
    </div>
  )
}
