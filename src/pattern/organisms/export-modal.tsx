"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useAppSelector } from "@/redux/hooks"
import { Modal } from "@/pattern/molecules/modal"
import { Button } from "@/pattern/molecules/button"
import { Select } from "@/pattern/molecules/select"
import { generateEmailHtml } from "@/services/email-export"
import { Copy, Download } from "lucide-react"

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  onExport?: (format: "html" | "json") => void
}

export const ExportModal: React.FC<ExportModalProps> = ({ isOpen, onClose, onExport }) => {
  const [exportType, setExportType] = useState<"html" | "json">("html")
  const [exportContent, setExportContent] = useState("")
  const [copied, setCopied] = useState(false)

  const currentTemplate = useAppSelector((state) => state.template.currentTemplate)

  useEffect(() => {
    if (isOpen) {
      if (exportType === "html") {
        const html = generateEmailHtml(currentTemplate)
        setExportContent(html)
      } else {
        setExportContent(JSON.stringify(currentTemplate, null, 2))
      }
    }
  }, [isOpen, exportType, currentTemplate])

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(exportContent)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleDownload = () => {
    const blob = new Blob([exportContent], { type: exportType === "html" ? "text/html" : "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${currentTemplate.name}.${exportType}`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)

    if (onExport) {
      onExport(exportType)
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Export Template" size="lg">
      <div className="space-y-4">
        <Select
          label="Export Format"
          value={exportType}
          onChange={(value) => setExportType(value as "html" | "json")}
          options={[
            { value: "html", label: "HTML" },
            { value: "json", label: "JSON" },
          ]}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            {exportType === "html" ? "HTML Code" : "JSON Data"}
          </label>
          <div className="relative">
            <pre className="p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md overflow-auto max-h-80 text-sm">
              {exportContent}
            </pre>
            <div className="absolute top-2 right-2 flex space-x-2">
              <Button variant="outline" size="sm" onClick={handleCopyToClipboard} className="flex items-center">
                <Copy size={14} className="mr-1" />
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 mt-4">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleDownload} className="flex items-center">
            <Download size={16} className="mr-2" />
            Download
          </Button>
        </div>
      </div>
    </Modal>
  )
}
