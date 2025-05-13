"use client"

import type React from "react"

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
          <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Height (px)</label>
          <input
            type="number"
            value={content.height}
            onChange={handleHeightChange}
            min="1"
            max="200"
            className="w-full px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-xs"
          />
        </div>
      )}
    </div>
  )
}
