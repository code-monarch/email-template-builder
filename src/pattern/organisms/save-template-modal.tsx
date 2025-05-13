"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAppSelector } from "@/redux/hooks"
import { Modal } from "@/pattern/molecules/modal"
import { Button } from "@/pattern/molecules/button"
import { Input } from "@/pattern/molecules/input"

interface SaveTemplateModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (name?: string) => void
}

export const SaveTemplateModal: React.FC<SaveTemplateModalProps> = ({ isOpen, onClose, onSave }) => {
  const currentTemplate = useAppSelector((state) => state.template.currentTemplate)
  const [templateName, setTemplateName] = useState(currentTemplate.name)

  useEffect(() => {
    setTemplateName(currentTemplate.name)
  }, [currentTemplate.name])

  const handleSave = () => {
    if (templateName.trim()) {
      onSave(templateName)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Save Template">
      <div className="space-y-4">
        <Input
          label="Template Name"
          value={templateName}
          onChange={(e) => setTemplateName(e.target.value)}
          fullWidth
          autoFocus
        />

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={!templateName.trim()}>
            Save Template
          </Button>
        </div>
      </div>
    </Modal>
  )
}
