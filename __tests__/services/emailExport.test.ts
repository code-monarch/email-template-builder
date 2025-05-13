import { generateEmailHtml, exportTemplateToJson } from "../../src/services/email-export"
import type { Template } from "../../src/types/template"

describe("Email Export Service", () => {
  const mockTemplate: Template = {
    id: "template-1",
    name: "Test Template",
    elements: [
      {
        id: "header-1",
        type: "header",
        content: {
          text: "Welcome to our newsletter",
          level: 1,
        },
        styles: {
          fontSize: "32px",
          fontWeight: "bold",
          color: "#333333",
          padding: "20px",
          margin: "0px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "transparent",
        },
      },
      {
        id: "paragraph-1",
        type: "paragraph",
        content: {
          text: "This is a test paragraph with some content.",
        },
        styles: {
          fontSize: "16px",
          color: "#666666",
          padding: "10px 20px",
          margin: "0px",
          fontFamily: "Arial, sans-serif",
          backgroundColor: "transparent",
        },
      },
      {
        id: "button-1",
        type: "button",
        content: {
          text: "Click Me",
          url: "https://example.com",
        },
        styles: {
          backgroundColor: "#3b82f6",
          color: "#ffffff",
          padding: "12px 24px",
          borderRadius: "4px",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
          margin: "20px 0px",
        },
      },
    ],
    createdAt: "2023-01-01T00:00:00.000Z",
    updatedAt: "2023-01-01T00:00:00.000Z",
  }

  describe("generateEmailHtml", () => {
    it("should generate valid HTML from a template", () => {
      const html = generateEmailHtml(mockTemplate)

      // Check if the HTML is a string
      expect(typeof html).toBe("string")

      // Check if the HTML contains the DOCTYPE declaration
      expect(html).toMatch(/<!DOCTYPE html>/)

      // Check if the template name is in the title
      expect(html).toMatch(/<title>Test Template<\/title>/)

      // Check if all elements are included in the HTML
      expect(html).toMatch(/Welcome to our newsletter/)
      expect(html).toMatch(/This is a test paragraph with some content./)
      expect(html).toMatch(/Click Me/)

      // Check if styles are applied correctly
      expect(html).toMatch(/font-size: 32px/)
      expect(html).toMatch(/color: #666666/)
      expect(html).toMatch(/background-color: #3b82f6/)

      // Check if the button has the correct URL
      expect(html).toMatch(/href="https:\/\/example.com"/)
    })

    it("should handle an empty template", () => {
      const emptyTemplate: Template = {
        id: "empty-template",
        name: "Empty Template",
        elements: [],
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
      }

      const html = generateEmailHtml(emptyTemplate)

      // Check if the HTML is a string
      expect(typeof html).toBe("string")

      // Check if the HTML contains the DOCTYPE declaration
      expect(html).toMatch(/<!DOCTYPE html>/)

      // Check if the template name is in the title
      expect(html).toMatch(/<title>Empty Template<\/title>/)

      // Check if the content div is empty
      expect(html).toMatch(/<div class="content">\s*<\/div>/)
    })

    it("should apply responsive styles by default", () => {
      const html = generateEmailHtml(mockTemplate)

      // Check if the HTML includes media queries for responsiveness
      expect(html).toMatch(/@media only screen and $$max-width: 480px$$/)
    })

    it("should include custom CSS when provided", () => {
      const customCss = ".custom-class { color: red; }"
      const html = generateEmailHtml(mockTemplate)

      // Check if the custom CSS is included
      expect(html).toMatch(/.custom-class { color: red; }/)
    })
  })

  describe("exportTemplateToJson", () => {
    it("should export a template to JSON format", () => {
      const json = exportTemplateToJson(mockTemplate)

      // Check if the result is a string
      expect(typeof json).toBe("string")

      // Parse the JSON and check if it matches the original template
      const parsedTemplate = JSON.parse(json)
      expect(parsedTemplate).toEqual(mockTemplate)
    })

    it("should handle an empty template", () => {
      const emptyTemplate: Template = {
        id: "empty-template",
        name: "Empty Template",
        elements: [],
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-01T00:00:00.000Z",
      }

      const json = exportTemplateToJson(emptyTemplate)

      // Check if the result is a string
      expect(typeof json).toBe("string")

      // Parse the JSON and check if it matches the original template
      const parsedTemplate = JSON.parse(json)
      expect(parsedTemplate).toEqual(emptyTemplate)
    })
  })
})
