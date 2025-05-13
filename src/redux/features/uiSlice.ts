import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface UiState {
  sidebarOpen: boolean
  activeTab: "elements" | "properties" | "templates"
  isDragging: boolean
  previewMode: boolean
  showExportModal: boolean
  showSaveModal: boolean
  showLoadModal: boolean
  notifications: Array<{
    id: string
    message: string
    type: "success" | "error" | "info"
  }>
}

const initialState: UiState = {
  sidebarOpen: true,
  activeTab: "elements",
  isDragging: false,
  previewMode: false,
  showExportModal: false,
  showSaveModal: false,
  showLoadModal: false,
  notifications: [],
}

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen
    },
    setActiveTab: (state, action: PayloadAction<UiState["activeTab"]>) => {
      state.activeTab = action.payload
    },
    setIsDragging: (state, action: PayloadAction<boolean>) => {
      state.isDragging = action.payload
    },
    togglePreviewMode: (state) => {
      state.previewMode = !state.previewMode
    },
    toggleExportModal: (state) => {
      state.showExportModal = !state.showExportModal
    },
    toggleSaveModal: (state) => {
      state.showSaveModal = !state.showSaveModal
    },
    toggleLoadModal: (state) => {
      state.showLoadModal = !state.showLoadModal
    },
    addNotification: (state, action: PayloadAction<Omit<UiState["notifications"][0], "id">>) => {
      const id = Date.now().toString()
      state.notifications.push({
        id,
        ...action.payload,
      })
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((notification) => notification.id !== action.payload)
    },
  },
})

export const {
  toggleSidebar,
  setActiveTab,
  setIsDragging,
  togglePreviewMode,
  toggleExportModal,
  toggleSaveModal,
  toggleLoadModal,
  addNotification,
  removeNotification,
} = uiSlice.actions

export default uiSlice.reducer
