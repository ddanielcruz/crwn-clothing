import { createSelector } from 'reselect'

const selectCategoriesReducer = (state) => state.categories

export const selectCategories = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector([selectCategories], (categories) =>
  categories.reduce((map, category) => {
    const { title, items } = category
    return { ...map, [title.toLowerCase()]: items }
  }, {})
)
