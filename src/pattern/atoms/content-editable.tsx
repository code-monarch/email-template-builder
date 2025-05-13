"use client"

import type React from "react"
import { useState } from "react"
import ContentEditableBase from "react-contenteditable"

interface ContentEditableProps {
  html: string
  onChange: (html: string) => void
  tagName?: string
  style?: React.CSSProperties
  className?: string
}

export const ContentEditable: React.FC<ContentEditableProps> = ({
  html,
  onChange,
  tagName = "div",
  style,
  className,
}) => {
  const [content, setContent] = useState(html)

  const handleChange = (e: any) => {
    const newContent = e.target.value
    setContent(newContent)
    onChange(newContent)
  }

  return (
    <ContentEditableBase html={content} onChange={handleChange} tagName={tagName} style={style} className={className} />
  )
}
