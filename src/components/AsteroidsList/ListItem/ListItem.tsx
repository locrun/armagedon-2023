import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

import litle_asteroid from '../../../../public/assets/litle_asteroid.svg'
import big_asteroid from '../../../../public/assets/big_asteroid.svg'
import dangerous from '../../../../public/assets/dangerous.svg'

import { AsteroidProps } from '@/shared/interfaces/interfaces'

import cn from 'classnames'
import s from '../asteroidsList.module.scss'

export const ListItem = ({
  id,
  name,
  flightDate,
  distancesInKm,
  distancesToMoon,
  diameter,
  isPotentiallyHazardous,
  distanceOption,
  addToCart,
}: AsteroidProps) => {
  return (
    <div className={s.item}>
      <h3 className={s.date}>{flightDate}</h3>
      <div className={s.dimensions}>
        <span className={s.distance}>
          {distanceOption === 'distancesInKm' && distancesInKm + ' km'}
          {distanceOption === 'distancesToMoon' &&
            distancesToMoon + ' лунных орбит'}
          {!distanceOption && distancesToMoon + ' лунных орбит'}
        </span>
        <>
          {diameter > 85 ? (
            <Image src={big_asteroid} alt='big_asteroid' className={s.image} />
          ) : (
            <Image
              src={litle_asteroid}
              alt='litle_asteroid'
              className={cn(s.image, s.marginTop)}
            />
          )}
        </>
        <div className={s.nameDiameter}>
          <Link className={s.name} href={`/detail/${id}`}>
            {name}
          </Link>
          <span className={s.diameter}>Ø {diameter} м</span>
        </div>
      </div>
      <div className={s.btnWrapper}>
        {addToCart && (
          <button className={s.orderBtn} onClick={addToCart}>
            Заказать
          </button>
        )}

        {isPotentiallyHazardous && <Image src={dangerous} alt='dangerous' />}
      </div>
    </div>
  )
}