"use client"

import { useState, useEffect } from "react"
import type {
  EmailProviderAdapter,
  EmailProviderConfig,
  SendEmailOptions,
  SendEmailResult,
} from "@/types/provider-adapter"
import type { Template } from "@/types/template"
import { providerRegistry } from "@/services/provider-registry"

/**
 * Hook for working with email providers
 */
export function useEmailProviders() {
  const [providers, setProviders] = useState<EmailProviderAdapter[]>([])
  const [activeProvider, setActiveProvider] = useState<EmailProviderAdapter | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Load providers on mount
  useEffect(() => {
    setProviders(providerRegistry.getAllProviders())
    setActiveProvider(providerRegistry.getActiveProvider())
  }, [])

  /**
   * Set the active provider
   */
  const setProvider = (nameOrProvider: string | EmailProviderAdapter, config?: EmailProviderConfig) => {
    try {
      providerRegistry.setActiveProvider(nameOrProvider, config)
      setActiveProvider(providerRegistry.getActiveProvider())
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err))
    }
  }

  /**
   * Send an email using the active provider
   */
  const sendEmail = async (html: string, options: SendEmailOptions): Promise<SendEmailResult> => {
    if (!activeProvider) {
      return {
        success: false,
        error: "No active provider set",
        timestamp: new Date().toISOString(),
      }
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await activeProvider.sendEmail(html, options)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString(),
      }
    } finally {
      setIsLoading(false)
    }
  }

  /**
   * Send an email using a template
   */
  const sendTemplateEmail = async (template: Template, options: SendEmailOptions): Promise<SendEmailResult> => {
    if (!activeProvider) {
      return {
        success: false,
        error: "No active provider set",
        timestamp: new Date().toISOString(),
      }
    }

    setIsLoading(true)
    setError(null)

    try {
      const result = await activeProvider.sendTemplateEmail(template, options)
      return result
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : String(err)
      setError(errorMessage)
      return {
        success: false,
        error: errorMessage,
        timestamp: new Date().toISOString(),
      }
    } finally {
      setIsLoading(false)
    }
  }

  return {
    providers,
    activeProvider,
    isLoading,
    error,
    setProvider,
    sendEmail,
    sendTemplateEmail,
  }
}
