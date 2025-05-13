import type { Meta, StoryObj } from "@storybook/react"
import { EmailTemplate } from "../../pattern/templates/email-template"
import type { Template } from "../../types/template"

const meta: Meta<typeof EmailTemplate> = {
  title: "Components/EmailTemplate",
  component: EmailTemplate,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    template: {
      control: "object",
      description: "The template to render",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
    style: {
      control: "object",
      description: "Additional inline styles",
    },
  },
}

export default meta
type Story = StoryObj<typeof EmailTemplate>

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
      id: "image-1",
      type: "image",
      content: {
        src: "/newsletter-header.png",
        alt: "Newsletter Header Image",
      },
      styles: {
        width: "100%",
        maxWidth: "600px",
        padding: "10px 0",
        margin: "0 auto",
        display: "block",
      },
    },
    {
      id: "header-2",
      type: "header",
      content: {
        text: "Latest Articles",
        level: 2,
      },
      styles: {
        fontSize: "24px",
        fontWeight: "bold",
        color: "#333333",
        padding: "15px 20px",
        margin: "0px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "transparent",
      },
    },
    {
      id: "paragraph-2",
      type: "paragraph",
      content: {
        text: "Check out our latest articles and stay up to date with industry trends and insights.",
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
    {
      id: "divider-1",
      type: "divider",
      content: {},
      styles: {
        borderTop: "1px solid #e5e7eb",
        margin: "20px 0",
        padding: "0",
      },
    },
    {
      id: "header-3",
      type: "header",
      content: {
        text: "Stay Connected",
        level: 3,
      },
      styles: {
        fontSize: "20px",
        fontWeight: "bold",
        color: "#333333",
        padding: "15px 20px",
        margin: "0px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "transparent",
      },
    },
    {
      id: "paragraph-3",
      type: "paragraph",
      content: {
        text: "Follow us on social media to stay connected and get the latest updates.",
      },
      styles: {
        fontSize: "16px",
        color: "#666666",
        padding: "10px 20px",
        margin: "0px",
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.5",
        backgroundColor: "transparent",
        textAlign: "center",
      },
    },
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
}

export const Default: Story = {
  args: {
    template: sampleTemplate,
    className: "max-w-2xl mx-auto bg-white p-4 shadow-md rounded-md",
  },
}

export const EmptyTemplate: Story = {
  args: {
    template: {
      id: "empty-template",
      name: "Empty Template",
      elements: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    className: "max-w-2xl mx-auto bg-white p-4 shadow-md rounded-md",
  },
}

export const MinimalTemplate: Story = {
  args: {
    template: {
      id: "minimal-template",
      name: "Minimal Template",
      elements: [
        {
          id: "header-1",
          type: "header",
          content: {
            text: "Simple Email Template",
            level: 1,
          },
          styles: {
            fontSize: "28px",
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
            text: "This is a minimal email template with just a heading and a paragraph.",
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
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    className: "max-w-2xl mx-auto bg-white p-4 shadow-md rounded-md",
  },
}
