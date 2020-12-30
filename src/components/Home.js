import { useEffect, useState } from 'react'
import useStore from '../hooks/useStore'
import axios from 'axios'
import styled from 'styled-components'

const Dashboard = styled.div`
  text-align: center;
`

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8rem;
`

const Avatar = styled.div`
  width: 6rem;
  height: 6rem;
  border-radius: 50%;
  background-size: cover;
  background-image: url(${props => props.url});
  margin-right: 2rem;
`

const Player = styled.div`
  .headline {
    margin-bottom: 4rem;
  }

  img {
    margin-bottom: 2rem;
  }
`

const Home = () => {
  const token = useStore(state => state.token)
  const setToken = useStore(state => state.setToken)

  const [err, setErr] = useState(false)
  const [user, setUser] = useState(null)
  const [playing, setPlaying] = useState(null)

  const handleSignout = () => {
    setToken(null)
    window.location.hash = ''
  }

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const { data } = await axios('https://api.spotify.com/v1/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        setUser({ name: data.display_name, img: data.images[0].url })
      } catch (error) {
        console.error(error)
        setErr(error.message)
      }
    }

    const getCurrentlyPlaying = async () => {
      try {
        const { data } = await axios('https://api.spotify.com/v1/me/player', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })

        console.log(data)

        setPlaying({
          device: data.device.name,
          isPlaying: data.is_playing,
          album: data.item.album.name,
          artist: data.item.album.artists[0].name,
          cover: data.item.album.images[1].url,
          title: data.item.name,
        })
      } catch (error) {
        console.error(error)
        setErr(error.message)
      }
    }

    getUserInfo()
    getCurrentlyPlaying()
  }, [token])

  if (err) {
    return (
      <Dashboard>
        <strong>{err}</strong>
      </Dashboard>
    )
  }

  if (!user || !playing) {
    return <Dashboard>Loading...</Dashboard>
  }

  return (
    <Dashboard>
      <UserInfo>
        <Avatar url={user.img} />
        <h3>Hi, {user.name}!</h3>
      </UserInfo>

      {playing.isPlaying ? (
        <Player>
          <h3 className='headline'>Currently playing at "{playing.device}":</h3>

          <img src={playing.cover} alt={playing.album} width='300' height='300' />
          <h3 className='track'>
            <strong>{playing.title}</strong>
          </h3>
          <p>
            {playing.artist} – {playing.album}
          </p>
        </Player>
      ) : (
        <h2>Not playing anything rn</h2>
      )}

      <div className='logout'>
        <button onClick={handleSignout}>Sign out</button>
      </div>
    </Dashboard>
  )
}

export default Home
