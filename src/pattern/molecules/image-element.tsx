"use client"

import type React from "react"
import { Input } from "@/pattern/molecules/input"

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
          <Input label="Image URL" value={content.src} onChange={handleSrcChange} className="mb-2" />
          <Input label="Alt Text" value={content.alt} onChange={handleAltChange} />
        </div>
      )}
    </div>
  )
}
