import React, { useMemo } from 'react'
import { useGlobalContext } from '@/features/Context/store'
import s from './order.module.scss'
import {
  ListItem,
  ListItemProps,
} from '@/components/AsteroidsList/ListItem/ListItem'
import { formatAsteroidData } from '@/shared/utils/formatAsteroidData'

export const OrderPage = () => {
  const { cartItems } = useGlobalContext()
  const newFormattedAsteroidsData = cartItems?.map(formatAsteroidData)

  return (
    <div className={s.orders}>
      <h1 className={s.title}>Заказ отправлен!</h1>
      <div>
        {newFormattedAsteroidsData?.map((item: ListItemProps) => {
          return <ListItem key={item.id} {...item} />
        })}
      </div>
    </div>
  )
}
