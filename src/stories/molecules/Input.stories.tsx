import React from "react";
import type { Meta, StoryObj } from "@storybook/react"
import { Input } from "../../pattern/molecules/input"

const meta: Meta<typeof Input> = {
  title: "Atoms/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    label: {
      control: "text",
      description: "Label text for the input",
    },
    error: {
      control: "text",
      description: "Error message to display",
    },
    fullWidth: {
      control: "boolean",
      description: "Whether the input should take up the full width of its container",
    },
    helperText: {
      control: "text",
      description: "Helper text to display below the input",
    },
    required: {
      control: "boolean",
      description: "Whether the input is required",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text for the input",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "tel", "url"],
      description: "The type of input",
    },
    onChange: { action: "changed" },
  },
}

export default meta
type Story = StoryObj<typeof Input>

export const Default: Story = {
  args: {
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
  },
}

export const WithHelperText: Story = {
  args: {
    label: "Password",
    helperText: "Password must be at least 8 characters",
    type: "password",
    placeholder: "Enter your password",
  },
}

export const WithError: Story = {
  args: {
    label: "Email",
    error: "Please enter a valid email address",
    type: "email",
    placeholder: "Enter your email",
    value: "invalid-email",
  },
}

export const Required: Story = {
  args: {
    label: "Username",
    required: true,
    placeholder: "Enter your username",
  },
}

export const FullWidth: Story = {
  args: {
    label: "Full Name",
    fullWidth: true,
    placeholder: "Enter your full name",
  },
}

export const Disabled: Story = {
  args: {
    label: "Disabled Input",
    disabled: true,
    placeholder: "This input is disabled",
    value: "Cannot edit this value",
  },
}

export const NumberInput: Story = {
  args: {
    label: "Age",
    type: "number",
    placeholder: "Enter your age",
    min: 18,
    max: 100,
  },
}

export const FormGroup: Story = {
  render: () => (
    <div className="space-y-4 w-80">
      <Input label="First Name" placeholder="Enter your first name" required />
      <Input label="Last Name" placeholder="Enter your last name" required />
      <Input
        label="Email"
        type="email"
        placeholder="Enter your email"
        required
        helperText="We'll never share your email with anyone else."
      />
    </div>
  ),
}
