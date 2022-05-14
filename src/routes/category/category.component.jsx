import { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import ProductCard from '../../components/product-card/product-card.component'
import { selectCategoriesMap } from '../../store/categories/categories.selector'

import { CategoryContainer, Title } from './category.styles'

export default function Category() {
  const { category } = useParams()
  const categoriesMap = useSelector(selectCategoriesMap)
  const [products, setProducts] = useState([])

  useEffect(() => {
    setProducts(categoriesMap[category] || [])
  }, [category, categoriesMap])

  return (
    <Fragment>
      <Title>{category.toUpperCase()}</Title>
      <CategoryContainer>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </CategoryContainer>
    </Fragment>
  )
}
