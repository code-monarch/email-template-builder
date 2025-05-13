"use client"

import type React from "react"

interface ImageElementProps {
  content: {
    src: string
    alt: string
  }
  styles: any
  onChange: (content: any) => void
  isEditable: boolean
}

export const ImageElement: React.FC<ImageElementProps> = ({ content, styles, onChange, isEditable }) => {
  const handleSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...content, src: e.target.value })
  }

  const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...content, alt: e.target.value })
  }

  return (
    <div>
      <img src={content.src || "/placeholder.svg"} alt={content.alt} style={styles} className="max-w-full" />
      {isEditable && (
        <div className="mt-2 space-y-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Image URL</label>
            <input
              type="text"
              value={content.src}
              onChange={handleSrcChange}
              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-xs"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Alt Text</label>
            <input
              type="text"
              value={content.alt}
              onChange={handleAltChange}
              className="w-full px-2 py-1 border border-gray-300 dark:border-gray-700 rounded-md text-xs"
            />
          </div>
        </div>
      )}
    </div>
  )
}
