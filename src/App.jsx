import './App.css'
import Logon from './features/Logon'
import TodosPage from './features/Todos/TodosPage'
import Header from './shared/Header'
//! Use useAuth() to access isAuthenticated
import useAuth from './hooks/useAuth'

function App() {
  //! Remove authentication useState calls
  // const [email, setEmail] = useState('')
  // const [token, setToken] = useState('')

  const { isAuthenticated } = useAuth()

  //! Remove all authentication props from child components
  return (
    <>
      <Header />
      {isAuthenticated ? <TodosPage /> : <Logon />}
    </>
  )
}

export default App
