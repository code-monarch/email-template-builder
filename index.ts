import "./assets/styles/globals.css"
// Core components
export { EmailBuilder } from "./src/pattern/templates/email-builder"
export { EmailTemplate } from "./src/pattern/templates/email-template"
export { EmailPreview } from "./src/pattern/templates/email-preview"

// Element components
export { HeaderElement } from "./src/pattern/molecules/header-element"
export { ParagraphElement } from "./src/pattern/molecules/paragraph-element"
export { ButtonElement } from "./src/pattern/molecules/button-element"
export { ImageElement } from "./src/pattern/molecules/image-element"
export { DividerElement } from "./src/pattern/molecules/divider-element"
export { SpacerElement } from "./src/pattern/molecules/spacer-element"

// Utility functions
export { generateEmailHtml, exportTemplateToJson } from "./src/services/email-export"

// Provider adapters
export { BaseProviderAdapter } from "./src/services/provider-adapters/base-adapter"
export { SendGridAdapter } from "./src/services/provider-adapters/sendgrid-adapter"
export { MailgunAdapter } from "./src/services/provider-adapters/mailgun-adapter"
export { PostmarkAdapter } from "./src/services/provider-adapters/postmark-adapter"
export { providerRegistry } from "./src/services/provider-registry"

// Email Providers
export {
  SendGridProvider,
  MailgunProvider,
  PostmarkProvider,
  MockEmailProvider
} from "./src/services/email-providers"

// Hooks
export { useEmailProviders } from "./src/hooks/use-email-providers"

// Types
export type {
  Template,
  TemplateElement,
  ElementType,
} from "./src/types/template"

export type {
  EmailProviderAdapter,
  EmailProviderConfig,
  SendEmailOptions,
  SendEmailResult,
  EmailRecipient,
  EmailAttachment,
  ProviderCapabilities,
} from "./src/types/provider-adapter"

// Redux store (for applications that want to use the built-in state management)
export { store, type RootState, type AppDispatch } from "./src/redux/store"
export {
  addElement,
  updateElement,
  removeElement,
  reorderElements,
  selectElement,
  updateTemplateName,
  saveTemplate,
  loadTemplate,
  createNewTemplate,
  importTemplate,
} from "./src/redux/features/templateSlice"
