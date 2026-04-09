import { RootState } from '../rootReducer'

export const selectScheduleConfig = (state: RootState) => state.schedule.config
export const selectPreview = (state: RootState) => state.schedule.preview
export const selectPreviewLoading = (state: RootState) =>
  state.schedule.previewLoading
export const selectPreviewError = (state: RootState) =>
  state.schedule.previewError
export const selectSaveLoading = (state: RootState) =>
  state.schedule.saveLoading
export const selectSaveError = (state: RootState) => state.schedule.saveError
export const selectSuccessMessage = (state: RootState) =>
  state.schedule.successMessage
