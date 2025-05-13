"use client"

import type React from "react"
import { useState } from "react"
import ContentEditable from "react-contenteditable"

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

  const handleChange = (e: any) => {
    const newText = e.target.value
    setText(newText)
    onChange({ ...content, text: newText })
  }

  const handleBlur = () => {
    onChange({ ...content, text })
  }

  if (isEditable) {
    return (
      <ContentEditable
        html={text}
        onChange={handleChange}
        onBlur={handleBlur}
        tagName="p"
        style={styles}
        className="outline-none focus:outline-none"
      />
    )
  }

  return <p style={styles}>{text}</p>
}
