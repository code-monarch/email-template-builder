import type { Template } from "@/types/template"
import { EmailTemplate } from "@/pattern/templates/email-template"

interface EmailPreviewProps {
  /**
   * The template to preview
   */
  template: Template
  /**
   * Optional width for the preview container
   */
  width?: number | string
  /**
   * Optional device to simulate (desktop, tablet, mobile)
   */
  device?: "desktop" | "tablet" | "mobile"
}

/**
 * EmailPreview renders a template in a preview container.
 * It can simulate different devices by adjusting the width.
 *
 * @example
 * ```tsx
 * import { EmailPreview } from 'email-template-builder'
 *
 * function Preview({ template }) {
 *   return (
 *     <div>
 *       <h1>Mobile Preview</h1>
 *       <EmailPreview template={template} device="mobile" />
 *     </div>
 *   )
 * }
 * ```
 */
export function EmailPreview({ template, width, device = "desktop" }: EmailPreviewProps) {
  const deviceWidths = {
    desktop: 600,
    tablet: 480,
    mobile: 320,
  }

  const previewWidth = width || deviceWidths[device]

  return (
    <div className="flex justify-center p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
      <div
        className="bg-white dark:bg-gray-800 shadow-md rounded-md overflow-hidden"
        style={{ width: previewWidth, maxWidth: "100%" }}
      >
        <EmailTemplate template={template} className="p-4" />
      </div>
    </div>
  )
}
