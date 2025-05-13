"use client"

import type React from "react"
import type { Template } from "@/types/template"
import { HeaderElement } from "@/pattern/molecules/header-element"
import { ParagraphElement } from "@/pattern/molecules/paragraph-element"
import { ButtonElement } from "@/pattern/molecules/button-element"
import { ImageElement } from "@/pattern/molecules/image-element"
import { DividerElement } from "@/pattern/molecules/divider-element"
import { SpacerElement } from "@/pattern/molecules/spacer-element"

interface EmailTemplateProps {
  /**
   * The template to render
   */
  template: Template
  /**
   * Optional className for the container
   */
  className?: string
  /**
   * Optional style for the container
   */
  style?: React.CSSProperties
}

/**
 * EmailTemplate renders a template without the editor.
 * This is useful for previewing templates or rendering them in other contexts.
 *
 * @example
 * \`\`\`tsx
 * import { EmailTemplate } from 'email-template-builder'
 *
 * function Preview({ template }) {
 *   return (
 *     <div>
 *       <h1>Template Preview</h1>
 *       <EmailTemplate template={template} />
 *     </div>
 *   )
 * }
 * \`\`\`
 */
export function EmailTemplate({ template, className, style }: EmailTemplateProps) {
  return (
    <div className={className} style={style}>
      {template.elements.map((element) => {
        switch (element.type) {
          case "header":
            return (
              <HeaderElement
                key={element.id}
                content={element.content}
                styles={element.styles}
                onChange={() => { }}
                isEditable={false}
              />
            )
          case "paragraph":
            return (
              <ParagraphElement
                key={element.id}
                content={element.content}
                styles={element.styles}
                onChange={() => { }}
                isEditable={false}
              />
            )
          case "button":
            return (
              <ButtonElement
                key={element.id}
                content={element.content}
                styles={element.styles}
                onChange={() => { }}
                isEditable={false}
              />
            )
          case "image":
            return (
              <ImageElement
                key={element.id}
                content={element.content}
                styles={element.styles}
                onChange={() => { }}
                isEditable={false}
              />
            )
          case "divider":
            return (
              <DividerElement
                key={element.id}
                content={element.content}
                styles={element.styles}
                onChange={() => { }}
                isEditable={false}
              />
            )
          case "spacer":
            return (
              <SpacerElement
                key={element.id}
                content={element.content}
                styles={element.styles}
                onChange={() => { }}
                isEditable={false}
              />
            )
          default:
            return null
        }
      })}
    </div>
  )
}
