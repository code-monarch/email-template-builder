"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ContentEditable } from "@/pattern/atoms/content-editable"
import { Input } from "@/pattern/molecules/input"

interface ButtonElementProps {
  content: {
    text: string
    url: string
  }
  styles: any
  onChange: (content: any) => void
  isEditable: boolean
}

export const ButtonElement: React.FC<ButtonElementProps> = ({ content, styles, onChange, isEditable }) => {
  const [text, setText] = useState(content.text)
  const [url, setUrl] = useState(content.url)

  // Update local state when props change
  useEffect(() => {
    setText(content.text)
    setUrl(content.url)
  }, [content.text, content.url])

  const handleTextChange = (newText: string) => {
    setText(newText)
    onChange({ ...content, text: newText })
  }

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUrl = e.target.value
    setUrl(newUrl)
    onChange({ ...content, url: newUrl })
  }

  if (isEditable) {
    return (
      <div className="space-y-3">
        <div
          style={{
            ...styles,
            cursor: "text",
          }}
          className="inline-block"
        >
          <ContentEditable
            html={text}
            onChange={handleTextChange}
            tagName="span"
            className="outline-none focus:outline-none block"
          />
        </div>

        <div className="mt-2 space-y-2 p-2 bg-gray-50 dark:bg-gray-800 rounded-md text-sm">
          <Input
            label="Button URL"
            value={url}
            onChange={handleUrlChange}
            placeholder="https://example.com"
            className="mb-0"
          />
        </div>
      </div>
    )
  }

  return (
    <a
      href={content.url}
      style={{
        ...styles,
        display: "inline-block",
        textDecoration: "none",
        padding: styles.padding || "10px 20px",
        backgroundColor: styles.backgroundColor || "#3b82f6",
        color: styles.color || "#ffffff",
        borderRadius: styles.borderRadius || "4px",
        fontWeight: styles.fontWeight || "500",
        textAlign: "center",
      }}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  )
}
