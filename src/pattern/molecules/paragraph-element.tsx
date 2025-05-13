"use client"

import type React from "react"
import { useState } from "react"
import { ContentEditable } from "@/pattern/atoms/content-editable"

interface ParagraphElementProps {
  content: {
    text: string
  }
  styles: any
  onChange: (content: any) => void
  isEditable: boolean
}

export const ParagraphElement: React.FC<ParagraphElementProps> = ({ content, styles, onChange, isEditable }) => {
  const [text, setText] = useState(content.text)

  const handleChange = (newText: string) => {
    setText(newText)
    onChange({ ...content, text: newText })
  }

  if (isEditable) {
    return (
      <ContentEditable
        html={text}
        onChange={handleChange}
        tagName="p"
        style={styles}
        className="outline-none focus:outline-none"
      />
    )
  }

  return <p style={styles}>{text}</p>
}
