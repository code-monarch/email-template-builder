import type {
  EmailProviderAdapter,
  EmailProviderConfig,
  SendEmailOptions,
  SendEmailResult,
  ProviderCapabilities,
} from "@/types/provider-adapter"
import type { Template } from "@/types/template"
import { generateEmailHtml } from "@/services/email-export"

/**
 * Base class for email provider adapters
 */
export abstract class BaseProviderAdapter implements EmailProviderAdapter {
  /**
   * Name of the provider
   */
  readonly name: string

  /**
   * Provider configuration
   */
  protected config: EmailProviderConfig | null = null

  /**
   * Default capabilities
   */
  protected defaultCapabilities: ProviderCapabilities = {
    templates: false,
    attachments: true,
    trackOpens: false,
    trackClicks: false,
    scheduling: false,
    batchSending: false,
    customHeaders: true,
    ampEmail: false,
  }

  constructor(name: string) {
    this.name = name
  }

  /**
   * Initialize the provider with configuration
   */
  initialize(config: EmailProviderConfig): void {
    if (!this.validateConfig(config)) {
      throw new Error(`Invalid configuration for ${this.name} provider`)
    }
    this.config = config
  }

  /**
   * Send an email with HTML content
   */
  abstract sendEmail(html: string, options: SendEmailOptions): Promise<SendEmailResult>

  /**
   * Send an email based on a template
   */
  async sendTemplateEmail(template: Template, options: SendEmailOptions): Promise<SendEmailResult> {
    const html = generateEmailHtml(template)
    return this.sendEmail(html, options)
  }

  /**
   * Validate provider configuration
   */
  validateConfig(config: EmailProviderConfig): boolean {
    return !!config.apiKey
  }

  /**
   * Get provider capabilities
   */
  getCapabilities(): ProviderCapabilities {
    return this.defaultCapabilities
  }

  /**
   * Check if the adapter is initialized
   */
  protected ensureInitialized(): void {
    if (!this.config) {
      throw new Error(`${this.name} provider is not initialized. Call initialize() first.`)
    }
  }

  /**
   * Create a standardized result object
   */
  protected createResult(success: boolean, data: Partial<SendEmailResult> = {}): SendEmailResult {
    return {
      success,
      timestamp: new Date().toISOString(),
      ...data,
    }
  }
}
