"use client"

import type React from "react"
import { useState } from "react"
import { useAppSelector } from "@/redux/hooks"
import { generateEmailHtml } from "@/services/email-export"
import { Button } from "@/pattern/molecules/button"
import { Smartphone, Tablet, Monitor, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"

interface ResponsivePreviewProps {
  className?: string
}

export const ResponsivePreview: React.FC<ResponsivePreviewProps> = ({ className }) => {
  const [device, setDevice] = useState<"mobile" | "tablet" | "desktop">("desktop")
  const currentTemplate = useAppSelector((state) => state.template.currentTemplate)

  const deviceWidths = {
    mobile: 320,
    tablet: 768,
    desktop: 1024,
  }

  const deviceLabels = {
    mobile: "Mobile",
    tablet: "Tablet",
    desktop: "Desktop",
  }

  const handleOpenInNewTab = () => {
    const html = generateEmailHtml(currentTemplate)
    const blob = new Blob([html], { type: "text/html" })
    const url = URL.createObjectURL(blob)
    window.open(url, "_blank")
  }

  return (
    <div className={cn("space-y-4", className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2" role="group" aria-label="Device preview options">
          <Button
            variant={device === "mobile" ? "primary" : "outline"}
            size="sm"
            onClick={() => setDevice("mobile")}
            aria-pressed={device === "mobile"}
            className="flex items-center"
          >
            <Smartphone size={16} className="mr-2" />
            <span className="hidden sm:inline">Mobile</span>
          </Button>
          <Button
            variant={device === "tablet" ? "primary" : "outline"}
            size="sm"
            onClick={() => setDevice("tablet")}
            aria-pressed={device === "tablet"}
            className="flex items-center"
          >
            <Tablet size={16} className="mr-2" />
            <span className="hidden sm:inline">Tablet</span>
          </Button>
          <Button
            variant={device === "desktop" ? "primary" : "outline"}
            size="sm"
            onClick={() => setDevice("desktop")}
            aria-pressed={device === "desktop"}
            className="flex items-center"
          >
            <Monitor size={16} className="mr-2" />
            <span className="hidden sm:inline">Desktop</span>
          </Button>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={handleOpenInNewTab}
          className="flex items-center"
          aria-label="Open preview in new tab"
        >
          <ExternalLink size={16} className="mr-2" />
          <span className="hidden sm:inline">Open in New Tab</span>
        </Button>
      </div>

      <div className="flex justify-center bg-accent/30 p-4 rounded-lg dark:bg-gray-900/50 overflow-hidden">
        <div
          className={cn(
            "transition-all duration-300 bg-white dark:bg-gray-800 shadow-md rounded-md overflow-hidden",
            device === "mobile" && "w-[320px]",
            device === "tablet" && "w-[768px] max-w-full",
            device === "desktop" && "w-full max-w-[1024px]",
          )}
          style={{ maxHeight: "70vh", overflowY: "auto" }}
          role="region"
          aria-label={`${deviceLabels[device]} preview of email template`}
        >
          <iframe
            srcDoc={generateEmailHtml(currentTemplate)}
            title={`${deviceLabels[device]} preview of ${currentTemplate.name}`}
            className="w-full h-full min-h-[500px] border-0"
            sandbox="allow-same-origin"
          />
        </div>
      </div>

      <p className="text-center text-sm text-muted-foreground">
        Previewing at {deviceWidths[device]}px width ({deviceLabels[device]})
      </p>
    </div>
  )
}
