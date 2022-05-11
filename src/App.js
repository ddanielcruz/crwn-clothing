import { Route, Routes } from 'react-router-dom'

import Authentication from './routes/authentication/authentication.component'
import Home from './routes/home/home.component'
import Navigation from './routes/navigation/navigation.component'

export default function App() {
  return (
    <Routes>
      <Route element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path="shop" element={<div />} />
        <Route path="auth" element={<Authentication />} />
      </Route>
    </Routes>
  )
}
