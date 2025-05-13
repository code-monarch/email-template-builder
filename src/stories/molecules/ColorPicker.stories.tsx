"use client"

import React, { useState } from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ColorPicker } from "../../pattern/molecules/color-picker"

const meta: Meta<typeof ColorPicker> = {
  title: "Atoms/ColorPicker",
  component: ColorPicker,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the color picker",
    },
    value: {
      control: "color",
      description: "The current color value",
    },
    onChange: { action: "changed" },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
}

export default meta
type Story = StoryObj<typeof ColorPicker>

export const Default: Story = {
  args: {
    label: "Choose a color",
    value: "#3b82f6",
  },
  render: function Render(args) {
    const [color, setColor] = useState(args.value)
    return (
      <div className="p-4">
        <ColorPicker {...args} value={color} onChange={setColor} />
        <div className="mt-4">
          <p>Selected color: {color}</p>
          <div className="w-full h-10 mt-2 rounded-md border border-gray-300" style={{ backgroundColor: color }} />
        </div>
      </div>
    )
  },
}

export const WithoutLabel: Story = {
  args: {
    value: "#ef4444",
  },
  render: function Render(args) {
    const [color, setColor] = useState(args.value)
    return <ColorPicker {...args} value={color} onChange={setColor} />
  },
}

export const MultipleColorPickers: Story = {
  render: function Render() {
    const [textColor, setTextColor] = useState("#000000")
    const [bgColor, setBgColor] = useState("#ffffff")
    const [borderColor, setBorderColor] = useState("#e5e7eb")

    return (
      <div className="space-y-6 p-4 w-80">
        <ColorPicker label="Text Color" value={textColor} onChange={setTextColor} />
        <ColorPicker label="Background Color" value={bgColor} onChange={setBgColor} />
        <ColorPicker label="Border Color" value={borderColor} onChange={setBorderColor} />

        <div
          className="mt-6 p-4 rounded-md"
          style={{
            backgroundColor: bgColor,
            color: textColor,
            border: `1px solid ${borderColor}`,
          }}
        >
          <p>Preview text with the selected colors</p>
        </div>
      </div>
    )
  },
}
