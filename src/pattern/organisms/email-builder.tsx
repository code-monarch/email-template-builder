"use client"

import type React from "react"
import { useEffect } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { toggleExportModal, toggleSaveModal, toggleLoadModal } from "@/redux/features/uiSlice"
import { saveTemplate, loadTemplateFromStorage, persistTemplates } from "@/redux/features/templateSlice"
import { Toolbar } from "./toolbar"
import { Sidebar } from "./sidebar"
import { Canvas } from "./canvas"
import { NotificationContainer } from "./notification-container"
import { ExportModal } from "./export-modal"
import { SaveTemplateModal } from "./save-template-modal"
import { LoadTemplateModal } from "./load-template-modal"

export const EmailBuilder: React.FC = () => {
  const dispatch = useAppDispatch()
  const { showExportModal, showSaveModal, showLoadModal } = useAppSelector((state) => state.ui)
  const currentTemplate = useAppSelector((state) => state.template.currentTemplate)

  // Auto-save to localStorage
  useEffect(() => {
    const saveToLocalStorage = () => {
      dispatch(persistTemplates())
    }

    const timeoutId = setTimeout(saveToLocalStorage, 1000)
    return () => clearTimeout(timeoutId)
  }, [currentTemplate, dispatch])

  // Load from localStorage on initial render
  useEffect(() => {
    try {
      const savedTemplate = localStorage.getItem("emailBuilder_currentTemplate")
      if (savedTemplate) {
        dispatch(loadTemplateFromStorage(JSON.parse(savedTemplate)))
      }
    } catch (error) {
      console.error("Failed to load template from localStorage:", error)
    }
  }, [dispatch])

  const handleSaveTemplate = () => {
    dispatch(saveTemplate())
    dispatch(toggleSaveModal())
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col h-screen">
        <Toolbar />
        <div className="flex flex-1 overflow-hidden">
          <Sidebar />
          <Canvas />
        </div>
        <NotificationContainer />

        <ExportModal isOpen={showExportModal} onClose={() => dispatch(toggleExportModal())} />

        <SaveTemplateModal
          isOpen={showSaveModal}
          onClose={() => dispatch(toggleSaveModal())}
          onSave={handleSaveTemplate}
        />

        <LoadTemplateModal isOpen={showLoadModal} onClose={() => dispatch(toggleLoadModal())} />
      </div>
    </DndProvider>
  )
}
