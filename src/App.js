import useStore from './hooks/useStore'

import Header from './components/Header'
import Home from './components/Home'
import Login from './components/Login'

const App = () => {
  const token = useStore(state => state.token)

  return (
    <div className='app'>
      <div className='container'>
        <Header />

        {token ? <Home /> : <Login />}
      </div>
    </div>
  )
}

export default App
