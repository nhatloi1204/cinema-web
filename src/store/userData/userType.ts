// userType.ts
export interface User {
  id: string
  auth0Id: string
  email: string
  name: string | null
  avatar: string | ''
  phoneNumber: string
  role: 'Admin' | 'User'
  dob: string | null
  gender: 'Nam' | 'Nữ' | 'Khác'
}

export interface UserState {
  data: User | null
  loading: boolean
  error: string | null
}
