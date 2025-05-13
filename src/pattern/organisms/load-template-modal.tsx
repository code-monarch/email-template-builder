"use client"

import type React from "react"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { Modal } from "@/pattern/molecules/modal"
import { Button } from "@/pattern/molecules/button"
import { loadTemplate } from "@/redux/features/templateSlice"

interface LoadTemplateModalProps {
  isOpen: boolean
  onClose: () => void
}

export const LoadTemplateModal: React.FC<LoadTemplateModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch()
  const templates = useAppSelector((state) => state.template.templates)

  const handleLoadTemplate = (id: string) => {
    dispatch(loadTemplate(id))
    onClose()
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Load Template">
      <div className="space-y-4">
        {templates.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400 p-4">
            <p>No saved templates yet</p>
          </div>
        ) : (
          <div className="space-y-2 max-h-80 overflow-y-auto">
            {templates.map((template) => (
              <div
                key={template.id}
                className="p-3 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => handleLoadTemplate(template.id)}
              >
                <div className="flex justify-between">
                  <h4 className="font-medium">{template.name}</h4>
                  <span className="text-xs text-gray-500 dark:text-gray-400">{formatDate(template.updatedAt)}</span>
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{template.elements.length} elements</div>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}
