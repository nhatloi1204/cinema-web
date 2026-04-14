import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { ShopItem } from './shopType'

export const fetchShopItems = createAsyncThunk<ShopItem[]>(
  'shop/fetchShopItems',
  async () => {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL}/public/shop-items`,
    )
    return response.data
  },
)

export const createShopItem = createAsyncThunk<
  ShopItem,
  FormData,
  { rejectValue: string }
>('shop/createShopItem', async (formData, { rejectWithValue }) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_URL}/admin/shop-items`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return response.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Create failed')
  }
})

export const updateShopItem = createAsyncThunk<
  ShopItem,
  { id: string; data: FormData },
  { rejectValue: string }
>('shop/updateShopItem', async ({ id, data }, { rejectWithValue }) => {
  try {
    const response = await axios.put(
      `${import.meta.env.VITE_API_URL}/admin/shop-items/${id}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    )
    return response.data
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Update failed')
  }
})

export const deleteShopItem = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>('shop/deleteShopItem', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_URL}/admin/shop-items/${id}`)
    return id
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || 'Delete failed')
  }
})
