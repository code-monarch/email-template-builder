"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Input } from "@/pattern/molecules/input"
import { Button } from "@/pattern/molecules/button"
import { Facebook, Twitter, Instagram, Linkedin, Youtube, Github, Globe, Mail, Plus, Trash2, X } from "lucide-react"

interface SocialLink {
  platform: string
  url: string
}

interface FooterElementProps {
  content: {
    companyName: string
    tagline: string
    socialLinks: SocialLink[]
  }
  styles: any
  onChange: (content: any) => void
  isEditable: boolean
}

// Map of social media platforms to their icons
const socialIcons: Record<string, React.ReactNode> = {
  facebook: <Facebook size={18} />,
  twitter: <Twitter size={18} />,
  instagram: <Instagram size={18} />,
  linkedin: <Linkedin size={18} />,
  youtube: <Youtube size={18} />,
  github: <Github size={18} />,
  website: <Globe size={18} />,
  email: <Mail size={18} />,
  x: <X size={18} />,
}

// Available social media platforms
const availablePlatforms = [
  { value: "facebook", label: "Facebook" },
  { value: "twitter", label: "Twitter" },
  { value: "instagram", label: "Instagram" },
  { value: "linkedin", label: "LinkedIn" },
  { value: "youtube", label: "YouTube" },
  { value: "github", label: "GitHub" },
  { value: "website", label: "Website" },
  { value: "email", label: "Email" },
  { value: "x", label: "X (Twitter)" },
]

export const FooterElement: React.FC<FooterElementProps> = ({ content, styles, onChange, isEditable }) => {
  const [companyName, setCompanyName] = useState(content.companyName)
  const [tagline, setTagline] = useState(content.tagline)
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(content.socialLinks || [])
  const [newPlatform, setNewPlatform] = useState("")
  const [newUrl, setNewUrl] = useState("")

  // Update local state when props change
  useEffect(() => {
    setCompanyName(content.companyName)
    setTagline(content.tagline)
    setSocialLinks(content.socialLinks || [])
  }, [content])

  const handleCompanyNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value
    setCompanyName(newName)
    onChange({ ...content, companyName: newName })
  }

  const handleTaglineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTagline = e.target.value
    setTagline(newTagline)
    onChange({ ...content, tagline: newTagline })
  }

  const handleAddSocialLink = () => {
    if (!newPlatform || !newUrl) return

    const updatedLinks = [...socialLinks, { platform: newPlatform, url: newUrl }]
    setSocialLinks(updatedLinks)
    onChange({ ...content, socialLinks: updatedLinks })

    // Reset form
    setNewPlatform("")
    setNewUrl("")
  }

  const handleRemoveSocialLink = (index: number) => {
    const updatedLinks = socialLinks.filter((_, i) => i !== index)
    setSocialLinks(updatedLinks)
    onChange({ ...content, socialLinks: updatedLinks })
  }

  const handleUpdateSocialLink = (index: number, field: "platform" | "url", value: string) => {
    const updatedLinks = [...socialLinks]
    updatedLinks[index] = { ...updatedLinks[index], [field]: value }
    setSocialLinks(updatedLinks)
    onChange({ ...content, socialLinks: updatedLinks })
  }

  // Render the footer in view mode
  if (!isEditable) {
    return (
      <footer style={styles} className="text-center">
        <div className="mb-4">
          <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: "0 0 8px 0" }}>{companyName}</h3>
          {tagline && <p style={{ margin: "0" }}>{tagline}</p>}
        </div>

        {socialLinks.length > 0 && (
          <div className="flex justify-center space-x-4 mb-4">
            {socialLinks.map((link, index) => (
              <a
                key={index}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: styles.color || "inherit",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: "32px",
                  height: "32px",
                  borderRadius: "50%",
                  background: "rgba(0,0,0,0.05)",
                }}
                aria-label={`${link.platform} link`}
              >
                {socialIcons[link.platform] || <Globe size={18} />}
              </a>
            ))}
          </div>
        )}

        <div style={{ fontSize: "12px", opacity: 0.8 }}>
          © {new Date().getFullYear()} {companyName}. All rights reserved.
        </div>
      </footer>
    )
  }

  // Render the editable footer
  return (
    <div className="space-y-4">
      <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md">
        <div className="space-y-4">
          <Input
            label="Company Name"
            value={companyName}
            onChange={handleCompanyNameChange}
            placeholder="Your Company Name"
            fullWidth
          />

          <Input
            label="Tagline (Optional)"
            value={tagline}
            onChange={handleTaglineChange}
            placeholder="Your company tagline or slogan"
            fullWidth
          />

          <div className="mt-4">
            <h4 className="text-sm font-medium mb-2">Social Media Links</h4>

            {socialLinks.length > 0 && (
              <div className="space-y-3 mb-4">
                {socialLinks.map((link, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-full">
                      {socialIcons[link.platform] || <Globe size={18} />}
                    </div>

                    <select
                      value={link.platform}
                      onChange={(e) => handleUpdateSocialLink(index, "platform", e.target.value)}
                      className="flex-shrink-0 w-24 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    >
                      {availablePlatforms.map((platform) => (
                        <option key={platform.value} value={platform.value}>
                          {platform.label}
                        </option>
                      ))}
                    </select>

                    <input
                      type="text"
                      value={link.url}
                      onChange={(e) => handleUpdateSocialLink(index, "url", e.target.value)}
                      placeholder="https://..."
                      className="flex-1 h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />

                    <button
                      onClick={() => handleRemoveSocialLink(index)}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                      aria-label="Remove social link"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-end gap-2 mt-2">
              <div className="flex-shrink-0 w-32">
                <label className="block text-xs font-medium mb-1">Platform</label>
                <select
                  value={newPlatform}
                  onChange={(e) => setNewPlatform(e.target.value)}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option value="">Select...</option>
                  {availablePlatforms.map((platform) => (
                    <option key={platform.value} value={platform.value}>
                      {platform.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex-1">
                <label className="block text-xs font-medium mb-1">URL</label>
                <input
                  type="text"
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="https://..."
                  className="w-full h-9 rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                />
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={handleAddSocialLink}
                disabled={!newPlatform || !newUrl}
                className="flex-shrink-0 h-9"
              >
                <Plus size={16} className="mr-1" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md">
        <h4 className="text-sm font-medium mb-2">Preview</h4>
        <div className="border border-gray-200 dark:border-gray-700 rounded-md p-4 bg-white dark:bg-gray-900">
          <footer style={styles} className="text-center">
            <div className="mb-4">
              <h3 style={{ fontSize: "18px", fontWeight: "bold", margin: "0 0 8px 0" }}>{companyName}</h3>
              {tagline && <p style={{ margin: "0" }}>{tagline}</p>}
            </div>

            {socialLinks.length > 0 && (
              <div className="flex justify-center space-x-4 mb-4">
                {socialLinks.map((link, index) => (
                  <span
                    key={index}
                    style={{
                      color: styles.color || "inherit",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "32px",
                      height: "32px",
                      borderRadius: "50%",
                      background: "rgba(0,0,0,0.05)",
                    }}
                  >
                    {socialIcons[link.platform] || <Globe size={18} />}
                  </span>
                ))}
              </div>
            )}

            <div style={{ fontSize: "12px", opacity: 0.8 }}>
              © {new Date().getFullYear()} {companyName}. All rights reserved.
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}
