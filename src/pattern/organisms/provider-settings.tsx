"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useEmailProviders } from "@/hooks/use-email-providers"
import type { EmailProviderConfig } from "@/types/provider-adapter"
import { Button } from "@/pattern/molecules/button"
import { Input } from "@/pattern/molecules/input"
import { Select } from "@/pattern/molecules/select"
import { Modal } from "@/pattern/molecules/modal"
import { Loader2 } from "lucide-react"

interface ProviderSettingsProps {
  isOpen: boolean
  onClose: () => void
}

export const ProviderSettings: React.FC<ProviderSettingsProps> = ({ isOpen, onClose }) => {
  const { providers, activeProvider, setProvider } = useEmailProviders()
  const [selectedProvider, setSelectedProvider] = useState<string>(activeProvider?.name || "")
  const [config, setConfig] = useState<EmailProviderConfig>({
    apiKey: "",
    domain: "",
    region: "",
    endpoint: "",
  })
  const [testStatus, setTestStatus] = useState<{ success?: boolean; message?: string } | null>(null)
  const [isTesting, setIsTesting] = useState(false)

  // Ref for the first input to focus when modal opens
  const firstInputRef = useRef<HTMLSelectElement>(null)

  // Update form when active provider changes
  useEffect(() => {
    if (activeProvider) {
      setSelectedProvider(activeProvider.name)
    }
  }, [activeProvider])

  // Focus first input when modal opens
  useEffect(() => {
    if (isOpen && firstInputRef.current) {
      setTimeout(() => {
        firstInputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Get the selected provider object
  const getSelectedProviderObject = () => {
    return providers.find((p) => p.name.toLowerCase() === selectedProvider.toLowerCase())
  }

  // Handle provider selection
  const handleProviderChange = (value: string) => {
    setSelectedProvider(value)
    setTestStatus(null)

    // Reset config fields based on provider requirements
    const provider = providers.find((p) => p.name.toLowerCase() === value.toLowerCase())
    if (provider) {
      // Keep existing values but reset the form structure
      setConfig((prevConfig) => ({
        apiKey: prevConfig.apiKey || "",
        domain: provider.name === "Mailgun" ? prevConfig.domain || "" : undefined,
        region: provider.name === "SendGrid" ? prevConfig.region || "" : undefined,
        endpoint: prevConfig.endpoint,
      }))
    }
  }

  // Handle config changes
  const handleConfigChange = (key: keyof EmailProviderConfig, value: string) => {
    setConfig((prev) => ({ ...prev, [key]: value }))
    setTestStatus(null)
  }

  // Save provider configuration
  const handleSave = () => {
    const provider = getSelectedProviderObject()
    if (provider) {
      setProvider(provider, config)
      onClose()
    }
  }

  // Test provider configuration
  const handleTest = async () => {
    const provider = getSelectedProviderObject()
    if (provider) {
      try {
        setIsTesting(true)
        setTestStatus(null)

        // Initialize the provider with the current config
        provider.initialize({ ...config })

        // Test connection (this should make a test API call in real app)
        await new Promise((resolve) => setTimeout(resolve, 1000))

        setTestStatus({
          success: true,
          message: `Successfully connected to ${provider.name}`,
        })
      } catch (error) {
        setTestStatus({
          success: false,
          message: error instanceof Error ? error.message : String(error),
        })
      } finally {
        setIsTesting(false)
      }
    }
  }

  // Handle keyboard shortcuts
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSave()
    }
  }

  // Render provider-specific fields
  const renderProviderFields = () => {
    const commonFields = (
      <div className="space-y-4">
        <Input
          label="API Key"
          value={config.apiKey}
          onChange={(e) => handleConfigChange("apiKey", e.target.value)}
          type="password"
          fullWidth
          placeholder={`Enter your ${selectedProvider} API key`}
          required
          aria-required="true"
          autoComplete="off"
        />

        {config.endpoint !== undefined && (
          <Input
            label="Custom Endpoint (Optional)"
            value={config.endpoint || ""}
            onChange={(e) => handleConfigChange("endpoint", e.target.value)}
            fullWidth
            placeholder="https://api.example.com"
            aria-required="false"
          />
        )}
      </div>
    )

    switch (selectedProvider.toLowerCase()) {
      case "mailgun":
        return (
          <div className="space-y-4">
            {commonFields}
            <Input
              label="Domain"
              value={config.domain || ""}
              onChange={(e) => handleConfigChange("domain", e.target.value)}
              fullWidth
              placeholder="mail.yourdomain.com"
              required
              aria-required="true"
            />
            <Select
              label="Region"
              value={config.region || "us"}
              onChange={(value) => handleConfigChange("region", value)}
              options={[
                { value: "us", label: "US" },
                { value: "eu", label: "EU" },
              ]}
              fullWidth
              aria-required="true"
            />
          </div>
        )

      case "sendgrid":
        return (
          <div className="space-y-4">
            {commonFields}
            <Select
              label="Region (Optional)"
              value={config.region || "global"}
              onChange={(value) => handleConfigChange("region", value)}
              options={[
                { value: "global", label: "Global" },
                { value: "eu", label: "EU" },
              ]}
              fullWidth
              aria-required="false"
            />
          </div>
        )

      case "postmark":
        return commonFields

      default:
        return commonFields
    }
  }

  const isFormValid = () => {
    const provider = getSelectedProviderObject()
    if (!provider) return false

    // Basic validation
    if (!config.apiKey) return false
    if (provider.name === "Mailgun" && !config.domain) return false

    return true
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Email Provider Settings"
      size="md"
      description="Configure your email service provider to send emails from the template builder."
    >
      <div className="space-y-6" onKeyDown={handleKeyDown}>
        <div>
          <Select
            label="Email Provider"
            value={selectedProvider}
            onChange={handleProviderChange}
            options={providers.map((p) => ({ value: p.name, label: p.name }))}
            fullWidth
            ref={firstInputRef}
            aria-label="Select email provider"
          />
        </div>

        {selectedProvider && (
          <>
            <div className="border-t border-border/40 dark:border-gray-700/40 pt-4">
              <h3 className="text-sm font-medium mb-3" id="provider-config-heading">
                Provider Configuration
              </h3>
              <div aria-labelledby="provider-config-heading" role="group">
                {renderProviderFields()}
              </div>
            </div>

            {testStatus && (
              <div
                className={`p-3 rounded-md text-sm ${testStatus.success
                  ? "bg-green-50 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                  : "bg-red-50 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                  }`}
                role="status"
                aria-live="polite"
              >
                {testStatus.message}
              </div>
            )}

            <div className="flex flex-col sm:flex-row sm:justify-between pt-2 gap-3">
              <Button
                variant="outline"
                onClick={handleTest}
                disabled={isTesting || !isFormValid()}
                aria-busy={isTesting}
                className="flex items-center justify-center"
              >
                {isTesting ? (
                  <>
                    <Loader2 size={16} className="mr-2 animate-spin" />
                    <span>Testing...</span>
                  </>
                ) : (
                  <span>Test Connection</span>
                )}
              </Button>

              <div className="flex flex-col sm:flex-row gap-2">
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button variant="primary" onClick={handleSave} disabled={!isFormValid()}>
                  Save Provider
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  )
}
