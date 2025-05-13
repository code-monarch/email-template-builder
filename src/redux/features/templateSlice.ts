import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import { v4 as uuidv4 } from "uuid"
import type { ElementType, Template, TemplateElement } from "@/types/template"

export interface TemplateState {
  currentTemplate: Template
  templates: Template[]
  selectedElementId: string | null
}

const initialState: TemplateState = {
  currentTemplate: {
    id: uuidv4(),
    name: "Untitled Template",
    elements: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  templates: [],
  selectedElementId: null,
}

// Load initial templates from localStorage if available
const loadInitialTemplates = (): TemplateState => {
  if (typeof window === "undefined") return initialState

  try {
    // Load templates
    const savedTemplates = localStorage.getItem("emailBuilder_templates")
    const templates = savedTemplates ? JSON.parse(savedTemplates) : []

    // Load current template
    const savedCurrentTemplate = localStorage.getItem("emailBuilder_currentTemplate")
    const currentTemplate = savedCurrentTemplate ? JSON.parse(savedCurrentTemplate) : initialState.currentTemplate

    return {
      ...initialState,
      templates,
      currentTemplate,
    }
  } catch (error) {
    console.error("Error loading templates from localStorage:", error)
    return initialState
  }
}

const templateSlice = createSlice({
  name: "template",
  initialState: loadInitialTemplates(),
  reducers: {
    addElement: (state, action: PayloadAction<{ type: ElementType; index?: number }>) => {
      const { type, index } = action.payload
      const newElement: TemplateElement = {
        id: uuidv4(),
        type,
        content: getDefaultContentForType(type),
        styles: getDefaultStylesForType(type),
      }

      if (index !== undefined) {
        state.currentTemplate.elements.splice(index, 0, newElement)
      } else {
        state.currentTemplate.elements.push(newElement)
      }

      state.currentTemplate.updatedAt = new Date().toISOString()
      state.selectedElementId = newElement.id
    },
    updateElement: (state, action: PayloadAction<{ id: string; updates: Partial<TemplateElement> }>) => {
      const { id, updates } = action.payload
      const elementIndex = state.currentTemplate.elements.findIndex((el) => el.id === id)

      if (elementIndex !== -1) {
        state.currentTemplate.elements[elementIndex] = {
          ...state.currentTemplate.elements[elementIndex],
          ...updates,
        }
        state.currentTemplate.updatedAt = new Date().toISOString()
      }
    },
    removeElement: (state, action: PayloadAction<string>) => {
      const id = action.payload
      state.currentTemplate.elements = state.currentTemplate.elements.filter((el) => el.id !== id)
      state.currentTemplate.updatedAt = new Date().toISOString()

      if (state.selectedElementId === id) {
        state.selectedElementId = null
      }
    },
    reorderElements: (state, action: PayloadAction<{ sourceIndex: number; destinationIndex: number }>) => {
      const { sourceIndex, destinationIndex } = action.payload
      const [removed] = state.currentTemplate.elements.splice(sourceIndex, 1)
      state.currentTemplate.elements.splice(destinationIndex, 0, removed)
      state.currentTemplate.updatedAt = new Date().toISOString()
    },
    selectElement: (state, action: PayloadAction<string | null>) => {
      state.selectedElementId = action.payload
    },
    updateTemplateName: (state, action: PayloadAction<string>) => {
      state.currentTemplate.name = action.payload
      state.currentTemplate.updatedAt = new Date().toISOString()
    },
    saveTemplate: (state) => {
      const existingIndex = state.templates.findIndex((t) => t.id === state.currentTemplate.id)

      if (existingIndex !== -1) {
        state.templates[existingIndex] = { ...state.currentTemplate }
      } else {
        state.templates.push({ ...state.currentTemplate })
      }

      // Save to localStorage
      try {
        localStorage.setItem("emailBuilder_templates", JSON.stringify(state.templates))
      } catch (error) {
        console.error("Failed to save templates to localStorage:", error)
      }
    },
    loadTemplate: (state, action: PayloadAction<string>) => {
      const templateId = action.payload
      const template = state.templates.find((t) => t.id === templateId)

      if (template) {
        // Create a deep copy of the template to ensure all nested objects are copied
        state.currentTemplate = JSON.parse(JSON.stringify(template))
        state.selectedElementId = null
      }
    },
    loadTemplateFromStorage: (state, action: PayloadAction<Template>) => {
      state.currentTemplate = action.payload
      state.selectedElementId = null
    },
    createNewTemplate: (state) => {
      state.currentTemplate = {
        id: uuidv4(),
        name: "Untitled Template",
        elements: [],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
      state.selectedElementId = null
    },
    importTemplate: (state, action: PayloadAction<Template>) => {
      state.currentTemplate = {
        ...action.payload,
        id: uuidv4(),
        updatedAt: new Date().toISOString(),
      }
      state.selectedElementId = null
    },
    persistTemplates: (state) => {
      try {
        localStorage.setItem("emailBuilder_templates", JSON.stringify(state.templates))
        localStorage.setItem("emailBuilder_currentTemplate", JSON.stringify(state.currentTemplate))
      } catch (error) {
        console.error("Failed to persist templates to localStorage:", error)
      }
    },
  },
})

// Helper functions for default content and styles
function getDefaultContentForType(type: ElementType): any {
  switch (type) {
    case "header":
      return { text: "Header Text", level: 1 }
    case "sub-header":
      return { text: "Sub-Header Text" }
    case "paragraph":
      return { text: "This is a paragraph of text. Click to edit." }
    case "button":
      return { text: "Click Me", url: "#" }
    case "image":
      return { src: "/email-placeholder.png", alt: "Image description" }
    case "divider":
      return {}
    case "spacer":
      return { height: 20 }
    case "footer":
      return {
        companyName: "Your Company",
        tagline: "Your company tagline",
        socialLinks: [
          { platform: "facebook", url: "https://facebook.com/" },
          { platform: "twitter", url: "https://twitter.com/" },
          { platform: "instagram", url: "https://instagram.com/" },
        ],
      }
    case "logo":
      return {
        src: "",
        alt: "Company Logo",
        link: "",
        maxWidth: 200,
        alignment: "center",
      }
    default:
      return {}
  }
}

function getDefaultStylesForType(type: ElementType): any {
  const baseStyles = {
    padding: "16px",
    margin: "0px",
    color: "var(--foreground)",
    backgroundColor: "transparent",
    fontFamily: "Arial, sans-serif",
  }

  switch (type) {
    case "header":
      return {
        ...baseStyles,
        fontSize: "24px",
        fontWeight: "bold",
      }
    case "sub-header":
      return {
        ...baseStyles,
        fontSize: "18px",
        fontWeight: "600",
        color: "#4B5563", // A slightly muted color for sub-headers
        borderBottom: "1px solid #E5E7EB",
        paddingBottom: "8px",
      }
    case "paragraph":
      return {
        ...baseStyles,
        fontSize: "16px",
      }
    case "button":
      return {
        ...baseStyles,
        backgroundColor: "#3b82f6",
        color: "#ffffff",
        padding: "12px 24px",
        borderRadius: "4px",
        textAlign: "center",
      }
    case "image":
      return {
        ...baseStyles,
        width: "100%",
        maxWidth: "600px",
      }
    case "divider":
      return {
        ...baseStyles,
        borderTop: "1px solid var(--border)",
        padding: "0px",
      }
    case "spacer":
      return {
        ...baseStyles,
        padding: "0px",
      }
    case "footer":
      return {
        ...baseStyles,
        padding: "24px 16px",
        borderTop: "1px solid #E5E7EB",
        textAlign: "center",
        fontSize: "14px",
        color: "#4B5563",
      }
    case "logo":
      return {
        ...baseStyles,
        padding: "16px",
        margin: "0 auto", // Center aligned by default
        maxWidth: "200px",
        height: "auto",
      }
    default:
      return baseStyles
  }
}

// Explicitly annotate the type of the reducer
export const {
  addElement,
  updateElement,
  removeElement,
  reorderElements,
  selectElement,
  updateTemplateName,
  saveTemplate,
  loadTemplate,
  loadTemplateFromStorage,
  createNewTemplate,
  importTemplate,
  persistTemplates,
} = templateSlice.actions

export default templateSlice.reducer
