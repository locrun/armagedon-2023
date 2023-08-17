import React from 'react'
import Image from 'next/image'
import { AsteroidData } from '@/shared/interfaces/interfaces'
import { extractTextInBrackets } from '@/shared/utils/extractTextInBrackets'
import { formatDiametr } from '@/shared/utils/formatDiametr'
import dangerous from '../../../public/assets/dangerous.svg'
import s from './detailCard.module.scss'
import { spawn } from 'child_process'
import { formatDate } from '@/shared/utils/formatDate'
import { formatDistance } from '@/shared/utils/formatDistance'

interface DetailCardProps {
  oneAsteroid: AsteroidData
}

export const DetailCard = ({ oneAsteroid }: DetailCardProps) => {
  const name = extractTextInBrackets(oneAsteroid?.name)
  const diameter = formatDiametr(
    oneAsteroid?.estimated_diameter?.meters.estimated_diameter_min,
    oneAsteroid?.estimated_diameter?.meters.estimated_diameter_max
  )
  console.log(oneAsteroid)
  return (
    <div className={s.flex}>
      <div className={s.detail}>
        <ul className={s.detailList}>
          <li className={s.item}> Имя: {name}</li>
          <li className={s.item}>Диаметр: Ø{diameter}</li>
          <li className={s.item}>
            Абсолютная магнитуда: {oneAsteroid.absolute_magnitude_h}
          </li>
          <li>
            {oneAsteroid?.is_potentially_hazardous_asteroid && (
              <Image src={dangerous} alt='dangerous' />
            )}
          </li>
        </ul>
      </div>
      <div className={s.listApproachesWrapper}>
        <h3 className={s.title}>Список всех сближений</h3>
        <div className={s.listApproaches}>
          {oneAsteroid.close_approach_data?.map((item, id) => {
            return (
              <div key={id} className={s.itemList}>
                <div className={s.item}>
                  Дата приближения:&nbsp;
                  {formatDate(item.close_approach_date)}
                </div>
                <div className={s.item}>
                  Скорость KM в час:&nbsp;
                  {item.relative_velocity.kilometers_per_hour}
                </div>
                <div className={s.item}>
                  Км в секунду:&nbsp;
                  {item.relative_velocity.kilometers_per_second}
                </div>
                <div className={s.item}>
                  Миль в час:&nbsp;
                  {item.relative_velocity.miles_per_hour}
                </div>
                <div className={s.item}>
                  Вокруг чего летят:&nbsp;
                  {item.orbiting_body}
                </div>

                <div>
                  Расстояние до земли:&nbsp;
                  {formatDistance(parseInt(item.miss_distance.kilometers))} km
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
//relative_velocity
