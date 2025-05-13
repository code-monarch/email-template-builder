"use client"

import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { HeaderElement } from "../../pattern/molecules/header-element"

const meta: Meta<typeof HeaderElement> = {
  title: "Molecules/HeaderElement",
  component: HeaderElement,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    content: {
      control: "object",
      description: "The content of the header element",
    },
    styles: {
      control: "object",
      description: "The styles to apply to the header element",
    },
    onChange: { action: "changed" },
    isEditable: {
      control: "boolean",
      description: "Whether the header is editable",
    },
  },
}

export default meta
type Story = StoryObj<typeof HeaderElement>

export const H1: Story = {
  args: {
    content: {
      text: "This is a Heading 1",
      level: 1,
    },
    styles: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#333333",
      padding: "16px",
      margin: "0px",
      fontFamily: "Arial, sans-serif",
    },
    isEditable: false,
  },
}

export const H2: Story = {
  args: {
    content: {
      text: "This is a Heading 2",
      level: 2,
    },
    styles: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333333",
      padding: "12px",
      margin: "0px",
      fontFamily: "Arial, sans-serif",
    },
    isEditable: false,
  },
}

export const H3: Story = {
  args: {
    content: {
      text: "This is a Heading 3",
      level: 3,
    },
    styles: {
      fontSize: "20px",
      fontWeight: "bold",
      color: "#333333",
      padding: "10px",
      margin: "0px",
      fontFamily: "Arial, sans-serif",
    },
    isEditable: false,
  },
}

export const Editable: Story = {
  args: {
    content: {
      text: "This is an editable heading",
      level: 2,
    },
    styles: {
      fontSize: "24px",
      fontWeight: "bold",
      color: "#333333",
      padding: "12px",
      margin: "0px",
      fontFamily: "Arial, sans-serif",
    },
    isEditable: true,
  },
}

export const CustomStyling: Story = {
  args: {
    content: {
      text: "Custom Styled Heading",
      level: 1,
    },
    styles: {
      fontSize: "36px",
      fontWeight: "bold",
      color: "#3b82f6",
      padding: "16px",
      margin: "0px",
      fontFamily: "Georgia, serif",
      textAlign: "center",
      textTransform: "uppercase",
      letterSpacing: "2px",
      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
    },
    isEditable: false,
  },
}

export const AllHeadingLevels: Story = {
  render: () => (
    <div className="space-y-4 w-96">
      <HeaderElement
        content={{ text: "Heading Level 1", level: 1 }}
        styles={{ fontSize: "32px", fontWeight: "bold", color: "#333333" }}
        onChange={() => {}}
        isEditable={false}
      />
      <HeaderElement
        content={{ text: "Heading Level 2", level: 2 }}
        styles={{ fontSize: "28px", fontWeight: "bold", color: "#333333" }}
        onChange={() => {}}
        isEditable={false}
      />
      <HeaderElement
        content={{ text: "Heading Level 3", level: 3 }}
        styles={{ fontSize: "24px", fontWeight: "bold", color: "#333333" }}
        onChange={() => {}}
        isEditable={false}
      />
      <HeaderElement
        content={{ text: "Heading Level 4", level: 4 }}
        styles={{ fontSize: "20px", fontWeight: "bold", color: "#333333" }}
        onChange={() => {}}
        isEditable={false}
      />
      <HeaderElement
        content={{ text: "Heading Level 5", level: 5 }}
        styles={{ fontSize: "16px", fontWeight: "bold", color: "#333333" }}
        onChange={() => {}}
        isEditable={false}
      />
      <HeaderElement
        content={{ text: "Heading Level 6", level: 6 }}
        styles={{ fontSize: "14px", fontWeight: "bold", color: "#333333" }}
        onChange={() => {}}
        isEditable={false}
      />
    </div>
  ),
}
