import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { Button } from "../../components/ui/button"
import { Save, Send, Download } from "lucide-react"

const meta: Meta<typeof Button> = {
  title: "Atoms/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "outline", "ghost", "link", "danger"],
      description: "The visual style of the button",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "The size of the button",
    },
    children: {
      control: "text",
      description: "The content of the button",
    },
    onClick: { action: "clicked" },
  },
}

export default meta
type Story = StoryObj<typeof Button>

export const Primary: Story = {
  args: {
    variant: "default",
    size: "lg",
    children: "Primary Button",
  },
}

export const Secondary: Story = {
  args: {
    variant: "secondary",
    size: "sm",
    children: "Secondary Button",
  },
}

export const Outline: Story = {
  args: {
    variant: "outline",
    size: "lg",
    children: "Outline Button",
  },
}

export const Ghost: Story = {
  args: {
    variant: "ghost",
    size: "default",
    children: "Ghost Button",
  },
}

export const Danger: Story = {
  args: {
    variant: "destructive",
    size: "lg",
    children: "Danger Button",
  },
}

export const Small: Story = {
  args: {
    variant: "default",
    size: "sm",
    children: "Small Button",
  },
}

export const Large: Story = {
  args: {
    variant: "default",
    size: "lg",
    children: "Large Button",
  },
}

export const WithIcon: Story = {
  args: {
    variant: "default",
    size: "lg",
    children: (
      <>
        <Save className="mr-2 h-4 w-4" />
        Save
      </>
    ),
  },
}

export const IconVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button variant="default" size="lg">
        <Save className="mr-2 h-4 w-4" />
        Save
      </Button>
      <Button variant="secondary" size="sm">
        <Download className="mr-2 h-4 w-4" />
        Download
      </Button>
      <Button variant="outline" size="lg">
        <Send className="mr-2 h-4 w-4" />
        Send
      </Button>
    </div>
  ),
}

export const SizeVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-4">
      <Button variant="default" size="sm">
        Small
      </Button>
      <Button variant="destructive" size="default">
        Medium
      </Button>
      <Button variant="secondary" size="lg">
        Large
      </Button>
    </div>
  ),
}

export const Disabled: Story = {
  args: {
    variant: "default",
    size: "default",
    children: "Disabled Button",
    disabled: true,
  },
}
