import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'

import { fetchCategoriesAsync } from '../../store/categories/categories.action'
import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'

export default function Shop() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategoriesAsync())
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}
