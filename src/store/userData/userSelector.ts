import { RootState } from '../store'

export const selectUser = (state: RootState) => state.user.user

export const selectUserLoading = (state: RootState) => state.user.loading
