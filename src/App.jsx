import './App.css'
import Logon from './features/Logon'
import TodosPage from './features/Todos/TodosPage'
import Header from './shared/Header'
import { Outlet, Route, Routes } from 'react-router'

function App() {
  return (
    <>
      <Header />
      {/* //! https://reactrouter.com/start/declarative/routing#layout-routes */}
      <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/todos" element={<TodosPage />}></Route>
        </Route>
      </Routes>
    </>
  )
}

export default App
