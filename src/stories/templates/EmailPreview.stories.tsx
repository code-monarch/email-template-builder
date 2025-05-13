import type { Meta, StoryObj } from "@storybook/react"
import { EmailPreview } from "../../pattern/templates/email-preview"
import type { Template } from "../../types/template"

const meta: Meta<typeof EmailPreview> = {
  title: "Components/EmailPreview",
  component: EmailPreview,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    template: {
      control: "object",
      description: "The template to preview",
    },
    width: {
      control: "text",
      description: "Optional width for the preview container",
    },
    device: {
      control: "select",
      options: ["desktop", "tablet", "mobile"],
      description: "Optional device to simulate",
    },
  },
}

export default meta
type Story = StoryObj<typeof EmailPreview>

const sampleTemplate: Template = {
  id: "sample-template",
  name: "Sample Newsletter",
  elements: [
    {
      id: "header-1",
      type: "header",
      content: {
        text: "Welcome to our Newsletter",
        level: 1,
      },
      styles: {
        fontSize: "32px",
        fontWeight: "bold",
        color: "#333333",
        padding: "20px",
        margin: "0px",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        backgroundColor: "transparent",
      },
    },
    {
      id: "paragraph-1",
      type: "paragraph",
      content: {
        text: "Thank you for subscribing to our newsletter. We are excited to share the latest updates and news with you.",
      },
      styles: {
        fontSize: "16px",
        color: "#666666",
        padding: "10px 20px",
        margin: "0px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.5",
        backgroundColor: "transparent",
      },
    },
    {
      id: "button-1",
      type: "button",
      content: {
        text: "Read More",
        url: "https://example.com/blog",
      },
      styles: {
        backgroundColor: "#3b82f6",
        color: "#ffffff",
        padding: "12px 24px",
        borderRadius: "4px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        margin: "20px auto",
        display: "block",
        width: "fit-content",
        fontWeight: "bold",
        textDecoration: "none",
      },
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const Desktop: Story = {
  args: {
    template: sampleTemplate,
    device: "desktop",
  },
}

export const Tablet: Story = {
  args: {
    template: sampleTemplate,
    device: "tablet",
  },
}

export const Mobile: Story = {
  args: {
    template: sampleTemplate,
    device: "mobile",
  },
}

export const CustomWidth: Story = {
  args: {
    template: sampleTemplate,
    width: "400px",
  },
}
