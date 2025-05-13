import { combineReducers, Reducer } from "@reduxjs/toolkit";
// slices
import templateReducer, { TemplateState } from "./features/templateSlice"
import uiReducer, { UiState } from "./features/uiSlice"


const rootReducer = combineReducers({
    template: templateReducer as Reducer<TemplateState>,
    ui: uiReducer as Reducer<UiState>,
});

export default rootReducer;
