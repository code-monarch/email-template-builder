"use client"

import type React from "react"
import { useState } from "react"
import ContentEditable from "react-contenteditable"

interface HeaderElementProps {
  content: {
    text: string
    level: number
  }
  styles: any
  onChange: (content: any) => void
  isEditable: boolean
}

export const HeaderElement: React.FC<HeaderElementProps> = ({ content, styles, onChange, isEditable }) => {
  const [text, setText] = useState(content.text)

  const handleChange = (e: any) => {
    const newText = e.target.value
    setText(newText)
    onChange({ ...content, text: newText })
  }

  const handleBlur = () => {
    onChange({ ...content, text })
  }

  const renderHeader = () => {
    const props = {
      style: styles,
      className: "outline-none focus:outline-none",
    }

    if (isEditable) {
      return (
        <ContentEditable
          html={text}
          onChange={handleChange}
          onBlur={handleBlur}
          tagName={`h${content.level}`}
          {...props}
        />
      )
    }

    switch (content.level) {
      case 1:
        return <h1 {...props}>{text}</h1>
      case 2:
        return <h2 {...props}>{text}</h2>
      case 3:
        return <h3 {...props}>{text}</h3>
      case 4:
        return <h4 {...props}>{text}</h4>
      case 5:
        return <h5 {...props}>{text}</h5>
      case 6:
        return <h6 {...props}>{text}</h6>
      default:
        return <h1 {...props}>{text}</h1>
    }
  }

  return renderHeader()
}
