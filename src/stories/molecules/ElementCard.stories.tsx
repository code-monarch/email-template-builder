import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ElementCard } from "../../pattern/molecules/element-card"
import { Type, AlignLeft, Square, ImageIcon, Minus, ArrowDown } from "lucide-react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

const meta: Meta<typeof ElementCard> = {
  title: "Molecules/ElementCard",
  component: ElementCard,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <DndProvider backend={HTML5Backend}>
        <div className="p-4">
          <Story />
        </div>
      </DndProvider>
    ),
  ],
  argTypes: {
    type: {
      control: "select",
      options: ["header", "paragraph", "button", "image", "divider", "spacer"],
      description: "The type of element",
    },
    icon: {
      control: "object",
      description: "The icon to display",
    },
    label: {
      control: "text",
      description: "The label text",
    },
    onClick: { action: "clicked" },
  },
}

export default meta
type Story = StoryObj<typeof ElementCard>

export const Header: Story = {
  args: {
    type: "header",
    icon: <Type size={18} />,
    label: "Header",
  },
}

export const Paragraph: Story = {
  args: {
    type: "paragraph",
    icon: <AlignLeft size={18} />,
    label: "Paragraph",
  },
}

export const Button: Story = {
  args: {
    type: "button",
    icon: <Square size={18} />,
    label: "Button",
  },
}

export const Image: Story = {
  args: {
    type: "image",
    icon: <ImageIcon size={18} />,
    label: "Image",
  },
}

export const Divider: Story = {
  args: {
    type: "divider",
    icon: <Minus size={18} />,
    label: "Divider",
  },
}

export const Spacer: Story = {
  args: {
    type: "spacer",
    icon: <ArrowDown size={18} />,
    label: "Spacer",
  },
}

export const AllElements: Story = {
  render: () => (
    <div className="grid grid-cols-2 gap-4 w-96">
      <ElementCard type="header" icon={<Type size={18} />} label="Header" />
      <ElementCard type="paragraph" icon={<AlignLeft size={18} />} label="Paragraph" />
      <ElementCard type="button" icon={<Square size={18} />} label="Button" />
      <ElementCard type="image" icon={<ImageIcon size={18} />} label="Image" />
      <ElementCard type="divider" icon={<Minus size={18} />} label="Divider" />
      <ElementCard type="spacer" icon={<ArrowDown size={18} />} label="Spacer" />
    </div>
  ),
}
