"use client"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { EmailBuilder, EmailTemplate, EmailPreview, SendGridProvider } from "../../index"

// Example of using the EmailBuilder component
export function BasicExample() {
  const handleSave = (template: any) => {
    console.log("Template saved:", template)
  }

  const handleExport = (html: string, json: any) => {
    console.log("Exported HTML:", html)
    console.log("Exported JSON:", json)
  }

  return (
    <div>
      <h1>Email Builder Example</h1>
      <DndProvider backend={HTML5Backend}>
        <EmailBuilder onSave={handleSave} onExport={handleExport} />
      </DndProvider>
    </div>
  )
}

// Example of using the EmailTemplate component
export function TemplateExample({ template }: { template: any }) {
  return (
    <div>
      <h1>Template Preview</h1>
      <EmailTemplate template={template} />
    </div>
  )
}

// Example of using the EmailPreview component
export function PreviewExample({ template }: { template: any }) {
  return (
    <div>
      <h1>Device Previews</h1>

      <h2>Desktop</h2>
      <EmailPreview template={template} device="desktop" />

      <h2>Tablet</h2>
      <EmailPreview template={template} device="tablet" />

      <h2>Mobile</h2>
      <EmailPreview template={template} device="mobile" />
    </div>
  )
}

// Example of using the SendGridProvider
export function SendEmailExample({ template, html }: { template: any; html: string }) {
  const sendEmail = async () => {
    const provider = new SendGridProvider("your-api-key")

    try {
      const result = await provider.sendEmail(html, {
        from: "sender@example.com",
        to: "recipient@example.com",
        subject: "Test Email from Email Builder",
      })

      console.log("Email sent:", result)
    } catch (error) {
      console.error("Failed to send email:", error)
    }
  }

  return (
    <div>
      <h1>Send Email Example</h1>
      <button onClick={sendEmail}>Send Test Email</button>
    </div>
  )
}
