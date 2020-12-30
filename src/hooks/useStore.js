import create from 'zustand'

const useStore = create(set => ({
  token: '',
  setToken: token => set(state => ({ token: token })),
}))

export default useStore
