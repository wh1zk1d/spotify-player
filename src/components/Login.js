import useStore from '../hooks/useStore'
import { useEffect } from 'react'

const {
  REACT_APP_CLIENT_ID: clientId,
  REACT_APP_AUTHORIZE_URL: authorizeUrl,
  REACT_APP_REDIRECT_URL: redirectUrl,
} = process.env

const scopes = ['user-read-currently-playing', 'user-read-playback-state']

const Login = () => {
  const setToken = useStore(state => state.setToken)

  useEffect(() => {
    const hash = window.location.hash
      .substring(1)
      .split('&')
      .reduce(function (initial, item) {
        if (item) {
          const parts = item.split('=')
          initial[parts[0]] = decodeURIComponent(parts[1])
        }
        return initial
      }, {})

    setToken(hash.access_token)
  }, [setToken])

  const handleLogin = () => {
    window.location = `${authorizeUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scopes.join(
      '%20'
    )}&response_type=token&show_dialog=true`
  }

  return (
    <div className='ta-center'>
      <button onClick={handleLogin}>Login to Spotify</button>
    </div>
  )
}

export default Login
