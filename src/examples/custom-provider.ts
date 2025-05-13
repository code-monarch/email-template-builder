import { BaseProviderAdapter } from "../services/provider-adapters/base-adapter"
import type {
  EmailProviderConfig,
  SendEmailOptions,
  SendEmailResult,
  ProviderCapabilities,
} from "../types/provider-adapter"
import { providerRegistry } from "../services/provider-registry"

/**
 * Example of a custom provider adapter
 */
export class CustomProviderAdapter extends BaseProviderAdapter {
  /**
   * Custom provider capabilities
   */
  protected defaultCapabilities: ProviderCapabilities = {
    templates: true,
    attachments: true,
    trackOpens: true,
    trackClicks: true,
    scheduling: true,
    batchSending: true,
    customHeaders: true,
    ampEmail: false,
    // Custom capability
    webhooks: true,
  }

  constructor() {
    super("CustomProvider")
  }

  /**
   * Validate custom provider configuration
   */
  validateConfig(config: EmailProviderConfig): boolean {
    return !!config.apiKey && !!config.endpoint
  }

  /**
   * Send an email using the custom provider
   */
  async sendEmail(html: string, options: SendEmailOptions): Promise<SendEmailResult> {
    this.ensureInitialized()

    try {
      // Custom implementation for sending emails
      console.log(`[${this.name}] Sending email via custom provider:`)
      console.log(`Endpoint: ${this.config!.endpoint}`)
      console.log(`API Key: ${this.config!.apiKey.substring(0, 3)}...`)

      // Example of a custom API call
      const response = await fetch(this.config!.endpoint!, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config!.apiKey}`
        },
        body: JSON.stringify({
          from: options.from,
          to: options.to,
          subject: options.subject,
          html: html
        })
      });

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      return this.createResult(true, {
        messageId: `custom_${Date.now()}`,
        providerResponse: {
          id: `custom_${Date.now()}`,
          status: "delivered",
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
 * Example of registering a custom provider
 */
export function registerCustomProvider() {
  // Create an instance of the custom provider
  const customProvider = new CustomProviderAdapter()

  // Register it with the provider registry
  providerRegistry.registerProvider(customProvider)

  // Optionally set it as the active provider
  providerRegistry.setActiveProvider(customProvider, {
    apiKey: "your-api-key",
    endpoint: "https://api.custom-provider.com/v1/send",
  })

  return customProvider
}

/**
 * Example of using the custom provider
 */
export async function sendEmailWithCustomProvider(html: string, options: SendEmailOptions) {
  // Get the custom provider from the registry
  const customProvider = providerRegistry.getProvider("CustomProvider")

  if (!customProvider) {
    throw new Error("Custom provider not registered")
  }

  // Send the email
  return await customProvider.sendEmail(html, options)
}
