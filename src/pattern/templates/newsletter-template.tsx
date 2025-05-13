import type React from "react"
import type { Template } from "@/types/template"
import { Toolbar } from "@/pattern/organisms/toolbar"
import { Canvas } from "@/pattern/organisms/canvas"
import { Sidebar } from "@/pattern/organisms/sidebar"
import { NotificationContainer } from "@/pattern/organisms/notification-container"

interface NewsletterTemplateProps {
  template: Template
}

export const NewsletterTemplate: React.FC<NewsletterTemplateProps> = ({ template }) => {
  return (
    <div className="flex flex-col h-screen">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <Canvas />
      </div>
      <NotificationContainer />
    </div>
  )
}
