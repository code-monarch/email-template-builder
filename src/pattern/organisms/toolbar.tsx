"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useAppDispatch, useAppSelector } from "@/redux/hooks"
import { useEmailProviders } from "@/hooks/use-email-providers"
import { Button } from "@/pattern/molecules/button"
import { Input } from "@/pattern/molecules/input"
import { IconButton } from "@/pattern/molecules/icon-button"
import { ThemeToggle } from "@/pattern/molecules/theme-toggle"
import { Save, FolderOpen, Eye, EyeOff, Download, Send, Menu, Settings } from "lucide-react"
import {
  togglePreviewMode,
  toggleExportModal,
  toggleSaveModal,
  toggleLoadModal,
  toggleSidebar,
} from "@/redux/features/uiSlice"
import { updateTemplateName } from "@/redux/features/templateSlice"
import { ProviderSettings } from "./provider-settings"
import { SendEmailModal } from "./send-email-modal"

export const Toolbar: React.FC = () => {
  const dispatch = useAppDispatch()
  const { previewMode, sidebarOpen } = useAppSelector((state) => state.ui)
  const { name } = useAppSelector((state) => state.template.currentTemplate)
  const { activeProvider } = useEmailProviders()

  const [showProviderSettings, setShowProviderSettings] = useState(false)
  const [showSendEmailModal, setShowSendEmailModal] = useState(false)

  const [editingName, setEditingName] = useState(false)
  const [tempName, setTempName] = useState(name)
  const nameInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    setTempName(name)
  }, [name])

  const handleNameFocus = () => {
    setEditingName(true)
  }

  const handleNameBlur = () => {
    setEditingName(false)
    if (tempName.trim() !== name) {
      dispatch(updateTemplateName(tempName.trim() || "Untitled Template"))
    }
  }

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      nameInputRef.current?.blur()
    } else if (e.key === "Escape") {
      setTempName(name)
      nameInputRef.current?.blur()
    }
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTempName(e.target.value)
  }

  return (
    <>
      <div className="bg-background border-b border-border/40 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto flex items-center justify-between h-16 px-2 sm:px-4">
          <div className="h-fit flex items-center space-x-2 sm:space-x-4 overflow-hidden">
            <IconButton
              icon={<Menu size={20} />}
              variant="ghost"
              onClick={() => dispatch(toggleSidebar())}
              label={sidebarOpen ? "Hide sidebar" : "Show sidebar"}
              className="md:hidden"
            />
            <h1 className="text-xl font-semibold bg-gradient-to-r from-primary to-blue-400 bg-clip-text text-transparent hidden md:block">
              Email Builder
            </h1>
            <div className="relative h-full min-w-0 flex-shrink group">
              <Input
                ref={nameInputRef}
                value={tempName}
                onChange={handleNameChange}
                onFocus={handleNameFocus}
                onBlur={handleNameBlur}
                onKeyDown={handleNameKeyDown}
                className={`w-32 sm:w-48 md:w-64 pl-3 pr-8 py-1.5 h-9 mt-3 mr-2 text-sm rounded-md border ${editingName ? "border-primary" : "border-border/60"
                  } focus:border-primary/60 bg-background/50 truncate`}
                placeholder="Template Name"
                aria-label="Template Name"
                title="Edit template name"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="lucide lucide-pencil"
                >
                  <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                  <path d="m15 5 4 4" />
                </svg>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto hide-scrollbar">
            <Button
              variant="outline"
              onClick={() => dispatch(toggleSaveModal())}
              className="flex items-center h-9 px-2 sm:px-3 text-sm font-medium rounded-md border-border/60 hover:bg-accent/50"
              title="Save"
            >
              <Save size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Save</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => dispatch(toggleLoadModal())}
              className="flex items-center h-9 px-2 sm:px-3 text-sm font-medium rounded-md border-border/60 hover:bg-accent/50"
              title="Load"
            >
              <FolderOpen size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Load</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => dispatch(togglePreviewMode())}
              className="flex items-center h-9 px-2 sm:px-3 text-sm font-medium rounded-md border-border/60 hover:bg-accent/50"
              title={previewMode ? "Edit" : "Preview"}
            >
              {previewMode ? (
                <>
                  <EyeOff size={16} className="sm:mr-2" />
                  <span className="hidden sm:inline">Edit</span>
                </>
              ) : (
                <>
                  <Eye size={16} className="sm:mr-2" />
                  <span className="hidden sm:inline">Preview</span>
                </>
              )}
            </Button>

            <Button
              variant="outline"
              onClick={() => dispatch(toggleExportModal())}
              className="flex items-center h-9 px-2 sm:px-3 text-sm font-medium rounded-md border-border/60 hover:bg-accent/50"
              title="Export"
            >
              <Download size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Export</span>
            </Button>

            <Button
              variant="outline"
              onClick={() => setShowProviderSettings(true)}
              className="flex items-center h-9 px-2 sm:px-3 text-sm font-medium rounded-md border-border/60 hover:bg-accent/50"
              title="Providers"
            >
              <Settings size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">Providers</span>
            </Button>

            <Button
              variant="primary"
              onClick={() => setShowSendEmailModal(true)}
              className="flex items-center h-9 px-2 sm:px-3 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90"
              title={activeProvider ? "Send Test" : "Setup Email"}
            >
              <Send size={16} className="sm:mr-2" />
              <span className="hidden sm:inline">{activeProvider ? "Send Test" : "Setup Email"}</span>
            </Button>

            <ThemeToggle />
          </div>
        </div>
      </div>

      <ProviderSettings isOpen={showProviderSettings} onClose={() => setShowProviderSettings(false)} />

      <SendEmailModal
        isOpen={showSendEmailModal}
        onClose={() => setShowSendEmailModal(false)}
        onConfigureProvider={() => {
          setShowSendEmailModal(false)
          setShowProviderSettings(true)
        }}
      />
    </>
  )
}
