import { useCallback, useState } from 'react'
import { ListItem } from './ListItem/ListItem'
import { useGlobalContext } from '@/features/Context/store'
import { AsteroidProps } from '@/shared/interfaces/interfaces'

interface AsteroidsListProps {
  asteroids: AsteroidProps[]
}
export const AsteroidsList = ({ asteroids }: AsteroidsListProps) => {
  const { distanceOption, addToCart, cartItemsId } = useGlobalContext()

  const handleAddToCart = useCallback(
    (id: string) => {
      addToCart(id)
    },
    [addToCart]
  )

  return (
    <>
      {asteroids?.map((item: AsteroidProps, id) => {
        return (
          <ListItem
            key={id}
            {...item}
            cartItemsId={cartItemsId}
            distanceOption={distanceOption}
            addToCart={() => handleAddToCart(item.id)}
          />
        )
      })}
    </>
  )
}
