'use client'
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
} from 'react'
import { LayoutProps } from '../Layout/Layout'
import { AsteroidData, ResponseData } from '@/shared/interfaces/interfaces'

type ContextProps = {
  cartItems: AsteroidData[]
  setCartItems?: Dispatch<SetStateAction<AsteroidData[]>>

  asteroidData: AsteroidData[]
  setAsteroidData: Dispatch<SetStateAction<AsteroidData[]>>

  cartItemId: string[]
  setCartItemId?: Dispatch<SetStateAction<string>>

  distanceOption: string

  setDistanceOption: Dispatch<SetStateAction<string>>
  addToCart: (productId: string) => void
}

const GlobalContext = createContext<ContextProps>({
  cartItems: [],
  setCartItems: (): AsteroidData[] => [],

  asteroidData: [],
  setAsteroidData: (): AsteroidData[] => [],

  cartItemId: [],
  setCartItemId: (): string => '',

  distanceOption: '',

  setDistanceOption: (): string => '',
  addToCart: (productId: string) => productId,
})

export const GlobalContextProvider = ({ children }: LayoutProps) => {
  const [distanceOption, setDistanceOption] = useState('distancesInKm')
  const [cartItems, setCartItems] = useState<AsteroidData[]>([])
  const [cartItemId, setCartItemId] = useState<string[]>([])
  const [asteroidData, setAsteroidData] = useState<AsteroidData[]>([])

  const addToCart = (productId: string) => {
    if (!cartItemId.includes(productId))
      setCartItemId([...cartItemId, productId])
  }

  useEffect(() => {
    const filtered = asteroidData?.filter((asteroid: AsteroidData) => {
      return cartItemId.includes(asteroid.id)
    })
    setCartItems(filtered)
  }, [asteroidData, cartItemId])

  return (
    <GlobalContext.Provider
      value={{
        asteroidData,
        setAsteroidData,
        distanceOption,
        setDistanceOption,
        addToCart,
        cartItemId,
        cartItems,
      }}
    >
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => useContext(GlobalContext)
