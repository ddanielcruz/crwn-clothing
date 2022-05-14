import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Route } from 'react-router-dom'
import { Routes } from 'react-router-dom'
import { setCategories } from '../../store/categories/categories.action'
import { getCategoriesAndDocuments } from '../../utils/firebase/firebase.utils'

import CategoriesPreview from '../categories-preview/categories-preview.component'
import Category from '../category/category.component'

export default function Shop() {
  const dispatch = useDispatch()

  useEffect(() => {
    getCategoriesAndDocuments().then((categories) => dispatch(setCategories(categories)))
  }, [dispatch])

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  )
}
