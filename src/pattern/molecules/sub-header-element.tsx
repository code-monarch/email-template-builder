"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { ContentEditable } from "@/pattern/atoms/content-editable"

interface SubHeaderElementProps {
  content: {
    text: string
  }
  styles: any
  onChange: (content: any) => void
  isEditable: boolean
}

export const SubHeaderElement: React.FC<SubHeaderElementProps> = ({ content, styles, onChange, isEditable }) => {
  const [text, setText] = useState(content.text)

  // Update local state when props change
  useEffect(() => {
    setText(content.text)
  }, [content.text])

  const handleChange = (newText: string) => {
    setText(newText)
    onChange({ ...content, text: newText })
  }

  if (isEditable) {
    return (
      <ContentEditable
        html={text}
        onChange={handleChange}
        tagName="h3"
        style={styles}
        className="outline-none focus:outline-none"
      />
    )
  }

  return <h3 style={styles}>{text}</h3>
}
