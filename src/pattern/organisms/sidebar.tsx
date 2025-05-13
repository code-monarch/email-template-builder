"use client"

import type React from "react"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { setActiveTab, toggleSidebar } from "@/redux/features/uiSlice"
import { ElementsPanel } from "@/pattern/organisms/elements-panel"
import { PropertiesPanel } from "@/pattern/organisms/properties-panel"
import { TemplatesPanel } from "@/pattern/organisms/templates-panel"
import { cn } from "@/lib/utils"
import { Layers, Settings, LayoutTemplateIcon as Templates, X } from "lucide-react"
import { Button } from "@/pattern/molecules/button"

export const Sidebar: React.FC = () => {
  const dispatch = useAppDispatch()
  const { sidebarOpen, activeTab } = useAppSelector((state) => state.ui)
  const selectedElementId = useAppSelector((state) => state.template.selectedElementId)

  if (!sidebarOpen) return null

  return (
    <aside
      className="w-full md:w-72 lg:w-80 border-r border-border/40 flex flex-col h-full bg-background/95 backdrop-blur-sm dark:bg-gray-900/95 z-10 fixed md:relative inset-0 overflow-hidden"
      aria-label="Sidebar"
    >
      <div className="flex justify-between items-center md:hidden p-4 border-b border-border/40">
        <h2 className="font-semibold">Email Builder</h2>
        <Button variant="ghost" size="sm" onClick={() => dispatch(toggleSidebar())} aria-label="Close sidebar">
          <X size={20} />
        </Button>
      </div>

      <div className="flex border-b border-border/40 overflow-x-auto sidebar-tabs">
        <button
          className={cn(
            "flex-shrink-0 py-3 px-4 text-center transition-all duration-200 min-w-[100px]",
            activeTab === "elements"
              ? "bg-accent/30 text-primary border-b-2 border-primary dark:bg-gray-800/50"
              : "text-muted-foreground hover:bg-accent/20 hover:text-foreground dark:hover:bg-gray-800/30",
          )}
          onClick={() => dispatch(setActiveTab("elements"))}
          aria-selected={activeTab === "elements"}
          role="tab"
          id="tab-elements"
          aria-controls="panel-elements"
        >
          <div className="flex items-center justify-center whitespace-nowrap">
            <Layers size={16} className="mr-2" aria-hidden="true" />
            <span className="text-sm font-medium">Elements</span>
          </div>
        </button>
        <button
          className={cn(
            "flex-shrink-0 py-3 px-4 text-center transition-all duration-200 min-w-[100px]",
            activeTab === "properties"
              ? "bg-accent/30 text-primary border-b-2 border-primary dark:bg-gray-800/50"
              : "text-muted-foreground hover:bg-accent/20 hover:text-foreground dark:hover:bg-gray-800/30",
            !selectedElementId && "opacity-50 cursor-not-allowed",
          )}
          onClick={() => dispatch(setActiveTab("properties"))}
          disabled={!selectedElementId}
          aria-selected={activeTab === "properties"}
          role="tab"
          id="tab-properties"
          aria-controls="panel-properties"
        >
          <div className="flex items-center justify-center whitespace-nowrap">
            <Settings size={16} className="mr-2" aria-hidden="true" />
            <span className="text-sm font-medium">Properties</span>
          </div>
        </button>
        <button
          className={cn(
            "flex-shrink-0 py-3 px-4 text-center transition-all duration-200 min-w-[100px]",
            activeTab === "templates"
              ? "bg-accent/30 text-primary border-b-2 border-primary dark:bg-gray-800/50"
              : "text-muted-foreground hover:bg-accent/20 hover:text-foreground dark:hover:bg-gray-800/30",
          )}
          onClick={() => dispatch(setActiveTab("templates"))}
          aria-selected={activeTab === "templates"}
          role="tab"
          id="tab-templates"
          aria-controls="panel-templates"
        >
          <div className="flex items-center justify-center whitespace-nowrap">
            <Templates size={16} className="mr-2" aria-hidden="true" />
            <span className="text-sm font-medium">Templates</span>
          </div>
        </button>
      </div>

      <div
        className="flex-1 overflow-y-auto p-4 scrollbar-thin"
        role="tabpanel"
        id={`panel-${activeTab}`}
        aria-labelledby={`tab-${activeTab}`}
      >
        {activeTab === "elements" && <ElementsPanel />}
        {activeTab === "properties" && <PropertiesPanel />}
        {activeTab === "templates" && <TemplatesPanel />}
      </div>
    </aside>
  )
}
