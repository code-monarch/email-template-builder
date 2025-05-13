"use client"

import type React from "react"
import { useAppSelector, useAppDispatch } from "@/redux/hooks"
import { updateElement } from "@/redux/features/templateSlice"
import { Input } from "@/pattern/molecules/input"
import { Select } from "@/pattern/molecules/select"
import { ColorPicker } from "@/pattern/molecules/color-picker"

export const PropertiesPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const selectedElementId = useAppSelector((state) => state.template.selectedElementId)
  const elements = useAppSelector((state) => state.template.currentTemplate.elements)

  const selectedElement = elements.find((el) => el.id === selectedElementId)

  if (!selectedElement) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400">
        <p>Select an element to edit its properties</p>
      </div>
    )
  }

  const handleStyleChange = (key: string, value: any) => {
    dispatch(
      updateElement({
        id: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            [key]: value,
          },
        },
      }),
    )
  }

  const handleContentChange = (key: string, value: any) => {
    dispatch(
      updateElement({
        id: selectedElement.id,
        updates: {
          content: {
            ...selectedElement.content,
            [key]: value,
          },
        },
      }),
    )
  }

  const renderCommonProperties = () => (
    <>
      <h4 className="font-medium mb-2 mt-4">Spacing</h4>
      <div className="grid grid-cols-2 gap-2">
        <Input
          label="Padding"
          value={selectedElement.styles.padding}
          onChange={(e) => handleStyleChange("padding", e.target.value)}
        />
        <Input
          label="Margin"
          value={selectedElement.styles.margin}
          onChange={(e) => handleStyleChange("margin", e.target.value)}
        />
      </div>

      <h4 className="font-medium mb-2 mt-4">Colors</h4>
      <div className="grid grid-cols-2 gap-2">
        <ColorPicker
          label="Text Color"
          value={selectedElement.styles.color}
          onChange={(color) => handleStyleChange("color", color)}
        />
        <ColorPicker
          label="Background"
          value={selectedElement.styles.backgroundColor}
          onChange={(color) => handleStyleChange("backgroundColor", color)}
        />
      </div>

      <h4 className="font-medium mb-2 mt-4">Typography</h4>
      <div className="grid grid-cols-2 gap-2">
        <Select
          label="Font Family"
          value={selectedElement.styles.fontFamily || "Arial, sans-serif"}
          onChange={(value) => handleStyleChange("fontFamily", value)}
          options={[
            { value: "Arial, sans-serif", label: "Arial" },
            { value: "Helvetica, sans-serif", label: "Helvetica" },
            { value: "Georgia, serif", label: "Georgia" },
            { value: "Tahoma, sans-serif", label: "Tahoma" },
            { value: "Verdana, sans-serif", label: "Verdana" },
            { value: "Times New Roman, serif", label: "Times New Roman" },
          ]}
        />
        <Input
          label="Font Size"
          value={selectedElement.styles.fontSize}
          onChange={(e) => handleStyleChange("fontSize", e.target.value)}
        />
      </div>
    </>
  )

  const renderElementSpecificProperties = () => {
    switch (selectedElement.type) {
      case "header":
        return (
          <>
            <Input
              label="Text"
              value={selectedElement.content.text}
              onChange={(e) => handleContentChange("text", e.target.value)}
              fullWidth
            />
            <Select
              label="Header Level"
              value={selectedElement.content.level.toString()}
              onChange={(value) => handleContentChange("level", Number.parseInt(value))}
              options={[
                { value: "1", label: "H1" },
                { value: "2", label: "H2" },
                { value: "3", label: "H3" },
                { value: "4", label: "H4" },
                { value: "5", label: "H5" },
                { value: "6", label: "H6" },
              ]}
            />
          </>
        )
      case "sub-header":
        return (
          <>
            <Input
              label="Text"
              value={selectedElement.content.text}
              onChange={(e) => handleContentChange("text", e.target.value)}
              fullWidth
            />
            <Select
              label="Border Style"
              value={selectedElement.styles.borderBottom?.split(" ")[0] || "none"}
              onChange={(value) => {
                if (value === "none") {
                  handleStyleChange("borderBottom", "none")
                } else {
                  const currentBorder = selectedElement.styles.borderBottom?.split(" ") || []
                  const thickness = currentBorder[1] || "1px"
                  const color = currentBorder[2] || "#E5E7EB"
                  handleStyleChange("borderBottom", `${value} ${thickness} ${color}`)
                }
              }}
              options={[
                { value: "none", label: "None" },
                { value: "solid", label: "Solid" },
                { value: "dashed", label: "Dashed" },
                { value: "dotted", label: "Dotted" },
              ]}
            />
            <Input
              label="Font Weight"
              value={selectedElement.styles.fontWeight}
              onChange={(e) => handleStyleChange("fontWeight", e.target.value)}
            />
          </>
        )
      case "paragraph":
        return (
          <Input
            label="Text"
            value={selectedElement.content.text}
            onChange={(e) => handleContentChange("text", e.target.value)}
            fullWidth
            // rows={4}
            // as="textarea"
          />
        )
      case "button":
        return (
          <>
            <Input
              label="Text"
              value={selectedElement.content.text}
              onChange={(e) => handleContentChange("text", e.target.value)}
              fullWidth
            />
            <Input
              label="URL"
              value={selectedElement.content.url}
              onChange={(e) => handleContentChange("url", e.target.value)}
              fullWidth
            />
            <Input
              label="Border Radius"
              value={selectedElement.styles.borderRadius}
              onChange={(e) => handleStyleChange("borderRadius", e.target.value)}
            />
          </>
        )
      case "image":
        return (
          <>
            <Input
              label="Image URL"
              value={selectedElement.content.src}
              onChange={(e) => handleContentChange("src", e.target.value)}
              fullWidth
            />
            <Input
              label="Alt Text"
              value={selectedElement.content.alt}
              onChange={(e) => handleContentChange("alt", e.target.value)}
              fullWidth
            />
            <Input
              label="Width"
              value={selectedElement.styles.width}
              onChange={(e) => handleStyleChange("width", e.target.value)}
            />
          </>
        )
      case "spacer":
        return (
          <Input
            label="Height"
            value={selectedElement.content.height}
            onChange={(e) => handleContentChange("height", Number.parseInt(e.target.value))}
            type="number"
          />
        )
      default:
        return null
    }
  }

  return (
    <div>
      <h3 className="text-lg font-medium mb-4">Properties</h3>
      <div className="space-y-4">
        <div className="p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
          <h4 className="font-medium mb-2">Element Type</h4>
          <div className="text-sm capitalize">{selectedElement.type}</div>
        </div>

        {renderElementSpecificProperties()}
        {renderCommonProperties()}
      </div>
    </div>
  )
}
