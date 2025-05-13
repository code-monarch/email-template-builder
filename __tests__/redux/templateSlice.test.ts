import templateReducer, {
  addElement,
  updateElement,
  removeElement,
  reorderElements,
  selectElement,
  updateTemplateName,
  saveTemplate,
  loadTemplate,
  createNewTemplate,
  importTemplate,
  TemplateState,
} from "@/redux/features/templateSlice"
import { v4 as uuidv4 } from "uuid"
import { Template } from "@/types/template"

// Mock uuid to return predictable values
jest.mock("uuid", () => ({
  v4: jest.fn(),
}))

describe("templateSlice reducer", () => {
  const mockUuid = "123e4567-e89b-12d3-a456-426614174000"
  const mockDate = "2023-01-01T00:00:00.000Z"

  beforeEach(() => {
    // Reset mocks before each test
    jest.clearAllMocks()
      ; (uuidv4 as jest.Mock).mockReturnValue(mockUuid)
    jest.spyOn(global.Date, "now").mockImplementation(() => new Date(mockDate).getTime())
  })

  afterAll(() => {
    jest.restoreAllMocks()
  })

  it("should return the initial state", () => {
    const initialState = undefined
    const action = { type: "" }
    const result = templateReducer(initialState, action)

    expect(result).toEqual({
      currentTemplate: {
        id: expect.any(String),
        name: "Untitled Template",
        elements: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      },
      templates: [],
      selectedElementId: null,
    })
  })

  describe("addElement action", () => {
    it("should add an element to the end of the elements array", () => {
      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Test Template",
          elements: [],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [],
        selectedElementId: null,
      }

      const action = addElement({ type: "header" })
      const state = templateReducer(initialState, action)

      expect(state.currentTemplate.elements).toHaveLength(1)
      expect(state.currentTemplate.elements[0]).toEqual({
        id: mockUuid,
        type: "header",
        content: expect.objectContaining({
          text: "Header Text",
          level: 1,
        }),
        styles: expect.objectContaining({
          fontSize: "24px",
          fontWeight: "bold",
        }),
      })
      expect(state.selectedElementId).toBe(mockUuid)
      expect(state.currentTemplate.updatedAt).not.toBe(mockDate)
    })

    it("should add an element at the specified index", () => {
      const existingElement = {
        id: "existing-id",
        type: "paragraph",
        content: { text: "Existing paragraph" },
        styles: {},
      }

      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Test Template",
          elements: [existingElement],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [],
        selectedElementId: null,
      }

      const action = addElement({ type: "header", index: 0 })
      const state = templateReducer(initialState as TemplateState, action)

      expect(state.currentTemplate.elements).toHaveLength(2)
      expect(state.currentTemplate.elements[0].type).toBe("header")
      expect(state.currentTemplate.elements[1]).toBe(existingElement)
    })
  })

  describe("updateElement action", () => {
    it("should update an existing element", () => {
      const elementId = "element-1"
      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Test Template",
          elements: [
            {
              id: elementId,
              type: "header",
              content: { text: "Original Header", level: 1 },
              styles: { fontSize: "24px" },
            },
          ],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [],
        selectedElementId: null,
      }

      const updates = {
        content: { text: "Updated Header", level: 2 },
        styles: { fontSize: "32px" },
      }

      const action = updateElement({ id: elementId, updates })
      const state = templateReducer(initialState as TemplateState, action)

      expect(state.currentTemplate.elements[0]).toEqual({
        id: elementId,
        type: "header",
        content: { text: "Updated Header", level: 2 },
        styles: { fontSize: "32px" },
      })
      expect(state.currentTemplate.updatedAt).not.toBe(mockDate)
    })

    it("should not modify state if element id is not found", () => {
      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Test Template",
          elements: [
            {
              id: "element-1",
              type: "header",
              content: { text: "Original Header", level: 1 },
              styles: { fontSize: "24px" },
            },
          ],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [],
        selectedElementId: null,
      }

      const action = updateElement({ id: "non-existent-id", updates: { content: { text: "New Text" } } })
      const state = templateReducer(initialState as TemplateState, action)

      // The state should remain unchanged
      expect(state).toEqual(initialState)
    })
  })

  describe("removeElement action", () => {
    it("should remove an element by id", () => {
      const elementId = "element-to-remove"
      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Test Template",
          elements: [
            { id: "element-1", type: "header", content: {}, styles: {} },
            { id: elementId, type: "paragraph", content: {}, styles: {} },
            { id: "element-3", type: "button", content: {}, styles: {} },
          ],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [],
        selectedElementId: elementId,
      }

      const action = removeElement(elementId)
      const state = templateReducer(initialState as TemplateState, action)

      expect(state.currentTemplate.elements).toHaveLength(2)
      expect(state.currentTemplate.elements.find((el) => el.id === elementId)).toBeUndefined()
      expect(state.selectedElementId).toBeNull()
      expect(state.currentTemplate.updatedAt).not.toBe(mockDate)
    })

    it("should not change selectedElementId if removed element was not selected", () => {
      const elementId = "element-to-remove"
      const selectedId = "element-1"
      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Test Template",
          elements: [
            { id: selectedId, type: "header", content: {}, styles: {} },
            { id: elementId, type: "paragraph", content: {}, styles: {} },
          ],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [],
        selectedElementId: selectedId,
      }

      const action = removeElement(elementId)
      const state = templateReducer(initialState as TemplateState, action)

      expect(state.currentTemplate.elements).toHaveLength(1)
      expect(state.selectedElementId).toBe(selectedId)
    })
  })

  describe("reorderElements action", () => {
    it("should reorder elements based on source and destination indices", () => {
      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Test Template",
          elements: [
            { id: "element-1", type: "header", content: {}, styles: {} },
            { id: "element-2", type: "paragraph", content: {}, styles: {} },
            { id: "element-3", type: "button", content: {}, styles: {} },
          ],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [],
        selectedElementId: null,
      }

      // Move the first element to the last position
      const action = reorderElements({ sourceIndex: 0, destinationIndex: 2 })
      const state = templateReducer(initialState as TemplateState, action)

      expect(state.currentTemplate.elements[0].id).toBe("element-2")
      expect(state.currentTemplate.elements[1].id).toBe("element-3")
      expect(state.currentTemplate.elements[2].id).toBe("element-1")
      expect(state.currentTemplate.updatedAt).not.toBe(mockDate)
    })
  })

  describe("selectElement action", () => {
    it("should update the selectedElementId", () => {
      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Test Template",
          elements: [{ id: "element-1", type: "header", content: {}, styles: {} }],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [],
        selectedElementId: null,
      }

      const action = selectElement("element-1")
      const state = templateReducer(initialState as TemplateState, action)

      expect(state.selectedElementId).toBe("element-1")
    })

    it("should set selectedElementId to null when passed null", () => {
      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Test Template",
          elements: [{ id: "element-1", type: "header", content: {}, styles: {} }],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [],
        selectedElementId: "element-1",
      }

      const action = selectElement(null)
      const state = templateReducer(initialState as TemplateState, action)

      expect(state.selectedElementId).toBeNull()
    })
  })

  describe("updateTemplateName action", () => {
    it("should update the template name", () => {
      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Old Name",
          elements: [],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [],
        selectedElementId: null,
      }

      const action = updateTemplateName("New Template Name")
      const state = templateReducer(initialState, action)

      expect(state.currentTemplate.name).toBe("New Template Name")
      expect(state.currentTemplate.updatedAt).not.toBe(mockDate)
    })
  })

  describe("saveTemplate action", () => {
    it("should add the current template to templates array if it does not exist", () => {
      const currentTemplate = {
        id: "1",
        name: "Test Template",
        elements: [],
        createdAt: mockDate,
        updatedAt: mockDate,
      }

      const initialState = {
        currentTemplate,
        templates: [],
        selectedElementId: null,
      }

      const action = saveTemplate()
      const state = templateReducer(initialState, action)

      expect(state.templates).toHaveLength(1)
      expect(state.templates[0]).toEqual(currentTemplate)
    })

    it("should update an existing template in the templates array", () => {
      const templateId = "1"
      const updatedTemplate = {
        id: templateId,
        name: "Updated Template",
        elements: [{ id: "element-1", type: "header", content: {}, styles: {} }],
        createdAt: mockDate,
        updatedAt: "2023-01-02T00:00:00.000Z",
      }

      const initialState = {
        currentTemplate: updatedTemplate,
        templates: [
          {
            id: templateId,
            name: "Original Template",
            elements: [],
            createdAt: mockDate,
            updatedAt: mockDate,
          },
        ],
        selectedElementId: null,
      }

      const action = saveTemplate()
      const state = templateReducer(initialState as TemplateState, action)

      expect(state.templates).toHaveLength(1)
      expect(state.templates[0]).toEqual(updatedTemplate)
    })
  })

  describe("loadTemplate action", () => {
    it("should load a template from the templates array", () => {
      const templateToLoad = {
        id: "2",
        name: "Template to Load",
        elements: [{ id: "element-1", type: "header", content: {}, styles: {} }],
        createdAt: mockDate,
        updatedAt: mockDate,
      }

      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Current Template",
          elements: [],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [
          {
            id: "1",
            name: "Template 1",
            elements: [],
            createdAt: mockDate,
            updatedAt: mockDate,
          },
          templateToLoad,
        ],
        selectedElementId: "some-id",
      }

      const action = loadTemplate("2")
      const state = templateReducer(initialState as TemplateState, action)

      expect(state.currentTemplate).toEqual(templateToLoad)
      expect(state.selectedElementId).toBeNull()
    })

    it("should not change state if template id is not found", () => {
      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Current Template",
          elements: [],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [],
        selectedElementId: null,
      }

      const action = loadTemplate("non-existent-id")
      const state = templateReducer(initialState, action)

      expect(state).toEqual(initialState)
    })
  })

  describe("createNewTemplate action", () => {
    it("should create a new empty template", () => {
      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Current Template",
          elements: [{ id: "element-1", type: "header", content: {}, styles: {} }],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [],
        selectedElementId: "element-1",
      }

      const action = createNewTemplate()
      const state = templateReducer(initialState as TemplateState, action)

      expect(state.currentTemplate).toEqual({
        id: mockUuid,
        name: "Untitled Template",
        elements: [],
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
      })
      expect(state.selectedElementId).toBeNull()
    })
  })

  describe("importTemplate action", () => {
    it("should import a template with a new ID", () => {
      const templateToImport = {
        id: "import-id",
        name: "Imported Template",
        elements: [{ id: "element-1", type: "header", content: {}, styles: {} }],
        createdAt: "2022-01-01T00:00:00.000Z",
        updatedAt: "2022-01-01T00:00:00.000Z",
      }

      const initialState = {
        currentTemplate: {
          id: "1",
          name: "Current Template",
          elements: [],
          createdAt: mockDate,
          updatedAt: mockDate,
        },
        templates: [],
        selectedElementId: "some-id",
      }

      const action = importTemplate(templateToImport as Template)
      const state = templateReducer(initialState, action)

      expect(state.currentTemplate).toEqual({
        ...templateToImport,
        id: mockUuid,
        updatedAt: expect.any(String),
      })
      expect(state.selectedElementId).toBeNull()
    })
  })
})
