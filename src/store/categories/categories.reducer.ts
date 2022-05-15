import { AnyAction } from 'redux'

import {
  fetchCategoriesFailed,
  fetchCategoriesSuccess,
  fetchCategoriesStart
} from './categories.action'
import { Category } from './categories.types'

export type CategoriesState = {
  readonly categories: Category[]
  readonly isLoading: boolean
  readonly error: Error | null
}

const INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null
}

export const categoriesReducer = (state = INITIAL_STATE, action: AnyAction): CategoriesState => {
  if (fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true }
  } else if (fetchCategoriesSuccess.match(action)) {
    return { ...state, categories: action.payload, isLoading: false }
  } else if (fetchCategoriesFailed.match(action)) {
    return { ...state, error: action.payload, isLoading: false }
  }

  return state
}
