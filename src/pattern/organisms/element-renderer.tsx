"use client"

import type React from "react"
import { useAppDispatch } from "@/redux/hooks"
import { selectElement, updateElement } from "@/redux/features/templateSlice"
import type { TemplateElement } from "@/types/template"
import { ElementToolbar } from "@/pattern/molecules/element-toolbar"
import { HeaderElement } from "@/pattern/molecules/header-element"
import { SubHeaderElement } from "@/pattern/molecules/sub-header-element"
import { ParagraphElement } from "@/pattern/molecules/paragraph-element"
import { ButtonElement } from "@/pattern/molecules/button-element"
import { ImageElement } from "@/pattern/molecules/image-element"
import { DividerElement } from "@/pattern/molecules/divider-element"
import { SpacerElement } from "@/pattern/molecules/spacer-element"
import { cn } from "@/lib/utils"
import { FooterElement } from "@/pattern/molecules/footer-element"
import { LogoElement } from "@/pattern/molecules/logo-element"

interface ElementRendererProps {
  element: TemplateElement
  index: number
  isSelected: boolean
  isPreview: boolean
  totalElements: number
}

export const ElementRenderer: React.FC<ElementRendererProps> = ({
  element,
  index,
  isSelected,
  isPreview,
  totalElements,
}) => {
  const dispatch = useAppDispatch()

  const handleElementClick = (e: React.MouseEvent) => {
    if (!isPreview) {
      e.stopPropagation()
      dispatch(selectElement(element.id))
    }
  }

  const handleContentChange = (content: any) => {
    dispatch(updateElement({ id: element.id, updates: { content } }))
  }

  const renderElement = () => {
    switch (element.type) {
      case "header":
        return (
          <HeaderElement
            content={element.content}
            styles={element.styles}
            onChange={handleContentChange}
            isEditable={!isPreview}
          />
        )
      case "sub-header":
        return (
          <SubHeaderElement
            content={element.content}
            styles={element.styles}
            onChange={handleContentChange}
            isEditable={!isPreview}
          />
        )
      case "paragraph":
        return (
          <ParagraphElement
            content={element.content}
            styles={element.styles}
            onChange={handleContentChange}
            isEditable={!isPreview}
          />
        )
      case "button":
        return (
          <ButtonElement
            content={element.content}
            styles={element.styles}
            onChange={handleContentChange}
            isEditable={!isPreview}
          />
        )
      case "image":
        return (
          <ImageElement
            content={element.content}
            styles={element.styles}
            onChange={handleContentChange}
            isEditable={!isPreview}
          />
        )
      case "divider":
        return (
          <DividerElement
            content={element.content}
            styles={element.styles}
            onChange={handleContentChange}
            isEditable={!isPreview}
          />
        )
      case "spacer":
        return (
          <SpacerElement
            content={element.content}
            styles={element.styles}
            onChange={handleContentChange}
            isEditable={!isPreview}
          />
        )
      case "footer":
        return (
          <FooterElement
            content={element.content}
            styles={element.styles}
            onChange={handleContentChange}
            isEditable={!isPreview}
          />
        )
      case "logo":
        return (
          <LogoElement
            content={element.content}
            styles={element.styles}
            onChange={handleContentChange}
            isEditable={!isPreview}
          />
        )
      default:
        return <div>Unknown element type</div>
    }
  }

  return (
    <div
      className={cn(
        "relative group",
        !isPreview && "hover:outline hover:outline-2 hover:outline-blue-300",
        isSelected && !isPreview && "outline outline-2 outline-blue-500",
      )}
      onClick={handleElementClick}
    >
      {!isPreview && isSelected && (
        <ElementToolbar elementId={element.id} index={index} totalElements={totalElements} />
      )}
      {renderElement()}
    </div>
  )
}
