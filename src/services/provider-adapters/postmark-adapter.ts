import type {
  EmailProviderConfig,
  SendEmailOptions,
  SendEmailResult,
  EmailRecipient,
  ProviderCapabilities,
} from "@/types/provider-adapter"
import { BaseProviderAdapter } from "./base-adapter"

/**
 * Postmark provider adapter
 */
export class PostmarkAdapter extends BaseProviderAdapter {
  /**
   * Postmark-specific capabilities
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
    super("Postmark")
  }

  /**
   * Validate Postmark configuration
   */
  validateConfig(config: EmailProviderConfig): boolean {
    return !!config.apiKey
  }

  /**
   * Send an email using Postmark
   */
  async sendEmail(html: string, options: SendEmailOptions): Promise<SendEmailResult> {
    this.ensureInitialized()

    try {
      //  we would use the Postmark API
      // This is a stub implementation for demonstration
      console.log(`[${this.name}] Sending email:`)
      console.log(`From: ${formatRecipient(options.from)}`)
      console.log(`To: ${formatRecipients(options.to)}`)
      console.log(`Subject: ${options.subject}`)
      console.log(`Server Token: ${this.config!.apiKey.substring(0, 3)}...`)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return this.createResult(true, {
        messageId: `postmark_${Date.now()}`,
        providerResponse: {
          To: formatRecipients(options.to),
          SubmittedAt: new Date().toISOString(),
          MessageID: `postmark_${Date.now()}`,
          ErrorCode: 0,
          Message: "OK",
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
