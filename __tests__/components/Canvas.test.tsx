import React from "react"
import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { Canvas } from "../../src/pattern/organisms/canvas"
import { selectElement } from "../../src/redux/features/templateSlice"

// Create mock store
const mockStore = configureStore([])

// Mock the useDrop hook
jest.mock("react-dnd", () => ({
  ...jest.requireActual("react-dnd"),
  useDrop: () => [{ isOver: false }, jest.fn()],
}))

describe("Canvas Component", () => {
  let store: any

  beforeEach(() => {
    store = mockStore({
      template: {
        currentTemplate: {
          elements: [
            {
              id: "element-1",
              type: "header",
              content: { text: "Test Header", level: 1 },
              styles: {},
            },
            {
              id: "element-2",
              type: "paragraph",
              content: { text: "Test Paragraph" },
              styles: {},
            },
          ],
        },
        selectedElementId: "element-1",
      },
      ui: {
        previewMode: false,
      },
    })

    // Mock dispatch
    store.dispatch = jest.fn()
  })

  it("renders all elements in the template", () => {
    render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Canvas />
        </DndProvider>
      </Provider>,
    )

    // Check if both elements are rendered
    expect(screen.getByText("Test Header")).toBeInTheDocument()
    expect(screen.getByText("Test Paragraph")).toBeInTheDocument()
  })

  it("dispatches selectElement(null) when clicking on the canvas background", () => {
    const { container } = render(
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Canvas />
        </DndProvider>
      </Provider>,
    )

    // Find the canvas background (the main div)
    const canvasBackground = container.querySelector('[role="region"]')

    // Click on the canvas background
    if (canvasBackground) {
      fireEvent.click(canvasBackground)
    }

    // Check if selectElement(null) was dispatched
    expect(store.dispatch).toHaveBeenCalledWith(selectElement(null))
  })

  it("shows empty state when there are no elements", () => {
    // Create a store with no elements
    const emptyStore = mockStore({
      template: {
        currentTemplate: {
          elements: [],
        },
        selectedElementId: null,
      },
      ui: {
        previewMode: false,
      },
    })

    emptyStore.dispatch = jest.fn()

    render(
      <Provider store={emptyStore}>
        <DndProvider backend={HTML5Backend}>
          <Canvas />
        </DndProvider>
      </Provider>,
    )

    // Check if the empty state message is displayed
    expect(screen.getByText(/Drag and drop elements here/i)).toBeInTheDocument()
  })

  it("does not show empty state in preview mode", () => {
    // Create a store with no elements and preview mode enabled
    const previewStore = mockStore({
      template: {
        currentTemplate: {
          elements: [],
        },
        selectedElementId: null,
      },
      ui: {
        previewMode: true,
      },
    })

    previewStore.dispatch = jest.fn()

    render(
      <Provider store={previewStore}>
        <DndProvider backend={HTML5Backend}>
          <Canvas />
        </DndProvider>
      </Provider>,
    )

    // Check that the empty state message is not displayed
    expect(screen.queryByText(/Drag and drop elements here/i)).not.toBeInTheDocument()
  })
})
