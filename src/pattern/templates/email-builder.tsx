"use client"

import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Provider } from "react-redux"
import { store } from "@/redux/store"
import { EmailBuilderTemplate } from "@/pattern/templates/email-builder-template"
import { ThemeProvider } from "@/pattern/templates/theme-provider"
import { SkipLink } from "@/pattern/atoms/skip-link"

interface EmailBuilderProps {
  /**
   * Optional initial template data
   */
  initialTemplate?: any
  /**
   * Optional callback when template is saved
   */
  onSave?: (template: any) => void
  /**
   * Optional callback when template is exported
   */
  onExport?: (html: string, json: any) => void
  /**
   * Optional custom theme
   */
  theme?: "light" | "dark" | "system"
  /**
   * Optional theme persistence key
   */
  themeStorageKey?: string
}

/**
 * EmailBuilder is the main component for the email template builder.
 * It provides a drag-and-drop interface for creating email templates.
 *
 * @example
 * ```tsx
 * import { EmailBuilder } from 'email-template-builder'
 *
 * function MyApp() {
 *   return (
 *     <div>
 *       <h1>My Email Builder</h1>
 *       <EmailBuilder
 *         onSave={(template) => console.log('Template saved:', template)}
 *         onExport={(html, json) => console.log('Exported HTML:', html)}
 *       />
 *     </div>
 *   )
 * }
 * ```
 */
export function EmailBuilder({
  initialTemplate,
  onSave,
  onExport,
  theme = "system",
  themeStorageKey = "email-builder-theme",
}: EmailBuilderProps) {
  return (
    <Provider store={store}>
      <ThemeProvider
        attribute="class"
        defaultTheme={theme}
        enableSystem={theme === "system"}
        storageKey={themeStorageKey}
      >
        <SkipLink href="#email-builder-canvas" />
        <DndProvider backend={HTML5Backend}>
          <div className="email-builder-root" role="application" aria-label="Email Template Builder">
            <EmailBuilderTemplate initialTemplate={initialTemplate} onSave={onSave} onExport={onExport} />
          </div>
        </DndProvider>
      </ThemeProvider>
    </Provider>
  )
}
