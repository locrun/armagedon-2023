import React from 'react'
import Image from 'next/image'
import { AsteroidData } from '@/shared/interfaces/interfaces'
import { extractTextInBrackets } from '@/shared/utils/extractTextInBrackets'
import { formatDiametr } from '@/shared/utils/formatDiametr'
import dangerous from '../../../public/assets/dangerous.svg'
import s from './detailCard.module.scss'

interface DetailCardProps {
  oneAsteroid: AsteroidData
}

export const DetailCard = ({ oneAsteroid }: DetailCardProps) => {
  const name = extractTextInBrackets(oneAsteroid?.name)
  const diameter = formatDiametr(
    oneAsteroid?.estimated_diameter?.meters.estimated_diameter_min,
    oneAsteroid?.estimated_diameter?.meters.estimated_diameter_max
  )
  console.log(oneAsteroid.close_approach_data)
  return (
    <ul>
      <li>Name: {name}</li>
      <li>Diameter: Ø{diameter}</li>
      <li>
        {oneAsteroid?.is_potentially_hazardous_asteroid && (
          <Image src={dangerous} alt='dangerous' />
        )}
      </li>
    </ul>
  )
}
