import React from "react"
import type { Meta, StoryObj } from "@storybook/react"
import { ElementsPanel } from "../../pattern/organisms/elements-panel"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import templateReducer from "../../redux/features/templateSlice"
import uiReducer from "../../redux/features/uiSlice"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"

// Create a mock store
const createMockStore = () => {
  return configureStore({
    reducer: {
      template: templateReducer,
      ui: uiReducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  })
}

const meta: Meta<typeof ElementsPanel> = {
  title: "Organisms/ElementsPanel",
  component: ElementsPanel,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => {
      const store = createMockStore()
      return (
        <Provider store={store}>
          <DndProvider backend={HTML5Backend}>
            <div className="w-80 border border-gray-200 rounded-md p-4 bg-background">
              <Story />
            </div>
          </DndProvider>
        </Provider>
      )
    },
  ],
}

export default meta
type Story = StoryObj<typeof ElementsPanel>

export const Default: Story = {}
