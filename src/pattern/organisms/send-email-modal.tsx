"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useEmailProviders } from "@/hooks/use-email-providers"
import { useAppSelector } from "@/redux/hooks"
import { generateEmailHtml } from "@/services/email-export"
import type { SendEmailOptions, SendEmailResult, EmailRecipient } from "@/types/provider-adapter"
import { Settings, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react"
import { Button } from "../molecules/button"
import { Input } from "../molecules/input"
import { Modal } from "../molecules/modal"

interface SendEmailModalProps {
  isOpen: boolean
  onClose: () => void
  onConfigureProvider: () => void
}

// Define a type for our internal state to ensure we're always working with single recipients
interface EmailFormOptions extends Omit<Partial<SendEmailOptions>, "from" | "to"> {
  from: EmailRecipient
  to: EmailRecipient
}

export const SendEmailModal: React.FC<SendEmailModalProps> = ({ isOpen, onClose, onConfigureProvider }) => {
  const { activeProvider, isLoading, sendEmail } = useEmailProviders()
  const currentTemplate = useAppSelector((state) => state.template.currentTemplate)

  const [emailOptions, setEmailOptions] = useState<EmailFormOptions>({
    subject: `Test Email: ${currentTemplate.name}`,
    from: { email: "", name: "" },
    to: { email: "", name: "" },
  })

  const [result, setResult] = useState<SendEmailResult | null>(null)
  const firstInputRef = useRef<HTMLInputElement>(null)

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => {
        firstInputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Update subject when template name changes
  useEffect(() => {
    setEmailOptions((prev) => ({
      ...prev,
      subject: `Test Email: ${currentTemplate.name}`,
    }))
  }, [currentTemplate.name])

  // Handle input changes
  const handleChange = (field: string, value: string) => {
    if (field === "fromEmail" || field === "fromName") {
      setEmailOptions((prev) => ({
        ...prev,
        from: {
          ...prev.from,
          email: field === "fromEmail" ? value : prev.from.email,
          name: field === "fromName" ? value : prev.from.name,
        },
      }))
    } else if (field === "toEmail" || field === "toName") {
      setEmailOptions((prev) => ({
        ...prev,
        to: {
          ...prev.to,
          email: field === "toEmail" ? value : prev.to.email,
          name: field === "toName" ? value : prev.to.name,
        },
      }))
    } else {
      setEmailOptions((prev) => ({ ...prev, [field]: value }))
    }
  }

  // Send test email
  const handleSend = async () => {
    if (!activeProvider) {
      return
    }

    const html = generateEmailHtml(currentTemplate)

    // Create the options object with properly typed recipients
    const options: SendEmailOptions = {
      subject: emailOptions.subject || `Test Email: ${currentTemplate.name}`,
      from: emailOptions.from,
      to: emailOptions.to,
    }

    setResult(null)
    const sendResult = await sendEmail(html, options)
    setResult(sendResult)
  }

  // Check if form is valid
  const isFormValid = () => {
    return (
      !!emailOptions.subject &&
      !!emailOptions.from.email &&
      !!emailOptions.to.email &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOptions.from.email) &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailOptions.to.email)
    )
  }

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey && isFormValid() && !isLoading) {
      handleSend()
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Send Test Email"
      size="md"
      description="Send a test email to verify your template"
    >
      <div className="space-y-6" onKeyDown={handleKeyDown}>
        {!activeProvider ? (
          <div className="text-center py-4">
            <p className="text-muted-foreground mb-4">
              No email provider configured. Please configure a provider to send test emails.
            </p>
            <Button onClick={onConfigureProvider} className="flex items-center" aria-label="Configure email provider">
              <Settings size={16} className="mr-2" />
              Configure Provider
            </Button>
          </div>
        ) : (
          <>
            <div>
              <p className="text-sm text-muted-foreground mb-4">
                Send a test email using {activeProvider.name} to verify your template.
              </p>

              <div className="space-y-4">
                <Input
                  label="Subject"
                  value={emailOptions.subject || ""}
                  onChange={(e) => handleChange("subject", e.target.value)}
                  fullWidth
                  placeholder="Test Email"
                  required
                  ref={firstInputRef}
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="From Email"
                    value={emailOptions.from.email}
                    onChange={(e) => handleChange("fromEmail", e.target.value)}
                    fullWidth
                    placeholder="sender@example.com"
                    type="email"
                    required
                    aria-describedby="from-email-description"
                  />
                  <Input
                    label="From Name (Optional)"
                    value={emailOptions.from.name || ""}
                    onChange={(e) => handleChange("fromName", e.target.value)}
                    fullWidth
                    placeholder="Sender Name"
                  />
                </div>
                <p id="from-email-description" className="text-xs text-muted-foreground -mt-2">
                  Must be a valid email address that you can send from
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    label="To Email"
                    value={emailOptions.to.email}
                    onChange={(e) => handleChange("toEmail", e.target.value)}
                    fullWidth
                    placeholder="recipient@example.com"
                    type="email"
                    required
                  />
                  <Input
                    label="To Name (Optional)"
                    value={emailOptions.to.name || ""}
                    onChange={(e) => handleChange("toName", e.target.value)}
                    fullWidth
                    placeholder="Recipient Name"
                  />
                </div>
              </div>
            </div>

            {result && (
              <div
                className={`p-4 rounded-md ${result.success
                    ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                    : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                role="status"
                aria-live="polite"
              >
                <div className="flex items-start">
                  <div className="flex-shrink-0 mt-0.5">
                    {result.success ? (
                      <CheckCircle size={18} className="text-green-500 dark:text-green-400" aria-hidden="true" />
                    ) : (
                      <AlertCircle size={18} className="text-red-500 dark:text-red-400" aria-hidden="true" />
                    )}
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium">
                      {result.success ? "Email sent successfully" : "Failed to send email"}
                    </h3>
                    {result.messageId && <p className="mt-1 text-xs">Message ID: {result.messageId}</p>}
                    {result.error && <p className="mt-1 text-xs">{result.error}</p>}
                  </div>
                </div>
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 pt-2">
              <Button variant="outline" onClick={onClose}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={handleSend}
                disabled={isLoading || !isFormValid()}
                className="flex items-center"
                aria-busy={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={16} className="mr-2" />
                    <span>Send Test Email</span>
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
