import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ScheduleState, ScheduleGeneratorConfig } from './scheduleType'
import { generatePreview, saveGenerated } from './scheduleThunk'

const initialState: ScheduleState = {
  config: null,
  preview: [],
  previewLoading: false,
  previewError: null,
  saveLoading: false,
  saveError: null,
  savedShowtimes: null,
  successMessage: null,
}

const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setConfig: (state, action: PayloadAction<ScheduleGeneratorConfig>) => {
      state.config = action.payload
    },
    removeShowtimeFromPreview: (state, action: PayloadAction<number>) => {
      state.preview.splice(action.payload, 1)
    },
    clearPreview: state => {
      state.preview = []
      state.previewError = null
      state.successMessage = null
    },
    clearError: state => {
      state.previewError = null
      state.saveError = null
    },
    clearSuccess: state => {
      state.successMessage = null
    },
  },
  extraReducers: builder => {
    builder
      // Generate Preview
      .addCase(generatePreview.pending, state => {
        state.previewLoading = true
        state.previewError = null
      })
      .addCase(generatePreview.fulfilled, (state, action) => {
        state.preview = action.payload.preview
        state.previewLoading = false
      })
      .addCase(generatePreview.rejected, (state, action) => {
        state.previewLoading = false
        state.previewError = action.payload || 'Tạo preview thất bại'
      })
      // Save Generated
      .addCase(saveGenerated.pending, state => {
        state.saveLoading = true
        state.saveError = null
      })
      .addCase(saveGenerated.fulfilled, (state, action) => {
        state.savedShowtimes = action.payload.showtimes
        state.saveLoading = false
        state.successMessage = `Tạo thành công ${action.payload.totalSaved} suất chiếu`
        state.preview = []
      })
      .addCase(saveGenerated.rejected, (state, action) => {
        state.saveLoading = false
        state.saveError = action.payload || 'Lưu suất chiếu thất bại'
      })
  },
})

export const {
  setConfig,
  removeShowtimeFromPreview,
  clearPreview,
  clearError,
  clearSuccess,
} = scheduleSlice.actions
export default scheduleSlice.reducer
