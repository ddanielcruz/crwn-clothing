import { Route, Routes } from 'react-router-dom'

import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'

export default function App() {
  return (
    <Routes>
      <Route element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<div />} />
      </Route>
    </Routes>
  )
}
