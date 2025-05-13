/**
 * Types of elements that can be added to a template
 */
export type ElementType =
  | "header"
  | "sub-header"
  | "paragraph"
  | "button"
  | "image"
  | "divider"
  | "spacer"
  | "footer"
  | "logo"

/**
 * Base interface for template elements
 */
export interface TemplateElement {
  /**
   * Unique identifier for the element
   */
  id: string
  /**
   * Type of the element
   */
  type: ElementType
  /**
   * Content of the element (varies by type)
   */
  content: any
  /**
   * Styles for the element
   */
  styles: any
}

/**
 * Interface for a template
 */
export interface Template {
  /**
   * Unique identifier for the template
   */
  id: string
  /**
   * Name of the template
   */
  name: string
  /**
   * Elements in the template
   */
  elements: TemplateElement[]
  /**
   * Date the template was created
   */
  createdAt: string
  /**
   * Date the template was last updated
   */
  updatedAt: string
  /**
   * Optional metadata for the template
   */
  metadata?: Record<string, any>
}

/**
 * Interface for email providers
 */
export interface EmailProvider {
  /**
   * Name of the provider
   */
  name: string
  /**
   * Sends an email using the provider
   * @param html HTML content of the email
   * @param options Options for sending the email
   * @returns A promise that resolves when the email is sent
   */
  sendEmail: (html: string, options: any) => Promise<any>
}

/**
 * Options for sending an email
 */
export interface SendEmailOptions {
  /**
   * Email address of the sender
   */
  from: string
  /**
   * Email address(es) of the recipient(s)
   */
  to: string | string[]
  /**
   * Subject of the email
   */
  subject: string
  /**
   * Optional CC recipients
   */
  cc?: string | string[]
  /**
   * Optional BCC recipients
   */
  bcc?: string | string[]
  /**
   * Optional reply-to address
   */
  replyTo?: string
  /**
   * Optional attachments
   */
  attachments?: any[]
  /**
   * Optional additional headers
   */
  headers?: Record<string, string>
  /**
   * Optional additional data
   */
  [key: string]: any
}
