import type React from "react"
import type { Template } from "@/types/template"
import { Toolbar } from "@/pattern/organisms/toolbar"
import { Canvas } from "@/pattern/organisms/canvas"
import { NotificationContainer } from "@/pattern/organisms/notification-container"

interface BasicTemplateProps {
  template: Template
}

export const BasicTemplate: React.FC<BasicTemplateProps> = ({ template }) => {
  return (
    <div className="flex flex-col h-screen">
      <Toolbar />
      <div className="flex-1 overflow-auto">
        <Canvas />
      </div>
      <NotificationContainer />
    </div>
  )
}
