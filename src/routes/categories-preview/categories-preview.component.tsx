import { Fragment } from 'react'
import { useSelector } from 'react-redux'

import CategoryPreview from '../../components/category-preview/category-preview.component'
import Spinner from '../../components/spinner/spinner.component'
import {
  selectCategoriesIsLoading,
  selectCategoriesMap
} from '../../store/categories/categories.selector'

export default function CategoriesPreview() {
  const categoriesMap = useSelector(selectCategoriesMap)
  const isLoading = useSelector(selectCategoriesIsLoading)

  return (
    <Fragment>
      {isLoading ? (
        <Spinner />
      ) : (
        Object.keys(categoriesMap).map((title) => (
          <CategoryPreview key={title} title={title} products={categoriesMap[title]} />
        ))
      )}
    </Fragment>
  )
}
