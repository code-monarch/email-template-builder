"use client"

import type React from "react"
import { useAppDispatch } from "@/redux/hooks"
import { addElement } from "@/redux/features/templateSlice"
import { ElementCard } from "@/pattern/molecules/element-card"
import { Type, Heading2, AlignLeft, Square, ImageIcon, Minus, ArrowDown, Layout } from "lucide-react"
import { ElementType } from "@/types/template"

export const ElementsPanel: React.FC = () => {
  const dispatch = useAppDispatch()

  const handleElementClick = (type: any) => {
    dispatch(addElement({ type }))
  }

  const elements = [
    { type: "header", icon: <Type size={18} />, label: "Header" },
    { type: "sub-header", icon: <Heading2 size={18} />, label: "Sub-Header" },
    { type: "paragraph", icon: <AlignLeft size={18} />, label: "Paragraph" },
    { type: "button", icon: <Square size={18} />, label: "Button" },
    { type: "image", icon: <ImageIcon size={18} />, label: "Image" },
    { type: "logo", icon: <ImageIcon size={18} />, label: "Logo" },
    { type: "divider", icon: <Minus size={18} />, label: "Divider" },
    { type: "spacer", icon: <ArrowDown size={18} />, label: "Spacer" },
    { type: "footer", icon: <Layout size={18} />, label: "Footer" },
  ]

  return (
    <div className="space-y-4 fade-in">
      <h3 className="text-base font-semibold mb-4 text-foreground" id="elements-heading">
        Elements
      </h3>

      <div
        className="space-y-2.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-2.5"
        role="list"
        aria-labelledby="elements-heading"
      >
        {elements.map((element) => (
          <div key={element.type} role="listitem">
            <ElementCard
              type={element.type as ElementType}
              icon={element.icon}
              label={element.label}
              onClick={() => handleElementClick(element.type)}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
