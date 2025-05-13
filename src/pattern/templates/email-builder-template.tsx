"use client"

import type React from "react"
import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { Toolbar } from "@/pattern/organisms/toolbar"
import { Sidebar } from "@/pattern/organisms/sidebar"
import { Canvas } from "@/pattern/organisms/canvas"
import { NotificationContainer } from "@/pattern/organisms/notification-container"
import { ExportModal } from "@/pattern/organisms/export-modal"
import { SaveTemplateModal } from "@/pattern/organisms/save-template-modal"
import { LoadTemplateModal } from "@/pattern/organisms/load-template-modal"
import { ResponsivePreview } from "@/pattern/organisms/responsive-preview"
import { toggleExportModal, toggleSaveModal, toggleLoadModal, addNotification } from "@/redux/features/uiSlice"
import { saveTemplate, importTemplate, updateTemplateName } from "@/redux/features/templateSlice"
import { generateEmailHtml } from "@/services/email-export"

interface EmailBuilderTemplateProps {
  initialTemplate?: any
  onSave?: (template: any) => void
  onExport?: (html: string, json: any) => void
}

export const EmailBuilderTemplate: React.FC<EmailBuilderTemplateProps> = ({ initialTemplate, onSave, onExport }) => {
  const dispatch = useAppDispatch()
  const { showExportModal, showSaveModal, showLoadModal, previewMode } = useAppSelector((state) => state.ui)
  const currentTemplate = useAppSelector((state) => state.template.currentTemplate)

  // Load initial template if provided
  useEffect(() => {
    if (initialTemplate) {
      dispatch(importTemplate(initialTemplate))
    }
  }, [initialTemplate, dispatch])

  // Auto-save to localStorage
  useEffect(() => {
    const saveToLocalStorage = () => {
      try {
        localStorage.setItem("emailBuilder_currentTemplate", JSON.stringify(currentTemplate))
      } catch (error) {
        console.error("Failed to save template to localStorage:", error)
      }
    }

    const timeoutId = setTimeout(saveToLocalStorage, 1000)
    return () => clearTimeout(timeoutId)
  }, [currentTemplate])

  const handleSaveTemplate = (name?: string) => {
    if (name) {
      dispatch(updateTemplateName(name))
    }
    dispatch(saveTemplate())
    dispatch(toggleSaveModal())

    if (onSave) {
      onSave(currentTemplate)
    }

    dispatch(
      addNotification({
        message: "Template saved successfully",
        type: "success",
      }),
    )
  }

  const handleExport = (format: "html" | "json") => {
    const html = generateEmailHtml(currentTemplate)

    if (onExport) {
      onExport(html, currentTemplate)
    }

    dispatch(
      addNotification({
        message: `Template exported as ${format.toUpperCase()}`,
        type: "success",
      }),
    )

    dispatch(toggleExportModal())
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <Toolbar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main id="email-builder-canvas" className="flex-1 overflow-auto">
          {previewMode ? <ResponsivePreview className="p-4" /> : <Canvas />}
        </main>
      </div>
      <NotificationContainer />

      <ExportModal isOpen={showExportModal} onClose={() => dispatch(toggleExportModal())} onExport={handleExport} />

      <SaveTemplateModal
        isOpen={showSaveModal}
        onClose={() => dispatch(toggleSaveModal())}
        onSave={handleSaveTemplate}
      />

      <LoadTemplateModal isOpen={showLoadModal} onClose={() => dispatch(toggleLoadModal())} />
    </div>
  )
}
