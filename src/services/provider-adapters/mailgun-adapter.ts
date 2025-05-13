import type {
  EmailProviderConfig,
  SendEmailOptions,
  SendEmailResult,
  EmailRecipient,
  ProviderCapabilities,
} from "@/types/provider-adapter"
import { BaseProviderAdapter } from "./base-adapter"

/**
 * Mailgun provider adapter
 */
export class MailgunAdapter extends BaseProviderAdapter {
  /**
   * Mailgun-specific capabilities
   */
  protected defaultCapabilities: ProviderCapabilities = {
    templates: true,
    attachments: true,
    trackOpens: true,
    trackClicks: true,
    scheduling: false,
    batchSending: true,
    customHeaders: true,
    ampEmail: false,
  }

  constructor() {
    super("Mailgun")
  }

  /**
   * Validate Mailgun configuration
   */
  validateConfig(config: EmailProviderConfig): boolean {
    return !!config.apiKey && !!config.domain
  }

  /**
   * Send an email using Mailgun
   */
  async sendEmail(html: string, options: SendEmailOptions): Promise<SendEmailResult> {
    this.ensureInitialized()

    if (!this.config!.domain) {
      return this.createResult(false, {
        error: "Mailgun requires a domain to be configured",
      })
    }

    try {
      // We would use the Mailgun API
      // This is a stub implementation for demonstration
      console.log(`[${this.name}] Sending email:`)
      console.log(`Domain: ${this.config!.domain}`)
      console.log(`From: ${formatRecipient(options.from)}`)
      console.log(`To: ${formatRecipients(options.to)}`)
      console.log(`Subject: ${options.subject}`)
      console.log(`API Key: ${this.config!.apiKey.substring(0, 3)}...`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return this.createResult(true, {
        messageId: `mailgun_${Date.now()}`,
        providerResponse: {
          id: `mailgun_${Date.now()}`,
          message: "Queued. Thank you.",
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
