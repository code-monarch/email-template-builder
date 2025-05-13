"use client"

import type React from "react"
import { useState } from "react"
import ContentEditable from "react-contenteditable"

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
      <div
        style={{
          ...styles,
          cursor: "text",
        }}
        className="inline-block"
      >
        <ContentEditable
          html={text}
          onChange={handleChange}
          onBlur={handleBlur}
          tagName="span"
          className="outline-none focus:outline-none block"
        />
      </div>
    )
  }

  return (
    <a
      href={content.url}
      style={styles}
      className="inline-block no-underline"
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  )
}
