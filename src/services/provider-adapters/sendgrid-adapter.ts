import type {
  EmailProviderConfig,
  SendEmailOptions,
  SendEmailResult,
  EmailRecipient,
  ProviderCapabilities,
} from "@/types/provider-adapter"
import { BaseProviderAdapter } from "./base-adapter"

/**
 * SendGrid provider adapter
 */
export class SendGridAdapter extends BaseProviderAdapter {
  /**
   * SendGrid-specific capabilities
   */
  protected defaultCapabilities: ProviderCapabilities = {
    templates: true,
    attachments: true,
    trackOpens: true,
    trackClicks: true,
    scheduling: true,
    batchSending: true,
    customHeaders: true,
    ampEmail: true,
  }

  constructor() {
    super("SendGrid")
  }

  /**
   * Validate SendGrid configuration
   */
  validateConfig(config: EmailProviderConfig): boolean {
    return !!config.apiKey
  }

  /**
   * Send an email using SendGrid
   */
  async sendEmail(html: string, options: SendEmailOptions): Promise<SendEmailResult> {
    this.ensureInitialized()

    try {
      // We would use the SendGrid API
      // This is a stub implementation for demonstration
      console.log(`[${this.name}] Sending email:`)
      console.log(`From: ${formatRecipient(options.from)}`)
      console.log(`To: ${formatRecipients(options.to)}`)
      console.log(`Subject: ${options.subject}`)
      console.log(`API Key: ${this.config!.apiKey.substring(0, 3)}...`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return this.createResult(true, {
        messageId: `sendgrid_${Date.now()}`,
        providerResponse: {
          id: `sendgrid_${Date.now()}`,
          status: "sent",
        },
      })
    } catch (error) {
      console.error(`[${this.name}] Error sending email:`, error)
      return this.createResult(false, {
        error: error instanceof Error ? error.message : String(error),
      })
    }
  }
}

/**
 * Format a single recipient for logging
 */
function formatRecipient(recipient: EmailRecipient): string {
  return recipient.name ? `${recipient.name} <${recipient.email}>` : recipient.email
}

/**
 * Format multiple recipients for logging
 */
function formatRecipients(recipients: EmailRecipient | EmailRecipient[]): string {
  if (Array.isArray(recipients)) {
    return recipients.map(formatRecipient).join(", ")
  }
  return formatRecipient(recipients)
}
