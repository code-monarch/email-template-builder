import type { EmailProviderAdapter, EmailProviderConfig } from "@/types/provider-adapter"
import { SendGridAdapter } from "./provider-adapters/sendgrid-adapter"
import { MailgunAdapter } from "./provider-adapters/mailgun-adapter"
import { PostmarkAdapter } from "./provider-adapters/postmark-adapter"

/**
 * Registry for email provider adapters
 */
export class ProviderRegistry {
  private static instance: ProviderRegistry
  private providers: Map<string, EmailProviderAdapter> = new Map()
  private activeProvider: EmailProviderAdapter | null = null

  /**
   * Get the singleton instance of the registry
   */
  public static getInstance(): ProviderRegistry {
    if (!ProviderRegistry.instance) {
      ProviderRegistry.instance = new ProviderRegistry()
    }
    return ProviderRegistry.instance
  }

  /**
   * Private constructor to enforce singleton pattern
   */
  private constructor() {
    // Register built-in providers
    this.registerProvider(new SendGridAdapter())
    this.registerProvider(new MailgunAdapter())
    this.registerProvider(new PostmarkAdapter())
  }

  /**
   * Register a provider adapter
   */
  public registerProvider(provider: EmailProviderAdapter): void {
    this.providers.set(provider.name.toLowerCase(), provider)
  }

  /**
   * Get a provider by name
   */
  public getProvider(name: string): EmailProviderAdapter | undefined {
    return this.providers.get(name.toLowerCase())
  }

  /**
   * Get all registered providers
   */
  public getAllProviders(): EmailProviderAdapter[] {
    return Array.from(this.providers.values())
  }

  /**
   * Set the active provider
   */
  public setActiveProvider(nameOrProvider: string | EmailProviderAdapter, config?: EmailProviderConfig): void {
    let provider: EmailProviderAdapter | undefined

    if (typeof nameOrProvider === "string") {
      provider = this.getProvider(nameOrProvider)
      if (!provider) {
        throw new Error(`Provider "${nameOrProvider}" not found`)
      }
    } else {
      provider = nameOrProvider
      this.registerProvider(provider)
    }

    if (config) {
      provider.initialize(config)
    }

    this.activeProvider = provider
  }

  /**
   * Get the active provider
   */
  public getActiveProvider(): EmailProviderAdapter | null {
    return this.activeProvider
  }

  /**
   * Check if a provider is registered
   */
  public hasProvider(name: string): boolean {
    return this.providers.has(name.toLowerCase())
  }

  /**
   * Remove a provider from the registry
   */
  public removeProvider(name: string): boolean {
    const result = this.providers.delete(name.toLowerCase())

    // If we removed the active provider, set it to null
    if (result && this.activeProvider && this.activeProvider.name.toLowerCase() === name.toLowerCase()) {
      this.activeProvider = null
    }

    return result
  }
}

// Export a singleton instance
export const providerRegistry = ProviderRegistry.getInstance()
