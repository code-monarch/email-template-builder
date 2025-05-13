import type { Template } from "./template"

/**
 * Configuration options for email providers
 */
export interface EmailProviderConfig {
  /**
   * API key or authentication token
   */
  apiKey: string
  /**
   * Optional domain (required for some providers)
   */
  domain?: string
  /**
   * Optional region (required for some providers)
   */
  region?: string
  /**
   * Optional endpoint URL (for custom API endpoints)
   */
  endpoint?: string
  /**
   * Any additional provider-specific options
   */
  [key: string]: any
}

/**
 * Email recipient information
 */
export interface EmailRecipient {
  email: string
  name?: string
}

/**
 * Options for sending an email
 */
export interface SendEmailOptions {
  /**
   * Email subject
   */
  subject: string
  /**
   * Sender information
   */
  from: EmailRecipient
  /**
   * Primary recipients
   */
  to: EmailRecipient | EmailRecipient[]
  /**
   * Carbon copy recipients
   */
  cc?: EmailRecipient | EmailRecipient[]
  /**
   * Blind carbon copy recipients
   */
  bcc?: EmailRecipient | EmailRecipient[]
  /**
   * Reply-to address
   */
  replyTo?: EmailRecipient
  /**
   * Optional plain text version of the email
   */
  text?: string
  /**
   * Optional attachments
   */
  attachments?: EmailAttachment[]
  /**
   * Optional custom headers
   */
  headers?: Record<string, string>
  /**
   * Optional tracking settings
   */
  tracking?: {
    /**
     * Enable open tracking
     */
    opens?: boolean
    /**
     * Enable click tracking
     */
    clicks?: boolean
  }
  /**
   * Optional template variables for template-based emails
   */
  variables?: Record<string, any>
  /**
   * Any additional provider-specific options
   */
  [key: string]: any
}

/**
 * Email attachment information
 */
export interface EmailAttachment {
  /**
   * Content of the attachment (Base64 encoded string or Buffer)
   */
  content: string | Buffer
  /**
   * Filename of the attachment
   */
  filename: string
  /**
   * MIME type of the attachment
   */
  type?: string
  /**
   * Content ID for inline attachments
   */
  cid?: string
}

/**
 * Result of sending an email
 */
export interface SendEmailResult {
  /**
   * Whether the email was sent successfully
   */
  success: boolean
  /**
   * Message ID (if available)
   */
  messageId?: string
  /**
   * Provider-specific response
   */
  providerResponse?: any
  /**
   * Error message (if any)
   */
  error?: string
  /**
   * Timestamp of when the email was sent
   */
  timestamp: string
}

/**
 * Interface for email provider adapters
 */
export interface EmailProviderAdapter {
  /**
   * Name of the provider
   */
  readonly name: string

  /**
   * Initialize the provider with configuration
   */
  initialize(config: EmailProviderConfig): void

  /**
   * Send an email with HTML content
   */
  sendEmail(html: string, options: SendEmailOptions): Promise<SendEmailResult>

  /**
   * Send an email based on a template
   */
  sendTemplateEmail(template: Template, options: SendEmailOptions): Promise<SendEmailResult>

  /**
   * Validate provider configuration
   */
  validateConfig(config: EmailProviderConfig): boolean

  /**
   * Get provider capabilities
   */
  getCapabilities(): ProviderCapabilities
}

/**
 * Provider capabilities
 */
export interface ProviderCapabilities {
  /**
   * Supports template-based emails
   */
  templates: boolean
  /**
   * Supports attachments
   */
  attachments: boolean
  /**
   * Supports tracking opens
   */
  trackOpens: boolean
  /**
   * Supports tracking clicks
   */
  trackClicks: boolean
  /**
   * Supports scheduling emails
   */
  scheduling: boolean
  /**
   * Supports batch sending
   */
  batchSending: boolean
  /**
   * Supports custom headers
   */
  customHeaders: boolean
  /**
   * Supports AMP for Email
   */
  ampEmail: boolean
  /**
   * Any additional capabilities
   */
  [key: string]: boolean
}
