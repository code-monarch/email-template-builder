"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/pattern/molecules/input"
import { Select } from "@/pattern/molecules/select"
import { ImageIcon } from "lucide-react"

interface LogoElementProps {
  content: {
    src: string
    alt: string
    link: string
    maxWidth: number
  }
  styles: any
  onChange: (content: any) => void
  isEditable: boolean
}

export const LogoElement: React.FC<LogoElementProps> = ({ content, styles, onChange, isEditable }) => {
  const [src, setSrc] = useState(content.src)
  const [alt, setAlt] = useState(content.alt)
  const [link, setLink] = useState(content.link)
  const [maxWidth, setMaxWidth] = useState(content.maxWidth)
  const [error, setError] = useState<string | null>(null)

  // Update local state when props change
  useEffect(() => {
    setSrc(content.src)
    setAlt(content.alt)
    setLink(content.link)
    setMaxWidth(content.maxWidth)
  }, [content])

  const handleSrcChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newSrc = e.target.value
    setSrc(newSrc)
    onChange({ ...content, src: newSrc })
    setError(null)
  }

  const handleAltChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newAlt = e.target.value
    setAlt(newAlt)
    onChange({ ...content, alt: newAlt })
  }

  const handleLinkChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLink = e.target.value
    setLink(newLink)
    onChange({ ...content, link: newLink })
  }

  const handleMaxWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMaxWidth = Number(e.target.value)
    setMaxWidth(newMaxWidth)
    onChange({ ...content, maxWidth: newMaxWidth })
  }

  const handleAlignmentChange = (value: string) => {
    onChange({
      ...content,
      alignment: value,
    })
  }

  const handleImageError = () => {
    setError("Failed to load image. Please check the URL.")
  }

  // Render the logo in view mode
  if (!isEditable) {
    const logoElement = (
      <img
        src={src || "/placeholder.svg?height=60&width=180&query=Your+Logo"}
        alt={alt}
        style={{
          ...styles,
          maxWidth: `${maxWidth}px`,
          height: "auto",
          display: "block",
        }}
        onError={handleImageError}
      />
    )

    if (link) {
      return (
        <a href={link} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block" }}>
          {logoElement}
        </a>
      )
    }

    return logoElement
  }

  // Render the editable logo
  return (
    <div className="space-y-4">
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
        <div className="flex justify-center mb-4">
          {src ? (
            <img
              src={src || "/placeholder.svg"}
              alt={alt}
              style={{
                maxWidth: `${maxWidth}px`,
                height: "auto",
                display: "block",
              }}
              className="max-h-32 object-contain"
              onError={handleImageError}
            />
          ) : (
            <div className="flex flex-col items-center justify-center p-6 bg-gray-100 dark:bg-gray-800 rounded-md">
              <ImageIcon size={48} className="text-gray-400 mb-2" />
              <p className="text-sm text-gray-500 dark:text-gray-400">Enter a URL to display your logo</p>
            </div>
          )}
        </div>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}

        <div className="space-y-3">
          <Input
            label="Logo URL"
            value={src}
            onChange={handleSrcChange}
            placeholder="https://example.com/logo.png"
            fullWidth
          />

          <Input label="Alt Text" value={alt} onChange={handleAltChange} placeholder="Company logo" fullWidth />

          <Input
            label="Link URL (Optional)"
            value={link}
            onChange={handleLinkChange}
            placeholder="https://example.com"
            fullWidth
          />

          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Max Width (px)"
              type="number"
              value={maxWidth.toString()}
              onChange={handleMaxWidthChange}
              min="50"
              max="600"
            />

            <Select
              label="Alignment"
              value={styles.margin || "0 auto"}
              onChange={handleAlignmentChange}
              options={[
                { value: "0 auto", label: "Center" },
                { value: "0", label: "Left" },
                { value: "0 0 0 auto", label: "Right" },
              ]}
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
        <h4 className="text-sm font-medium mb-2">Preview</h4>
        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-gray-900 flex justify-center">
          {src ? (
            <img
              src={src || "/placeholder.svg"}
              alt={alt}
              style={{
                maxWidth: `${maxWidth}px`,
                height: "auto",
                display: "block",
                margin: styles.margin || "0 auto",
              }}
              className="max-h-24 object-contain"
              onError={handleImageError}
            />
          ) : (
            <div className="flex items-center justify-center p-4 bg-gray-100 dark:bg-gray-800 rounded-md w-full max-w-xs">
              <ImageIcon size={32} className="text-gray-400 mr-2" />
              <span className="text-sm text-gray-500 dark:text-gray-400">Logo preview</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
