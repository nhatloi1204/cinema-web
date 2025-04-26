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
