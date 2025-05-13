import React from "react"

import { render, screen, fireEvent } from "@testing-library/react"
import { Provider } from "react-redux"
import configureStore from "redux-mock-store"
import { ElementRenderer } from "../../src/pattern/organisms/element-renderer"
import { selectElement } from "../../src/redux/features/templateSlice"

// Create mock store
const mockStore = configureStore([])

describe("ElementRenderer Component", () => {
  let store: any

  const mockElement = {
    id: "test-element-id",
    type: "header",
    content: {
      text: "Test Header",
      level: 1,
    },
    styles: {
      fontSize: "24px",
      fontWeight: "bold",
      padding: "16px",
      margin: "0px",
      color: "#000000",
      backgroundColor: "transparent",
      fontFamily: "Arial, sans-serif",
    },
  }

  beforeEach(() => {
    store = mockStore({
      template: {
        currentTemplate: {
          elements: [mockElement],
        },
        selectedElementId: null,
      },
    })

    // Mock dispatch
    store.dispatch = jest.fn()
  })

  it("renders the correct element type", () => {
    render(
      <Provider store={store}>
        <ElementRenderer element={mockElement} index={0} isSelected={false} isPreview={false} totalElements={1} />
      </Provider>,
    )

    // Check if the header is rendered with the correct text
    expect(screen.getByText("Test Header")).toBeInTheDocument()
  })

  it("dispatches selectElement action when clicked", () => {
    render(
      <Provider store={store}>
        <ElementRenderer element={mockElement} index={0} isSelected={false} isPreview={false} totalElements={1} />
      </Provider>,
    )

    // Click on the element
    fireEvent.click(screen.getByText("Test Header"))

    // Check if the selectElement action was dispatched with the correct ID
    expect(store.dispatch).toHaveBeenCalledWith(selectElement(mockElement.id))
  })

  it("does not dispatch selectElement in preview mode", () => {
    render(
      <Provider store={store}>
        <ElementRenderer element={mockElement} index={0} isSelected={false} isPreview={true} totalElements={1} />
      </Provider>,
    )

    // Click on the element in preview mode
    fireEvent.click(screen.getByText("Test Header"))

    // Check that no action was dispatched
    expect(store.dispatch).not.toHaveBeenCalled()
  })

  it("shows element toolbar when selected", () => {
    render(
      <Provider store={store}>
        <ElementRenderer element={mockElement} index={0} isSelected={true} isPreview={false} totalElements={1} />
      </Provider>,
    )

    // Check if the toolbar is rendered
    expect(screen.getByLabelText("Delete")).toBeInTheDocument()
  })

  it("does not show element toolbar in preview mode", () => {
    render(
      <Provider store={store}>
        <ElementRenderer element={mockElement} index={0} isSelected={true} isPreview={true} totalElements={1} />
      </Provider>,
    )

    // Check that the toolbar is not rendered
    expect(screen.queryByLabelText("Delete")).not.toBeInTheDocument()
  })

  it("applies selected styles when element is selected", () => {
    const { container } = render(
      <Provider store={store}>
        <ElementRenderer element={mockElement} index={0} isSelected={true} isPreview={false} totalElements={1} />
      </Provider>,
    )

    // Check if the selected class is applied
    const elementDiv = container.firstChild as HTMLElement
    expect(elementDiv).toHaveClass("outline")
    expect(elementDiv).toHaveClass("outline-2")
    expect(elementDiv).toHaveClass("outline-blue-500")
  })
})
