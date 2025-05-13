"use client"

import type React from "react"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { loadTemplate, createNewTemplate } from "@/redux/features/templateSlice"
import { Button } from "@/pattern/molecules/button"
import { PlusCircle } from "lucide-react"
import { cn } from "@/lib/utils"

export const TemplatesPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const templates = useAppSelector((state) => state.template.templates)
  const currentTemplateId = useAppSelector((state) => state.template.currentTemplate.id)

  const handleLoadTemplate = (id: string) => {
    dispatch(loadTemplate(id))
  }

  const handleCreateTemplate = () => {
    dispatch(createNewTemplate())
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + " " + date.toLocaleTimeString()
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium">Templates</h3>
        <Button variant="outline" size="sm" onClick={handleCreateTemplate} className="flex items-center">
          <PlusCircle size={16} className="mr-1" />
          New
        </Button>
      </div>

      {templates.length === 0 ? (
        <div className="text-center text-gray-500 dark:text-gray-400 p-4">
          <p>No saved templates yet</p>
          <p className="text-sm mt-2">Save your current template to see it here</p>
        </div>
      ) : (
        <div className="space-y-2 overflow-x-hidden">
          {templates.map((template) => (
            <div
              key={template.id}
              className={cn(
                "p-3 border rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800",
                template.id === currentTemplateId
                  ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-200 dark:border-gray-700",
              )}
              onClick={() => handleLoadTemplate(template.id)}
            >
              <div className="flex justify-between">
                <h4 className="font-medium truncate mr-2">{template.name}</h4>
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {formatDate(template.updatedAt)}
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">{template.elements.length} elements</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
