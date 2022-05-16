import { createSelector } from 'reselect'
import { RootState } from '../store'

import { CategoriesState } from './categories.reducer'
import { CategoryMap } from './categories.types'

const selectCategoriesReducer = (state: RootState): CategoriesState => state.categories

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector([selectCategories], (categories) =>
  categories.reduce<CategoryMap>((map, category) => {
    const { title, items } = category
    return { ...map, [title.toLowerCase()]: items }
  }, {})
)

export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)
